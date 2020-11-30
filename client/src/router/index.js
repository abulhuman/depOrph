import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import Staff from "../views/Staff.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import ElementUI from "element-ui";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ElementUI);
Vue.use(Vuelidate);
Vue.use(axios);

const routes = [
  {
    path: "/",
    name: "Staff",
    component: Staff
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
