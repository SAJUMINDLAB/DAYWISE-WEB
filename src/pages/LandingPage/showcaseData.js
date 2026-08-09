export const THEMES_MAP = {
  'cream-beige': { bg: '#FDFBF7', text: '#333333', accent: '#B0946E' },
  'royal-navy': { bg: '#141E30', text: '#F9F9F9', accent: '#E0C097' },
  'deep-forest': { bg: '#1A2421', text: '#F0F4F1', accent: '#D4AF37' },
  'dusty-blue': { bg: '#F5F7FA', text: '#405368', accent: '#6B7F96' },
  'vintage-wine': { bg: '#2D1B1E', text: '#FDECEF', accent: '#E6A8B6' }
};

// 1. 자동으로 로컬 폴더의 이미지들을 읽어옵니다.
// 유저가 public/images/showcase 폴더에 사진을 넣거나 빼면 이 코드가 알아서 감지합니다.
const imageModules = import.meta.glob('/public/images/showcase/*.{jpg,jpeg,png,webp}', { eager: true });
const LOCAL_IMAGES = Object.keys(imageModules).map(key => key.replace('/public', ''));

// 이미지가 하나도 없을 경우를 대비한 폴백 이미지
const safeImages = LOCAL_IMAGES.length > 0 ? LOCAL_IMAGES : ['/images/placeholder.jpg'];

// 2. 예쁜 조합 템플릿들 (사진은 제외하고 스타일만 정의)
const STYLE_TEMPLATES = [
  { template: 'Cinematic', theme: 'deep-forest', layout: 'layout3', textStyle: 'style3', fontEn: 'Bodoni Moda', fontKr: 'YesMyungjo' },
  { template: 'Classic', theme: 'cream-beige', layout: 'layout2', textStyle: 'style1', fontEn: 'Cormorant Garamond', fontKr: 'MaruBuri' },
  { template: 'Bento', theme: 'dusty-blue', layout: 'layout5', textStyle: 'style4', fontEn: 'Montserrat', fontKr: 'Pretendard' },
  { template: 'Magazine', theme: 'vintage-wine', layout: 'layout1', textStyle: 'style2', fontEn: 'Playfair Display', fontKr: 'Gowun Dodum' },
  { template: 'Classic', theme: 'royal-navy', layout: 'layout2', textStyle: 'style3', fontEn: 'Cinzel', fontKr: 'MapoGeumbitnaru' },
  { template: 'Magazine', theme: 'deep-forest', layout: 'layout5', textStyle: 'style5', fontEn: 'Marcellus', fontKr: 'Nanum Myeongjo' },
  { template: 'Classic', theme: 'dusty-blue', layout: 'layout3', textStyle: 'style1', fontEn: 'Italiana', fontKr: 'Soonbatang' },
  { template: 'Bento', theme: 'cream-beige', layout: 'layout1', textStyle: 'style4', fontEn: 'Montserrat', fontKr: 'Pretendard' },
  { template: 'Cinematic', theme: 'vintage-wine', layout: 'layout3', textStyle: 'style5', fontEn: 'Pinyon Script', fontKr: 'KyoboHandwriting' },
  { template: 'Magazine', theme: 'royal-navy', layout: 'layout2', textStyle: 'style2', fontEn: 'Libre Baskerville', fontKr: 'Noto Serif KR' },
  { template: 'Bento', theme: 'deep-forest', layout: 'layout5', textStyle: 'style1', fontEn: 'Montserrat', fontKr: 'Noto Sans KR' },
  { template: 'Classic', theme: 'cream-beige', layout: 'layout3', textStyle: 'style3', fontEn: 'Bodoni Moda', fontKr: 'YesMyungjo' },
  { template: 'Magazine', theme: 'dusty-blue', layout: 'layout1', textStyle: 'style4', fontEn: 'Cormorant Garamond', fontKr: 'Gowun Dodum' },
  { template: 'Bento', theme: 'vintage-wine', layout: 'layout5', textStyle: 'style2', fontEn: 'Montserrat', fontKr: 'Pretendard' },
  { template: 'Cinematic', theme: 'royal-navy', layout: 'layout3', textStyle: 'style1', fontEn: 'Cinzel', fontKr: 'MapoGeumbitnaru' },
  { template: 'Classic', theme: 'cream-beige', layout: 'layout2', textStyle: 'style5', fontEn: 'Italiana', fontKr: 'MaruBuri' }
];

