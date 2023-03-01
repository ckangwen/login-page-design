import "@unocss/reset/tailwind.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import "uno.css";
import "element-plus/theme-chalk/index.css";
import "./styles/index.scss";

const app = createApp(App);
app.use(router);
app.mount("#app");
