export const compressImage = (file, maxWidth = 1920) => {
  return new Promise((resolve, reject) => {
    // 15MB 이상 이미지 거부 (브라우저 메모리 초과 방지)
    if (file.size > 15 * 1024 * 1024) {
      alert('15MB 이하의 이미지만 업로드 가능합니다.');
      return reject(new Error('File size exceeds 15MB'));
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // maxWidth(또는 maxHeight)를 기준으로 비율에 맞춰 축소
        if (width > maxWidth || height > maxWidth) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }

        // 캔버스 생성 및 이미지 그리기
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        // 부드러운 이미지 스케일링 설정
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // JPEG 포맷으로 고화질(95%) 압축하여 Base64 반환
        const dataUrl = canvas.toDataURL('image/webp', 0.90);
        resolve(dataUrl);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
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
