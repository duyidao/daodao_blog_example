import { shallowRef, getCurrentInstance } from 'vue'

const wmMap = new WeakMap()

export function useTemplateRef(key) {
  const container = shallowRef()

  const vm = getCurrentInstance()
  // 判断是否有vm，有的话就不重新赋值，避免覆盖旧值
  if (!wmMap.has(vm)) {
    vm.refs = {}
    wmMap.set(vm, {})
  }
  Object.defineProperty(vm.refs, key, {
    get() {
      return container.value
    },
    set(value) {
      container.value = value
    }
  })

  return container
}