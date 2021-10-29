import { createApp } from "vue";
import App from "./App.vue";
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from "./store/index";
import router from "./router/index";
router;

createApp(App).use(router).use(store).mount("#app");
