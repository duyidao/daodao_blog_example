import { shallowRef, getCurrentInstance } from 'vue'

const vmMap = new WeakMap()

export function useTemplateRef(key: string) {
  const container = shallowRef()

  const vm = getCurrentInstance()
  if (!vm) return
  // 判断是否有vm，有的话就不重新赋值，避免覆盖旧值
  if (!vmMap.has(vm)) {
    vm.refs = {}
    vmMap.set(vm, {})
  }
  Object.defineProperty(vm.refs, key, {
    get() {
      return container.value
    },
    set(value) {
      container.value = value
    },
  })

  return container
}
