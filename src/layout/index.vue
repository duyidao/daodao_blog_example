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
</script>

<template>
  <div class="flex w-full h-full">
    <div class="menu relative">
      <el-menu
        class="h-full border-r-none overflow-auto pb-60"
        :class="{ 'w-250': !isCollapse }"
        :default-active="route.path"
        :collapse="isCollapse"
        router
      >
        <el-sub-menu
          v-for="item in menuList"
          :key="item.path"
          :index="item.path"
        >
          <template #title>
            <el-icon el-icon>
              <component :is="pathIconMap[item.path as AllowedPath]" />
            </el-icon>
            <span>{{ item.path.replace('/', '').toUpperCase() }}</span>
          </template>
          <el-menu-item
            v-for="route in item.children"
            :key="route.path"
            :index="route.path"
          >
            <span>{{ route.meta!.name }}</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
      <el-icon
        class="absolute left-0 bottom-0 w-full h-60 items-center justify-start text-25 pl-15 cursor-pointer text-white bg-[var(--el-menu-bg-color)] transition-all duration-300"
        @click="handleMenuExpand"
      >
        <Expand v-show="!isCollapse" />
        <Fold v-show="isCollapse" />
      </el-icon>
    </div>
    <div class="p-20 flex-1">
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
