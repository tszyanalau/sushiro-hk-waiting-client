import { createSlice } from '@reduxjs/toolkit';
import config from '../config.json';

export const storeMapSlice = createSlice({
  name: 'storeMap',
  initialState: {
    storeId: null,
    showInfo: false,
    selectedTiers: Array.from(config.tier.keys()),
    resetTimer: false,
  },
  reducers: {
    setStoreId: (state, action) => {
      state.storeId = action.payload;
    },
    setShowInfo: (state, action) => {
      state.showInfo = action.payload;
    },
    setSelectedTiers: (state, action) => {
      state.selectedTiers = action.payload;
    },
    setResetTimer: (state, action) => {
      state.resetTimer = action.payload;
    },
  },
});

export const { setStoreId, setShowInfo, setSelectedTiers, setResetTimer } = storeMapSlice.actions;

export default storeMapSlice.reducer;
