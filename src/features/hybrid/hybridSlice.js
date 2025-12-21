import { createSlice } from '@reduxjs/toolkit';

// Redux 负责“页面级 UI 状态”，如筛选条件、排序方式等。
const hybridSlice = createSlice({
  name: 'hybrid',
  initialState: {
    keyword: '',
    category: 'all',
    sortBy: 'points',
  },
  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSortBy(state, action) {
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
