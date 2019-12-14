import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login"; //默认导入index.vue组件
import Layout from '@/components/layout'
import Home from '@/views/home'
import Member from '@/views/member'
import Booking from '@/views/booking'
import Room from '@/views/room'
import Info from '@/views/info'
import Process from '@/views/process'
import Record from '@/views/record'

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login', //路由名称
      component: Login //组件对象
    },
    {
      path: '/',
      name: 'layout', //路由名称
      component: Layout,//组件对象,
      redirect: '/home',// 重定向到子路由
      children: [
        {
          path: '/home',
          component: Home,
          meta: { title: '首页' }
        }
      ]
    },
    {
      // 用户管理
      path: '/member',
      component: Layout,
      children: [
        {
          path: '/',
          component: Member,
          meta: { title: '用户管理' }
        }
      ]
    },
    {
      // 教室预定
      path: '/booking',
      component: Layout,
      children: [
        {
          path: '/',
          component: Booking,
          meta: { title: '教室预定' },
        }
      ]
    },
    ,
    {
      // 教室管理
      path: '/room',
      component: Layout,
      children: [
        {
          path: '/',
          component: Room,
          meta: { title: '教室管理' },
        }
      ]
    },
    {
      // 信息修改
      path: '/info',
      component: Layout,
      children: [
        {
          path: '/',
          component: Info,
          meta: { title: '信息修改' },
        }
      ]
    },
    {
      // 预定处理
      path: '/process',
      component: Layout,
      children: [
        {
          path: '/',
          component: Process,
          meta: { title: '预定处理' },
        }
      ]
    },
    {
      // 预定处理
      path: '/record',
      component: Layout,
      children: [
        {
          path: '/',
          component: Record,
          meta: { title: '我的预定' },
        }
      ]
    }
  ]
})
