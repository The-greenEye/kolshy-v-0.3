import { createApp } from "vue";
import { createVuetify } from "vuetify";
import { createPinia } from "pinia";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import App from "./App.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import CanvasJSChart from "@canvasjs/vue-charts";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
});

// Create Vue app and install plugins
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// Use plugins
app.use(router);
app.use(createPinia());
app.use(ElementPlus);
app.use(vuetify);
app.use(CanvasJSChart);
app.use(Toast, {
  position: "bottom-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnHover: true,
});

// Mount the app
app.mount("#app");
