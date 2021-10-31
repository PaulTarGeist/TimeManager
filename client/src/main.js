import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store/store";
import router from "./routes";
router;

createApp(App).use(router).use(store).mount("#app");
