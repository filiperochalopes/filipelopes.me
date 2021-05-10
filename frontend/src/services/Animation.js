export default class Animation {
  constructor(frames, callback, whenFinished, animationFunction) {
    this.startNumber = 0;
    this.callback = callback;
    this.whenFinished = whenFinished;
    this.frames = frames;
    this.animationFunction = animationFunction;
  }

  start() {
    window.requestAnimationFrame(this.animationStep);
  }

  animationStep = timestamp => {
    if (!this.startNumber) this.startNumber = timestamp;
    let target = this.frames + this.startNumber;

    this.callback((timestamp - this.startNumber) / (target - this.startNumber));

    if (timestamp < target) {
      window.requestAnimationFrame(this.animationStep);
    } else {
      this.startNumber = null;
      if (this.whenFinished) this.whenFinished();
    }
  };
}
