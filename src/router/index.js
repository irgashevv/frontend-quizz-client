import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout'),
    children: [
      {
        path: '',
        name: 'topics',
        component: () => import('@/views/TopicsIndex'),
        meta: { title: 'Топики', isAuthRequired: true },
      },
      {
        path: '/:id',
        name: 'topic-detail',
        component: () => import('@/views/TopicDetail'),
        props: true,
        meta: { title: 'Топики', isAuthRequired: true },
      },
    ],
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('@/views/SignUp'),
    meta: { title: 'Регистрация', isAuthRequired: false },
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('@/views/SignIn'),
    meta: { title: 'Вход', isAuthRequired: false },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth-token');
  document.title = to.meta.title;
  if (!token) {
    if (!to.meta.isAuthRequired) {
      next();
    } else {
      next({
        name: 'sign-up',
      });
    }
  } else {
    next();
  }
});

export default router;
