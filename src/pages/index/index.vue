<template>
  <view class="lottie-box">
    <text class="tip-text">演示lottie动画</text>
    <view>
      <view class="title-text">基本使用</view>
      <view class="desc-text">设置loop循环和autoplay自动播放，微信小程序使用path的加载方式</view>
      <view class="canvas-box">
        <lottie-animation ref="lottie1" class="lottie-1" loop autoplay dom-id="lottie-1"
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


  </view>
</template>

<script setup>
import {ref} from 'vue'
import LottieAnimation from "../../components/lottie-animation/lottie-animation.vue";


const lottie1 = ref(null)

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
  .option-btn-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 30px;
    button {
      width: auto;
      display: inline-block;
      margin: 0;
      margin-bottom: 20px;
    }
  }
}
</style>
