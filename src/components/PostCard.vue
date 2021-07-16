<template>
  <div class="pt-0 rounded transform hover:shadow-xl hover:-translate-y-1 hover:translate-x-1 transition-all">
    <div class="cursor-pointer">
      <img :src="post.imgSrc" :alt="post.text.de.slice(0, 20)" class="w-100 rounded-t">
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
      <button class="py-2 px-4 mt-2 transition-all font-semibold bg-gray-100  hover:bg-gray-200">
        Weiterlesen...
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Post } from '../service/PostService.ts'

export default defineComponent({
  name: 'PostCard',
  props: {
    post: {
      type: Object as PropType<Post>, // see https://stackoverflow.com/questions/64325502/vue-js-3-props-type-validation-with-custom-type
      required: true
    },
    lang: {
      type: String as PropType<Post>, // see https://stackoverflow.com/questions/64325502/vue-js-3-props-type-validation-with-custom-type
      required: true
    }
  },
})
</script>

<style scoped>
</style>
