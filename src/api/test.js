import request from '@/utils/request'  //@代表src

// request.get('/db.json').then(response => {
//     console.log(response.data)
// })

// request({
//     method: 'get',
//     url: '/db.json'
// }).then(
//     response => {
//         console.log(response.data)
//     }
// )
const BASE_URI = process.env.VUE_APP_SERVICE_URL


export default {
    getlist(){
        const req = request({
            method: 'get',
            url: '/db.json'
        })
        return req
    }
}