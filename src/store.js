import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    expanded: true,
    prize: 0,
    photo: false,
    phase: 0,
    task: {},
  },
  mutations: {},
  actions: {}
});
