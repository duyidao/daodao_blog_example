import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/vue',
      children: [
        {
          path: '/vue',
          redirect: '/vue/defineComponent',
          children: [
            {
              path: '/vue/defineComponent',
              name: 'defineComponent',
              component: () => import('@/views/vue/defineComponent/index.vue')
            }
          ]
        }
      ]
    }
  ],
})

export default router
