import { makeAutoObservable, runInAction } from 'mobx';
import type { RootStore } from '../../rootStore';

// ProgressStore：管理“学习进度”的状态与动作
export class ProgressStore {
  rootStore: RootStore;

  // 可观察状态：任何变化都会驱动 UI 自动更新
  progress = 0; // 0 - 100
  topic = 'MobX 入门';
  isRunning = false;

  // 非响应式字段：只用于保存定时器引用
  timer: ReturnType<typeof setInterval> | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    // rootStore 与 timer 不需要被响应式追踪
    makeAutoObservable(this, { rootStore: false, timer: false });
  }

  // 计算属性：由已有 state 推导出来的“进度状态”
  get statusText() {
    if (this.isRunning) return '进行中';
    if (this.progress >= 100) return '已完成';
    if (this.progress === 0) return '未开始';
    return '已暂停';
  }

  // 计算属性：把进度映射到阶段，让初学者更直观理解
  get stageText() {
    if (this.progress >= 100) return '收官复盘';
    if (this.progress >= 70) return '强化练习';
    if (this.progress >= 40) return '概念理解';
    if (this.progress > 0) return '起步热身';
    return '准备阶段';
  }

  setTopic(value: string) {
    this.topic = value;
  }

  increase(step = 10) {
    this.progress = Math.min(100, this.progress + step);
  }

  decrease(step = 10) {
    this.progress = Math.max(0, this.progress - step);
  }

  reset() {
    this.stop();
    this.progress = 0;
  }

  // 开始自动增长进度，模拟“学习中”
  startAuto() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.stopTimer();

    this.timer = setInterval(() => {
      runInAction(() => {
        this.progress = Math.min(100, this.progress + 5);

        // 达到 100 后自动结束
        if (this.progress >= 100) {
          this.stop();
        }
      });
    }, 300);
  }

  // 暂停学习
  stop() {
    this.isRunning = false;
    this.stopTimer();
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
