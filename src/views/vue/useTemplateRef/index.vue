<script setup lang="ts">
import {ref,onMounted, getCurrentInstance} from "vue";
import {useTemplateRef} from './index'

const containerRef = useTemplateRef('elRef')
const containerRef1 = useTemplateRef('aRef')
onMounted(() => {
  console.log(containerRef.value)
  console.log(containerRef1.value)
})
</script>

<template>
  <div ref="elRef">{{ containerRef }}</div>
  <p ref="aRef">{{ containerRef1 }}</p>
</template>

<style scoped>

</style>