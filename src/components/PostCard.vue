<template>
  <div class="pt-0 rounded transform hover:shadow-xl hover:-translate-y-1 hover:translate-x-1 transition-all cursor-pointer text-gray-500 hover:text-gray-700" @click="openModal">
    <div>
      <img :src="post.imgSrc" :alt="lang === 'de' ? post.text.de.slice(0, 20) : post.text.en.slice(0,20)" class="w-100 rounded-t">
    </div>
    <div class="px-10 py-4 bg-white shadow-sm border-t-8 border-dd">
      <transition name="fade" mode="out-in">
        <p class="whitespace-pre-line my-2" v-if="lang === 'de'">
          {{ post.text.de.substring(1,350) + '...' }}
        </p>
        <p class="whitespace-pre-line my-2" v-else>
          {{ post.text.en.substring(1,350) + '...' }}
        </p>
      </transition>
      <button v-if="readmore"
              @click="openModal"
              class="py-2 px-4 mt-2 transition-all font-semibold border-l-4 hover:border-dd bg-gray-100 hover:bg-gray-200">
        <span v-if="lang === 'de'">Weiterlesen...</span>
        <span v-else>Read more...</span>
      </button>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Post } from '../service/PostService'

export default defineComponent({
  name: 'PostCard',
  props: {
    post: {
      type: Object as PropType<Post>, // see https://stackoverflow.com/questions/64325502/vue-js-3-props-type-validation-with-custom-type
      required: true
    },
    lang: {
      type: String,
      required: true
    },
    readmore: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    openModal() {
      this.$emit('openModal', this.post);
    }
  }
})
</script>

<style scoped>
</style>
