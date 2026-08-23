import { supabase } from './supabaseClient';

// 고유 ID 생성 (UUID v4 대신 8자리 짧은 고유 문자열 사용)
const generateShortId = () => Math.random().toString(36).substring(2, 10);

export const checkIdAvailable = async (id) => {
  const { data, error } = await supabase
    .from('invitations')
    .select('id')
    .eq('id', id)
    .maybeSingle(); // single() throws if not found, maybeSingle() returns null
  
  if (error) {
    console.error('Check ID Error:', error);
    return false; // 에러가 나면 보수적으로 중복으로 처리
  }
  return !data; // data가 없으면(null) 사용 가능(true)
};

export const saveInvitation = async (invitationData) => {
  // 사용자가 커스텀 URL을 설정했다면 무조건 최우선으로 사용
  // 없다면 기존 임시저장 ID 사용, 그것도 없으면 랜덤 숏 ID 생성
  const id = invitationData.customUrl || invitationData.currentInvitationId || generateShortId();
  
  // 보안 검사: 해당 ID가 이미 존재하는지, 존재한다면 주인이 맞는지 확인
  const { data: existingData } = await supabase
    .from('invitations')
    .select('data')
    .eq('id', id)
    .maybeSingle();

  if (existingData) {
    const ownerId = existingData.data?.user?.id;
    const currentUserId = invitationData.user?.id;
    const isMasterAdmin = localStorage.getItem('daywise_master_auth') === 'true';

    // 주인이 다르고, 마스터 관리자도 아닐 때만 차단
    if (ownerId && ownerId !== currentUserId && !isMasterAdmin) {
      throw new Error('이미 다른 분이 사용 중인 주소입니다. 다른 주소를 입력해주세요.');
    }
  }

  // 저장할 데이터를 준비 (기존 데이터가 있다면 병합하여 payment_status 등 손실 방지)
  let dataToSave = { ...invitationData };
  if (existingData && existingData.data) {
    dataToSave = {
      ...existingData.data,
      ...invitationData, // 새 데이터로 덮어쓰기
    };
    
    // 마스터 관리자가 수정하는 경우, 원래 주인의 소유권(user 데이터)을 강제로 원복 유지
    const ownerId = existingData.data?.user?.id;
    const currentUserId = invitationData.user?.id;
    const isMasterAdmin = localStorage.getItem('daywise_master_auth') === 'true';
    if (isMasterAdmin && ownerId && ownerId !== currentUserId) {
      dataToSave.user = existingData.data.user;
    }
  }

  // 불필요한/중복 데이터 제거
  delete dataToSave.rsvpList;
  delete dataToSave.guestbookInfo;
  
  // 최종 수정일 추가
  dataToSave.updatedAt = new Date().toISOString();
  
  // rsvpList나 guestbookInfo.entries는 별도 테이블로 뺄 것이므로, 
  // 메인 데이터에서 초기화하거나 무시합니다.
  // Zustand 스토어의 함수들을 제거하기 위해 JSON 직렬화/역직렬화를 거칩니다.
  dataToSave = JSON.parse(JSON.stringify(dataToSave));

  const { error } = await supabase
    .from('invitations')
    .upsert({ 
      id,
      data: dataToSave 
    });

  if (error) {
    console.error('Supabase Save Error:', error);
    throw new Error('청첩장 저장에 실패했습니다: ' + (error.message || JSON.stringify(error)));
  }

  return id;
};

export const getInvitation = async (id) => {
  // 주소가 대문자로 들어오더라도 소문자로 변환하여 검색 (모든 ID는 소문자로 저장됨)
  const searchId = id ? id.toLowerCase() : id;

  // 1. 청첩장 기본 데이터 가져오기
  const { data: invData, error: invError } = await supabase
    .from('invitations')
    .select('*')
    .eq('id', searchId)
    .single();

  if (invError || !invData) {
    console.error('Supabase Fetch Error:', invError);
    return null;
  }

  const fullData = { 
    ...invData.data, 
    id: invData.id, 
    user_id: invData.user_id, 
    createdAt: invData.created_at,
    // data 컬럼 안에 들어있으므로, 명시적으로 덮어쓸 필요 없지만 안전장치로 추가할 경우 data에서 읽어야 함
    payment_status: invData.data?.payment_status || 'unpaid',
    expires_at: invData.data?.expires_at
  };

  // 2. 방명록 가져오기
  const { data: guestbookData, error: gbError } = await supabase
    .from('guestbooks')
    .select('*')
    .eq('invitation_id', searchId)
    .order('created_at', { ascending: false });

  if (!gbError && guestbookData) {
    if (!fullData.guestbookInfo) fullData.guestbookInfo = {};
    // map DB format back to frontend format
    fullData.guestbookInfo.entries = guestbookData.map(g => ({
      id: g.id,
      name: g.name,
      content: g.content,
      date: g.date
    }));
  }

  // 3. RSVP 가져오기
  const { data: rsvpData, error: rsvpError } = await supabase
    .from('rsvps')
    .select('*')
    .eq('invitation_id', searchId)
    .order('submitted_at', { ascending: false });

  if (!rsvpError && rsvpData) {
    fullData.rsvpList = rsvpData.map(r => ({
      id: r.id,
      side: r.side,
      name: r.name,
      attend: r.attend,
      companions: r.companions,
      meal: r.meal,
      contact: r.contact,
      message: r.message,
      submittedAt: r.submitted_at
    }));
  }

  return fullData;
};

