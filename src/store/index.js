import Vue from 'vue'
import Vuex from 'vuex'
import {InterviewService} from "@/service/InterviewService";

Vue.use(Vuex)

export default new Vuex.Store({
  state () {
    return {
      lang: localStorage.lang ? localStorage.lang : 'de',
      yearsFilter: [],
      monthsFilter: [],
      ids: [],
      idsDirty: true,
      items: []
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
    },
    toggleYear(state, year) {
      if (state.yearsFilter.includes(year)) {
        const yearIndex = state.yearsFilter.findIndex(y => y === year);
        state.yearsFilter.splice(yearIndex, 1)
      } else {
        state.yearsFilter.push(year);
      }
      state.idsDirty = true;
    },
    toggleMonth(state, month) {
      if (state.monthsFilter.includes(month)) {
        const monthIndex = state.monthsFilter.findIndex(m => m === month);
        state.monthsFilter.splice(monthIndex, 1)
      } else {
        state.monthsFilter.push(month)
      }
      state.idsDirty = true;
    },
    resetYears(state) {
      state.yearsFilter.splice(0, state.yearsFilter.length); // Empty array
      state.idsDirty = true;
    },
    resetMonths(state) {
      state.monthsFilter.splice(0, state.monthsFilter.length); // Empty array
      state.idsDirty = true;
    },
    setIds(state, ids) {
      state.ids.splice(0, state.ids.length); // Empty array
      state.ids.push(...ids);
      state.idsDirty = false;
    },
    addItems(state, items) {
      state.items.push(...items);
    },
    resetItems(state) {
      state.items.splice(0, state.items.length); // Empty array
    },
  },
  actions: {
    async append(context) {
      console.log("Append in store started")
      const interviewService = new InterviewService();
      if (context.state.idsDirty) {
        context.commit("setIds", await interviewService.getIds(context.state.yearsFilter, context.state.monthsFilter));
        context.commit("resetItems");
      }
      const start = context.state.items.length;
      context.commit(
          "addItems",
          await interviewService.getInterviews(start / 25, 25, context.state.ids)
      )
    }
  },
  modules: {
  }
})
