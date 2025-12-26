export type HybridCategory = 'all' | 'redux' | 'query' | 'mix';
export type HybridSortBy = 'points' | 'title';

export type HybridFilters = {
  keyword: string;
  category: HybridCategory;
  sortBy: HybridSortBy;
};

export type HybridItemCategory = Exclude<HybridCategory, 'all'>;

export type HybridItem = {
  id: string;
  title: string;
  category: HybridItemCategory;
  points: number;
  liked: boolean;
};
