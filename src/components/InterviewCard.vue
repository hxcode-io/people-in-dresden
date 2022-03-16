<template>
  <div v-if="interview" class="interview transform transition duration-500 hover:scale-105" @click="$emit('click')">
    <img class="image" v-if="interview" :src="interview.imageUrl"/>
    <div class="text">
      {{ text }}
      <div class="date">{{ interview.published_at.toLocaleDateString(localeForDate, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InterviewCard',
  props: {
    interview: Object
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
    localeForDate() {
      return this.lang === "de" ? "de-DE" : "en-EN";
    },
    text() {
      if (this.lang === "de") return this.interview.de.substring(0,180) + '...'
      return this.interview.en.substring(0,180) + '...'
    }
  }
}
</script>

<style lang="scss">
.interview {
  @apply rounded-xl relative cursor-pointer text-gray-600 hover:text-gray-700;
  overflow: hidden;
  width: 100%;
  background: white;
  .image {
    object-fit: cover;
    width: 100%;
    height: 100%;
    line-height: 0;
    display: block;
  }
  .date {
    @apply text-gray-400 mt-2;
  }
  .text {
    @apply border-t-8 border-dd;
    padding: 20px 30px;
    line-height: 1.6em;
  }
}
</style>
