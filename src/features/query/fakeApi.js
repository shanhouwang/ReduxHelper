const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 用模块内变量模拟“服务器状态”
let serverState = {
  name: 'Query Learner',
  points: 10,
  updatedAt: new Date().toISOString(),
};

// 模拟获取数据（GET）
export const fetchProfile = async () => {
  await delay(600);
  return { ...serverState };
};

// 模拟更新数据（POST/PUT）
export const addPoints = async (amount) => {
  await delay(600);
  serverState = {
    ...serverState,
    points: serverState.points + amount,
    updatedAt: new Date().toISOString(),
  };
  return { ...serverState };
};
