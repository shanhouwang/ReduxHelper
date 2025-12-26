import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { HybridCategory, HybridFilters, HybridSortBy } from './types';

// Redux 负责“页面级 UI 状态”，如筛选条件、排序方式等。
const hybridSlice = createSlice({
  name: 'hybrid',
  initialState: {
    keyword: '',
    category: 'all',
    sortBy: 'points',
  } satisfies HybridFilters,
  reducers: {
    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
    setCategory(state, action: PayloadAction<HybridCategory>) {
      state.category = action.payload;
    },
    setSortBy(state, action: PayloadAction<HybridSortBy>) {
      state.sortBy = action.payload;
    },
    resetFilters(state) {
      state.keyword = '';
      state.category = 'all';
      state.sortBy = 'points';
    },
  },
});

export const { setKeyword, setCategory, setSortBy, resetFilters } =
  hybridSlice.actions;
export default hybridSlice.reducer;
