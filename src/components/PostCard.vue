<template>
  <div class="pt-0 rounded transform hover:shadow-xl hover:-translate-y-1 hover:translate-x-1 transition-all cursor-pointer text-gray-500 hover:text-gray-700" @click="openModal">
    <div>
      <img :src="post.imageUrl" :alt="lang === 'de' ? post.de.slice(0, 20) : post.en.slice(0,20)" class="w-100 rounded-t">
    </div>
    <div class="px-10 py-4 bg-white shadow-sm border-t-8 border-dd">
      <span class="text-gray-400">{{ post.published_at.toLocaleDateString(localeForDate, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
      <transition name="fade" mode="out-in">
        <p class="whitespace-pre-line my-2" v-if="lang === 'de'">
          {{ post.de.substring(1,350) + '...' }}
        </p>
        <p class="whitespace-pre-line my-2" v-else>
          {{ post.en.substring(1,350) + '...' }}
        </p>
      </transition>

      <div class="flex justify-between items-center my-4 text-gray-400">
        <span v-if="readmore" @click="openModal" class="font-semibold">
          <span v-if="lang === 'de'">Weiterlesen...</span>
          <span v-else>Read more...</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from 'vue'
import { Interview } from '../service/InterviewService'
import { Post } from '../service/PostService'

export default defineComponent({
  name: 'PostCard',
  props: {
    post: {
      type: Object as PropType<Interview>, // see https://stackoverflow.com/questions/64325502/vue-js-3-props-type-validation-with-custom-type
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
  setup(props) {
    const localeForDate = computed<string>(() => props.lang === "de" ? "de-DE" : "en-EN" )
    return {
      localeForDate,
      // optionsForDate: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
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
