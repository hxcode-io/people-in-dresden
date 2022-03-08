import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state () {
    return {
      lang: localStorage.lang ? localStorage.lang : 'de'
    }
  },
  mutations: {
    switchGerman (state) {
      state.lang = "de";
      localStorage.lang = 'de';
    },
    switchEnglish (state) {
      state.lang = "en";
      localStorage.lang = 'en';
    }
  },
  actions: {
  },
  modules: {
  }
})
