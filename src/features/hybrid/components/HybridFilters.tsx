import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { HybridCategory, HybridSortBy } from '../types';

const categories: HybridCategory[] = ['all', 'redux', 'query', 'mix'];
const sortOptions: Array<{ key: HybridSortBy; label: string }> = [
  { key: 'points', label: '按积分' },
  { key: 'title', label: '按标题' },
];

// 纯展示组件：只渲染 UI，通过 props 把事件抛给上层
type HybridFiltersProps = {
  keyword: string;
  onKeywordChange: (value: string) => void;
  category: HybridCategory;
  onCategoryChange: (value: HybridCategory) => void;
  sortBy: HybridSortBy;
  onSortByChange: (value: HybridSortBy) => void;
  onReset: () => void;
};

export default function HybridFilters({
  keyword,
  onKeywordChange,
  category,
  onCategoryChange,
  sortBy,
  onSortByChange,
  onReset,
}: HybridFiltersProps) {
  return (
    <View style={styles.container}>
      {/* 关键字输入由 Redux 存储，但更新逻辑交给上层 */}
      <TextInput
        value={keyword}
        onChangeText={onKeywordChange}
        placeholder="输入关键字（Redux 存储）"
        style={styles.input}
      />

      <View style={styles.row}>
        {/* 分类筛选 */}
        {categories.map((item) => (
          <Pressable
            key={item}
            style={[styles.chip, category === item && styles.chipActive]}
            onPress={() => onCategoryChange(item)}
          >
            <Text
              style={[
                styles.chipText,
                category === item && styles.chipTextActive,
              ]}
            >
              {item === 'all' ? '全部' : item}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.row}>
        {/* 排序方式 */}
        {sortOptions.map((item) => (
          <Pressable
            key={item.key}
            style={[styles.chip, sortBy === item.key && styles.chipActive]}
            onPress={() => onSortByChange(item.key)}
          >
            <Text
              style={[
                styles.chipText,
                sortBy === item.key && styles.chipTextActive,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
        <Pressable style={styles.link} onPress={onReset}>
          <Text style={styles.linkText}>重置</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#fffaf1',
    borderWidth: 1,
    borderColor: '#e6e0d6',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d9d2c5',
    backgroundColor: '#fff',
  },
  chipActive: {
    borderColor: '#2f5cff',
    backgroundColor: '#edf1ff',
  },
  chipText: {
    fontSize: 12,
    color: '#5b5b5b',
  },
  chipTextActive: {
    color: '#2f5cff',
    fontWeight: '600',
  },
  link: {
    marginLeft: 'auto',
  },
  linkText: {
    color: '#2f5cff',
    fontWeight: '600',
  },
});
