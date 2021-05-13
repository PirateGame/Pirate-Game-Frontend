import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import './assets/CSS/style.css'
import router from './router/index';
import Vue3SocketIO from 'vue3-socket';
import { createStore } from "vuex";


const app = createApp(App);
app.use(Vue3SocketIO, {
    connection: "ws://pirategame.uk/",
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
app.config.devtools = true;
app.mount('#app');
