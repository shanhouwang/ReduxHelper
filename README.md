# ReduxHelper (React Native + Redux Toolkit Demo)

一个最小可运行的 React Native Redux Toolkit 示例项目，带中文注释，适合从 0-1 学习 Redux 架构。

## 运行项目

```bash
npm install
npm start
```

## 目录结构

```text
rn-redux-demo/
├── App.js
├── index.js
├── package.json
└── src/
    ├── store/
    │   └── store.js
    └── features/
        └── counter/
            ├── CounterScreen.js
            └── counterSlice.js
```

## Redux 核心概念（结合本项目）

### 1) Store（全局状态仓库）
- 文件：`src/store/store.js`
- 作用：集中管理应用所有状态
- 关键点：把各个 slice 的 reducer 注册到 store

### 2) Slice（功能模块的“状态切片”）
- 文件：`src/features/counter/counterSlice.js`
- 作用：封装某一功能的状态 + 修改逻辑 + 自动生成的 actions
- 你只需要写 reducers，Redux Toolkit 会帮你生成 action creators

### 3) Provider（把 store 注入应用）
- 文件：`App.js`
- 作用：让所有子组件都能访问到 Redux store

### 4) useSelector / useDispatch（组件与 Redux 的桥梁）
- 文件：`src/features/counter/CounterScreen.js`
- `useSelector`：从 store 中读取 state
- `useDispatch`：触发 action，让 reducer 更新 state

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

1. 先看 `counterSlice.js`：理解 slice 的结构（state + reducers + actions）
2. 再看 `store.js`：理解为什么需要注册 reducer
3. 再看 `App.js`：理解 Provider 的作用
4. 最后看 `CounterScreen.js`：理解组件如何使用 Redux

## 常见问题

### Q1: 为什么 reducer 里能直接写 `state.value += 1`？
Redux Toolkit 内置了 Immer，它会在内部生成不可变数据，所以你可以像“可变”一样写代码。

### Q2: action 是谁生成的？
`createSlice` 会根据 reducers 的函数名自动生成 action creators，比如 `increment()`。

### Q3: slice 和 reducer 有什么关系？
slice 包含 reducer。slice 是“模块”，reducer 是“规则”。

## 下一步可以做什么
- 增加第二个 slice（如 todos），学习多模块状态管理
- 加入异步 thunk，理解 Redux 处理异步的方式
- 组合 React Navigation 学习多页面状态共享
