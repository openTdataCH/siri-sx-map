export class Timer {
  private timer?: number;

  constructor(private fn: Function, private interval: number) {
    this.timer = setInterval(fn, interval);
  }

  public start(): Timer {
    if (!this.timer) {
      this.stop();
      this.timer = setInterval(this.fn, this.interval);
    }
    return this;
  }

  public stop(): Timer {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
    return this;
  }
}
