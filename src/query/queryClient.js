import { QueryClient } from '@tanstack/react-query';

// QueryClient 是 TanStack Query 的“核心管理器”，负责缓存与请求状态。
// 放在单独文件，保证全局只有一个实例。
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5 秒内的数据视为“新鲜”，不会自动重复请求
      staleTime: 1000 * 5,
      retry: 1,
    },
  },
});