export const updatePaymentStatus = async (id, status) => {
  // 1. 기존 데이터 가져오기
  const { data: rowData, error: fetchError } = await supabase
    .from('invitations')
    .select('data')
    .eq('id', id)
    .single();

  if (fetchError) {
    console.error('updatePaymentStatus Fetch Error:', fetchError);
    throw fetchError;
  }

  const currentData = rowData.data || {};
  currentData.payment_status = status;

  // 결제 완료(또는 무료 패스) 시 만료일을 365일 뒤로 설정
  if (status === 'paid' || status === 'free_pass') {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 365);
    currentData.expires_at = expiresAt.toISOString();
  } else if (status === 'unpaid') {
    // 취소 시 만료일 초기화
    delete currentData.expires_at;
  }

  // 2. 덮어쓰기
  const { error } = await supabase
    .from('invitations')
    .update({ data: currentData })
    .eq('id', id);

  if (error) {
    console.error('updatePaymentStatus Error:', error);
    throw error;
  }

  // Webhook 전송 로직 (결제 성공 또는 무료패스 발급 시)
  if (status === 'paid' || status === 'free_pass') {
    try {
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
      // 실제 Webhook URL이 설정되어 있는지 검사 (가짜 URL 무시)
      if (webhookUrl && webhookUrl.startsWith('http')) {
        // 전송할 데이터를 조회합니다.
        const invData = await getInvitation(id);
        if (invData) {
          const payload = {
            event: 'payment_completed',
            invitation_id: invData.id,
            payment_status: status,
            groom_name: invData.mainInfo?.groomNameKo || '',
            bride_name: invData.mainInfo?.brideNameKo || '',
            wedding_date: invData.mainInfo?.date || '',
            created_at: invData.createdAt || new Date().toISOString(),
            paid_amount: status === 'paid' ? 19900 : 0,
            expires_at: currentData.expires_at || ''
          };
          
          // 백그라운드로 전송 (성공/실패 여부가 메인 로직에 영향 주지 않음)
          // Google Apps Script는 redirect(302) 응답을 줄 수 있으므로 redirect: 'follow' 추가
          fetch(webhookUrl, {
            method: 'POST',
            mode: 'no-cors', // CORS 이슈 회피
            redirect: 'follow',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
          }).catch(e => console.warn('Webhook fetch failed:', e));
        }
      }
    } catch (webhookErr) {
      console.warn('Webhook sending failed (Ignored):', webhookErr);
    }
  }

  return true;
};

export const extendExpiration = async (id) => {
  const { data: rowData, error: fetchError } = await supabase
    .from('invitations')
    .select('data')
    .eq('id', id)
    .single();

  if (fetchError) {
    console.error('extendExpiration Fetch Error:', fetchError);
    throw fetchError;
  }

  const currentData = rowData.data || {};
  let currentExp = currentData.expires_at ? new Date(currentData.expires_at) : new Date();
  
  currentExp.setDate(currentExp.getDate() + 365);
  currentData.expires_at = currentExp.toISOString();

  const { error } = await supabase
    .from('invitations')
    .update({ data: currentData })
    .eq('id', id);

  if (error) {
    console.error('extendExpiration Update Error:', error);
    throw new Error('만료일 연장에 실패했습니다.');
  }
  return currentData.expires_at;
};

