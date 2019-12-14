import axios from 'axios'
import { timeout } from 'q'

const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

// request.get('/db.json').then(response => {
//     const data = response.data
//     console.log(data)
// })

export default request //导出自定义创建的axios对象