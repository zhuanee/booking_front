import request from '@/utils/request'

export default {
    search(page, size){
        return request({
            url: `/process/list/search/${page}/${size}`,
            method: 'get'
        })
    },
    agreeBooking(arr)
    {
        return request({
            url: '/process/agree',
            method: 'post',
            data: arr
        })
    },
    rejectBooking(arr)
    {
        return request({
            url: '/process/reject',
            method: 'post',
            data: arr
        })
    },
}