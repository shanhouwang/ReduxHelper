import { create } from 'zustand';

// Zustand Store：用最少样板代码管理“学习进度”
// 说明：timer 不需要触发 UI 更新，所以放在闭包变量中
let timer = null;

export const useProgressStore = create((set, get) => ({
  // 可更新的状态
  progress: 0, // 0 - 100
  topic: 'Zustand 入门',
  isRunning: false,

  setTopic: (value) => set({ topic: value }),

  increase: (step = 10) =>
    set((state) => ({ progress: Math.min(100, state.progress + step) })),

  decrease: (step = 10) =>
    set((state) => ({ progress: Math.max(0, state.progress - step) })),

  reset: () => {
    get().stop();
    set({ progress: 0 });
  },

  startAuto: () => {
    if (get().isRunning) return;
    set({ isRunning: true });

    if (timer) {
      clearInterval(timer);
      timer = null;
    }

    timer = setInterval(() => {
      const current = get().progress;
      const next = Math.min(100, current + 5);
      set({ progress: next });

      if (next >= 100) {
        get().stop();
      }
    }, 300);
  },

  stop: () => {
    set({ isRunning: false });
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  },
}));
