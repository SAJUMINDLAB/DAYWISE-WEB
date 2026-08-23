export const createContentSlice = (set) => ({
  sectionOrder: [
    { id: 'intro', label: '인사말' },
    { id: 'host', label: '혼주 정보' },
    { id: 'calendar', label: '달력' },
    { id: 'story', label: '우리만의 이야기' },
    { id: 'gallery', label: '갤러리' },
    { id: 'location', label: '오시는 길' },
    { id: 'account', label: '마음 전하실 곳' },
    { id: 'guestbook', label: '방명록' },
    { id: 'rsvp', label: '참석 의사 전달' }
  ],
  setSectionOrder: (newOrder) => set({ sectionOrder: newOrder }),
  
  mainInfo: {
    mainImage: '/images/ohalek00-wedding-6787691_1920.jpg',
    mainImageShape: 'full', // full, arch, rectangle, rounded, circle
    coverLayout: 'layout1', // layout1(Text Top), layout2(Photo Top), layout3(Overlay), layout5(Minimal)
    coverTextStyle: 'style1', // style1(Center), style2(Left), style3(Inline), style4(Korean Main), style5(Big Date)
    coverTitle: '', // Custom main cover title
    coverTitleSize: 1.0, // Custom main cover title size
    groomNameEn: 'Groom',
    groomNameKo: '신랑',
    brideNameEn: 'Bride',
    brideNameKo: '신부',
    date: '2026-01-01',
    timeAmPm: 'PM',
    timeHour: '1',
    timeMinute: '00',
    location: '웨딩홀 이름',
    locationDetail: '상세홀 정보',
    
    groomFather: '아버님',
    groomMother: '어머님',
    groomRelation: '아들',
    brideFather: '아버님',
    brideMother: '어머님',
    brideRelation: '딸'
  },

  // 메인 정보 업데이트 함수 (공유 설정 자동 동기화 포함)
  setMainInfo: (key, value) => set((state) => {
    const newMainInfo = { ...state.mainInfo, [key]: value };
    let newShareInfo = { ...state.shareInfo };

    // 신랑/신부 이름 변경 시 공유 타이틀 자동 업데이트
    if (key === 'groomNameKo' || key === 'brideNameKo') {
      const groom = newMainInfo.groomNameKo || '신랑';
      const bride = newMainInfo.brideNameKo || '신부';
      newShareInfo.title = `${groom} ❤️ ${bride} 결혼합니다`;
    }

    // 날짜 변경 시 공유 설명문 자동 업데이트
    if (key === 'date') {
      const d = new Date(value);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const day = d.getDate();
      newShareInfo.description = `${year}년 ${month}월 ${day}일\n두 사람이 하나 되는 날`;
    }

    return {
      mainInfo: newMainInfo,
      shareInfo: newShareInfo
    };
  }),

  greetingInfo: {
    useGreeting: true,
    title: 'Invite You',
    content: '서로가 마주보며 다져온 사랑을\n이제 함께 한 곳을 바라보며 걸어갈 수 있는\n큰 사랑으로 키우고자 합니다.\n\n저희 두 사람이 사랑의 이름으로\n지켜나갈 수 있게 앞날을\n축복해 주시면 감사하겠습니다.'
  },
  
  setGreetingInfo: (key, value) => set((state) => ({
    greetingInfo: { ...state.greetingInfo, [key]: value }
  })),

  galleryInfo: {
    useGallery: true,
    layout: 'grid', // 'grid' | 'carousel'
    imageFit: 'contain', // 'contain' | 'cover'
    images: [] // { id, url, name }
  },
  
  setGalleryInfo: (key, value) => set((state) => ({
    galleryInfo: { ...state.galleryInfo, [key]: value }
  })),
  
  reorderGalleryImages: (startIndex, endIndex) => set((state) => {
    const newImages = Array.from(state.galleryInfo.images);
    const [removed] = newImages.splice(startIndex, 1);
    newImages.splice(endIndex, 0, removed);
    return { galleryInfo: { ...state.galleryInfo, images: newImages } };
  }),

  storyInfo: {
    useStory: true,
    title: '우리만의 이야기',
    mode: 'letter', // 'letter' or 'qna'
    letterContent: '서로가 서로를 만나\n가장 나다운 모습으로\n평생을 함께하려 합니다.\n\n비가 오나 눈이 오나\n서로의 우산이 되어주며\n예쁘게 잘 살겠습니다.',
    qnaList: [
      { id: 'q1', question: '두 사람의 첫 만남은?', answer: '대학교 동아리 신입생 환영회에서 처음 만났어요.' },
      { id: 'q2', question: '서로의 첫인상은 어땠나요?', answer: '신랑: 조용하고 참 예쁜 사람\n신부: 말이 진짜 많고 웃긴 사람' }
    ]
  },

  updateStoryInfo: (key, value) => set((state) => ({
    storyInfo: { ...state.storyInfo, [key]: value }
  })),

  setStoryMode: (mode) => set((state) => ({
    storyInfo: { ...state.storyInfo, mode }
  })),

  updateStoryLetter: (content) => set((state) => ({
    storyInfo: { ...state.storyInfo, letterContent: content }
  })),

  updateStoryQna: (id, key, value) => set((state) => ({
    storyInfo: {
      ...state.storyInfo,
      qnaList: state.storyInfo.qnaList.map(q => q.id === id ? { ...q, [key]: value } : q)
    }
  })),

  addStoryQna: () => set((state) => ({
    storyInfo: {
      ...state.storyInfo,
      qnaList: [...state.storyInfo.qnaList, { id: Math.random().toString(36).substring(7), question: '새로운 질문', answer: '' }]
    }
  })),

  removeStoryQna: (id) => set((state) => ({
    storyInfo: {
      ...state.storyInfo,
      qnaList: state.storyInfo.qnaList.filter(q => q.id !== id)
    }
  })),

  bgmInfo: {
    useBgm: true,
    selectedTrack: 'track1', // track1: 캐논, track2: 결혼행진곡, track3: 쇼팽, custom: 직접 업로드
    autoPlay: true, // 기본값을 자동 재생(true)으로 변경
    customTrackUrl: null,
    customTrackName: ''
  },

  updateBgmInfo: (key, value) => set((state) => ({
    bgmInfo: { ...state.bgmInfo, [key]: value }
  })),
  
  shareInfo: {
    title: '',
    description: '2026년 01월 01일\n두 사람이 하나 되는 날',
    thumbnailUrl: '',
  },

  updateShareInfo: (key, value) => set((state) => ({
    shareInfo: { ...state.shareInfo, [key]: value }
  })),
});
