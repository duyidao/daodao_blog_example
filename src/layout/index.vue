<script lang="ts" setup>
import { routes } from '@/router/router'
import { ref, computed } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Expand,
  Fold,
  Briefcase,
} from '@element-plus/icons-vue'
import { RouterView, useRoute } from 'vue-router'
import { useEvent } from '@/views/vue/useEventListener/index'
import { throttle } from 'lodash-es'

type AllowedPath = '/js' | '/package' | '/vue'

const pathIconMap: Record<AllowedPath, typeof Document> = {
  '/js': Document,
  '/package': Briefcase,
  '/vue': IconMenu,
}

const route = useRoute()

const menuList = computed(() => routes.value[0]!.children)

// 当前菜单是否展开
const isCollapse = ref(false)
const handleMenuExpand = () => {
  isCollapse.value = !isCollapse.value
}

const scrollWindow = () => {
  const viewportWidth = window.innerWidth;
  isCollapse.value = viewportWidth < 1024 ? true : false
}
scrollWindow()
// 监听窗口大小变化
useEvent('resize', throttle(scrollWindow, 500))
</script>

<template>
  <div class="flex w-full h-full">
    <div class="menu h-full pb-10 shadow-xl">
      <el-menu class="h-[calc(100%-50px)] !border-r-none overflow-auto"
        :class="{ 'w-250': !isCollapse }"
        :default-active="route.path"
        :collapse="isCollapse"
        router>
        <el-sub-menu v-for="item in menuList"
          :key="item.path"
          :index="item.path">
          <template #title>
            <el-icon el-icon>
              <component :is="pathIconMap[item.path as AllowedPath]" />
            </el-icon>
            <span>{{ item.path.replace('/', '').toUpperCase() }}</span>
          </template>
          <el-menu-item v-for="route in item.children"
            :key="route.path"
            :index="route.path">
            <span>{{ route.meta!.name }}</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
      <div class="flex w-full h-50 items-center justify-start bg-[var(--el-menu-bg-color)] pl-15">
        <el-icon class="cursor-pointer"
          size="30"
          color="#505050"
          @click="handleMenuExpand">
          <Expand v-show="isCollapse" />
          <Fold v-show="!isCollapse" />
        </el-icon>
      </div>
    </div>
    <div class="p-15 flex-1">
      <el-card class="h-full">
        <RouterView />
      </el-card>
    </div>
  </div>
</template>

<style lang="less" scoped>
.menu {
  :deep(.el-menu) {
    &::-webkit-scrollbar {
      width: 0;
    }
  }
}
</style>