// 3. 실감나는 샘플 데이터 배열 (최대 30개의 이미지가 들어올 것에 대비해 중복되지 않도록 30개 준비)
const MOCK_NAMES = [
  { en: ['Jiwon', 'Minjun'], kr: ['지원', '민준'] },
  { en: ['Sua', 'Doyun'], kr: ['수아', '도윤'] },
  { en: ['Yuna', 'Seojun'], kr: ['유나', '서준'] },
  { en: ['Jia', 'Hajun'], kr: ['지아', '하준'] },
  { en: ['Seoyeon', 'Eunwoo'], kr: ['서연', '은우'] },
  { en: ['Haeun', 'Sihu'], kr: ['하은', '시후'] },
  { en: ['Jimin', 'Jihu'], kr: ['지민', '지후'] },
  { en: ['Daeun', 'Yeonwoo'], kr: ['다은', '연우'] },
  { en: ['Nayoon', 'Geonwoo'], kr: ['나윤', '건우'] },
  { en: ['Soyeon', 'Hyunwoo'], kr: ['소연', '현우'] },
  { en: ['Eunji', 'Seongmin'], kr: ['은지', '성민'] },
  { en: ['Bomi', 'Jaeyoon'], kr: ['보미', '재윤'] },
  { en: ['Haeryung', 'Jihoon'], kr: ['해령', '지훈'] },
  { en: ['Sejeong', 'Taehyung'], kr: ['세정', '태형'] },
  { en: ['Gaeun', 'Minjae'], kr: ['가은', '민재'] },
  { en: ['Yejin', 'Jonghyun'], kr: ['예진', '종현'] },
  { en: ['Sumin', 'Dongwook'], kr: ['수민', '동욱'] },
  { en: ['Nayeon', 'Seungwoo'], kr: ['나연', '승우'] },
  { en: ['Yeri', 'Junho'], kr: ['예리', '준호'] },
  { en: ['Minji', 'Hyunjin'], kr: ['민지', '현진'] },
  { en: ['Sana', 'Jinwoo'], kr: ['사나', '진우'] },
  { en: ['Heejin', 'Sunghoon'], kr: ['희진', '성훈'] },
  { en: ['Sojin', 'Taeil'], kr: ['소진', '태일'] },
  { en: ['Yuju', 'Kyungsoo'], kr: ['유주', '경수'] },
  { en: ['Hyunji', 'Minho'], kr: ['현지', '민호'] },
  { en: ['Aerin', 'Jungwoo'], kr: ['애린', '정우'] },
  { en: ['Garam', 'Yunho'], kr: ['가람', '윤호'] },
  { en: ['Chaerin', 'Woojin'], kr: ['채린', '우진'] },
  { en: ['Danbi', 'Changmin'], kr: ['단비', '창민'] },
  { en: ['Seolhyun', 'Kihyun'], kr: ['설현', '기현'] }
];

const MOCK_DATES = [
  { full: '2026. 03. 07. SAT', short: '03. 07' },
  { full: '2026. 04. 11. SAT', short: '04. 11' },
  { full: '2026. 04. 18. SUN', short: '04. 18' },
  { full: '2026. 05. 02. SAT', short: '05. 02' },
  { full: '2026. 05. 23. SAT', short: '05. 23' },
  { full: '2026. 06. 13. SAT', short: '06. 13' },
  { full: '2026. 09. 12. SAT', short: '09. 12' },
  { full: '2026. 09. 26. SUN', short: '09. 26' },
  { full: '2026. 10. 18. SUN', short: '10. 18' },
  { full: '2026. 10. 31. SAT', short: '10. 31' },
  { full: '2026. 11. 21. SAT', short: '11. 21' },
  { full: '2026. 12. 05. SAT', short: '12. 05' },
  { full: '2027. 03. 14. SUN', short: '03. 14' },
  { full: '2027. 04. 24. SAT', short: '04. 24' },
  { full: '2027. 05. 08. SAT', short: '05. 08' },
  { full: '2027. 09. 25. SAT', short: '09. 25' },
  { full: '2027. 10. 10. SUN', short: '10. 10' }
];

// 4. 사진 개수만큼 카드를 생성합니다. 사진이 21장이면 21장이 나옵니다.
export const SHOWCASE_ITEMS = safeImages.map((imgUrl, index) => {
  const style = STYLE_TEMPLATES[index % STYLE_TEMPLATES.length];
  const names = MOCK_NAMES[index % MOCK_NAMES.length];
  const date = MOCK_DATES[(index * 3) % MOCK_DATES.length]; // Mix it up a bit

  return {
    id: `sc-${index + 1}`,
    image: imgUrl, // 모든 사진이 한번씩 무조건 나옴
    names,
    date,
    ...style
  };
});
