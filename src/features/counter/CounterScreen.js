import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, incrementByAmount } from './counterSlice';

export default function CounterScreen() {
  // useSelector 会订阅 store，state 改变时组件会自动重渲染
  const value = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('5');

  const handleAddAmount = () => {
    const parsed = Number(amount);
    if (!Number.isFinite(parsed)) {
      return;
    }

    // dispatch 触发 action，最终由 reducer 改变 state
    dispatch(incrementByAmount(parsed));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redux Counter</Text>
      <Text style={styles.value}>{value}</Text>

      <View style={styles.row}>
        {/* 直接派发 action：dispatch(actionCreator()) */}
        <Pressable style={styles.button} onPress={() => dispatch(decrement())}>
          <Text style={styles.buttonText}>-1</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => dispatch(increment())}>
          <Text style={styles.buttonText}>+1</Text>
        </Pressable>
      </View>

      <View style={styles.row}>
        {/* 输入值作为 payload 传给 action */}
        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Amount"
          style={styles.input}
        />
        <Pressable style={styles.button} onPress={handleAddAmount}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>

      <Text style={styles.caption}>
        Actions update state in the store, and the UI re-renders automatically.
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f1ea',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    color: '#1b1b1b',
  },
  value: {
    fontSize: 56,
    fontWeight: '700',
    marginBottom: 24,
    color: '#0b0b0b',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  button: {
    backgroundColor: '#2f5cff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d9d2c5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 120,
  },
  caption: {
    marginTop: 16,
    textAlign: 'center',
    color: '#5b5b5b',
  },
});
