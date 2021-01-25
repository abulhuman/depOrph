import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate"; // form validation library
import Staff from "../views/Staff.vue";
import OrphanProfile from "../components/OrphanProfile.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"; // unused
import "bootstrap/dist/css/bootstrap.css"; // bootstrap's css
import "bootstrap-vue/dist/bootstrap-vue.css"; // bootstrap-vue's css
import axios from "axios"; // AJAX library

// set baseURL for all consequent AJAX requests to made by the app's components
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL; 

// add all plugins and libraries to Vue
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate);
Vue.use(axios);

// available routes for the app
const routes = [
  { // home route renders the Staff.vue component
    path: "/", 
    name: "Staff",
    component: Staff
  },
  { // renders the OrphanProfile.vue component when an orphan's profile is visited
    path: "/orphan/:id",
    name: "OrphanProfile",
    component: OrphanProfile
  }
];

const router = new VueRouter({
  mode: "history", // enables history mode for vue router
  base: process.env.BASE_URL,
  routes
});

export default router;
