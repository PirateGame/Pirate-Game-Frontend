import { createRouter, createWebHistory } from 'vue-router';

import LandingPage from '../../src/components/landingPage.vue'
import HostPage from '../../src/components/HostPage.vue'
import JoinPage from '../../src/components/JoinPage.vue'
import WaitingRoom from 'src/components/WaitingRoom.vue'
import HostPanel from 'src/components/HostPanel.vue'
import AdminPanel from 'src/components/AdminPanel.vue'
import DesignBoard from 'src/components/DesignBoard.vue'
import PickTeam from 'src/components/PickTeam.vue'
import Game from 'src/components/Game.vue'
import Rules from 'src/components/Rules.vue'

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