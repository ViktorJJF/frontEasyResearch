import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true },
    name: 'dashboard',
    redirect: { name: 'Users' },
    children: [
      {
        path: '/usuarios',
        name: 'Users',
        component: () => import('@/views/Users.vue'),
      },
      {
        path: '/marcas',
        name: 'Brands',
        component: () => import('@/views/Brands.vue'),
      },
      {
        path: '/perfil',
        name: 'UserProfile',
        component: () => import('@/views/UserProfile.vue'),
      },
    ],
  },
  {
    path: '*',
    component: () => import('@/components/common/notFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // checkForUpdates();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isTokenSet = store.getters['authModule/isTokenSet'];
  if (requiresAuth && !isTokenSet) {
    return next({ name: 'login' });
  } // checkIfTokenNeedsRefresh(); //
  store.commit('successModule/success', null); //
  store.commit('errorModule/error', null);
  return next();
});

export default router;
