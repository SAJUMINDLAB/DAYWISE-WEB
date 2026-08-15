import { create } from 'zustand';
import { createDesignSlice } from './slices/createDesignSlice';
import { createContentSlice } from './slices/createContentSlice';
import { createLocationSlice } from './slices/createLocationSlice';
import { createGuestSlice } from './slices/createGuestSlice';
import { createSystemSlice } from './slices/createSystemSlice';

export const useBuilderStore = create((set, get, api) => ({
  ...createSystemSlice(set, get, api),
  ...createDesignSlice(set, get, api),
  ...createContentSlice(set, get, api),
  ...createLocationSlice(set, get, api),
  ...createGuestSlice(set, get, api),
}));
