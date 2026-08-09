/**
 * 가짜 데이터베이스(Mock DB) API
 * 브라우저의 localStorage를 이용해 실제 서버와 똑같이 동작하도록 흉내냅니다.
 */

// 고유 ID 생성용 유틸리티
const generateId = () => Math.random().toString(36).substring(2, 9);

export const saveInvitation = async (invitationData) => {
  // 실제 서버 통신 느낌을 주기 위한 가짜 딜레이(1초)
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const id = generateId();
  
  // localStorage에 저장
  const existingDataStr = localStorage.getItem('wedding_invitations');
  const existingData = existingDataStr ? JSON.parse(existingDataStr) : {};
  
  existingData[id] = {
    ...invitationData,
    createdAt: new Date().toISOString()
  };
  
  localStorage.setItem('wedding_invitations', JSON.stringify(existingData));
  
  return id;
};

export const getInvitation = async (id) => {
  // 가짜 딜레이(0.5초)
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const existingDataStr = localStorage.getItem('wedding_invitations');
  if (!existingDataStr) return null;
  
  const existingData = JSON.parse(existingDataStr);
  return existingData[id] || null;
};

// 모든 청첩장 목록 불러오기 (관리자용)
export const getAllInvitations = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const existingDataStr = localStorage.getItem('wedding_invitations');
  if (!existingDataStr) return {};
  return JSON.parse(existingDataStr);
};

// RSVP 제출하기
export const submitRsvp = async (id, rsvpData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const existingDataStr = localStorage.getItem('wedding_invitations');
  if (!existingDataStr) throw new Error('청첩장을 찾을 수 없습니다.');
  
  const existingData = JSON.parse(existingDataStr);
  if (!existingData[id]) throw new Error('청첩장을 찾을 수 없습니다.');
  
  if (!existingData[id].rsvpList) existingData[id].rsvpList = [];
  
  existingData[id].rsvpList.push({
    ...rsvpData,
    submittedAt: new Date().toISOString()
  });
  
  localStorage.setItem('wedding_invitations', JSON.stringify(existingData));
  return true;
};

// 방명록 작성하기
export const submitGuestbook = async (id, entryData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const existingDataStr = localStorage.getItem('wedding_invitations');
  if (!existingDataStr) throw new Error('청첩장을 찾을 수 없습니다.');
  
  const existingData = JSON.parse(existingDataStr);
  if (!existingData[id]) throw new Error('청첩장을 찾을 수 없습니다.');
  
  if (!existingData[id].guestbookInfo) existingData[id].guestbookInfo = { entries: [] };
  if (!existingData[id].guestbookInfo.entries) existingData[id].guestbookInfo.entries = [];
  
  const newEntry = {
    ...entryData,
    id: `gb${Date.now()}`
  };
  
  // 방명록은 최신 글이 위에 오도록 맨 앞에 추가
  existingData[id].guestbookInfo.entries = [newEntry, ...existingData[id].guestbookInfo.entries];
  
  localStorage.setItem('wedding_invitations', JSON.stringify(existingData));
  return newEntry;
};
