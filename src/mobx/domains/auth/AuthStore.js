import { makeAutoObservable } from 'mobx';

// AuthStore：全局登录状态示例
export class AuthStore {
  rootStore;
  user = null; // 用户信息
  token = null; // 登录 token
  status = 'idle'; // idle | loading | error
  error = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false });
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
