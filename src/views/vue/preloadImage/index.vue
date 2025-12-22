<script setup lang="ts">
import { preloadImages } from './index'

const images = [
  'https://picsum.photos/200/100?random=1',
  'https://picsum.photos/200/100?random=2',
  'https://picsum.photos/200/100?random=3',
  'https://picsum.photos/200/100?random=4',
  'https://picsum.photos/200/100?random=5',
  'https://picsum.photos/200/100?random=6',
  'https://picsum.photos/200/100?random=7',
  'https://picsum.photos/200/100?random=8',
  'https://picsum.photos/200/100?random=9',
  'https://picsum.photos/200/100?random=10',
];

preloadImages(images);
</script>

<template>
  <div>
    <img v-for="image in images" :key="image" :src="image" />
  </div>
</template>

<style scoped>

</style>