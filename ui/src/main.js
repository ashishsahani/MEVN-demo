import { createApp } from "vue";
import App from "./App.vue";
import appStore from "./Store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
const app = createApp(App);
app.use(appStore);
app.mount("#app");
