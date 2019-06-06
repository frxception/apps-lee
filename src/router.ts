import Vue from 'vue'
import Router, { RouteConfig, Route } from 'vue-router'
import NProgress from 'nprogress'
import stroe from '@/store'

Vue.use(Router)

const routes: RouteConfig[] = [
    {
        path: '/login',
        component: () => import('@/views/login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/',
        redirect: '/dashboard',
        component: () => import('@/views/layout.vue'),
        meta: { auth: true },
        children: [
            {
                path: '/dashboard',
                component: () => import('@/components/dashboard/index.vue'),
                meta: {
                    title: '仪表盘'
                }
            },
            {
                path: '/category',
                component: () => import('@/components/category/index.vue'),
                meta: {
                    title: '分类管理'
                }
            }
        ]
    }
]

const router: Router = new Router({
    // mode: 'history',
    routes
})

const title = 'Lee Blog'

router.beforeEach(async (to: Route, from: Route, next: any) => {
    NProgress.start()
    document.title = `${to.meta.title} - ${title}`

    const auth = to.matched.some(record => record.meta.auth)
    const token = stroe.state.token

    if (auth) {
        if (token) {
            next()
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next()
    }

    NProgress.done()
})

router.afterEach(() => {
    NProgress.done()
})

export default router
