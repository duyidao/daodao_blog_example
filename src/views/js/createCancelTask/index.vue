<script setup lang="ts">
import { ref } from 'vue'

const data = ref<string>('暂无数据')

// 定义 PromiseResolve 和 PromiseReject 类型别名，便于复用
type PromiseResolve<T> = (value: T | PromiseLike<T>) => void;
type PromiseReject<T> = (reason?: any) => void;

function createCancelTask<T>(task: (...args: any[]) => Promise<T>) {
  let cancel = () => {};
  return (...args: any[]) => {
    return new Promise<T>((resolve: PromiseResolve<T>, reject: PromiseReject<T>) => {
      cancel()
      cancel = () => { 
        resolve = reject = () => {} 
      } 
      task(...args).then(res => resolve(res)).catch(err => reject(err));
    });
  }
}

const getData = createCancelTask<string>((title: string = '1') => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(title)
    }, 2000)
  })
})

const getTitleData = (params: string) => {
  getData(params).then((res: string) => {
    data.value = res
  })
}
</script>

<template>
  <div>
    <el-button @click="getTitleData('hello')">获取Hello</el-button>
    <el-button @click="getTitleData('world')">获取World</el-button>
    <el-button @click="getTitleData('daodao')">获取Daodao</el-button>
    <el-button @click="getTitleData('blog')">获取Blog</el-button>
    <div class="mt-20">
      <el-tag>{{data}}</el-tag>
    </div>
  </div>
</template>

<style scoped>

</style>