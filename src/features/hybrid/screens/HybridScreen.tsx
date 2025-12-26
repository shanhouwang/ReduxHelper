import { Pressable, StyleSheet, Text, View } from 'react-native';
import HybridFilters from '../components/HybridFilters';
import HybridList from '../components/HybridList';
import { useHybridItems } from '../hooks/useHybridItems';
import { resetFilters, setCategory, setKeyword, setSortBy } from '../hybridSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

export default function HybridScreen() {
  const dispatch = useAppDispatch();
  // Redux 管理“页面状态”（筛选条件）
  const { keyword, category, sortBy } = useAppSelector((state) => state.hybrid);

  // Query Hook 负责“服务端数据”
  const {
    items,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    toggleLike,
    isBusy,
  } = useHybridItems({ keyword, category, sortBy });

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Redux + TanStack Query 组合示例</Text>
      <Text style={styles.caption}>
        Redux 管筛选条件，Query 负责拉数据与缓存
      </Text>

      {/* 过滤/排序 UI 只依赖 Redux 状态 */}
      <HybridFilters
        keyword={keyword}
        onKeywordChange={(text) => dispatch(setKeyword(text))}
        category={category}
        onCategoryChange={(value) => dispatch(setCategory(value))}
        sortBy={sortBy}
        onSortByChange={(value) => dispatch(setSortBy(value))}
        onReset={() => dispatch(resetFilters())}
      />

      <View style={styles.statusRow}>
        <Pressable
          style={[styles.refreshButton, isBusy && styles.buttonDisabled]}
          onPress={() => refetch()}
          disabled={isBusy}
        >
          <Text style={styles.refreshText}>刷新数据</Text>
        </Pressable>
        <Text style={styles.hint}>
          状态：{isFetching ? '获取中' : '空闲'} · 当前 {items.length} 条
        </Text>
      </View>

      {isLoading ? (
        <Text style={styles.info}>加载中...</Text>
      ) : isError ? (
        <Text style={styles.error}>请求失败：{error?.message}</Text>
      ) : items.length === 0 ? (
        <Text style={styles.info}>没有符合条件的内容</Text>
      ) : (
        <HybridList items={items} onToggleLike={toggleLike} isBusy={isBusy} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e6e0d6',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    color: '#1b1b1b',
  },
  caption: {
    color: '#7a756e',
    marginBottom: 12,
    fontSize: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  refreshButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2f5cff',
  },
  refreshText: {
    color: '#2f5cff',
    fontWeight: '600',
    fontSize: 12,
  },
  hint: {
    color: '#7a756e',
    fontSize: 12,
  },
  info: {
    color: '#5b5b5b',
  },
  error: {
    color: '#c0392b',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
