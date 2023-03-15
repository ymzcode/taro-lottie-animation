import lottie from 'lottie-miniprogram'
import Taro from "@tarojs/taro";

export function init({domId:id, path, weWidth, width, weHeight, height, loop, autoplay}) {
    // const res = document.getElementById('lottiebox')
    return new Promise((resolve, reject) => {
        /*
        * 微信小程序需要延迟获取
        * */
        setTimeout(() => {
            const query = Taro.createSelectorQuery()
            query.select(`#${id}`).node(res => {
                console.log(res)
                const canvas = res.node
                const context = canvas.getContext('2d')
                console.log('weapp', res)

                /*
                *
                * 修复微信失帧情况
                * */
                const WIDTH =  weWidth || width
                const HEIGHT = weHeight || height
                const dpr = Taro.getSystemInfoSync().pixelRatio
                canvas.width = WIDTH * dpr
                canvas.height = HEIGHT * dpr
                context.scale(dpr, dpr)

                lottie.setup(canvas)
                const ani = lottie.loadAnimation({
                    rendererSettings: {
                        context: context
                    },
                    renderer: 'canvas',
                    loop: loop,
                    autoplay: autoplay,
                    path: path // the path to the animation json
                });

                resolve(ani)
            }).exec()
        }, 300)
    })
}
