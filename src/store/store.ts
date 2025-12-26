import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import hybridReducer from '../features/hybrid/hybridSlice';

// store 是全局状态的“仓库”，所有 slice 的 reducer 都会在这里注册。
export const store = configureStore({
  reducer: {
    // counter 是这个 slice 在全局 state 里的名字：state.counter
    counter: counterReducer,
    // hybrid 用于示例：Redux 管理筛选条件
    hybrid: hybridReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
