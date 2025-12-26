import { makeAutoObservable } from 'mobx';
import type { RootStore } from '../../rootStore';

// AuthStore：全局登录状态示例
type AuthUser = {
  id: string;
  name: string;
};

type AuthStatus = 'idle' | 'loading' | 'error';

export class AuthStore {
  rootStore: RootStore;
  user: AuthUser | null = null; // 用户信息
  token: string | null = null; // 登录 token
  status: AuthStatus = 'idle'; // idle | loading | error
  error: string | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false });
  }

  // 是否已登录
  get isLoggedIn() {
    return Boolean(this.token);
  }

  setUser(user: AuthUser | null) {
    this.user = user;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  setError(message: string) {
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