export const getAllInvitations = async () => {
  // 관리자 대시보드용 - 루프 없이 한 번의 조인 쿼리로 모든 데이터를 가져옵니다.
  const { data, error } = await supabase
    .from('invitations')
    .select(`
      id,
      created_at,
      data,
      rsvps ( id, attend, companions, side, meal ),
      guestbooks ( id )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getAllInvitations error:', error);
    return {};
  }

  const result = {};
  for (const row of data) {
    const invData = row.data || {};
    result[row.id] = {
      id: row.id,
      createdAt: row.created_at,
      payment_status: invData.payment_status,
      ...invData,
      rsvpList: row.rsvps || [],
      guestbookInfo: {
        ...invData.guestbookInfo,
        entries: row.guestbooks || []
      }
    };
  }

  return result;
};

export const deleteInvitation = async (id) => {
  const { error } = await supabase
    .from('invitations')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Supabase Delete Error:', error);
    throw new Error('청첩장 삭제에 실패했습니다.');
  }
  return true;
};

export const getUserInvitations = async (userId) => {
  if (!userId) return [];
  const { data, error } = await supabase
    .from('invitations')
    .select('id, created_at, data')
    .eq('data->user->>id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user invitations:', error);
    return [];
  }
  return data;
};

export const submitRsvp = async (id, rsvpData) => {
  const { error } = await supabase
    .from('rsvps')
    .insert([{
      invitation_id: id,
      side: rsvpData.side,
      name: rsvpData.name,
      attend: rsvpData.attend,
      companions: String(rsvpData.companions || 0),
      meal: rsvpData.meal,
      contact: rsvpData.contact,
      message: rsvpData.message
    }]);

  if (error) {
    console.error('RSVP Submit Error:', error);
    throw new Error('참석 의사 전달에 실패했습니다.');
  }
  return true;
};

export const submitGuestbook = async (id, entryData) => {
  const { data, error } = await supabase
    .from('guestbooks')
    .insert([{
      invitation_id: id,
      name: entryData.name,
      content: entryData.content,
      password: entryData.password,
      date: entryData.date
    }])
    .select()
    .single();

  if (error) {
    console.error('Guestbook Submit Error:', error);
    throw new Error('방명록 작성에 실패했습니다.');
  }

  return {
    id: data.id,
    name: data.name,
    content: data.content,
    date: data.date
  };
};

export const deleteGuestbookEntry = async (id, password) => {
  const { error, count } = await supabase
    .from('guestbooks')
    .delete({ count: 'exact' })
    .eq('id', id)
    .eq('password', password);

  if (error) {
    console.error('Guestbook Delete Error:', error);
    throw new Error('방명록 삭제에 실패했습니다.');
  }
  
  if (count === 0) {
    throw new Error('비밀번호가 일치하지 않거나 이미 삭제된 방명록입니다.');
  }

  return true;
};

export const deleteRsvpEntry = async (id) => {
  const { error } = await supabase
    .from('rsvps')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('RSVP Delete Error:', error);
    throw new Error('RSVP 삭제에 실패했습니다.');
  }
  return true;
};

// --- Auth API ---

export const signUp = async (email, password, captchaToken) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      captchaToken,
    }
  });
  
  if (error) {
    if (error.message.includes('already registered')) {
      throw new Error('이미 가입된 이메일입니다. 로그인 탭을 이용해 주세요.');
    }
    throw error;
  }
  
  // 보안 설정(이메일 열거 방지) 때문에 에러 없이 넘어왔지만 실제로는 중복 가입인 경우
  if (data?.user?.identities && data.user.identities.length === 0) {
    throw new Error('이미 가입된 이메일입니다. 로그인 탭을 이용해 주세요.');
  }
  
  return data;
};

export const signIn = async (email, password, captchaToken) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: {
      captchaToken,
    }
  });
  
  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      throw new Error('가입되지 않은 이메일이거나 비밀번호가 틀렸습니다.');
    }
    if (error.message.includes('Email not confirmed')) {
      throw new Error('이메일 인증이 완료되지 않았습니다. 메일함을 확인해 주세요.');
    }
    throw error;
  }
  
  return data;
};

export const updatePassword = async (newPassword) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });
  if (error) throw error;
  return data;
};

export const signInWithKakao = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      scopes: 'profile_nickname profile_image'
    }
  });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const deleteUserAccount = async (userId) => {
  // 1. 해당 유저가 생성한 모든 청첩장 데이터 삭제
  const { data: invs, error: fetchError } = await supabase.from('invitations').select('id, data');
  if (fetchError) throw fetchError;
  if (invs) {
    const userInvs = invs.filter(inv => inv.data?.user?.id === userId);
    for (const inv of userInvs) {
      await supabase.from('invitations').delete().eq('id', inv.id);
    }
  }
  
  // 2. Supabase Auth 계정 완전 삭제 (RPC 호출)
  // (이 기능은 Supabase SQL Editor에서 delete_user 함수가 생성되어 있어야 완벽히 동작합니다)
  await supabase.rpc('delete_user');

  // 3. 클라이언트 세션 로그아웃
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
