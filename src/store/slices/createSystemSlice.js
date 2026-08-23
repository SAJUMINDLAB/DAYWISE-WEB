const initialSteps = [
  { id: 'step-1', title: 'Step 1. 레이아웃 템플릿', desc: '청첩장의 전반적인 레이아웃 뼈대를 결정합니다', isOpen: false },
  { id: 'step-1-b', title: 'Step 2. 색상 및 폰트', desc: '레이아웃에 어울리는 색상과 글꼴을 입힙니다', isOpen: false },
  { id: 'step-2', title: 'Step 3. 메인 정보', desc: '청첩장의 필수 정보를 입력합니다', isOpen: false },
  { id: 'step-3', title: 'Step 4. 옵션 설정', desc: '모션, 폰트 크기 등 디테일을 설정합니다', isOpen: false },
  { id: 'step-4', title: 'Step 5. 인사말', desc: '초대 문구를 작성합니다', isOpen: false },
  { id: 'step-5', title: 'Step 6. 포토 갤러리', desc: '두 사람의 소중하고 아름다운 추억을 공유합니다', isOpen: false },
  { id: 'step-6', title: 'Step 7. 오시는 길', desc: '예식장 위치와 교통편을 상세히 안내합니다', isOpen: false },
  { id: 'step-7', title: 'Step 8. 마음 전하는 곳', desc: '참석이 어려운 분들을 위해 계좌번호를 안내합니다', isOpen: false },
  { id: 'step-8', title: 'Step 9. 스페셜 스토리', desc: '하객 안내사항이나 두 사람만의 특별한 이야기를 적어주세요', isOpen: false },
  { id: 'step-9', title: 'Step 10. 참석 여부 (RSVP)', desc: '식사 인원 파악을 위해 참석 의사를 미리 조사합니다', isOpen: false },
  { id: 'step-10', title: 'Step 11. 게스트북', desc: '따뜻한 축하와 응원의 메시지를 받아보세요', isOpen: false },
  { id: 'step-11', title: 'Step 12. 배경음악 (BGM)', desc: '청첩장에 어울리는 감성적인 음악을 고릅니다', isOpen: false },
  { id: 'step-12', title: 'Step 13. 공유 설정', desc: '카톡이나 문자로 전송할 때 보여질 대표 이미지와 문구를 설정합니다', isOpen: false },
  { id: 'step-13', title: 'Step 14. 메뉴 순서 설정', desc: '원하시는 흐름대로 청첩장의 구성을 자유롭게 재배치합니다', isOpen: false },
];

