const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export type Profile = {
  name: string;
  points: number;
  updatedAt: string;
};

// 用模块内变量模拟“服务器状态”
let serverState: Profile = {
  name: 'Query Learner',
  points: 10,
  updatedAt: new Date().toISOString(),
};

// 模拟获取数据（GET）
export const fetchProfile = async (): Promise<Profile> => {
  await delay(600);
  return { ...serverState };
};

// 模拟更新数据（POST/PUT）
export const addPoints = async (amount: number): Promise<Profile> => {
  await delay(600);
  serverState = {
    ...serverState,
    points: serverState.points + amount,
    updatedAt: new Date().toISOString(),
  };
  return { ...serverState };
};
