export const compressImage = (file, maxWidth = 1080) => {
  return new Promise((resolve, reject) => {
    // 15MB 이상 이미지 거부
    if (file.size > 15 * 1024 * 1024) {
      alert('15MB 이하의 이미지만 업로드 가능합니다. (앱 성능 저하 방지)');
      reject(new Error('File size exceeds 15MB'));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Compress as JPEG with 0.7 quality to keep size small
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
    };
  });
};
