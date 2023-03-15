<template>
  <view class="lottie-box">
    <text class="tip-text">演示lottie动画</text>
    <lottie-animation class="lottie-1" loop autoplay dom-id="lottie1"
                      path="https://assets9.lottiefiles.com/packages/lf20_Q7WY7CfUco.json"></lottie-animation>
  </view>
</template>

<script setup>
import {ref} from 'vue'
import LottieAnimation from "../../components/lottie-animation/lottie-animation.vue";


</script>


<style lang="scss">
.lottie-box {
  display: flex;
  flex-direction: column;
  .tip-text {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
}
</style>
