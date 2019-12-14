import router from './router'
import { getUserInfo } from './api/login'

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('nju-booking-token')

    if (!token) {
        if (to.path !== '/login') {
            next({ path: '/login' })
        } else {
            next()
        }
    }
    else {
        if (to.path === '/login') {
            // 进入目标路由
            next()
        }
        else {
            const userInfo = localStorage.getItem('nju-booking-user')
            if (userInfo) {
                next()
            }
            else {
                getUserInfo(token).then(response => {
                    const resp = response.data
                    console.log('prer', resp)
                    if (resp.flag) {
                        // 获取到, 保存数据
                        localStorage.setItem('nju-booking-user', JSON.stringify(resp.data))
                        next()
                    } else {
                        // 未获取到,重新登录
                        next({ path: '/login' })
                    }
                })
            }
        }
    }
})