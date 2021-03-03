import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import router from './router/index';
import Vue3SocketIO from 'vue3-socket';
import { createStore } from "vuex";


const app = createApp(App);
app.use(Vue3SocketIO, {
    connection: 'http://localhost:5000/',
});
app.use(router);

var store = createStore({
  state:{
    playerName: null,
    gameName: null,
    authCode: null,
    ship: null,
    captain: null,
    gridHeight: null,
    gridWidth: null
  },
  mutations: {
    updatePlayerName(state, value){
        state.playerName = value
    },
    updateGameName(state, value){
      state.gameName = value
    },
    updateAuthCode(state, value){
      state.authCode = value
    },
    updateShip(state, value){
      state.ship = value
    },
    updateCaptain(state, value){
      state.captain = value
    },
    updateGridHeight(state, value){
      state.gridHeight = value
    },
    updateGridWidth(state, value){
      state.gridWidth = value
    },
  }
})

app.use(store);

app.mount('#app');
