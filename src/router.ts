import Vue from 'vue';
import Router, { Route, RouteConfig } from 'vue-router';
import nprogress from 'nprogress';
import store from './store';

Vue.use(Router);

nprogress.configure({ showSpinner: false });

const routes: RouteConfig[] = [
    {
        path: '/login',
        name: '登录',
        component: () => import('@/views/login.vue'),
    },
    {
        path: '/',
        redirect: 'dashboard',
        component: () => import('@/views/back.vue'),
        meta: { auth: true },
        children: [
            {
                path: '/dashboard',
                name: '首页',
                component: () => import('@/views/dashboard.vue'),
            },
            {
                path: '/category',
                name: '分类',
                component: () => import('@/components/category/index.vue'),
            },
            {
                path: '/article',
                name: '文章',
                component: () => import('@/components/article/index.vue'),
            },
            {
                path: '/article/create',
                name: '创建文章',
                component: () => import('@/components/article/create.vue'),
            },
            {
                path: '/article/edit/:id',
                name: '修改文章',
                component: () => import('@/components/article/edit.vue'),
            },
            {
                path: '/tags',
                name: '分类',
                component: () => import('@/components/tags/index.vue'),
            },

            {
                path: '/annex',
                name: '附件',
                component: () => import('@/components/annex/index.vue'),
            },
        ],
    },
];

const router: Router = new Router({
    mode: 'history',
    routes,
});

router.beforeEach((to: Route, from: Route, next: any) => {
    nprogress.start();
    const auth = to.matched.some((record) => record.meta.auth);
    const token = store.state.token;
    if (auth) {
        if (token) {
            next();
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath,
                },
            });
        }
    } else {
        next();
        nprogress.done();
    }
    nprogress.done();
});

router.afterEach(() => {
    nprogress.done();
});

export default router;
