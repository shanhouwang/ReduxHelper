import { useEffect, useMemo } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useProgressStore } from './progressStore';

export default function ZustandProgressDemo() {
  const progress = useProgressStore((state) => state.progress);
  const topic = useProgressStore((state) => state.topic);
  const isRunning = useProgressStore((state) => state.isRunning);
  const setTopic = useProgressStore((state) => state.setTopic);
  const increase = useProgressStore((state) => state.increase);
  const decrease = useProgressStore((state) => state.decrease);
  const startAuto = useProgressStore((state) => state.startAuto);
  const stop = useProgressStore((state) => state.stop);
  const reset = useProgressStore((state) => state.reset);

  // 组件卸载时停止定时器，避免后台继续更新
  useEffect(() => stop, [stop]);

  // 派生状态：Zustand 不限制你在哪里计算
  const statusText = useMemo(() => {
    if (isRunning) return '进行中';
    if (progress >= 100) return '已完成';
    if (progress === 0) return '未开始';
    return '已暂停';
  }, [isRunning, progress]);

  const stageText = useMemo(() => {
    if (progress >= 100) return '收官复盘';
    if (progress >= 70) return '强化练习';
    if (progress >= 40) return '概念理解';
    if (progress > 0) return '起步热身';
    return '准备阶段';
  }, [progress]);

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Zustand 学习进度 Demo</Text>

      <TextInput
        value={topic}
        onChangeText={setTopic}
        placeholder="输入学习主题"
        style={styles.input}
      />

      <View style={styles.infoRow}>
        <Text style={styles.label}>主题：</Text>
        <Text style={styles.value}>{topic}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>进度：</Text>
        <Text style={styles.value}>{progress}%</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>状态：</Text>
        <Text style={styles.value}>{statusText}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>阶段：</Text>
        <Text style={styles.value}>{stageText}</Text>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      <View style={styles.row}>
        <Pressable style={styles.button} onPress={() => decrease()}>
          <Text style={styles.buttonText}>-10%</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => increase()}>
          <Text style={styles.buttonText}>+10%</Text>
        </Pressable>
      </View>

      <View style={styles.row}>
        <Pressable style={styles.button} onPress={() => startAuto()}>
          <Text style={styles.buttonText}>开始自动</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => stop()}>
          <Text style={styles.buttonText}>暂停</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => reset()}>
          <Text style={styles.buttonText}>重置</Text>
        </Pressable>
      </View>

      <Text style={styles.caption}>
        Zustand 的核心：创建一个 store Hook，组件直接取用即可。
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#2a2a2a',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d9d2c5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    width: 56,
    color: '#6b6b6b',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1b1b1b',
  },
  progressTrack: {
    width: '100%',
    height: 10,
    borderRadius: 999,
    backgroundColor: '#ece6dd',
    overflow: 'hidden',
    marginTop: 12,
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#f5a623',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2f5cff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  caption: {
    marginTop: 8,
    textAlign: 'center',
    color: '#5b5b5b',
  },
});
