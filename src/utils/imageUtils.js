import imageCompression from 'browser-image-compression';

export const compressImage = async (file, maxWidth = 1920) => {
  // 15MB 이상 이미지 거부 (브라우저 메모리 초과 방지)
  if (file.size > 15 * 1024 * 1024) {
    alert('15MB 이하의 이미지만 업로드 가능합니다. (앱 성능 저하 방지)');
    throw new Error('File size exceeds 15MB');
  }

  const options = {
    maxSizeMB: 1.5, // 최고 화질 유지를 위해 1.5MB까지 허용
    maxWidthOrHeight: maxWidth,
    useWebWorker: true,
    fileType: 'image/jpeg', // 업로드 시 image/jpeg로 설정되어 있으므로 일치시켜야 깨짐 방지
    initialQuality: 0.95 // 고화질 세팅
  };

  try {
    const compressedFile = await imageCompression(file, options);
    
    // File 객체를 Base64 Data URL로 변환하여 반환 (기존 로직 호환용)
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  } catch (error) {
    console.error("이미지 압축 중 오류 발생:", error);
    // 실패 시 기존 캔버스 방식이나 원본 사용 등 처리 가능하나, 에러를 던져 업로드 중단
    throw error;
  }
};

export const dataURLtoBlob = (dataurl) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};
