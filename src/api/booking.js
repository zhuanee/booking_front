import request from '@/utils/request'

export default {
    getClassrooms()
    {
        return request({
            url: '/classroom/list',
            method: 'get'
        })
    },

    search(page, size, searchMap){
        return request({
            url: `/classroom/list/search/${page}/${size}`,
            method: 'post',
            data: searchMap
        })
    },

    getRoomById(id){
        return request({
            url: `/classroom/${id}`,
            method: 'get'
        })
    },

    updateRoom(room)
    {
        return request({
            url: `/classroom`,
            method: 'put',
            data: room
        })
    },

    deleteRoomById(id)
    {
        return request({
            url: `/classroom/${id}`,
            method: 'delete'
        })
    },

    addRoom(room)
    {
        return request({
            url: `/classroom`,
            method: 'post',
            data: room
        })
    }
}