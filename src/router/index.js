import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

import LandingPage from '../components/landingPage.vue'


let router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: LandingPage }
    ]
  });

export default router