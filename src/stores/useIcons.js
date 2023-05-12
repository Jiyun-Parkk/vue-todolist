import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useIcons = defineStore('icons', () => {
  const list = ref({
    todo: '📑',
    progress: '👀',
    done: '😀'
  })
  return { list }
})
