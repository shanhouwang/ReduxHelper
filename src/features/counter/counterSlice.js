import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// slice = 一个功能模块的状态 + 修改状态的方法（reducers）+ 自动生成的 action。
// createAsyncThunk 用于封装异步逻辑，自动生成 pending/fulfilled/rejected 三种 action。
const fakeApiAddAmount = (amount) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(amount), 800);
  });

export const incrementAsync = createAsyncThunk(
  'counter/incrementAsync',
  async (amount) => {
    const response = await fakeApiAddAmount(amount);
    return response;
  }
);

const counterSlice = createSlice({
  // name 会作为 action type 的前缀，也决定 state.counter 的名字
  name: 'counter',
  // 这个 slice 的初始状态
  initialState: {
    value: 0,
    status: 'idle',
    error: null,
  },
  // reducers 描述“如何修改状态”，每个函数都会生成一个同名 action
  reducers: {
    // Redux Toolkit 内置 Immer，所以可以直接写“修改”，不会破坏不可变性
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    // action.payload 是调用 dispatch 时传入的参数
    incrementByAmount(state, action) {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value += action.payload;
      })
      .addCase(incrementAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '未知错误';
      });
  },
});

// 这些就是自动生成的 action creator
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
// reducer 会在 store 里注册
export default counterSlice.reducer;
