import { observer } from 'mobx-react-lite';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useProgressStore } from '../../mobx';

const useStopOnUnmount = () => {
  const progressStore = useProgressStore();

  // 组件卸载时停止定时器，避免后台继续更新
  useEffect(() => () => progressStore.stop(), [progressStore]);
};

const SectionTitle = memo(() => (
  <Text style={styles.title}>MobX 学习进度 Demo</Text>
));

const Caption = memo(() => (
  <Text style={styles.caption}>
    MobX 的核心：state 变化 =&gt; UI 自动更新，无需手写订阅逻辑。
  </Text>
));

type InfoRowProps = {
  label: string;
  value: string;
};

const InfoRow = memo(({ label, value }: InfoRowProps) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
));

// observer 只包裹真正依赖 store 的小组件，减少不必要的重渲染
const TopicInput = observer(() => {
  const progressStore = useProgressStore();

  // useCallback 保证函数引用稳定，避免子组件重复渲染
  const handleChange = useCallback(
    (text: string) => progressStore.setTopic(text),
    [progressStore]
  );

  return (
    <TextInput
      value={progressStore.topic}
      onChangeText={handleChange}
      placeholder="输入学习主题"
      style={styles.input}
    />
  );
});

// 只要 progress/topic/status 变了，这个区域才会更新
const ProgressSummary = observer(() => {
  const progressStore = useProgressStore();

  // 用 useMemo 缓存字符串拼接，避免每次渲染都重新计算
  const progressText = useMemo(
    () => `${progressStore.progress}%`,
    [progressStore.progress]
  );

  return (
    <View>
      <InfoRow label="主题：" value={progressStore.topic} />
      <InfoRow label="进度：" value={progressText} />
      <InfoRow label="状态：" value={progressStore.statusText} />
      <InfoRow label="阶段：" value={progressStore.stageText} />
    </View>
  );
});

// 进度条单独观察 progress，变化更精准
const ProgressBar = observer(() => {
  const progressStore = useProgressStore();

  // 用 useMemo 生成样式数组，避免每次渲染都创建新对象
  const barStyle = useMemo(
    () => [styles.progressBar, { width: `${progressStore.progress}%` }],
    [progressStore.progress]
  );

  return (
    <View style={styles.progressTrack}>
      <View style={barStyle} />
    </View>
  );
});

// 常用加减按钮独立出来，只关心调用动作
const QuickActions = observer(() => {
  const progressStore = useProgressStore();
  const handleDecrease = useCallback(
    () => progressStore.decrease(),
    [progressStore]
  );
  const handleIncrease = useCallback(
    () => progressStore.increase(),
    [progressStore]
  );

  return (
    <View style={styles.row}>
      <Pressable style={styles.button} onPress={handleDecrease}>
        <Text style={styles.buttonText}>-10%</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleIncrease}>
        <Text style={styles.buttonText}>+10%</Text>
      </Pressable>
    </View>
  );
});

// 自动进度控制区：开始/暂停/重置
const AutoActions = observer(() => {
  const progressStore = useProgressStore();
  const handleStart = useCallback(
    () => progressStore.startAuto(),
    [progressStore]
  );
  const handleStop = useCallback(() => progressStore.stop(), [progressStore]);
  const handleReset = useCallback(() => progressStore.reset(), [progressStore]);

  return (
    <View style={styles.row}>
      <Pressable style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>开始自动</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleStop}>
        <Text style={styles.buttonText}>暂停</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>重置</Text>
      </Pressable>
    </View>
  );
});

export default function MobxProgressDemo() {
  // 用自定义 Hook 处理组件卸载逻辑，更清晰
  useStopOnUnmount();

  return (
    <View style={styles.section}>
      {/* 纯展示组件用 memo，避免无关状态引起重渲染 */}
      <SectionTitle />
      <TopicInput />
      <ProgressSummary />
      <ProgressBar />
      <QuickActions />
      <AutoActions />
      <Caption />
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
    backgroundColor: '#20b486',
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
