import { useState } from 'react';
import { compressImage } from '../utils/imageUtils';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file, maxWidth = 1080) => {
    if (!file) return null;
    
    setIsUploading(true);
    try {
      const compressedBase64 = await compressImage(file, maxWidth);
      return compressedBase64;
    } catch (err) {
      console.error('Image upload/compression failed:', err);
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadImage, isUploading };
};
