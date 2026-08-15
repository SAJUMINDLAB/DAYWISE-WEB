import { useState } from 'react';
import { compressImage, dataURLtoBlob } from '../utils/imageUtils';
import { supabase } from '../api/supabaseClient';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file, maxWidth = 1080) => {
    if (!file) return null;
    
    setIsUploading(true);
    try {
      // 1. 이미지 압축 (Base64 변환)
      const compressedBase64 = await compressImage(file, maxWidth);
      
      // 2. Base64 -> Blob 변환
      const blob = dataURLtoBlob(compressedBase64);
      
      // 3. 고유 파일명 생성
      const fileExt = 'jpg';
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // 4. Supabase Storage 'images' 버킷에 업로드
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, blob, {
          contentType: 'image/jpeg',
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
      alert(`이미지 업로드에 실패했습니다. (버킷이 없거나 권한 오류일 수 있습니다.)\n상세: ${err.message}`);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadImage, isUploading };
};
