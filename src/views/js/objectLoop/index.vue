<script setup lang="ts">
function hasCircleRef(obj: any, seen = new Set<object>()): boolean {
  if (!(typeof obj === 'object' && obj !== null)) {
    return false
  }

  // 如果当前对象有存储到集合内，说明有循环引用
  if (seen.has(obj)) return true
  seen.add(obj)

  // 循环遍历对象的每一个属性
  return Object.values(obj).some(item => hasCircleRef(item, new Set(seen))) // [!code focus]
}

const obj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3
    }
  }
} as any

obj.f = obj
</script>

<template>
  <div>
    <!-- <span>{{ JSON.stringify(obj, null, 2) }}</span> -->
    <span>{{ hasCircleRef(obj) }}</span>
  </div>
</template>

<style scoped></style>