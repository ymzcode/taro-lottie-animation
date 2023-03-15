/*
*
* 目前只做了h5和微信小程序端
* 其他端请根据需要再自行封装
*
* */

export function init({ domId: id, path }) {
    const res = document.getElementById(id)
    console.log('其他端', res)
    return new Promise((resolve, reject) => {
        const ani = null
        resolve(ani)
    })
}
