import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import CounterScreen from './src/features/counter/CounterScreen';
import { queryClient } from './src/query/queryClient';
import { store } from './src/store/store';

export default function App() {
  // Provider 会把 Redux store 注入到整个应用树中，子组件都可以访问。
  return (
    <Provider store={store}>
      {/* QueryClientProvider 注入 TanStack Query 的全局管理器 */}
      <QueryClientProvider client={queryClient}>
        <CounterScreen />
      </QueryClientProvider>
    </Provider>
  );
}
