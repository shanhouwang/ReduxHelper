import { useContext } from 'react';
import { RootStoreContext } from '../context/RootStoreContext';
import { rootStore, type RootStore } from '../rootStore';

// 通用 Hook：优先使用 Context 注入的 store，避免硬依赖单例
export const useStores = (): RootStore => {
  const store = useContext(RootStoreContext);
  return store ?? rootStore;
};
