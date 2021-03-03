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
      playerName: "Alex"
  },
  mutations: {
      edit(state, key, value){
          state.key = value
      }
  }
})

app.use(store);

app.mount('#app');
