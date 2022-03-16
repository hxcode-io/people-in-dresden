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
      status: "notInit", // "notInit", "loadingIds", "ready", "loadingInterviews"
      appendRequested: false,
      ids: [],
      idsDirty: true, // filter is changed, ids must be reloaded
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
    setStatus(state, status) {
      state.status = status;
    },
    setAppendRequested(state, appendRequested) {
      state.appendRequested = appendRequested;
    }
  },
  actions: {
    tick(context) {
      if (context.state.status === "loadingIds" || context.state.status === "loadingInterviews") return;
      const interviewService = new InterviewService();

      if (context.state.status === "notInit" || (context.state.status === "ready" && context.state.idsDirty)) {
        // Load id list if not init or the filter has changed
        context.commit("setStatus", "loadingIds");
        context.commit("resetItems");
        interviewService.getIds(context.state.yearsFilter, context.state.monthsFilter).then(ids => {
          context.commit("setIds", ids);
          context.commit("setStatus", "ready");
        })
      } else if (context.state.status === "ready" && context.state.appendRequested) {
        // Load new interviews if append was requested (user has scrolled to th page end)

        // Check if always all interviews loaded
        if (context.state.items.length === context.state.ids.length) {
          context.commit("setAppendRequested", false);
        } else {
          context.commit("setStatus", "loadingInterviews");
          const start = context.state.items.length;
          interviewService.getInterviews(start / 25, 25, context.state.ids).then(items => {
            context.commit("addItems", items);
            context.commit("setAppendRequested", false);
            context.commit("setStatus", "ready");
          })
        }
      }

    },
    append(context) {
      context.commit("setAppendRequested", true);
    },
  },
  modules: {
  }
})
