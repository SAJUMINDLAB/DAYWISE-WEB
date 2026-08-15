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
    // 주인이 다르다면 덮어쓰기 차단 (악의적인 ID 탈취 방지)
    if (ownerId && ownerId !== currentUserId) {
      throw new Error('이미 다른 분이 사용 중인 주소입니다. 다른 주소를 입력해주세요.');
    }
  }

  // rsvpList나 guestbookInfo.entries는 별도 테이블로 뺄 것이므로, 
  // 메인 데이터에서 초기화하거나 무시합니다.
  // Zustand 스토어의 함수들을 제거하기 위해 JSON 직렬화/역직렬화를 거칩니다.
  const dataToSave = JSON.parse(JSON.stringify(invitationData));
  if (dataToSave.rsvpList) delete dataToSave.rsvpList;
  if (dataToSave.guestbookInfo && dataToSave.guestbookInfo.entries) {
    dataToSave.guestbookInfo.entries = [];
  }

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
  // 1. 청첩장 기본 데이터 가져오기
  const { data: invData, error: invError } = await supabase
    .from('invitations')
    .select('*')
    .eq('id', id)
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
    payment_status: invData.payment_status,
    expires_at: invData.expires_at
  };

  // 2. 방명록 가져오기
  const { data: guestbookData, error: gbError } = await supabase
    .from('guestbooks')
    .select('*')
    .eq('invitation_id', id)
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
    .eq('invitation_id', id)
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
  const payload = {
    payment_status: status
  };
  
  // 결제 완료 시 만료일을 NULL로 설정하여 영구 보관
  if (status === 'paid') {
    payload.expires_at = null;
  }

  const { error } = await supabase
    .from('invitations')
    .update(payload)
    .eq('id', id);

  if (error) {
    console.error('updatePaymentStatus Error:', error);
    throw error;
  }
  return true;
};

export const getAllInvitations = async () => {
  // 관리자 대시보드용
  const { data, error } = await supabase
    .from('invitations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return {};

  const result = {};
  for (const inv of data) {
    // 상세 정보를 전부 불러오지는 않고, 뼈대만 전달
    // (현재 AdminDashboard는 rsvp 개수 등을 보려 하므로, 실제로는 
    // 여기서 각 invitation의 rsvp를 다 불러오거나, AdminDashboard 로직 수정 필요)
    
    // 단순함을 위해 getInvitation 재활용
    const fullInv = await getInvitation(inv.id);
    if (fullInv) {
      result[inv.id] = fullInv;
    }
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

export const deleteGuestbookEntry = async (id) => {
  const { error } = await supabase
    .from('guestbooks')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Guestbook Delete Error:', error);
    throw new Error('방명록 삭제에 실패했습니다.');
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
