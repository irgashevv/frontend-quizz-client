import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('@/views/SignUp'),
    meta: { title: 'Регистрация' },
  },
  {
    path: '/',
    name: 'topics',
    component: () => import('@/views/TopicsIndex'),
    meta: { title: 'Топики' },
  },
  {
    path: '/:id',
    name: 'topic-detail',
    component: () => import('@/views/TopicDetail'),
    props: true,
    meta: { title: 'Топики' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  document.title = to.meta.title;
  if (!token) {
    next({ name: 'sign-up' });
  } else {
    next();
  }
});

export default router;
