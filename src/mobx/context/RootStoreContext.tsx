import { createContext, type PropsWithChildren } from 'react';
import { rootStore, type RootStore } from '../rootStore';

// Context：用于在组件树中注入 RootStore（更适合大型项目）
export const RootStoreContext = createContext<RootStore | null>(null);

type RootStoreProviderProps = PropsWithChildren<{ store?: RootStore }>;

export function RootStoreProvider({
  children,
  store = rootStore,
}: RootStoreProviderProps) {
  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  );
}
