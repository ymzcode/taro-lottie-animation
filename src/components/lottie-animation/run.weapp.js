import lottie from 'lottie-miniprogram'
import Taro from "@tarojs/taro";

class LottieAni {
  constructor({domId: id, path, weWidth, width, weHeight, height, loop, autoplay}) {
    this.id = id
    this.path = path
    this.loop = loop
    this.autoplay = autoplay
    this.weWidth = weWidth
    this.width = width
    this.weHeight = weHeight
    this.height = height


    // 初始化后生成的动画实例
    this.ani = null
    this.context = null
    this.canvas = null
    this.init()
  }

  init() {
    return new Promise((resolve, reject) => {
      /*
      * 微信小程序需要延迟获取
      * */
      setTimeout(() => {
        const query = Taro.createSelectorQuery()
        query.select(`#${this.id}`).node(res => {
          console.log(res)
          const canvas = res.node
          const context = canvas.getContext('2d')
          console.log('weapp', res)

          /*
          *
          * 修复微信失帧情况
          * */
          const WIDTH = this.weWidth || this.width
          const HEIGHT = this.weHeight || this.height
          const dpr = Taro.getSystemInfoSync().pixelRatio
          canvas.width = WIDTH * dpr
          canvas.height = HEIGHT * dpr
          context.scale(dpr, dpr)

          lottie.setup(canvas)
          const ani = lottie.loadAnimation({
            rendererSettings: {
              context: context,
              // clearCanvas: true,
              // progressiveLoad: true
            },
            renderer: 'canvas',
            loop: this.loop,
            autoplay: this.autoplay,
            path: this.path // the path to the animation json
          });

          this.ani = ani
          this.canvas = canvas
          this.context = context

          resolve({ani, canvas, context})
        }).exec()
      }, 300)
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
    /*
   * 以下两种方法还是无法清除iPhone真机运行的画布
   * 所以在组件中使用v-if来强制清除画布
   *
   * */
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // // 手动清除画布
    this.canvas.width = 0
    this.canvas.height = 0

    this.ani.destroy()
    this.ani = null
    console.log(this.context)
    // this.context.reset()

  }

}

export default LottieAni
