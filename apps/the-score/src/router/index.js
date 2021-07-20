import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../layout'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
export const constantRoutes = [
  {
    path: '/version',
    name: 'version',
    component: Layout,
    hidden: true,
    meta: {
      title: '版本更新',
    },
    redirect: '/version',
    children: [
      {
        path: '/version',
        meta: {
          title: '版本更新'
        },
        component: () => import('../views/version')
      }
    ]
  },
  {
    path: '/copyright',
    name: 'copyright',
    component: Layout,
    hidden: true,
    meta: {
      title: '版权信息',
    },
    redirect: '/copyright',
    children: [
      {
        path: '/copyright',
        meta: {
          title: '版权信息'
        },
        component: () => import('../views/copyright')
      }
    ]
  },
  {
    path: '/terms',
    name: 'terms',
    component: Layout,
    hidden: true,
    meta: {
      title: '用户协议',
    },
    redirect: '/terms',
    children: [
      {
        path: '/terms',
        meta: {
          title: '用户协议'
        },
        component: () => import('../views/terms')
      }
    ]
  },
  {
    path: '/score',
    name: 'score',
    component: Layout,
    hidden: true,
    meta: {
      title: '乐谱播放',
    },
    redirect: '/score',
    children: [
      {
        path: '/score',
        meta: {
          title: '乐谱播放'
        },
        component: () => import('../views/score')
      }
    ]
  },
  {
    path: '/sheet',
    name: 'sheet',
    meta: {
      title: '文件乐谱',
    },
    component: Layout,
    hidden: true,
    redirect: '/pdf',
    children: [
      {
        path: '/pdf',
        meta: {
          title: 'PDF 乐谱',
        },
        component: () => import('../views/sheet'),
      },
    ],
  },
  {
    path: '/article',
    name: 'Article',
    meta: {
      title: '文章'
    },
    component: () => import('../views/article')
  },
  // Redirect to 404
  {
    path: '/404', redirect: 'system/404', hidden: true,
  },
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
})

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

const router = createRouter()
// Vue.use(router)
// export default new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRoutes,
// })
export default router
