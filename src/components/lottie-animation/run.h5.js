import lottie from 'lottie-web'

export function init({ domId: id, path, loop, autoplay }) {
    const res = document.getElementById(id)
    console.log('h5', res)
    return new Promise((resolve, reject) => {
        const ani = lottie.loadAnimation({
            container: res, // the dom element that will contain the animation
            renderer: 'svg',
            loop: loop,
            autoplay: autoplay,
            path: path // the path to the animation json
        });
        resolve(ani)
    })

}
