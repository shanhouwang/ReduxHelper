import { makeAutoObservable } from 'mobx';

// AuthStore：全局登录状态示例（单例）
export class AuthStore {
  user = null; // 用户信息
  token = null; // 登录 token
  status = 'idle'; // idle | loading | error
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  // 是否已登录
  get isLoggedIn() {
    return Boolean(this.token);
  }

  setUser(user) {
    this.user = user;
  }

  setToken(token) {
    this.token = token;
  }

  setError(message) {
    this.error = message;
    this.status = 'error';
  }

  resetError() {
    this.error = null;
    this.status = 'idle';
  }

  logout() {
    this.user = null;
    this.token = null;
    this.status = 'idle';
    this.error = null;
  }
}

const storeKey = '__MOBX_AUTH_STORE__';

// 单例导出：HMR/热重载也不会重复创建实例
export const authStore =
  globalThis[storeKey] ?? (globalThis[storeKey] = new AuthStore());
