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
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/',
    redirect: 'dashboard',
    component: () => import('@/views/layout.vue'),
    meta: { auth: true, title: '首页' },
    children: [
      {
        path: '/dashboard',
        component: () => import('@/components/dashboard/index.vue'),
        meta: {
          title: '首页',
        },
      },
      {
        path: '/category',
        component: () => import('@/components/category/index.vue'),
        meta: {
          title: '分类',
        },
      },
      {
        path: '/article',
        component: () => import('@/components/article/index.vue'),
        meta: {
          title: '管理文章',
        },
      },
      {
        path: '/article/create',
        component: () => import('@/components/article/create.vue'),
        meta: {
          title: '创建文章',
        },
      },
      {
        path: '/article/edit/:id',
        component: () => import('@/components/article/create.vue'),
        meta: {
          title: '编辑文章',
        },
      },
      {
        path: '/tags',
        component: () => import('@/components/tags/index.vue'),
        meta: {
          title: 'Tags',
        },
      },
      {
        path: '/annex',
        component: () => import('@/components/annex/index.vue'),
        meta: {
          title: '附件',
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
