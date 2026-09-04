import { supabase } from './supabaseClient';

const generateShortId = () => Math.random().toString(36).substring(2, 10);

export const checkIdAvailable = async (id) => {
  const { data, error } = await supabase.from('invitations').select('id').eq('id', id).maybeSingle();
  if (error) {
    console.error('Check ID Error:', error);
    return false;
  }
  return !data;
};

export const saveInvitation = async (invitationData) => {
  const id = invitationData.customUrl || invitationData.currentInvitationId || generateShortId();
  const oldId = invitationData.currentInvitationId;
  const isUrlChanged = oldId && oldId !== id;
  
  const { data: existingData } = await supabase.from('invitations').select('data').eq('id', id).maybeSingle();

  if (existingData) {
    const ownerId = existingData.data?.user?.id;
    const currentUserId = invitationData.user?.id;
    const isMasterAdmin = localStorage.getItem('daywise_master_auth') === 'true';

    if (ownerId && ownerId !== currentUserId && !isMasterAdmin) {
      throw new Error('이미 다른 분이 사용 중인 주소입니다. 다른 주소를 입력해주세요.');
    }
  }

  let oldInvitationData = null;
  if (isUrlChanged) {
    const { data: oldData } = await supabase.from('invitations').select('data').eq('id', oldId).maybeSingle();
    if (oldData) oldInvitationData = oldData.data;
  }

  let dataToSave = { ...invitationData };
  if (existingData && existingData.data) {
    dataToSave = { ...existingData.data, ...invitationData };
    const ownerId = existingData.data?.user?.id;
    const currentUserId = invitationData.user?.id;
    const isMasterAdmin = localStorage.getItem('daywise_master_auth') === 'true';
    if (isMasterAdmin && ownerId && ownerId !== currentUserId) {
      dataToSave.user = existingData.data.user;
    }
  }
  
  if (isUrlChanged && oldInvitationData) {
    const oldPaymentStatus = oldInvitationData.payment_status;
    const oldExpiresAt = oldInvitationData.expires_at;
    if (oldPaymentStatus === 'paid' || oldPaymentStatus === 'free_pass') {
      dataToSave.payment_status = oldPaymentStatus;
      if (oldExpiresAt) dataToSave.expires_at = oldExpiresAt;
    }
  }

  delete dataToSave.rsvpList;
  if (dataToSave.guestbookInfo) {
    delete dataToSave.guestbookInfo.entries;
  }
  
  dataToSave.updatedAt = new Date().toISOString();
  dataToSave = JSON.parse(JSON.stringify(dataToSave));

  const { error } = await supabase.from('invitations').upsert({ id, data: dataToSave });
  if (error) {
    console.error('Supabase Save Error:', error);
    throw new Error('청첩장 저장에 실패했습니다: ' + (error.message || JSON.stringify(error)));
  }

  if (isUrlChanged) {
    try {
      await supabase.from('guestbooks').update({ invitation_id: id }).eq('invitation_id', oldId);
      await supabase.from('rsvps').update({ invitation_id: id }).eq('invitation_id', oldId);
      const { error: deleteError } = await supabase.from('invitations').delete().eq('id', oldId);
      if (deleteError) console.error('기존 청첩장 삭제 실패:', deleteError);
    } catch (migrationErr) {
      console.error('주소 변경 중 데이터 이전 오류:', migrationErr);
    }
  }

  return id;
};

