import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth.js";
import chat from "./modules/chat.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    chat
  }
});
