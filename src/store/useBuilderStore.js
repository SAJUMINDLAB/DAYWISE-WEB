import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { temporal } from 'zundo';
import { createDesignSlice } from './slices/createDesignSlice';
import { createContentSlice } from './slices/createContentSlice';
import { createLocationSlice } from './slices/createLocationSlice';
import { createGuestSlice } from './slices/createGuestSlice';
import { createSystemSlice } from './slices/createSystemSlice';

// 시스템 데이터 등 Undo/Redo에 불필요한 값은 제외
const partializeForTemporal = (state) => {
  const { currentInvitationId, user, steps, ...rest } = state;
  return rest;
};

export const useBuilderStore = create(
  persist(
    temporal(
      (set, get, api) => ({
        ...createSystemSlice(set, get, api),
        ...createDesignSlice(set, get, api),
        ...createContentSlice(set, get, api),
        ...createLocationSlice(set, get, api),
        ...createGuestSlice(set, get, api),
      }),
      {
        partialize: partializeForTemporal,
        limit: 50, // 히스토리 최대 50개 제한
      }
    ),
    {
      name: 'daywise-builder-storage', // 로컬 스토리지에 자동 임시 저장
      partialize: (state) => {
        // 로그인 정보(user)는 로컬스토리지에 저장하지 않음 (보안)
        const { user, ...rest } = state;
        return rest;
      },
    }
  )
);
