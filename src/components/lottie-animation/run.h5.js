import lottie from 'lottie-web'

class LottieAni {
  constructor({domId: id, path, loop, autoplay}) {
    this.id = id
    this.path = path
    this.loop = loop
    this.autoplay = autoplay

    // 初始化后生成的动画实例
    this.ani = null
    this.init()
  }

  init() {
    return new Promise((resolve, reject) => {
      const res = document.getElementById(this.id)
      console.log('h5', res)
      const ani = lottie.loadAnimation({
        container: res, // the dom element that will contain the animation
        renderer: 'svg',
        loop: this.loop,
        autoplay: this.autoplay,
        path: this.path // the path to the animation json
      });
      this.ani = ani
      resolve({ani})
    }).catch((err) => {
      throw new Error(err)
    })
  }

  play() {
    if (!this.ani) {
      throw new Error('未生成动画实例')
    }
    this.ani.play()
  }

  stop() {
    if (!this.ani) {
      throw new Error('未生成动画实例')
    }
    this.ani.stop()
  }

  pause() {
    if (!this.ani) {
      throw new Error('未生成动画实例')
    }
    this.ani.pause()
  }

  destroy() {
    if (!this.ani) {
      throw new Error('未生成动画实例')
    }
    this.ani.destroy()
    this.ani = null
  }

}

export default LottieAni
