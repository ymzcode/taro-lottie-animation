<template>
  <div :style="domStyle" v-if="isH5" :id="props.domId"></div>
  <canvas v-if="!isH5 && canvasShow" :style="domStyle" :id="props.domId" type="2d"></canvas>
</template>

<script setup>
import Taro, {useReady} from "@tarojs/taro";
import {computed, nextTick, onBeforeUnmount, onMounted, ref, useAttrs} from "vue";
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
  },
  animationData: Object,
  /*
  * 阻止初始化
  * */
  stopDefaultInit: {
    type: Boolean,
    default: false
  }
})

let lottieAnimation = null

const canvasShow = ref(true)

const attrs = useAttrs()

// const emit = defineEmits(['complete'])


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
  !props.stopDefaultInit && initLottie()
})

onBeforeUnmount(() => {
  destroy()
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
  lottieAnimation = new LottieAni()
  lottieAnimation.init(props).then(res => {
    /*
    * 这里可以获取动画实例ani等参数
    * */
    // console.log(res)
    initListener(res.ani)
  })
}

/*
* 注册相关的监听方法
* */
const initListener = (ani) => {
  // console.log(attrs)
  attrs['onComplete'] && ani.addEventListener('complete', listenerClass.complete)
  attrs['onData_ready'] && ani.addEventListener('data_ready', listenerClass.data_ready)
  attrs['onLoopComplete'] && ani.addEventListener('loopComplete', listenerClass.loopComplete)
  attrs['onDestroy'] && ani.addEventListener('destroy', listenerClass.destroy)
  attrs['onSegmentStart'] && ani.addEventListener('segmentStart', listenerClass.segmentStart)
}

const listenerClass = {
  /*
  * 加载完动画json文件时
  * */
  data_ready: function () {
    console.log('animation data has loaded')
    attrs['onData_ready']()
  },
  /*
  *  播放完成（循环播放下不会触发）
  * */
  complete: function () {
    console.log('complete播放完成')
    attrs['onComplete']()
  },
  /*
  * 当前循环下播放（循环播放/非循环播放）结束时触发
  * */
  loopComplete: function () {
    console.log('loopComplete播放完成')
    attrs['onLoopComplete']()
  },
  /*
  * 动画删除时触发
  * */
  destroy: function () {
    console.log('destroy销毁完成')
    attrs['onDestroy']()
  },
  /*
  *
  * */
  segmentStart: function () {
    console.log('segmentStart 开始播放')
    attrs['onSegmentStart']()
  }
}

const getLottieValue = () => {
  return lottieAnimation
}

defineExpose({play, stop, pause, destroy, initLottie, getLottieValue})

</script>


<script>
export default {
  inheritAttrs: false
}
</script>

<style>

</style>
