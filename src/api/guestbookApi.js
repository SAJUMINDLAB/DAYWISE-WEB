import { supabase } from './supabaseClient';

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
