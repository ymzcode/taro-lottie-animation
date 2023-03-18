<template>
  <view class="lottie-box">
    <text class="tip-text">演示lottie动画</text>
    <view>
      <view class="title-text">基本使用</view>
      <view class="desc-text">设置loop循环和autoplay自动播放，微信小程序/h5使用path的加载方式</view>
      <view class="canvas-box">
        <lottie-animation ref="lottie1" loop autoplay dom-id="lottie-1"
                          path="https://file.bingyishow.top/lottie/lf20_Q7WY7CfUco.json"></lottie-animation>
      </view>

      <view class="option-btn-box">
        <button @tap="lottie1.play()">播放</button>
        <button @tap="lottie1.stop()">停止</button>
        <button @tap="lottie1.pause()">暂停</button>
        <button @tap="lottie1.destroy()">销毁</button>
        <button @tap="lottie1.initLottie()">重新生成</button>
      </view>
    </view>


    <view>
      <text class="desc-text">设置loop循环和autoplay自动播放{{ '\n' }}
        1. 示例1使用path网络文件，但是微信小程序使用animationData的加载方式{{ '\n' }}
        2. 示例2微信小程序/h5均使用animationData的加载方式
      </text>
      <view class="canvas-box flex">
        <lottie-animation ref="lottie2" loop autoplay dom-id="lottie-2"
                          path="https://file.bingyishow.top/lottie/celebrate.json"></lottie-animation>
        <lottie-animation ref="lottie3" loop autoplay dom-id="lottie-3"
                          :animation-data="lottieFile1"></lottie-animation>
      </view>

      <view class="option-btn-box">
      </view>
    </view>


    <view>
      <view class="title-text">事件监听</view>
      <view class="desc-text">设置阻止默认初始化，监听complete/data_ready/destroy事件的执行，{{ '\n' }}
        注册监听为自动注册, 删除组件上的@complete="complete"监听即取消
      </view>
      <view class="canvas-box">
        <lottie-animation ref="lottie4" dom-id="lottie-4" stopDefaultInit @complete="complete"
                          @data_ready="dataReady" @destroy="destroy"
                          path="https://file.bingyishow.top/lottie/138008-accept.json"></lottie-animation>
      </view>

      <view class="option-btn-box">
        <button @tap="lottie4.play()">播放</button>
        <button @tap="lottie4.initLottie()">初始化</button>
        <button @tap="lottie4.destroy()">销毁</button>
      </view>
    </view>


  </view>
</template>

<script setup>
import {ref} from 'vue'
import LottieAnimation from "../../components/lottie-animation/lottie-animation.vue";
import lottieFile1 from '../../static/lf20_7fy2yzzs.json'
import Taro from "@tarojs/taro";

const lottie1 = ref(null)
const lottie4 = ref(null)

const complete = () => {
  Taro.showToast({
    title: 'lottie4 播放完成',
    icon: 'none'
  })
}

const dataReady = () => {
  Taro.showToast({
    title: 'lottie4 初始化完成',
    icon: 'none'
  })
}

const destroy = () => {
  Taro.showToast({
    title: 'lottie4 销毁成功',
    icon: 'none'
  })
}

</script>


<style lang="scss">
.lottie-box {
  display: flex;
  flex-direction: column;
  padding: 20px 40px;

  .tip-text {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .desc-text {
    color: #909399;
    font-size: 30px;
    margin-top: 10px;
    word-break: break-all;
    white-space: pre-wrap;

    &:before {
      content: '>>';
      font-size: 30px;
      margin-right: 20px;
    }
  }

  .title-text {
    font-size: 40px;

    &:before {
      content: '-';
      font-size: 50px;
      margin-right: 20px;
    }
  }

  .canvas-box {
    border: 1px solid #909399;
    margin-top: 20px;
  }

  .flex {
    display: flex;
  }

  .option-btn-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 30px;
    font-size: 30px;

    button {
      width: auto;
      display: inline-block;
      margin: 0;
      margin-bottom: 20px;
    }
  }
}
</style>
