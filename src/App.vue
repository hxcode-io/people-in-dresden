<template>
  <div class="mx-auto h-full w-full p-8 border-t-8 border-b-8 hover:translate-x-2">
    <div class="container mx-auto">
      <!-- <dd-header></dd-header> -->
      <div class="grid grid-cols-3 mb-4">
        <div class="font-marc flex items-center">
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
        <div clss="flex justify-center">
          <h1 class="text-center">People in Dresden</h1>
          <!-- <h2 class="text-center">And Their Stories</h2> -->
        </div>
        <div class="font-marc flex items-center justify-end">
          <button class="btn transition-all font-bold" :class="lang === 'en' ? 'btn-dd' : ''" @click="toggleLanguage('en')">
            EN
          </button>
          <button class="btn transition-all font-bold" :class="lang === 'de' ? 'btn-dd' : ''" @click="toggleLanguage('de')">
            DE
          </button>
        </div>
      </div>
      <div class="masonry lg:masonry-3-col md:masonry-2-col">
        <post-card v-for="post in posts" 
                  :key="post.text.de" 
                  :post="post" 
                  :lang="lang"
                  @openModal="openModal"
                  class="my-6 masonry-item"/>
      </div>
    </div>
    <modal :openModal="modalOpened" 
            :post="activePost" 
            :lang="lang" 
            @closeModal="closeModal"></modal>
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
      posts: new PostService().getPosts(),
      lang: ref('en'),
      activePost: ref<Post | undefined>(),
      modalOpened: ref(false)
    };
  },
  methods: {
    toggleLanguage(lang: 'en' | 'de') {
      this.lang = lang;
    },
    closeModal() {
      this.modalOpened = false;
      document.body.classList.toggle('overflow-hidden')
      setTimeout(() => {
        this.activePost = undefined;
      }, 200);
    },
    openModal(post: Post) {
      this.activePost = post;
      this.modalOpened = true;
      document.body.classList.toggle('overflow-hidden')
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
  column-gap: 2em;
}

.masonry-item { /* Masonry bricks or child elements */
  display: inline-block;
  width: 100%;
}

</style>
