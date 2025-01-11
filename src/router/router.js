import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import UserCenter from '../views/UserCenter.vue'
import UPimage from '../views/Image/UPimage.vue'

import Orders from '../views/Orders.vue'
import Wishlist from '../views/Wishlist.vue'


Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',             // 模式切换
  // base: process.env.BASE_URL,     // 基础地址
  routes:
  [
    // path:地址 
    // name:替代名 
    // redirect:重定向到
    // component:渲染组件
    // children:子路由
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/UserCenter',
      name: 'UserCenter',
      component: UserCenter
    },
    {
      path: '/UPimage',
      name: 'UPimage',
      component: UPimage
    },
    {
      path: '/Orders',
      name: 'Orders',
      component: Orders
    },
    {
      path: '/Wishlist',
      name: 'Wishlist',
      component: Wishlist
    },
    
    // {
    //   // 路由级代码拆分
    //   // 为这条路由生成一个单独的块(about.[hash].js)
    //   // 当访问路由时惰性加载
    //   path: '/about',
    //   name: 'about',
    //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    // }
  ]
})

export default router


