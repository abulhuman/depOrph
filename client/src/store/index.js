import Vuex from "vuex";
import Vue from "vue";
import addOrphan from "./modules/addOrphan";

// Load Vuex
Vue.use(Vuex);

// Create and export store with the above imported module
export default new Vuex.Store({
  modules: {
    addOrphan
  }
});
