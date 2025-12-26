import type { HybridFilters, HybridItem } from './types';

// 用 Promise + setTimeout 模拟网络延迟
const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// 用模块内变量模拟“服务端”数据源（与 UI 本地状态区分开）
let serverItems: HybridItem[] = [
  { id: '1', title: 'Redux 基础', category: 'redux', points: 12, liked: false },
  {
    id: '2',
    title: 'Redux Toolkit 上手',
    category: 'redux',
    points: 20,
    liked: true,
  },
  { id: '3', title: 'React Query 入门', category: 'query', points: 18, liked: false },
  { id: '4', title: '缓存与失效策略', category: 'query', points: 28, liked: true },
  { id: '5', title: '状态管理对比', category: 'mix', points: 16, liked: false },
  { id: '6', title: '页面状态拆分', category: 'mix', points: 24, liked: false },
];

const sorters: Record<
  HybridFilters['sortBy'],
  (a: HybridItem, b: HybridItem) => number
> = {
  points: (a, b) => b.points - a.points,
  title: (a, b) => a.title.localeCompare(b.title),
};

// 模拟列表查询（GET）：接收筛选条件并返回结果
export const fetchItems = async ({
  keyword,
  category,
  sortBy,
}: HybridFilters): Promise<HybridItem[]> => {
  await delay(600);

  // 服务端根据筛选条件过滤/排序
  const normalized = keyword.trim().toLowerCase();
  let items = [...serverItems];

  if (category !== 'all') {
    items = items.filter((item) => item.category === category);
  }

  if (normalized) {
    items = items.filter((item) =>
      item.title.toLowerCase().includes(normalized)
    );
  }

  const sorter = sorters[sortBy] || sorters.points;
  items.sort(sorter);

  return items;
};

// 模拟点赞（POST）：更新服务端状态并返回最新项
export const toggleLike = async (id: string): Promise<HybridItem> => {
  await delay(400);
  serverItems = serverItems.map((item) =>
    item.id === id ? { ...item, liked: !item.liked } : item
  );
  const updated = serverItems.find((item) => item.id === id);
  if (!updated) {
    throw new Error('Item not found');
  }
  return updated;
};
