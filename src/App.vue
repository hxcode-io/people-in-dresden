<template>
  <div>
    <div v-if="banner" class="mb-16 border-b-8 border-dd" :style="bannerStyle">
      <div class="overlay bg-black z-10 absolute top-0 opacity-20 h-full w-full -mt-2"></div>
      <div class="header-content absolute top-0 w-full h-full z-20">
        <div class="header-logo flex flex-col justify-center items-center h-full -mt-12">
          <div class="w-full bg-black bg-opacity-60">
            <div class="text-white font-marc text-center header-title" ref="headerTitle">
              People in Dresden
            </div>
            <div class="flex justify-center mb-8">
              <div class="bg-gray-200 rounded font-marc text-center px-12 py-1 mt-6 header-subtitle">
                Stories from the city of Dresden
              </div>
            </div>
          </div>
        </div>
        <div class="header-navigation flex justify-center items-center absolute w-full py-2">
<!--          <div class="navigation-group font-marc md:block hidden">-->
<!--            <a href="">Team</a>-->
<!--          </div>-->
<!--          <div class="navigation-group font-marc md:block hidden">-->
<!--            <a href="">Presse</a>-->
<!--          </div>-->
          <div class="bg-white hover:bg-dd cursor-pointer h-12 w-12  flex items-center justify-center rounded-full mb-4 md:mb-0" @click="scroll">
            <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.83265 12.5968L0.343249 3.1073C-0.114417 2.64963 -0.114417 1.90764 0.343249 1.45003L1.45004 0.343238C1.90692 -0.113646 2.6474 -0.114526 3.10536 0.341285L10.6613 7.86184L18.2172 0.341285C18.6752 -0.114526 19.4157 -0.113646 19.8725 0.343238L20.9793 1.45003C21.437 1.90769 21.437 2.64968 20.9793 3.1073L11.49 12.5968C11.0323 13.0544 10.2903 13.0544 9.83265 12.5968Z" fill="#333333"/>
            </svg>
          </div>
<!--          <div class="navigation-group font-marc md:block hidden">-->
<!--            <a href="">Mission</a>-->
<!--          </div>-->
<!--          <div class="navigation-group font-marc md:block hidden">-->
<!--            <a href="">Stadt</a>-->
<!--          </div>-->
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="fixed-nav fixed z-50 top-0 w-full bg-white py-1" v-if="fixedHeader">
        <div class="flex justify-between container mx-auto px-12">
          <div class="font-marc font-bold items-center flex">
            <button class="btn font-bold uppercase" @click="goToAbout">
              About
            </button>
          </div>
          <div ref="title" class="hidden lg:block">
            <h1 class="text-center">People in Dresden</h1>
          </div>
          <div class="flex items-center justify-end">
            <div class="language font-marc">
              <button class="btn rounded-l transition-all font-bold" :class="lang === 'en' ? 'btn-dd' : ''" @click="switchEnglish">
                EN
              </button>
              <button class="btn rounded-r transition-all font-bold" :class="lang === 'de' ? 'btn-dd' : ''" @click="switchGerman">
                DE
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="container mx-auto px-12" ref="container">
      <vue-masonry-wall :items="items" :options="options" @append="append">
        <template v-slot:default="{item}">
          <interview-card :interview="item" @click="openModal(item)"/>
        </template>
      </vue-masonry-wall>
    </div>
    <router-view/>
  </div>
</template>

<script>
import VueMasonryWall from "vue-masonry-wall";
import {InterviewService} from "@/service/InterviewService";
import InterviewCard from "@/components/InterviewCard";

const interviewService = new InterviewService();

export default {
  name: 'Home',
  components: {
    VueMasonryWall, InterviewCard
  },
  data() {
    return {
      bannerStyle: {
        'height': '100vh',
        backgroundImage: `url('./kulturpalast.jpeg')`,
        // backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center',
        backgroundSize: 'cover',
        // backgroundAttachment: 'fixed',
        display: 'block'
      },
      banner: true,
      fixedHeader: false,
      headerObserver: undefined,
      // sidebarOpen: false,
      options: {
        width: 400,
        padding: {
          default: 35,
          1: 30
        },
      },
      items: [],
      running: false
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang
    }
  },
  mounted() {
    this.append();
    this.observeHeader();
    document.addEventListener('keyup', (e) => {
      if (e.code === "Escape" && this.$router.currentRoute.name !== "Home") {
        this.$router.push('/');
      }
    });
  },
  methods: {
    append() {
      if (this.running) return;
      this.running = true;
      var start = this.items.length;
      interviewService.getInterviews(start / 25, 25).then(interviews => {
        for (let i = 0; i < interviews.length; i++) {
          this.items.push(interviews[i])
        }
        this.running = false;
      });
    },
    openModal(interview) {
      console.log("Open modal ", interview)
      document.body.classList.add('overflow-hidden')
      this.$router.push('/interview/' + interview.id);
    },
    goToAbout() {
      console.log("Go to about")
      document.body.classList.add('overflow-hidden')
      this.$router.push('/about');
    },
    switchGerman() {
      this.$store.commit('switchGerman')
    },
    switchEnglish() {
      this.$store.commit('switchEnglish')
    },
    scroll() {
      const element = this.$refs["container"];
      element.scrollIntoView({behavior: "smooth"});
    },
    toggleFixedHeader(value) {
      this.fixedHeader = value;
    },
    observeHeader() {
      this.headerObserver = new IntersectionObserver(
          (entry) => {
            this.toggleFixedHeader(!entry[0].isIntersecting)
          }, {rootMargin: '50%', threshold: .1}
      )
      this.headerObserver.observe(this.$refs['headerTitle']);
    },
  }
}
</script>

<style lang="scss">

.btn {
  @apply py-2 px-4 bg-gray-100;
}
.btn:hover:not(.btn-dd) {
  @apply bg-gray-300;
}
.btn-dd {
  @apply bg-dd text-black;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .25s
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0
}

.navigation-group {
  font-size: 36px;
  color: white;
  @apply py-2 px-4 rounded hover:text-dd;
}

.header-title {
  font-size: 100px;
  line-height: 7rem;
}

.header-subtitle {
  font-size: 36px;
}

@media (max-width: 1024px) {
  .header-title {
    font-size: 60px;
    line-height: 5rem;
  }
  .header-subtitle {
    font-size: 24px;
  }
}
@media (max-width: 640px) {
  .header-title {
    font-size: 40px;
    line-height: 3rem;
  }
  .header-subtitle {
    font-size: 18px;
  }
}
</style>
