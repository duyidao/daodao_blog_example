<script setup lang="ts">
import { preloadImages } from './index'

const images = [
  'https://picsum.photos/2000/1000?random=1',
  'https://picsum.photos/2000/1000?random=2',
  'https://picsum.photos/2000/1000?random=3',
  'https://picsum.photos/2000/1000?random=4',
  'https://picsum.photos/2000/1000?random=5',
  'https://picsum.photos/2000/1000?random=6',
  'https://picsum.photos/2000/1000?random=7',
  'https://picsum.photos/2000/1000?random=8',
  'https://picsum.photos/2000/1000?random=9',
  'https://picsum.photos/2000/1000?random=10',
];

preloadImages(images);
</script>

<template>
  <div>
    <img v-for="image in images" :key="image" :src="image" class="w-200 h-100" />
  </div>
</template>

<style scoped>

</style>