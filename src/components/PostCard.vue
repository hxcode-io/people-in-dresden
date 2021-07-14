<template>
  <div>
    <img :src="post.imgSrc" :alt="post.text.de.slice(0, 20)" class="w-64">
    <p class="whitespace-pre-line my-4">
      <span class="block text-gray-400">Deutsch:</span>
      {{ post.text.de }}
    </p>
    <p class="whitespace-pre-line my-4">
      <span class="block text-gray-400">Englisch:</span>
      {{ post.text.en }}
    </p>
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
    }
  }
})
</script>

<style scoped>
</style>