export const getInvitation = async (id) => {
  const searchId = id ? id.toLowerCase() : id;
  const { data: invData, error: invError } = await supabase.from('invitations').select('*').eq('id', searchId).single();
  
  if (invError || !invData) {
    console.error('Supabase Fetch Error:', invError);
    return null;
  }

  const fullData = { 
    ...invData.data, 
    id: invData.id, 
    user_id: invData.user_id, 
    createdAt: invData.created_at,
    payment_status: invData.data?.payment_status || 'unpaid',
    expires_at: invData.data?.expires_at
  };

  const { data: guestbookData, error: gbError } = await supabase.from('guestbooks').select('*').eq('invitation_id', searchId).order('created_at', { ascending: false });
  if (!gbError && guestbookData) {
    if (!fullData.guestbookInfo) fullData.guestbookInfo = {};
    fullData.guestbookInfo.entries = guestbookData.map(g => ({
      id: g.id, name: g.name, content: g.content, date: g.date
    }));
  }

  const { data: rsvpData, error: rsvpError } = await supabase.from('rsvps').select('*').eq('invitation_id', searchId).order('submitted_at', { ascending: false });
  if (!rsvpError && rsvpData) {
    fullData.rsvpList = rsvpData.map(r => ({
      id: r.id, side: r.side, name: r.name, attend: r.attend, companions: r.companions, meal: r.meal, contact: r.contact, message: r.message, submittedAt: r.submitted_at
    }));
  }

  if (fullData.sectionOrder && Array.isArray(fullData.sectionOrder)) {
    const defaultSections = [
      { id: 'intro', label: '인사말' }, { id: 'host', label: '혼주 정보' }, { id: 'calendar', label: '달력' },
      { id: 'story', label: '우리만의 이야기' }, { id: 'gallery', label: '갤러리' }, { id: 'location', label: '오시는 길' },
      { id: 'account', label: '마음 전하실 곳' }, { id: 'guestbook', label: '방명록' }, { id: 'rsvp', label: '참석 의사 전달' }
    ];
    const missingSections = defaultSections.filter(def => !fullData.sectionOrder.some(saved => saved.id === def.id));
    if (missingSections.length > 0) fullData.sectionOrder = [...fullData.sectionOrder, ...missingSections];
  }

  return fullData;
};

export const updatePaymentStatus = async (id, status) => {
  const { data: rowData, error: fetchError } = await supabase.from('invitations').select('data').eq('id', id).single();
  if (fetchError) {
    console.error('updatePaymentStatus Fetch Error:', fetchError);
    throw fetchError;
  }

  const currentData = rowData.data || {};
  currentData.payment_status = status;

  if (status === 'paid' || status === 'free_pass') {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 365);
    currentData.expires_at = expiresAt.toISOString();
  } else if (status === 'unpaid') {
    delete currentData.expires_at;
  }

  const { error } = await supabase.from('invitations').update({ data: currentData }).eq('id', id);
  if (error) {
    console.error('updatePaymentStatus Error:', error);
    throw error;
  }

  if (status === 'paid' || status === 'free_pass') {
    try {
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
      if (webhookUrl && webhookUrl.startsWith('http')) {
        const invData = await getInvitation(id);
        if (invData) {
          const payload = {
            event: 'payment_completed', invitation_id: invData.id, payment_status: status,
            groom_name: invData.mainInfo?.groomNameKo || '', bride_name: invData.mainInfo?.brideNameKo || '',
            wedding_date: invData.mainInfo?.date || '', created_at: invData.createdAt || new Date().toISOString(),
            paid_amount: status === 'paid' ? 19900 : 0, expires_at: currentData.expires_at || ''
          };
          fetch(webhookUrl, {
            method: 'POST', mode: 'no-cors', redirect: 'follow', headers: { 'Content-Type': 'application/json' },
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
  const { data: rowData, error: fetchError } = await supabase.from('invitations').select('data').eq('id', id).single();
  if (fetchError) throw fetchError;

  const currentData = rowData.data || {};
  let currentExp = currentData.expires_at ? new Date(currentData.expires_at) : new Date();
  currentExp.setDate(currentExp.getDate() + 365);
  currentData.expires_at = currentExp.toISOString();

  const { error } = await supabase.from('invitations').update({ data: currentData }).eq('id', id);
  if (error) throw new Error('만료일 연장에 실패했습니다.');
  return currentData.expires_at;
};

export const getAllInvitations = async () => {
  const { data, error } = await supabase
    .from('invitations')
    .select(`id, created_at, data, rsvps ( id, attend, companions, side, meal ), guestbooks ( id )`)
    .order('created_at', { ascending: false });
  if (error) {
    console.error('getAllInvitations error:', error);
    return {};
  }
  const result = {};
  for (const row of data) {
    const invData = row.data || {};
    result[row.id] = {
      id: row.id, createdAt: row.created_at, payment_status: invData.payment_status, ...invData,
      rsvpList: row.rsvps || [], guestbookInfo: { ...invData.guestbookInfo, entries: row.guestbooks || [] }
    };
  }
  return result;
};

export const deleteInvitation = async (id) => {
  const { error } = await supabase.from('invitations').delete().eq('id', id);
  if (error) throw new Error('청첩장 삭제에 실패했습니다.');
  return true;
};

export const getUserInvitations = async (userId) => {
  if (!userId) return [];
  const { data, error } = await supabase.from('invitations').select('id, created_at, data').eq('data->user->>id', userId).order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching user invitations:', error);
    return [];
  }
  return data;
};
