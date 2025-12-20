import { Provider } from 'react-redux';
import CounterScreen from './src/features/counter/CounterScreen';
import { store } from './src/store/store';

export default function App() {
  // Provider 会把 Redux store 注入到整个应用树中，子组件都可以访问。
  return (
    <Provider store={store}>
      <CounterScreen />
    </Provider>
  );
}
