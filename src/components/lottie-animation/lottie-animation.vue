<template>
  <div :style="domStyle" v-if="isH5" :id="props.domId"></div>
  <canvas :style="domStyle" v-else :id="props.domId" type="2d"></canvas>
</template>

<script setup>
import Taro, {useReady} from "@tarojs/taro";
import {computed, onMounted, ref} from "vue";
import {init} from "./run";

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
  * */
  weWidth: Number,
  /*
  * 微信单独设置canvas高
  * */
  weHeight: Number,
  loop: {
    type: Boolean,
    default: false
  },
  autoplay: {
    type: Boolean,
    default: false
  }
})

const lottieAnimation = ref(null)


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
  if (!props.domId || !props.path) {
    throw new Error('lottie-animation 缺少必要的参数')
  }
})

useReady(() => {
  init(props).then(ani => {
    lottieAnimation.value = ani
    console.log('初始化完成')
  })
})

const play = () => {
  stop()
  lottieAnimation.value.play()
}

const stop = () => {
  lottieAnimation.value.stop()
}

defineExpose({ play })

</script>

<style scoped>

</style>
