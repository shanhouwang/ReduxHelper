import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchItems, toggleLike } from '../api';

// 通过 Hook 把“数据获取逻辑”从页面中抽离
// Hook 层：负责“数据获取 + 缓存策略”，不掺杂 UI 细节
export const useHybridItems = ({ keyword, category, sortBy }) => {
  const queryClient = useQueryClient();
  // queryKey = 缓存唯一标识，筛选条件变化会自动重新请求
  const queryKey = ['hybrid-items', keyword, category, sortBy];

  // 读取列表数据（自动提供 loading / error / cache）
  const itemsQuery = useQuery({
    queryKey,
    queryFn: () => fetchItems({ keyword, category, sortBy }),
  });

  // 写操作：点赞后更新缓存，让 UI 立即同步
  const toggleMutation = useMutation({
    mutationFn: (id) => toggleLike(id),
    onSuccess: (updatedItem) => {
      // 更新当前筛选列表的缓存
      queryClient.setQueryData(queryKey, (old = []) =>
        old.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );
    },
  });

  const items = itemsQuery.data || [];
  const isBusy = itemsQuery.isFetching || toggleMutation.isPending;

  return {
    items,
    isLoading: itemsQuery.isLoading,
    isError: itemsQuery.isError,
    error: itemsQuery.error,
    isFetching: itemsQuery.isFetching,
    refetch: itemsQuery.refetch,
    toggleLike: toggleMutation.mutate,
    isBusy,
  };
};
