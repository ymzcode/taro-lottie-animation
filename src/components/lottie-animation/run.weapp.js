import lottie from 'lottie-miniprogram'
import Taro from "@tarojs/taro";

class LottieAni {
  constructor() {
    this.id = null
    this.path = null
    this.loop = null
    this.autoplay = null
    this.weWidth = null
    this.width = null
    this.weHeight = null
    this.height = null
    this.request = null
    this.animationData = null


    // 初始化后生成的动画实例
    this.ani = null
    this.context = null
    this.canvas = null
  }

  /*
  * 修复失帧的情况
  *
  * */
  fixLostFPS() {
    try {
      const WIDTH = this.weWidth || this.width
      const HEIGHT = this.weHeight || this.height
      const dpr = Taro.getSystemInfoSync().pixelRatio
      this.canvas.width = WIDTH * dpr
      this.canvas.height = HEIGHT * dpr
      this.context.scale(dpr, dpr)
    } catch (err) {
      throw new Error('fixLostFPS Error', err)
    }
  }

  /*
  * 请求文件
  * */
  async requestFile() {
    if (!this.request || !this.path) {
      throw new Error('requestFile 异常  参数不完整')
    }
    const res = await Taro.request({
      url: this.path
    }).catch(err => {
      throw new Error('requestFile 请求失败', err)
    })
    const {statusCode} = res
    if (statusCode === 200) {
      return res.data
    } else {
      throw new Error('requestFile 请求状态异常', res)
    }
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
        rendererSettings: {
          context: this.context,
          // clearCanvas: true,
          // progressiveLoad: true
        },
        renderer: 'canvas',
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


  /*
  * 初始化参数
  * */
  initOptions({domId: id, path, weWidth, width, weHeight, height, loop, autoplay, request, animationData}) {
    this.id = id
    this.path = path
    this.loop = loop
    this.autoplay = autoplay
    this.weWidth = weWidth
    this.width = width
    this.weHeight = weHeight
    this.height = height
    this.request = request
    this.animationData = animationData
  }

  init(options) {
    return new Promise((resolve, reject) => {
      if (!options) {
        throw new Error('init初始化参数异常', options)
      }

      this.initOptions(options)

      /*
      * 微信小程序需要延迟获取
      * */
      setTimeout(() => {
        const query = Taro.createSelectorQuery()
        query.select(`#${this.id}`).node(res => {
          const canvas = res.node
          const context = canvas.getContext('2d')
          this.canvas = canvas
          this.context = context

          // console.log('weapp', res)

          this.fixLostFPS()

          lottie.setup(this.canvas)


          /*
          * 判断是否使用接口加载方式
          * */
          if (this.animationData) {
            this.initLottie(null, this.animationData)
            resolve({ani: this.ani, canvas: this.canvas, context: this.context})
          } else if (this.request) {
            this.requestFile().then(animationData => {
              this.initLottie(null, animationData)
              resolve({ani: this.ani, canvas: this.canvas, context: this.context})
            })
          } else {
            this.initLottie(this.path, null)
            resolve({ani: this.ani, canvas: this.canvas, context: this.context})
          }

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
    // this.context.reset()

  }

  /*
  * 返回动画实例
  * */
  getAni() {
    return this.ani
  }

}

export default LottieAni
