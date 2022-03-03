<template>
  <transition name="fade">
    <div class="modal fixed max-h-full h-full w-full top-0 left-0 bg-gray-100 z-50 overflow-y-scroll">
      <div class="flex justify-end items-center p-4 absolute right-2 top-2">
        <div class="modal-close cursor-pointer z-50" @click="closeModal">
          <svg width="48px" height="48px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" fill="white" fill-opacity="0.01"/>
            <path d="M8 8L40 40" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 40L40 8" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <div class="container min-h-full w-full bg-white mx-auto" style="max-width: 1280px">
        <div v-if="interview">
          <div>
            <img :src="interview.imageUrl" :alt="interview.de.slice(0, 20)" class="w-full ">
          </div>
          <div class="px-8 md:px-24 xl:px-44 text-gray-700 border-t-8 border-dd" style="line-height: 32px;">
            <div class="pt-12 xl:pt-20 pb-10 whitespace-pre-line">
              {{ text }}
            </div>
            <div class="pb-20 flex justify-between items-center text-gray-400">
              <span class="cursor-pointer" @click="closeModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
              </span>
              <span>{{ interview.published_at.toLocaleDateString(localeForDate, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {InterviewService} from "@/service/InterviewService";

const interviewService = new InterviewService();

export default {
  data() {
    return {
      interview: undefined
    }
  },
  mounted() {
    console.log("mounted")
    interviewService.loadInterview(this.$route.params.id).then(interview => {
      this.interview = interview;
    });
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
    localeForDate() {
      return this.lang === "de" ? "de-DE" : "en-EN";
    },
    text() {
      if (this.interview === undefined) return "";
      if (this.lang === "de") return this.interview.de
      return this.interview.en
    }
  },
  beforeRouteLeave(to, from, next) {
    document.body.classList.remove('overflow-hidden');
    next();
  },
  methods: {
    closeModal() {
      console.log("Close modal")
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}


.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
