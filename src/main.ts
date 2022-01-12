import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

axios.interceptors.request.use(async (config) => {
  config.baseURL = process.env.VUE_APP_BASE_URL_V1;
  return config;
});

createApp(App).use(router).mount("#app");

import "bootstrap/dist/js/bootstrap.js";
