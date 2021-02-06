import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import router from './router/index';
import Vue3SocketIO from 'vue3-socket';

const app = createApp(App);


app.use(Vue3SocketIO, {
  connection: 'http://localhost:5000/',
});
app.use(router);
app.mount('#app');
