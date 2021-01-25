import Vue from "vue";
import App from "./App.vue"; // App component from App.vue
import router from "./router"; // vue router implementation from /src/router/index.js
import store from "./store"; // vuex:state management implementation from /src/store/index.js

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
