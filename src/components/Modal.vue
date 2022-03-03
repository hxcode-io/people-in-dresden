<template>
  <div class="modal fixed max-h-full h-full w-full top-0 left-0 bg-gray-100 z-50 overflow-y-scroll"
       :class="openModal ? 'modal-active' : 'opacity-0 pointer-events-none'">

    <div class="flex justify-end items-center p-4 absolute right-2 top-2">
      <div class="modal-close cursor-pointer z-50" @click="toggleModal">
        <svg width="48px" height="48px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" fill="white" fill-opacity="0.01"/>
          <path d="M8 8L40 40" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 40L40 8" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <div class="container min-h-full w-full bg-white mx-auto" style="max-width: 1024px">
      <div v-if="interview">
        <div class="">
          <img :src="interview.imageUrl" :alt="interview.de.slice(0, 20)" class="w-full ">
        </div>
        <div class="px-24 py-12 text-gray-700 border-t-8 border-dd" style="line-height: 32px;">
          <transition name="fade" mode="out-in">
            <div class="">
              <p class="whitespace-pre-line" v-if="lang === 'de'">
                {{ interview.de }}
              </p>
              <p class="whitespace-pre-line" v-else>
                {{ interview.en }}
              </p>
              <div class="flex justify-between mt-6 text-gray-400">
                <span>{{ interview.published_at.toLocaleDateString(localeForDate, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
                <!--                  <span class="hover:underline cursor-pointer">-->
                <!--                    <span v-if="lang === 'de'" @click.stop="$emit('toggleLangEn')">English version</span>-->
                <!--                    <span v-if="lang === 'en'" @click.stop="$emit('toggleLangDe')">Deutsche version</span>-->
                <!--                  </span>-->
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    interview: Object,
    openModal: Boolean
  },
  data() {
    return {
      lang: "de",
      localeForDate: "de-DE"
    }
  },
  methods: {
    toggleModal() {
      this.$emit('closeModal');
    }
  }
}
</script>

<style lang="scss">
.modal {
  transition: opacity 0.2s ease-in;
}
</style>
