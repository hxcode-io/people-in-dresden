import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state () {
    return {
      lang: "de"
    }
  },
  mutations: {
    switchGerman (state) {
      state.lang = "de"
    },
    switchEnglish (state) {
      state.lang = "en"
    }
  },
  actions: {
  },
  modules: {
  }
})
