<template>
  <div :style="domStyle" v-if="isH5" :id="props.domId"></div>
  <canvas v-if="!isH5 && canvasShow" :style="domStyle" :id="props.domId" type="2d"></canvas>
</template>

<script setup>
import Taro, {useReady} from "@tarojs/taro";
import {computed, nextTick, onMounted, ref} from "vue";
import LottieAni from "./run";

const props = defineProps({
  path: String,
  domId: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    default: 300
  },
  height: {
    type: Number,
    default: 300
  },
  /*
  * 微信单独设置canvas宽
  * 指定后，优先级比width高
  * */
  weWidth: Number,
  /*
  * 微信单独设置canvas高
  * 指定后，优先级比height高
  * */
  weHeight: Number,
  loop: {
    type: Boolean,
    default: false
  },
  autoplay: {
    type: Boolean,
    default: false
  },
  /*
  * 仅在微信生效！！！！！！h5暂时不需要此功能
  *
  * 是否使用小程序的animationData加载, 原理是请求json文件，拿到数据本地加载
  * 使用lottie的animationData加载动画
  *
  * */
  request: {
    type: Boolean,
    default: false
  }
})

let lottieAnimation = null
// 由小程序返回
const weCanvas = ref(null)
// 由小程序返回，结果是weCanvas.getContext('2d')
const weContext = ref(null)
//
const canvasShow = ref(true)

/*
* 按照设计图比例计算容器的大小
* */
const domStyle = computed(() => {
  const W = Taro.pxTransform(props.width)
  const H = Taro.pxTransform(props.height)
  return {
    width: W,
    height: H
  }
})

/*
* 判断是否是h5
* */
const isH5 = computed(() => {
  return process.env.TARO_ENV === 'h5'
})

onMounted(() => {
  if (!props.domId) {
    throw new Error('lottie-animation 缺少必要的参数')
  }
})

useReady(() => {
  initLottie()
})

const play = () => {
  lottieAnimation.play()
}

const stop = () => {
  lottieAnimation.stop()
}

const pause = () => {
  lottieAnimation.pause()
}

const destroy = () => {
  lottieAnimation && lottieAnimation.destroy()
  // 销毁创建的类
  lottieAnimation = null
  //
  canvasShow.value = false
  nextTick(() => {
    canvasShow.value = true
  })
}

const initLottie = () => {
  if (lottieAnimation) {
    console.warn('当前实例未销毁，请勿重复创建实例！')
    return
  }
  lottieAnimation = new LottieAni(props)
}

const getLottieValue = () => {
  return lottieAnimation.value
}

defineExpose({play, stop, pause, destroy, initLottie, getLottieValue})

</script>

<style>

</style>
