import { createApp } from "vue";
import { router } from "./app/providers/router";
import "./app/style.css";
import App from "./app/App.vue";

createApp(App).use(router).mount("#app");
