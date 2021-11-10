<template>
  <div class="mx-auto h-full w-full pb-8 border-b-8 hover:translate-x-2 flex-1" :class="{ 'pt-8 border-t-8': !banner }">
    <div v-if="banner" class="mb-16 border-b-8 border-dd" :style="bannerStyle">
      <!-- <img src="/images/denis-jung-ybG6toJN3iE-unsplash.jpg"
           class="w-full h-full" style="object-fit: cover;" alt="big header"> -->
      <!-- <img src="/images/nicole-kurtze--Yvw4_mrjcI-unsplash.jpg"
           class="w-full h-full" style="object-fit: cover;" alt="big header"> -->
      <div class="overlay bg-black z-10 absolute top-0 opacity-20 h-full w-full -mt-2"></div>
      <div class="header-content absolute top-0 w-full h-full z-20">
        <div class="header-logo flex justify-center items-center h-full flex-col -mt-12">
          <div class="text-white font-marc header-title" ref="headerTitle">
            People in Dresden
          </div>
          <div class="bg-gray-200 rounded font-marc text-center px-12 py-1 header-subtitle">
            Stories from the city of Dresden
          </div>
        </div>
        <div class="header-navigation flex justify-evenly items-center absolute bottom-2 w-full bg-black bg-opacity-40">
          <div class="navigation-group font-marc md:block hidden">
            <a href="">Team</a>
          </div>
          <div class="navigation-group font-marc md:block hidden">
            <a href="">Presse</a>
          </div>
          <div class="bg-gray-200 hover:bg-dd cursor-pointer h-12 w-12  flex items-center justify-center rounded-full mb-4 md:mb-0" @click="scroll">
            <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.83265 12.5968L0.343249 3.1073C-0.114417 2.64963 -0.114417 1.90764 0.343249 1.45003L1.45004 0.343238C1.90692 -0.113646 2.6474 -0.114526 3.10536 0.341285L10.6613 7.86184L18.2172 0.341285C18.6752 -0.114526 19.4157 -0.113646 19.8725 0.343238L20.9793 1.45003C21.437 1.90769 21.437 2.64968 20.9793 3.1073L11.49 12.5968C11.0323 13.0544 10.2903 13.0544 9.83265 12.5968Z" fill="#333333"/>
            </svg>
          </div>
          <div class="navigation-group font-marc md:block hidden">
            <a href="">Mission</a>
          </div>
          <div class="navigation-group font-marc md:block hidden">
            <a href="">Stadt</a>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="fixed-nav fixed z-50 top-0 w-full bg-gray-100 py-1 md" v-if="fixedHeader">
        <div class="grid md:grid-cols-3 grid-cols-2  container mx-auto">
          <div class="font-marc font-bold items-center hidden md:flex">
            <!-- TODO: 
                  animationstool (?)
                  mobile ansicht, slider
                  masonry
            -->
            <button class="btn font-bold">
              TEAM
            </button>
            <button class="btn ml-1 font-bold">
              PRESSE
            </button>
            <button class="btn ml-1 font-bold">
              MISSION
            </button>
            <button class="btn ml-1 font-bold">
              STADT
            </button>
          </div>
          <div ref="title" class="col-span-2 md:col-span-1">
            <h1 class="text-center">People in Dresden</h1>
          </div>
          <div class="md:hidden">
            <button class="btn" @click="sidebarOpen = !sidebarOpen">
              <svg viewBox="0 0 100 80" width="24" height="24">
                <rect width="100" height="10"></rect>
                <rect y="30" width="100" height="10"></rect>
                <rect y="60" width="100" height="10"></rect>
              </svg>          
            </button>
          </div>
          <div class=" flex items-center justify-end">
            <div class="pagination mr-5 flex align-items-center">
              <button class="btn rounded-l transition-all font-bold font-marc" @click="loadPage(--currentPage)" :disabled="currentPage===0">
                <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="w-3"><path fill="#333" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" class=""></path></svg>
              </button>
              <span class="p-2">{{currentPage}}</span>
              <!-- <input disabled type="number" v-model="currentPage" min="0" class="w-12 px-2"> -->
              <button class="btn rounded-r transition-all font-bold font-marc" @click="loadPage(++currentPage)">
                <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="w-3"><path fill="#333" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" class=""></path></svg>
              </button>
            </div>
            <div class="language font-marc">
              <button class="btn rounded-l transition-all font-bold" :class="lang === 'en' ? 'btn-dd' : ''" @click="toggleLanguage('en')">
                EN
              </button>
              <button class="btn rounded-r transition-all font-bold" :class="lang === 'de' ? 'btn-dd' : ''" @click="toggleLanguage('de')">
                DE
              </button>
            </div>
          </div>
        </div>
        <div class="container mx-auto mobile-menu pt-2" :class="{'hidden': !sidebarOpen}">
          <ul class="">
            <li><a class="block p-4 hover:bg-dd">Team</a></li>
            <li><a class="block p-4 hover:bg-dd transition duration-300">Presse</a></li>
            <li><a class="block p-4 hover:bg-dd transition duration-300">Mission</a></li>
            <li><a class="block p-4 hover:bg-dd transition duration-300">Stadt</a></li>
          </ul>
        </div>

      </div>
    </transition>
    <div class="container mx-auto pt-16 flex-grow flex flex-col h-full relative" ref="container"> 
      <div class="flex mb-4">
        <div class="w-1/3 px-2" v-for="(col, i) in interviewCols" :key="i" :ref="'col'+i">
          <post-card v-for="post in col.value"
                    :key="post.de"
                    :post="post"
                    :lang="lang"
                    :readmore="readmore"
                    @openModal="openModal"
                    class="my-6 masonry-item"
                    />
        </div>
      </div>
    </div>
    <modal :openModal="modalOpened"
           :post="activePost"
           :lang="lang"
           @toggleLangDe="lang = 'de'"
           @toggleLangEn="lang = 'en'"
           @closeModal="closeModal"/>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, Ref, ref} from 'vue'
