export const createDesignSlice = (set) => ({
  selectedTemplate: 'classic',
  selectedTheme: 'cream-beige',
  setTemplate: (templateId) => set((state) => {
    if (templateId === 'bento' && state.galleryInfo?.layout !== 'carousel') {
      return { 
        selectedTemplate: templateId, 
        galleryInfo: { ...state.galleryInfo, layout: 'carousel' } 
      };
    }
    return { selectedTemplate: templateId };
  }),
  setTheme: (themeId) => set({ selectedTheme: themeId }),
  
  customColors: { bg: '#ffffff', accent: '#000000' },
  setCustomColors: (colors) => set((state) => ({ customColors: { ...state.customColors, ...colors } })),
  
  selectedFont: 'Noto Sans KR',
  setFont: (font) => set({ selectedFont: font }),
  selectedFontEn: 'Cormorant Italic',
  setFontEn: (font) => set({ selectedFontEn: font }),
  selectedFontSubtitle: 'Montserrat',
  setFontSubtitle: (font) => set({ selectedFontSubtitle: font }),
  
  optionInfo: {
    motionEffect: true,
    cinematicIntro: true,
    fontSize: 'M',
    fontWeightBold: false,
    texture: false,
    pageZoom: true,
    particlesEffect: true,
    particleType: 'snow',
    parallaxEffect: true,
    shineEffect: true,
    magazineTocLanguage: 'en',
    subtitleColor: '',
    cinematicCredits: true,
    useHiddenAdmin: false,
    hiddenAdminPin: '1234'
  },
  setOptionInfo: (key, value) => set((state) => ({
    optionInfo: { ...state.optionInfo, [key]: value }
  })),
});
