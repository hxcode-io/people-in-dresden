<template>
  <div class="container mx-auto bg-white h-full p-24">
    <h1 class="text-center">People in Dresden hi</h1>
    <h2 class="text-center uppercase mb-24">And Their Stories</h2>
    <post-card v-for="post in posts" :key="post.text.de" :post="post" class="m-8 py-8 border-b-2"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import PostCard from './components/PostCard.vue'
import {PostService} from "./service/PostService";

export default defineComponent({
  name: 'App',
  components: {
    PostCard
  },
  setup: () => {
    return {
      posts: new PostService().getPosts()
    };
  }
})
</script>

<style>

</style>