export const createSystemSlice = (set) => ({
  currentInvitationId: null,
  setCurrentInvitationId: (id) => set({ currentInvitationId: id }),
  
  user: null,
  setUser: (user) => set({ user }),
  
  customUrl: '',
  setCustomUrl: (url) => set({ customUrl: url }),
  
  steps: initialSteps,
  
  scrollY: 0,
  setScrollY: (y) => set({ scrollY: y }),

  reorderSteps: (startIndex, endIndex) => set((state) => {
    const result = Array.from(state.steps);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return { steps: result };
  }),

  toggleStep: (id) => set((state) => ({
    steps: state.steps.map(step => 
      step.id === id ? { ...step, isOpen: !step.isOpen } : { ...step, isOpen: false }
    )
  }), false, 'toggleStep'), // Added false and 'toggleStep' just for reference, not strictly needed

  activeStep: 1, // 1~14
  setActiveStep: (step) => set({ activeStep: step }),

  // Full Reset
  resetStore: () => set({
    currentInvitationId: null,
    customUrl: '',
    steps: initialSteps,
    activeStep: 1,
    scrollY: 0,
    
    // We will need to redefine all defaults here or let it be handled differently
    // For now, mirroring the original resetStore behavior
    selectedTemplate: 'classic',
    selectedTheme: 'cream-beige',
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
    mainInfo: {
      mainImage: '/images/ohalek00-wedding-6787691_1920.jpg',
      mainImageShape: 'full',
      coverLayout: 'layout1',
      coverTextStyle: 'style1',
      coverTitle: '', coverTitleSize: 1.0,
      groomNameEn: 'Groom', groomNameKo: '신랑',
      brideNameEn: 'Bride', brideNameKo: '신부',
      date: '2026-01-01', timeAmPm: 'PM', timeHour: '1', timeMinute: '00',
      location: '웨딩홀 이름', locationDetail: '상세홀 정보',
      groomFather: '아버님', groomMother: '어머님', groomRelation: '아들',
      brideFather: '아버님', brideMother: '어머님', brideRelation: '딸'
    },
    greetingInfo: {
      useGreeting: true,
      title: 'Invite You',
      content: '서로가 마주보며 다져온 사랑을\n이제 함께 한 곳을 바라보며 걸어갈 수 있는\n큰 사랑으로 키우고자 합니다.\n\n저희 두 사람이 사랑의 이름으로\n지켜나갈 수 있게 앞날을\n축복해 주시면 감사하겠습니다.'
    },
    galleryInfo: { useGallery: true, layout: 'grid', imageFit: 'contain', images: [] },
    locationInfo: {
      useTransportation: true, mapType: 'dynamic', mapImage: null,
      venueName: '웨딩홀 이름', venueDetail: '상세홀 정보', address: '서울특별시 강남구 테헤란로 123',
      tel: '02-123-4567',
      transportation: [
        { id: 't1', label: '지하철', content: '지하철 2호선 역삼역 1번 출구 도보 5분' },
        { id: 't2', label: '버스', content: '간선버스 146, 341, 360 (웨딩홀 앞 하차)' },
        { id: 't3', label: '자가용 / 주차', content: '건물 내 지하 주차장 이용 (2시간 무료)' },
        { id: 't4', label: '기차 (KTX / SRT)', content: '서울역 하차 후 지하철 이용' }
      ],
      navButtons: { naver: true, kakao: true, tmap: true }
    },
    accountInfo: {
      useAccount: true, message: '따뜻한 마음으로 축복해 주시는\n모든 분들께 진심으로 감사드립니다.',
      groom: [
        { id: 'g1', relation: '신랑', bank: '신한은행', account: '110-123-456789', holder: '신랑이름', kakaopay: '' },
        { id: 'g2', relation: '신랑 아버지', bank: '국민은행', account: '123-456-789012', holder: '아버님', kakaopay: '' }
      ],
      bride: [{ id: 'b1', relation: '신부', bank: '우리은행', account: '1002-123-456789', holder: '신부이름', kakaopay: '' }]
    },
    storyInfo: {
      useStory: true, title: '우리만의 이야기', mode: 'letter',
      letterContent: '서로가 서로를 만나\n가장 나다운 모습으로\n평생을 함께하려 합니다.\n\n비가 오나 눈이 오나\n서로의 우산이 되어주며\n예쁘게 잘 살겠습니다.',
      qnaList: [
        { id: 'q1', question: '두 사람의 첫 만남은?', answer: '대학교 동아리 신입생 환영회에서 처음 만났어요.' },
        { id: 'q2', question: '서로의 첫인상은 어땠나요?', answer: '신랑: 조용하고 참 예쁜 사람\n신부: 말이 진짜 많고 웃긴 사람' }
      ]
    },
    rsvpInfo: {
      useRsvp: true, title: '참석 의사 전달', modalTitle: 'RSVP',
      description: '결혼식에 참석해주시는 모든 분들을\n더욱 특별하게 모시고자 하오니,\n참석 여부 전달을 부탁드립니다.',
      useContactOption: true, useMealOption: true, useCompanionOption: true, useMessageOption: true, emphasisMode: 'floating'
    },
    guestbookInfo: {
      useGuestbook: true, description: '신랑 신부에게\n따뜻한 축하의 한마디를 남겨주세요.', entries: []
    },
    bgmInfo: {
      useBgm: true, selectedTrack: 'track1', autoPlay: false, customTrackUrl: null, customTrackName: ''
    },
    shareInfo: {
      title: '', description: '2026년 01월 01일\n두 사람이 하나 되는 날', thumbnailUrl: ''
    }
  })
});
