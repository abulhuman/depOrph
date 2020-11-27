import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { createProvider } from "./vue-apollo";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
