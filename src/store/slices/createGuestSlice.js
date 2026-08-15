export const createGuestSlice = (set) => ({
  accountInfo: {
    useAccount: true,
    message: '따뜻한 마음으로 축복해 주시는\n모든 분들께 진심으로 감사드립니다.',
    groom: [
      { id: 'g1', relation: '신랑', bank: '신한은행', account: '110-123-456789', holder: '신랑이름', kakaopay: '' },
      { id: 'g2', relation: '신랑 아버지', bank: '국민은행', account: '123-456-789012', holder: '아버님', kakaopay: '' }
    ],
    bride: [
      { id: 'b1', relation: '신부', bank: '우리은행', account: '1002-123-456789', holder: '신부이름', kakaopay: '' }
    ]
  },

  updateAccountInfo: (key, value) => set((state) => ({
    accountInfo: { ...state.accountInfo, [key]: value }
  })),

  updateAccountMessage: (text) => set((state) => ({
    accountInfo: { ...state.accountInfo, message: text }
  })),

  updateAccount: (side, id, key, value) => set((state) => ({
    accountInfo: {
      ...state.accountInfo,
      [side]: state.accountInfo[side].map(acc => acc.id === id ? { ...acc, [key]: value } : acc)
    }
  })),

  addAccount: (side) => set((state) => ({
    accountInfo: {
      ...state.accountInfo,
      [side]: [...state.accountInfo[side], { id: Math.random().toString(36).substring(7), relation: '', bank: '', account: '', holder: '', kakaopay: '' }]
    }
  })),

  removeAccount: (side, id) => set((state) => ({
    accountInfo: {
      ...state.accountInfo,
      [side]: state.accountInfo[side].filter(acc => acc.id !== id)
    }
  })),

  rsvpInfo: {
    useRsvp: true,
    title: '참석 의사 전달',
    modalTitle: 'RSVP',
    description: '결혼식에 참석해주시는 모든 분들을\n더욱 특별하게 모시고자 하오니,\n참석 여부 전달을 부탁드립니다.',
    useContactOption: true,
    useMealOption: true,
    useCompanionOption: true,
    useMessageOption: true,
    emphasisMode: 'floating' // 'floating' | 'toast' | 'modal' | 'none'
  },

  updateRsvpInfo: (key, value) => set((state) => ({
    rsvpInfo: { ...state.rsvpInfo, [key]: value }
  })),

  guestbookInfo: {
    useGuestbook: true,
    description: '신랑 신부에게\n따뜻한 축하의 한마디를 남겨주세요.',
    entries: []
  },

  updateGuestbookInfo: (key, value) => set((state) => ({
    guestbookInfo: { ...state.guestbookInfo, [key]: value }
  })),

  addGuestbookEntry: (entry) => set((state) => ({
    guestbookInfo: {
      ...state.guestbookInfo,
      entries: [{ ...entry, id: `gb${Date.now()}` }, ...state.guestbookInfo.entries]
    }
  })),

  removeGuestbookEntry: (id) => set((state) => ({
    guestbookInfo: {
      ...state.guestbookInfo,
      entries: state.guestbookInfo.entries.filter(e => e.id !== id)
    }
  })),

  editGuestbookEntry: (id, updatedEntry) => set((state) => ({
    guestbookInfo: {
      ...state.guestbookInfo,
      entries: state.guestbookInfo.entries.map(e => 
        e.id === id ? { ...e, ...updatedEntry } : e
      )
    }
  })),
});
