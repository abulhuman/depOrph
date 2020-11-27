import Vuex from "vuex";
import Vue from "vue";
import addOrphan from "./modules/addOrphan";

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    addOrphan
  }
});
