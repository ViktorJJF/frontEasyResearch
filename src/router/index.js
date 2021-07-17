import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import helper from '@/services/helper';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/homePage/home.vue'),
    meta: {
      requiresGuest: true,
    },
    children: [
      {
        path: '/',
        component: () => import('@/homePage/pages/landing.vue'),
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/homePage/pages/login.vue'),
      },
      {
        path: '/registro',
        name: 'register',
        component: () => import('@/homePage/pages/register.vue'),
      },
      {
        path: '/contactanos',
        name: 'contact',
        component: () => import('@/homePage/pages/contact.vue'),
      },
      {
        path: '/precios',
        name: 'prices',
        component: () => import('@/homePage/pages/prices.vue'),
      },
      {
        path: '/beneficios',
        name: 'benefits',
        component: () => import('@/homePage/pages/benefits.vue'),
      },
    ],
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
    path: '/proyecto',
    meta: {
      requiresAuth: true,
      requiresConfigResearch: false,
    },
    name: 'ProjectsLayout',
    component: () => import('@/views/project/home.vue'),
    children: [
      {
        path: '/otro',
        name: 'Info',
        component: () => import('@/views/project/projects/Information.vue'),
      },
      {
        path: ':projectId',
        name: 'Project',
        component: () => import('@/views/project/projects/Project-Page.vue'),
      },
    ],
  },
  {
    path: '/configuracion-proyecto/:projectId',
    meta: {
      requiresAuth: true,
      requiresConfigResearch: true,
    },
    component: () => import('@/layouts/config-research-page.vue'),

    children: [
      {
        path: '/',
        name: 'configSteps',
        component: () => import('@/views/pages/steps.vue'),
      },
    ],
  },

  {
    path: '/desarrollo/:projectId',
    component: () => import('@/layouts/default-page'),
    meta: {
      requiresAuth: true,
      requiresConfigResearch: true,
    },
    children: [
      {
        path: '',
        redirect: 'inicio',
      },
      {
        path: 'inicio',
        name: 'start',
        component: () => import('@/views/pages/start.vue'),
      },
      {
        path: 'referencias',
        name: 'references',
        component: () => import('@/views/pages/references.vue'),
      },
      {
        path: 'titulo',
        name: 'title',
        component: () => import('@/views/pages/title.vue'),
      },
      {
        path: 'disenio',
        name: 'design',
        component: () => import('@/views/pages/design.vue'),
      },
      {
        path: 'variables',
        name: 'variable',
        component: () => import('@/views/pages/variableSupport.vue'),
      },
      {
        path: 'instrumentos',
        name: 'instruments',
        component: () => import('@/views/pages/instruments.vue'),
      },
      {
        path: 'matriz-de-consistencia',
        name: 'matrix',
        component: () => import('@/views/pages/matrix.vue'),
      },
      {
        path: 'capitulo/:numero',
        name: 'chapter',
        component: () => import('@/views/pages/chapter.vue'),
      },
      {
        path: 'capitulo/:numero/:level2',
        name: 'updateLevel2',
        component: () => import('@/views/pages/level2Detail.vue'),
      },
      {
        path: 'user-profile',
        name: 'userProfile',
        component: () => import('@/views/user/profile'),
      },
      {
        path: 'user',
        component: () => import('@/views/user/index'),
      },
      {
        path: 'informacion-adicional',
        name: 'additionalInformation',
        component: () => import('@/views/pages/additionalInformation.vue'),
      },
      {
        path: 'matriz-de-operacionalizacion',
        name: 'operationalizationMatrix',
        component: () => import('@/views/pages/operationalizationMatrix.vue'),
      },
      {
        path: 'listado-de-anexos',
        name: 'annexesList',
        component: () => import('@/views/pages/annexesList.vue'),
      },
      {
        path: 'caratula',
        name: 'coverPage',
        component: () => import('@/views/pages/thesisComponents/coverPage.vue'),
      },
      {
        path: 'configuracion',
        name: 'settings',
        component: () => import('@/views/pages/settings.vue'),
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
  let isResearchConfigCompleted = null;
  if (
    to.matched.some((m) => m.meta.requiresAuth) &&
    to.matched.some((m) => m.meta.requiresConfigResearch)
  ) {
    if (store.state.project.currentProject != null) {
      isResearchConfigCompleted =
        store.state.project.currentProject.configStatus;
      researchMiddleware(to, isResearchConfigCompleted, next);
    } else {
      axios
        .get('/api/project/get', {
          params: {
            projectId: to.params.projectId,
          },
        })
        .then((response) => {
          let project = response.data.project;
          let status = project.configStatus == 1 ? true : false;
          store.dispatch('project/setCurrentProject', {
            currentProject: project,
          });
          researchMiddleware(to, status, next);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  if (to.matched.some((m) => m.meta.requiresAuth)) {
    return helper.check().then((response) => {
      if (!response) {
        return next({
          path: '/login',
        });
      }

      return next();
    });
  }
  if (to.matched.some((m) => m.meta.requiresGuest)) {
    // store.dispatch("onResearchComplete", null); //because there is no an active user
    return helper.check().then((response) => {
      if (response) {
        return next({
          path: '/proyecto',
        });
      }

      return next();
    });
  }
  if (!to.matched.some((m) => m.meta.requiresAuth)) {
    return next();
  }
});

const researchMiddleware = (to, isResearchConfigCompleted, next) => {
  return helper.check().then((response) => {
    if (!response) {
      return next({
        path: '/login',
      });
    } else if (to.matched.some((m) => m.meta.requiresConfigResearch)) {
      if (to.matched[0].path == '/configuracion-proyecto/:projectId') {
        if (isResearchConfigCompleted)
          return next({
            path: '/desarrollo/' + to.params.projectId,
          });
        else return next();
      }

      if (to.matched[0].path == '/desarrollo/:projectId') {
        if (isResearchConfigCompleted) return next();
        else
          return next({
            path: '/configuracion-proyecto/' + to.params.projectId,
          });
      }
    }
  });
};

export default router;
