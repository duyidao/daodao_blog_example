<script setup lang="ts">
import { onMounted } from "vue";
import { useTemplateRef } from './index'

const containerRef = useTemplateRef('elRef')
const containerRef1 = useTemplateRef('aRef')
onMounted(() => {
})
</script>

<template>
  <div ref="elRef">{{ containerRef }}</div>
  <p ref="aRef">{{ containerRef1 }}</p>
</template>

<style scoped></style>