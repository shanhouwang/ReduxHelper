import { AuthStore } from './domains/auth/AuthStore';
import { ProgressStore } from './domains/progress/ProgressStore';

// RootStore：聚合所有领域 store，统一管理依赖
export class RootStore {
  authStore: AuthStore;
  progressStore: ProgressStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.progressStore = new ProgressStore(this);
  }
}

// 方便测试或多实例场景的创建函数
export const createRootStore = () => new RootStore();

const storeKey = '__MOBX_ROOT_STORE__' as const;
type StoreKey = typeof storeKey;
type RootStoreGlobal = typeof globalThis & { [key in StoreKey]?: RootStore };
const globalStore = globalThis as RootStoreGlobal;

// 单例导出：HMR/热重载也不会重复创建实例
export const rootStore = globalStore[storeKey] ?? (globalStore[storeKey] = createRootStore());
