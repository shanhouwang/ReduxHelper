import { useStores } from '../../hooks/useStores';

// 领域专用 Hook：让组件更直观地获取 authStore
export const useAuthStore = () => {
  const { authStore } = useStores();
  return authStore;
};
