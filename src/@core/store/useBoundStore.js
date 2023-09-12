import { create } from 'zustand'
import { useProductsSlice } from './productSlice';
import { useStoreSlice } from './storeSlice';
import { useTeamSlice } from './teamStore';
import { useUserStore } from './userStore';


export const useBoundStore = create((...a) => ({
}))