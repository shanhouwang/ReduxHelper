import { Pressable, StyleSheet, Text, View } from 'react-native';

// 纯列表组件：只渲染数据，不关心 Redux/Query
export default function HybridList({ items, onToggleLike, isBusy }) {
  return (
    <View style={styles.list}>
      {items.map((item) => (
        <View key={item.id} style={styles.listItem}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemMeta}>
              分类：{item.category} · 积分：{item.points}
            </Text>
          </View>
          <Pressable
            style={[
              styles.likeButton,
              item.liked && styles.likeButtonActive,
              isBusy && styles.buttonDisabled,
            ]}
            onPress={() => onToggleLike(item.id)}
            disabled={isBusy}
          >
            <Text style={[styles.likeText, item.liked && styles.likeTextActive]}>
              {item.liked ? '已赞' : '点赞'}
            </Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1ebe2',
  },
  itemInfo: {
    flex: 1,
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1b1b1b',
  },
  itemMeta: {
    fontSize: 12,
    color: '#7a756e',
    marginTop: 2,
  },
  likeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2f5cff',
  },
  likeButtonActive: {
    backgroundColor: '#2f5cff',
  },
  likeText: {
    color: '#2f5cff',
    fontWeight: '600',
    fontSize: 12,
  },
  likeTextActive: {
    color: '#fff',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
