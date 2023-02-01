import { createApp } from "vue";
import App from "./App.vue";

// Plugins
import { registerPlugins } from "@/plugins";
// import './assets/main.css'

const app = createApp(App);

app.use(router);

app.mount("#app");
