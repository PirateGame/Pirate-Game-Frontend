import { createRouter, createWebHistory } from 'vue-router';

import LandingPage from '../components/LandingPage.vue'
import HostPage from '../components/HostPage.vue'
import ViewPage from '../components/ViewPage.vue'

let router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: LandingPage },
      { path: '/host', component: HostPage },
      { path: '/view', component: ViewPage }

    ]
  });

export default router