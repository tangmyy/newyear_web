import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/store'


import Home from '../views/Home.vue'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import UserCenter from '../views/UserCenter.vue'

import UPimage from '../views/Image/UPimage.vue'

import PublicImage from '../views/PublicImage.vue'
import PrivateImage from '../views/PrivateImage.vue'

import Collect from '../views/Collect.vue'
import Wishlist from '../views/Wishlist.vue'
import Orders from '../views/Orders.vue'


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
      component: Home,
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/UserCenter',
      name: 'UserCenter',
      component: UserCenter,
      meta: { requiresAuth: true }
    },
    {
      path: '/UPimage',
      name: 'UPimage',
      component: UPimage,
    },
    {
      path: '/Collect',
      name: 'Collect',
      component: Collect,
    },
    {
      path: '/Wishlist',
      name: 'Wishlist',
      component: Wishlist,
      meta: { requiresAuth: true }
    },
    {
      path: '/Orders',
      name: 'Orders',
      component: Orders,
    },

    {
      path: '/PublicImage',
      name: 'PublicImage',
      component: PublicImage,
    },
    {
      path: '/PrivateImage',
      name: 'PrivateImage',
      component: PrivateImage,
      meta: { requiresAuth: true }
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.isLoggedIn) {
      alert('暂未登录！请先登录！');
      next({
        path: '/Login',
        query: { redirect: to.fullPath }
        // this.$route.query.redirect
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router

// to.matched: 包含一个数组，
// 数组中的每个元素都是一个路由记录对象，对应着当前匹配的路由以及所有嵌套路由。
// some: JavaScript 数组方法，用于测试数组中的至少一个元素是否通过由提供的函数实现的测试。
// 如果找到一个满足条件的元素，则 some 返回 true，否则返回 false。
// [
//   {
//     path: '/parent',
//     component: ParentComponent,
//     meta: { requiresAuth: true, role: 'admin' },
//     children: [ /* ... */ ]
//   },
//   {
//     path: '/parent/child',
//     component: ChildComponent,
//     meta: { requiresAuth: true, role: 'user' }
//   }
// ]
// 在导航守卫中，to.matched 和 from.matched 数组中的每一项就是一个 record。
// 此处用于检查每个路由记录对象（record）的 meta.requiresAuth 属性是否为 true。
// requiresAuth通常用于标识某个路由是否需要用户进行身份验证才能访问。
// requiresAuth在上面由routes定义了：meta: { requiresAuth: true }
// 如果为true => 判断登录状态

// record.meta
// record 通常指的是路由记录，是 routes 配置数组中的每个路由对象。
// 每个路由记录对象包含路径、组件、子路由、重定向、别名、路由元信息等。
// { requiresAuth: true, role: 'admin' }
// { requiresAuth: true, role: 'user' }


