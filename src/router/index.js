import { createRouter, createWebHistory } from 'vue-router';

import LandingPage from '../components/LandingPage.vue'
import HostPage from '../components/HostPage.vue'
import JoinPage from '../components/JoinPage.vue'
import WaitingRoom from '../components/WaitingRoom.vue'
import HostPanel from '../components/HostPanel.vue'
import AdminPanel from '../components/AdminPanel.vue'
import DesignBoard from '../components/DesignBoard.vue'
import PickTeam from '../components/PickTeam.vue'
import Game from '../components/Game.vue'
import Rules from '../components/Rules.vue'


let router = createRouter({
    history: createWebHistory(),
    routes: [
      {path:'/', component: LandingPage, name:'LandingPage'},
      {path:'/host', component: HostPage, name:'HostPage'},
      {path:'/join', component: JoinPage, name:'JoinPage'},
      {path:'/HostPanel', component: HostPanel, name:'HostPanel'},
      {path:'/WaitingRoom', component: WaitingRoom, name:'WaitingRoom'},
      {path:'/DesignBoard', component: DesignBoard, name:'DesignBoard'},
      {path:'/PickTeam', component: PickTeam, name:'PickTeam'},
      {path:'/AdminPanel', component: AdminPanel, name:'AdminPanel'},
      {path:'/Rules', component: Rules, name:'Rules'},
      {path:'/Game', component: Game, name:'Game'},
    ]
  });

export default router