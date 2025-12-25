import { useStores } from '../../hooks/useStores';

// 领域专用 Hook：让组件更直观地获取 progressStore
export const useProgressStore = () => {
  const { progressStore } = useStores();
  return progressStore;
};
