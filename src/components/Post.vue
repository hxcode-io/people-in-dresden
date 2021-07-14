<template>
  <div>
    <p class="whitespace-pre-line">{{ textDecode }}</p>
    <img :src="imgSrc" :alt="alt" class="w-64">
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'Post',
  props: {
    text: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    }
  },
  setup: (props) => {
    let textDecode = props.text.replaceAll("\u00c3\u00a4", "ä")
    textDecode = textDecode.replaceAll("\u00c3\u00bc", "ü")
    textDecode = textDecode.replaceAll("\u00c3\u00b6", "ö")
    textDecode = textDecode.replaceAll("\u00e2\u0080\u0099", "'")
    textDecode = textDecode.replaceAll("\u00e2\u0080\u0093", "–")
    textDecode = textDecode.replaceAll("\u00c3\u009f", "ß")
    textDecode = textDecode.replaceAll("\u00c3\u009c", "Ü")
    textDecode = textDecode.replaceAll("\u00c3\u00a9", "é")
    textDecode = textDecode.replaceAll("\u00e2\u0080\u009d", "“")
    textDecode = textDecode.replaceAll("\u00e2\u0080\u009c", "”")

    return {
      imgSrc: "/images/" + props.img.slice(props.img.lastIndexOf("/")).slice(1),
      alt: textDecode.slice(0, 20),
      textDecode
    }
  }
})
</script>

<style scoped>
</style>
