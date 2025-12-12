<script setup lang="ts">
import {createReusableTemplate} from './commomComp'

const [DefineTemplate, UseTemplate] = createReusableTemplate()
</script>

<template>
  <DefineTemplate>
    <template #default="{title, onFoo}">
      <div class="container" @click="onFoo && onFoo(111)">
        <div class="title">{{title}}</div>
        <div class="content">内容</div>
      </div>
    </template>
  </DefineTemplate>
  <UseTemplate title="header" @foo="console.log"></UseTemplate>
  <div>111</div>
  <UseTemplate title="main"></UseTemplate>
  <p>2222</p>
  <div>333</div>
  <UseTemplate title="footer"></UseTemplate>
</template>

<style scoped>

</style>