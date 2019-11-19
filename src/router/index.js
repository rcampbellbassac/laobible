import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: () => (import(/* webpackChunkName: "about" */ '../views/About.vue')),
  },
  {
    path: '/read',
    name: 'books',
    component: () => (import(/* webpackChunkName: "books" */ '../components/BookListing.vue')),
  },
  {
    path: '/read/:bk',
    name: 'chapters',
    props: true,
    component: () => (import(/* webpackChunkName: "chapters" */ '../components/ChapterListing.vue')),
  },
  {
    path: '/read/:bk/:ch',
    name: 'content',
    props: true,
    component: () => (import(/* webpackChunkName: "content" */ '../components/Content.vue')),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