import PostCard from './components/PostCard.vue'
import Modal from './components/Modal.vue';
import {Interview, InterviewService} from "./service/InterviewService";

export default defineComponent({
  name: 'App',
  components: {
    PostCard,
    Modal
  },
  setup: () => {
    const interviewService = new InterviewService();
    const idx = ref(1);
    const interviewsCol1 = ref<Interview[]>([]);
    const interviewsCol2 = ref<Interview[]>([]);
    const interviewsCol3 = ref<Interview[]>([]);
    const interviewCols = ref<Ref<Interview[]>[]>([
      interviewsCol1,
      interviewsCol2,
      interviewsCol3,
    ]);
    const bannerStyle = {
      'height': '100vh', 
      backgroundImage: `url('./images/kulturpalast.jpeg')`,
      // backgroundImage: `url('./images/nicole-kurtze--Yvw4_mrjcI-unsplash.jpg')`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      display: 'block'
    };
    return {
      idx,
      lang: ref('en'),
      activePost: ref<Interview | undefined>(),
      modalOpened: ref(false),
      banner: ref(true),
      subtitle: ref(true),
      readmore: ref(true),
      fixedHeader: ref(false),
      bannerStyle,
      headerObserver: ref<IntersectionObserver | undefined>(),
      loadmoreObserver: ref<IntersectionObserver | undefined>(),
      sidebarOpen: ref(false),
      interviewCols,
      interviewService,
      currentPage: ref(1)
    };
  },
  mounted() {
    window.addEventListener('keydown', event => {
      if (event.key === 'Escape') this.closeModal();
      if (event.key === '1') this.banner = !this.banner;
      if (event.key === '2') this.subtitle = !this.subtitle;
      if (event.key === '3') this.readmore = !this.readmore;
    });

    this.observeHeader();
    this.initInterviews();
  },
  destroyed() {
    this.headerObserver?.unobserve(this.$refs['headerTitle'] as Element);
    this.loadmoreObserver?.unobserve(this.$refs['loadMore'] as Element);
  },
  methods: {
    toggleLanguage(lang: 'en' | 'de') {
      this.lang = lang;
    },
    closeModal() {
      console.log("Close modal")
      this.modalOpened = false;
      document.body.classList.remove('overflow-hidden')
    },
    openModal(post: Interview) {
      this.activePost = post;
      this.modalOpened = true;
      document.body.classList.add('overflow-hidden')
    },
    scroll() {
      const element: HTMLElement | undefined = this.$refs["container"] as HTMLElement;
      element.scrollIntoView({behavior: "smooth"});
    },
    loadPage(page?: number) {
      if(page) this.currentPage = page < 1 ? 1 : page;
      this.interviewService.getInterviews(this.currentPage, 25)
                          .then(interviews => {
                            this.interviewCols = [ref<Interview[]>([]), ref<Interview[]>([]), ref<Interview[]>([])];
                            this.addInterviews(interviews);
                            this.scroll();
                          })
    },
    toggleFixedHeader(value: boolean) {
      this.fixedHeader = value;
    },
    observeHeader() {
      this.headerObserver = new IntersectionObserver(
        (entry, opts) => {
          this.toggleFixedHeader(!entry[0].isIntersecting)
        }, {rootMargin: '50%', threshold: .1}
      )
      this.headerObserver.observe(this.$refs['headerTitle'] as Element);
    },
    initInterviews() {
      this.interviewService.getInterviews(0, 25).then(interviews => {
        this.addInterviews(interviews);
      });
    },
    addInterviews(interviews: Interview[]) {
      interviews.forEach((interview, i) => {
        const col = this.interviewCols[i%3];
        col.value.push(interview);
      })
    }
  }
})
</script>

<style>

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

.masonry { /* Masonry container */
  column-gap: 3em;
}

.masonry-item { /* Masonry bricks or child elements */
  display: inline-block;
  width: 100%;
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
