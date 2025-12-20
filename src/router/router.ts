import { component } from "@/utils/component";
import { computed, shallowRef, type Component } from "vue";
import type { RouteRecordRaw } from "vue-router";

const componentsVue = import.meta.glob("@/views/**/**/index.vue", {
  eager: true, // 只获取导出结果
  import: "default", // 获取默认导出
});

export const allComponentRoutes = shallowRef(
  Object.entries(componentsVue).map(([key, item]) => {
    const path = key.replace(/\/src\/views/, "").replace(/\/index.vue$/, "");
    return {
      path,
      component: item as Component,
      meta: {
        ...component[path],
      },
    };
  })
);

export const routes = computed(() => {
  const data: RouteRecordRaw[] = [
    {
      path: "/",
      redirect: "/js/createCancelTask",
      children: [],
    },
  ];

  allComponentRoutes.value.forEach(({ path, component, meta }) => {
    const type = path.split("/")[1] as string;

    if (!data[0]!.children!.some((item) => item.path === `/${type}`)) {
      data[0]!.children!.push({
        path: `/${type}`,
        children: [],
        meta: {},
      });
    }

    data[0]!
      .children!.find((item) => item.path === `/${type}`)
      ?.children!.push({
        path,
        component,
        meta,
      });
  });

  return data;
});
