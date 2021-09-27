<template>
  <div class="mx-auto h-full w-full pb-8 border-b-8 hover:translate-x-2" :class="{ 'pt-8 border-t-8': !banner }">
    <div v-if="banner" class="mb-16 border-b-8 border-dd" style="height: 100vh;">
      <!-- <img src="/images/denis-jung-ybG6toJN3iE-unsplash.jpg"
           class="w-full h-full" style="object-fit: cover;" alt="big header"> -->
      <img src="/images/nicole-kurtze--Yvw4_mrjcI-unsplash.jpg"
           class="w-full h-full" style="object-fit: cover;" alt="big header">
      <div class="overlay bg-black z-10 absolute top-0 opacity-20 h-full w-full"></div>
      <div class="header-content absolute top-0 w-full h-full z-20">
        <div class="header-logo flex justify-center items-center h-full flex-col">
          <div class="text-white font-marc" style="font-size: 100px;">
            People in Dresden
          </div>
          <div class="bg-gray-200 rounded font-marc text-center px-12 py-1" style="font-size: 45px;">
            Stories from the city of Dresden
          </div>
        </div>
        <div class="header-navigation flex justify-evenly items-center absolute bottom-2 w-full bg-black bg-opacity-40">
          <div class="navigation-group font-marc">
            <a href="">Team</a>
          </div>
          <div class="navigation-group font-marc">
            <a href="">Presse</a>
          </div>
          <div class="bg-gray-200 hover:bg-dd cursor-pointer h-12 w-12  flex items-center justify-center rounded-full" @click="scroll">
            <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.83265 12.5968L0.343249 3.1073C-0.114417 2.64963 -0.114417 1.90764 0.343249 1.45003L1.45004 0.343238C1.90692 -0.113646 2.6474 -0.114526 3.10536 0.341285L10.6613 7.86184L18.2172 0.341285C18.6752 -0.114526 19.4157 -0.113646 19.8725 0.343238L20.9793 1.45003C21.437 1.90769 21.437 2.64968 20.9793 3.1073L11.49 12.5968C11.0323 13.0544 10.2903 13.0544 9.83265 12.5968Z" fill="#333333"/>
            </svg>
          </div>
          <div class="navigation-group font-marc">
            <a href="">Mission</a>
          </div>
          <div class="navigation-group font-marc">
            <a href="">Stadt</a>
          </div>
        </div>
      </div>
    </div>
    <div v-if="banner" class="mb-16 text-black flex justify-center z-20">
    </div>
    <div class="container mx-auto">
      <!-- <dd-header></dd-header> -->
      <div class="grid grid-cols-3 mb-4">
        <div class="font-marc flex items-center">
          <!-- TODO: 
                Seiten: Team, Mission, Presse
                UI optimieren: button header (?) slogan
                load more button
                animationstool
                Datum
          -->
          <!-- <button class="btn">
            Team
          </button>
          <button class="btn">
            Team
          </button>
          <button class="btn">
            Team
          </button>
          <button class="btn">
            Team
          </button>
          <button class="btn">
            Team
          </button> -->
        </div>
        <div ref="title">
          <h1 class="text-center">People in Dresden</h1>
          <h2 v-if="subtitle" class="text-center">And Their Stories</h2>
        </div>
        <div class="font-marc flex items-center justify-end">
          <button class="btn rounded-l transition-all font-bold" :class="lang === 'en' ? 'btn-dd' : ''" @click="toggleLanguage('en')">
            EN
          </button>
          <button class="btn rounded-r transition-all font-bold" :class="lang === 'de' ? 'btn-dd' : ''" @click="toggleLanguage('de')">
            DE
          </button>
        </div>
      </div>
      <div class="masonry lg:masonry-3-col md:masonry-2-col">
        <post-card v-for="post in posts"
                   :key="post.text.de"
                   :post="post"
                   :lang="lang"
                   :readmore="readmore"
                   @openModal="openModal"
                   class="my-6 masonry-item"/>
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
import {defineComponent, ref} from 'vue'
import PostCard from './components/PostCard.vue'
import {Post, PostService} from "./service/PostService";
import Modal from './components/Modal.vue';

export default defineComponent({
  name: 'App',
  components: {
    PostCard,
    Modal
  },
  setup: () => {
    return {
      posts: new PostService().getPosts(3),
      lang: ref('en'),
      activePost: ref<Post | undefined>(),
      modalOpened: ref(false),
      banner: ref(true),
      subtitle: ref(true),
      readmore: ref(false)
    };
  },
  mounted() {
    window.addEventListener('keydown', event => {
      if (event.key === 'Escape') this.closeModal();
      if (event.key === '1') this.banner = !this.banner;
      if (event.key === '2') this.subtitle = !this.subtitle;
      if (event.key === '3') this.readmore = !this.readmore;
    });
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
    openModal(post: Post) {
      this.activePost = post;
      this.modalOpened = true;
      document.body.classList.add('overflow-hidden')
    },
    scroll() {
      const element: HTMLElement | undefined = this.$refs["title"] as HTMLElement;
      element.scrollIntoView({behavior: "smooth"});
    }
  },
})
</script>

<style>

.btn {
  @apply py-2 px-4 bg-gray-200;
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

.fade-enter,
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
</style>
