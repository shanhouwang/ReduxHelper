import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { addPoints, fetchProfile } from './fakeApi';

export default function QueryDemo() {
  const queryClient = useQueryClient();

  // useQuery 会自动管理 loading/error/data，并缓存结果
  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  // useMutation 负责“写操作”，成功后手动更新缓存
  const addPointsMutation = useMutation({
    mutationFn: () => addPoints(5),
    onSuccess: (data) => {
      // 直接把最新数据写进缓存，界面会立即更新
      queryClient.setQueryData(['profile'], data);
      // 也可以用 invalidateQueries 触发重新请求
      // queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const isBusy = profileQuery.isLoading || addPointsMutation.isPending;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>TanStack Query Demo</Text>

      {profileQuery.isLoading ? (
        <Text style={styles.info}>加载中...</Text>
      ) : profileQuery.isError ? (
        <Text style={styles.error}>请求失败：{profileQuery.error?.message}</Text>
      ) : (
        <View style={styles.infoBlock}>
          <Text style={styles.label}>昵称：{profileQuery.data?.name}</Text>
          <Text style={styles.label}>积分：{profileQuery.data?.points}</Text>
          <Text style={styles.hint}>更新时间：{profileQuery.data?.updatedAt}</Text>
        </View>
      )}

      <View style={styles.row}>
        <Pressable
          style={[styles.button, isBusy && styles.buttonDisabled]}
          onPress={() => profileQuery.refetch()}
          disabled={isBusy}
        >
          <Text style={styles.buttonText}>重新获取</Text>
        </Pressable>
        <Pressable
          style={[styles.button, isBusy && styles.buttonDisabled]}
          onPress={() => addPointsMutation.mutate()}
          disabled={isBusy}
        >
          <Text style={styles.buttonText}>加 5 分</Text>
        </Pressable>
      </View>

      <Text style={styles.hint}>
        Query 的状态：{profileQuery.isFetching ? '获取中' : '空闲'}
      </Text>
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
    marginBottom: 8,
    color: '#1b1b1b',
  },
  info: {
    color: '#5b5b5b',
    marginBottom: 8,
  },
  infoBlock: {
    marginBottom: 8,
    gap: 4,
  },
  label: {
    color: '#1b1b1b',
    fontSize: 15,
  },
  hint: {
    color: '#7a756e',
    fontSize: 12,
  },
  error: {
    color: '#c0392b',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#2f5cff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  buttonDisabled: {
    backgroundColor: '#9bb0ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
