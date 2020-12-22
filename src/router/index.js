import { createRouter, createWebHistory } from 'vue-router';

import LandingPage from '../components/LandingPage.vue'
import HostPage from '../components/HostPage.vue'
import JoinPage from '../components/JoinPage.vue'
import WaitingRoom from '../components/WaitingRoom.vue'
import HostPanel from '../components/HostPanel.vue'
import AdminPanel from '../components/AdminPanel.vue'


let router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: LandingPage, name: 'LandingPage' },
      { path: '/host', component: HostPage, name: 'HostPage' },
      { path: '/join', component: JoinPage, name: 'JoinPage' },
      { path: '/HostPanel', component: HostPanel, name: 'HostPanel' },
      { path: '/AdminPanel', component: AdminPanel, name: 'AdminPanel' },
      { path: '/WaitingRoom', component: WaitingRoom, name: 'WaitingRoom' }

    ]
  });

export default router