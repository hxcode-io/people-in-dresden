<template>
  <div class="modal modal-active fixed h-full top-0 left-0 flex items-center justify-center"
        :class="openModal ? 'modal-active' : 'opacity-0 pointer-events-none'">

    <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
    
    <div class="modal-container bg-white h-screen w-screen px-8 py-16 shadow-lg z-50">

      <div class="flex justify-end items-center p-4 absolute right-2 top-2">
        <div class="modal-close cursor-pointer z-50" @click="toggleModal">
          <svg width="48px" height="48px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" fill="white" fill-opacity="0.01"/>
            <path d="M8 8L40 40" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 40L40 8" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <div class="modal-content container mx-auto pt-2 overflow-y-auto">
        <div class="grid grid-cols-1 lg:grid-cols-10 gap-24 mb-6" v-if="post">
          <div class="lg:col-span-6">
            <img :src="post.imgSrc" :alt="post.text.de.slice(0, 20)" class="w-100 rounded">
          </div>
          <div class="lg:col-span-4 mr-4 text-gray-700" style="line-height: 27px;">
            <transition name="fade" mode="out-in">
              <div>
                <p class="whitespace-pre-line" v-if="lang === 'de'">
                  {{ post.text.de }}
                </p>
                <p class="whitespace-pre-line" v-else>
                  {{ post.text.en }}
                </p>
                <div class="flex justify-between mt-6 text-gray-400">
                  <span>12. August 20021</span>
                  <span class="hover:underline cursor-pointer">
                    <span v-if="lang === 'de'" @click.stop="$emit('toggleLangEn')">English version</span>
                    <span v-if="lang === 'en'" @click.stop="$emit('toggleLangDe')">Deutsche version</span>
                  </span>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Post } from '../service/PostService';

export default defineComponent({
  name: 'Modal',
  setup() {
    return {
      // modalActive: false
    }
  },
  props: {
    post: Object as PropType<Post>,
    lang: {
      type: String, // see https://stackoverflow.com/questions/64325502/vue-js-3-props-type-validation-with-custom-type
      required: true
    },
    openModal: Boolean
  },
  methods: {
    toggleModal() {
      this.$emit('closeModal');
    }
  }
})
</script>

<style scoped>
.modal {
  transition: opacity 0.2s ease-in;
}
.modal-content {
  height: calc(100vh - theme('spacing.16'));
}
</style>