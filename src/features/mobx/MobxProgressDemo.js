import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { progressStore } from './progressStore';

// observer：让组件订阅 MobX store，store 变化时自动更新 UI
const MobxProgressDemo = observer(() => {
  // 组件卸载时停止定时器，避免后台继续更新
  useEffect(() => {
    return () => progressStore.stop();
  }, []);

  return (
    <View style={styles.section}>
      <Text style={styles.title}>MobX 学习进度 Demo</Text>

      {/* 输入学习主题：直接修改 store 状态 */}
      <TextInput
        value={progressStore.topic}
        onChangeText={(text) => progressStore.setTopic(text)}
        placeholder="输入学习主题"
        style={styles.input}
      />

      <View style={styles.infoRow}>
        <Text style={styles.label}>主题：</Text>
        <Text style={styles.value}>{progressStore.topic}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>进度：</Text>
        <Text style={styles.value}>{progressStore.progress}%</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>状态：</Text>
        <Text style={styles.value}>{progressStore.statusText}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>阶段：</Text>
        <Text style={styles.value}>{progressStore.stageText}</Text>
      </View>

      {/* 简单进度条：宽度由 progress 决定 */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressBar,
            { width: `${progressStore.progress}%` },
          ]}
        />
      </View>

      <View style={styles.row}>
        <Pressable style={styles.button} onPress={() => progressStore.decrease()}>
          <Text style={styles.buttonText}>-10%</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => progressStore.increase()}>
          <Text style={styles.buttonText}>+10%</Text>
        </Pressable>
      </View>

      <View style={styles.row}>
        <Pressable style={styles.button} onPress={() => progressStore.startAuto()}>
          <Text style={styles.buttonText}>开始自动</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => progressStore.stop()}>
          <Text style={styles.buttonText}>暂停</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => progressStore.reset()}>
          <Text style={styles.buttonText}>重置</Text>
        </Pressable>
      </View>

      <Text style={styles.caption}>
        MobX 的核心：state 变化 =&gt; UI 自动更新，无需手写订阅逻辑。
      </Text>
    </View>
  );
});

export default MobxProgressDemo;

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
