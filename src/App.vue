<template>
  <div class="container mx-auto bg-white h-full p-24">
    <h1>People in Dresden</h1>
    <post v-for="post in json" :key="post.timestamp"
          :text="post.data[0].post"
          :img="post.attachments[0].data[0].media.uri" class="m-16"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue'
import Post from './components/Post.vue'
import json from './posts_1.json';

export default defineComponent({
  name: 'App',
  components: {
    Post
  },
  setup: () => {
    onMounted(() => {
      console.log('Component is mounted!', json)
    })
    return { json };
  }
})
</script>

<style>

</style>
