import { authStore } from './authStore';
import { progressStore } from './progressStore';

// RootStore：统一出口，方便各模块引用同一批 store（单例）
export class RootStore {
  authStore = authStore;
  progressStore = progressStore;
}

const storeKey = '__MOBX_ROOT_STORE__';

// 单例导出：HMR/热重载也不会重复创建实例
export const rootStore =
  globalThis[storeKey] ?? (globalThis[storeKey] = new RootStore());
