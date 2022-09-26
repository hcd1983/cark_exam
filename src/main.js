import './style.css';
import fakeServer from '@/fakeServer';
import { createApp } from 'vue';
import App from './App.vue';

const initApp = async () => {
  await fakeServer();
  createApp(App).mount('#app');
};

initApp();
