import { supabase } from './supabaseClient';

export const signUp = async (email, password, captchaToken) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { captchaToken }
  });
  if (error) {
    if (error.message.includes('already registered')) {
      throw new Error('이미 가입된 이메일입니다. 로그인 탭을 이용해 주세요.');
    }
    throw error;
  }
  if (data?.user?.identities && data.user.identities.length === 0) {
    throw new Error('이미 가입된 이메일입니다. 로그인 탭을 이용해 주세요.');
  }
  return data;
};

export const signIn = async (email, password, captchaToken) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: { captchaToken }
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
  const { data, error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
  return data;
};

export const signInWithKakao = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: { scopes: 'profile_nickname profile_image' }
  });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const deleteUserAccount = async (userId) => {
  const { data: invs, error: fetchError } = await supabase.from('invitations').select('id, data');
  if (fetchError) throw fetchError;
  if (invs) {
    const userInvs = invs.filter(inv => inv.data?.user?.id === userId);
    for (const inv of userInvs) {
      await supabase.from('invitations').delete().eq('id', inv.id);
    }
  }
  await supabase.rpc('delete_user');
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
