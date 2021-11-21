import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

//import axios from "axios"

createApp(App).use(router).mount("#app");

//const res = axios.get('http://localhost:3000/products').then(console.log(res));