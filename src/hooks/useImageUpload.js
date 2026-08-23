import { useState } from 'react';
import { compressImage, dataURLtoBlob } from '../utils/imageUtils';
import { supabase } from '../api/supabaseClient';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  // maxWidth를 인자로 받아 메인은 1920, 갤러리는 1080 등으로 유연하게 적용
  const uploadImage = async (file, maxWidth = 1920) => {
    if (!file) return null;
    
    setIsUploading(true);
    try {
      // 1. 이미지 압축 (브라우저 기본 Canvas를 이용한 고화질 압축)
      const compressedBase64 = await compressImage(file, maxWidth);
      
      // 2. Base64 -> Blob 변환
      const blob = dataURLtoBlob(compressedBase64);
      
      // 3. 고유 파일명 생성
      const fileExt = 'webp';
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // 4. Supabase Storage 'images' 버킷에 업로드
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, blob, {
          contentType: 'image/webp',
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // 5. Public URL 가져오기
      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (err) {
      console.error('Image upload failed:', err);
      alert(`이미지 업로드에 실패했습니다.\n상세: ${err.message}`);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadImage, isUploading };
};
