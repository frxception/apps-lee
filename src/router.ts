import Vue from 'vue';
import Router, { RouteConfig, Route } from 'vue-router';
import NProgress from 'nprogress';
import stroe from './store';

Vue.use(Router);
/* tslint:disable:max-line-length */
NProgress.configure({
  showSpinner: true,
});

const routes: RouteConfig[] = [
  {
    path: '/login',
    name: '登录',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '',
    redirect: 'dashboard',
    name: '/',
    component: () => import('@/views/layout.vue'),
    meta: { auth: true, title: '首页' },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/components/dashboard/index.vue'),
        meta: {
          title: '首页',
        },
      },
      {
        path: 'category',
        name: 'category',
        component: () => import('@/components/category/index.vue'),
        meta: {
          title: '分类',
        },
      },
      {
        path: 'article',
        name: 'article',
        component: () => import('@/components/article/index.vue'),
        meta: {
          title: '文章',
        },
      },
    ],
  },
];
const router: Router = new Router({
  mode: 'history',
  routes,
});

const title = 'Lee Blog';

router.beforeEach((to: Route, from: Route, next: any) => {
  NProgress.start();
  document.title = `${to.meta.title} - ${title}`;
  const auth = to.matched.some((record) => record.meta.auth);
  const token = stroe.state.token;
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
    NProgress.done();
  }
  NProgress.done();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
