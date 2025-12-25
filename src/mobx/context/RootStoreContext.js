import { createContext } from 'react';
import { rootStore } from '../rootStore';

// Context：用于在组件树中注入 RootStore（更适合大型项目）
export const RootStoreContext = createContext(null);

export function RootStoreProvider({ children, store = rootStore }) {
  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  );
}
