/*
*
* 目前只做了h5和微信小程序端
* 其他端请根据需要再自行封装
*
* */

import lottie from "lottie-web";

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
    const res = document.getElementById(this.id)
    console.log('其他端', res)
    return new Promise((resolve, reject) => {
      // h5和小程序均返回
      const ani = this.ani
      // 由小程序返回
      const canvas = null
      // 由小程序返回
      const context = null
      resolve({ani})
    })
  }

  play() {
  }

  stop() {
  }

  pause() {
  }

  destroy() {
  }
}


export default LottieAni
