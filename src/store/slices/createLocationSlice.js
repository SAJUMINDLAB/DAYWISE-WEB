export const createLocationSlice = (set) => ({
  locationInfo: {
    useTransportation: true,
    mapType: 'dynamic', // 'image' | 'dynamic'
    mapImage: null,
    venueName: '웨딩홀 이름',
    venueDetail: '상세홀 정보',
    address: '서울특별시 강남구 테헤란로 123',
    tel: '02-123-4567',
    transportation: [
      { id: 't1', label: '지하철', content: '지하철 2호선 역삼역 1번 출구 도보 5분' },
      { id: 't2', label: '버스', content: '간선버스 146, 341, 360 (웨딩홀 앞 하차)' },
      { id: 't3', label: '자가용 / 주차', content: '건물 내 지하 주차장 이용 (2시간 무료)' },
      { id: 't4', label: '기차 (KTX / SRT)', content: '서울역 하차 후 지하철 이용' }
    ],
    navButtons: { naver: true, kakao: true, tmap: true }
  },

  setLocationInfo: (key, value) => set((state) => ({
    locationInfo: { ...state.locationInfo, [key]: value }
  })),

  updateTransportation: (id, key, value) => set((state) => ({
    locationInfo: {
      ...state.locationInfo,
      transportation: state.locationInfo.transportation.map(t => t.id === id ? { ...t, [key]: value } : t)
    }
  })),

  addTransportation: () => set((state) => ({
    locationInfo: {
      ...state.locationInfo,
      transportation: [...state.locationInfo.transportation, { id: Math.random().toString(36).substring(7), label: '새 교통편', content: '' }]
    }
  })),

  removeTransportation: (id) => set((state) => ({
    locationInfo: {
      ...state.locationInfo,
      transportation: state.locationInfo.transportation.filter(t => t.id !== id)
    }
  })),
});
