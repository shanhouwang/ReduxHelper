# ReduxHelper (React Native + Redux Toolkit Demo, TypeScript)

一个最小可运行的 React Native Redux Toolkit 示例项目，带中文注释，适合从 0-1 学习 Redux 架构（已迁移到 TypeScript）。

## 运行项目

```bash
npm install
npm start
```

## 目录结构

```text
rn-redux-demo/
├── App.tsx
├── index.ts
├── package.json
├── tsconfig.json
└── src/
    ├── query/
    │   └── queryClient.ts
    ├── store/
    │   ├── hooks.ts
    │   └── store.ts
    └── features/
        ├── counter/
        │   ├── CounterScreen.tsx
        │   └── counterSlice.ts
        ├── query/
        │   ├── QueryDemo.tsx
        │   └── fakeApi.ts
        └── hybrid/
            ├── api.ts
            ├── hybridSlice.ts
            ├── types.ts
            ├── hooks/
            │   └── useHybridItems.ts
            ├── components/
            │   ├── HybridFilters.tsx
            │   └── HybridList.tsx
            └── screens/
                └── HybridScreen.tsx
```

## Redux 核心概念（结合本项目）

### 1) Store（全局状态仓库）
- 文件：`src/store/store.ts`
- 作用：集中管理应用所有状态
- 关键点：把各个 slice 的 reducer 注册到 store

### 2) Slice（功能模块的“状态切片”）
- 文件：`src/features/counter/counterSlice.ts`
- 作用：封装某一功能的状态 + 修改逻辑 + 自动生成的 actions
- 你只需要写 reducers，Redux Toolkit 会帮你生成 action creators

### 3) Provider（把 store 注入应用）
- 文件：`App.tsx`
- 作用：让所有子组件都能访问到 Redux store

### 4) useSelector / useDispatch（组件与 Redux 的桥梁）
- 文件：`src/features/counter/CounterScreen.tsx`
- `useSelector`：从 store 中读取 state
- `useDispatch`：触发 action，让 reducer 更新 state

## MobX 入门（本项目新增）

### 1) RootStore（大型项目结构）
- 文件：`src/mobx/rootStore.ts`
- 作用：聚合各个领域 store（auth/progress），统一管理依赖关系
- 关键点：提供 `createRootStore` 方便测试，默认导出 `rootStore` 单例

### 2) 领域 Store（学习进度）
- 文件：`src/mobx/domains/progress/ProgressStore.ts`
- 作用：用可观察状态（progress/topic）+ 动作（increase/startAuto）管理学习进度
- 关键点：`makeAutoObservable` 自动完成 observable/action/computed 的配置

### 3) Provider + Hook
- 文件：`src/mobx/context/RootStoreContext.tsx`
- 作用：通过 Context 注入 RootStore，适合大型项目
- 文件：`src/mobx/domains/progress/useProgressStore.ts`
- 作用：领域专用 Hook，组件直接获取 `progressStore`

### 4) 组件与 observer
- 文件：`src/features/mobx/MobxProgressDemo.tsx`
- 作用：`observer` 让组件订阅 store 变化，state 改变时 UI 自动更新
- 在 `CounterScreen` 中插入 demo：`src/features/counter/CounterScreen.tsx`

## Zustand 入门（本项目新增）

### 1) Store（学习进度状态）
- 文件：`src/features/zustand/progressStore.ts`
- 作用：用 `create` 创建一个全局 store hook，包含状态 + 动作
- 关键点：通过 `set/get` 更新与读取；定时器放在闭包中更安全

### 2) 组件直连 store
- 文件：`src/features/zustand/ZustandProgressDemo.tsx`
- 作用：组件直接调用 `useProgressStore` 读取状态与动作
- 在 `CounterScreen` 中插入 demo：`src/features/counter/CounterScreen.tsx`

## TanStack Query 入门（本项目）

### 1) QueryClient（全局缓存与请求管理器）
- 文件：`src/query/queryClient.ts`
- 作用：统一管理缓存、请求状态、重试策略等

### 2) useQuery（读取服务端数据）
- 文件：`src/features/query/QueryDemo.tsx`
- `useQuery` 会自动管理 `loading/error/data` 并缓存结果
- 通过 `queryKey` 作为缓存标识

### 3) useMutation（写操作 + 更新缓存）
- 文件：`src/features/query/QueryDemo.tsx`
- `useMutation` 负责提交写操作（如新增/更新）
- 成功后用 `queryClient.setQueryData` 更新缓存（或 `invalidateQueries` 重新拉取）

### 4) 模拟接口（fake API）
- 文件：`src/features/query/fakeApi.ts`
- 用 `setTimeout` 模拟网络延迟 + 服务器状态

## Redux + TanStack Query 组合示例（本项目）
- 页面入口：`src/features/hybrid/screens/HybridScreen.tsx`
- Redux 负责管理筛选条件（关键字、分类、排序）
- TanStack Query 根据筛选条件去拉取/缓存服务端数据
- 相关拆分：
  - API：`src/features/hybrid/api.ts`
  - Hook：`src/features/hybrid/hooks/useHybridItems.ts`
  - 组件：`src/features/hybrid/components/HybridFilters.tsx`
  - 组件：`src/features/hybrid/components/HybridList.tsx`

## 数据流（最重要的一张图）

```text
UI 组件
  | (dispatch action)
  v
Action -----> Reducer (slice 中的 reducers)
  |               |
  |               v
  |          更新 state
  |               |
  +---------------+
          (store 通知订阅者)
                |
                v
           UI 自动重渲染
```

## 学习路径建议

1. 先看 `counterSlice.ts`：理解 slice 的结构（state + reducers + actions）
2. 再看 `store.ts`：理解为什么需要注册 reducer
3. 再看 `App.tsx`：理解 Provider 的作用
4. 最后看 `CounterScreen.tsx`：理解组件如何使用 Redux

## 常见问题

### Q1: 为什么 reducer 里能直接写 `state.value += 1`？
Redux Toolkit 内置了 Immer，它会在内部生成不可变数据，所以你可以像“可变”一样写代码。

### Q2: action 是谁生成的？
`createSlice` 会根据 reducers 的函数名自动生成 action creators，比如 `increment()`。

### Q3: slice 和 reducer 有什么关系？
slice 包含 reducer。slice 是“模块”，reducer 是“规则”。

## 下一步可以做什么
- 增加第二个 slice（如 todos），学习多模块状态管理
- 深入 TanStack Query 的分页/失效重取等能力
- 组合 React Navigation 学习多页面状态共享
