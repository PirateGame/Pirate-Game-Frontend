import { createRouter, createWebHistory } from 'vue-router';

import LandingPage from '../components/LandingPage.vue'
import HostPage from '../components/HostPage.vue'
import JoinPage from '../components/JoinPage.vue'


let router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: LandingPage, name: 'LandingPage' },
      { path: '/host', component: HostPage, name: 'HostPage' },
      { path: '/join', component: JoinPage, name: 'JoinPage' }

    ]
  });

export default router