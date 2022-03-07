<template>
  <span v-if="lang==='en'">{{en}}</span>
  <span v-else-if="lang==='de'">{{de}}</span>
</template>

<script>
export default {
  props: {
    en: String,
    de: String
  },
  computed: {
    lang() {
      return this.$store.state.lang;
    }
  }
}
</script>