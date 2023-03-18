import lottie from 'lottie-web'

class LottieAni {
  constructor({domId: id, path, loop, autoplay, animationData}) {
    this.id = id
    this.path = path
    this.loop = loop
    this.autoplay = autoplay
    this.dom = null
    this.animationData = animationData

    // 初始化后生成的动画实例
    this.ani = null
    this.init()
  }

  /*
  * 初始化lottie
  * 生成动画对象
  * */
  initLottie(path, animationData) {
    if (!path && !animationData) {
      throw new Error('initLottie 参数异常')
    }
    try {
      const params = {
        container: this.dom, // the dom element that will contain the animation
        renderer: 'svg',
        loop: this.loop,
        autoplay: this.autoplay
      }
      path && (params.path = path)
      animationData && (params.animationData = animationData)
      this.ani = lottie.loadAnimation(params);
    } catch (err) {
      throw new Error('initLottie 执行出错')
    }
  }

  init() {
    return new Promise((resolve, reject) => {
      this.dom = document.getElementById(this.id)
      console.log('h5', this.dom)

      if (this.animationData) {
        this.initLottie(null, this.animationData)
      } else {
        this.initLottie(this.path)
      }
      resolve({ani: this.ani})
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
