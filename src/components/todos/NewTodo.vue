<script setup>
import { ref } from 'vue'
import { useTodoStore } from '@/stores/useTodoStore.js'

const store = useTodoStore()
const props = defineProps({
  todoInfo: {
    type: Object,
    default() {
      return {
        id: 0,
        title: '',
        summary: '',
        category: ''
      }
    }
  }
})
const emit = defineEmits(['close-modal'])
const title = ref(props.todoInfo.title ? props.todoInfo.title : '')
const summary = ref(props.todoInfo.summary ? props.todoInfo.summary : '')
const category = ref(props.todoInfo.category ? props.todoInfo.category : 'todo') // 카테고리
const isFormValid = ref(false)

const handleAddTodo = () => {
  if (
    !title.value ||
    !summary.value ||
    title.value.trim() === '' ||
    title.value.trim() === ''
  ) {
    isFormValid.value = true
    return
  }
  const id = props.todoInfo.title ? props.todoInfo.id : new Date().getTime()
  const newTodo = {
    id,
    title: title.value,
    summary: summary.value,
    category: category.value
  }
  props.todoInfo.title
    ? store.actions.editTodo(newTodo)
    : store.actions.addTodo(newTodo)
  emit('close-modal')
  title.value = ''
  summary.value = ''
}
</script>
<template>
  <form @submit.prevent="handleAddTodo" class="my-2">
    <p>
      <label class="block mb-2 text-xl text-white" htmlFor="title">Title</label>
      <input
        v-model="title"
        class="w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded"
        type="text"
        id="title"
      />
    </p>
    <p>
      <label class="block mb-2 text-xl text-white" htmlFor="summary"
        >Summary</label
      >
      <textarea
        v-model="summary"
        class="w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded"
        id="summary"
        rows="5"
      />
    </p>
    <p>
      <label class="block mb-2 text-xl text-white" htmlFor="category"
        >Category</label
      >
      <select
        v-model="category"
        class="w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded"
        id="category"
        defaultValue="moderate"
      >
        <option value="todo">📑 To do</option>
        <option value="progress">👀 On progress</option>
        <option value="done">😀 Done</option>
      </select>
    </p>
    <p v-if="isFormValid" class="mt-2 text-red-500">
      Please fill out all forms!
    </p>
    <p class="flex justify-end gap-4">
      <button
        @click="emit('close-modal')"
        class="text-xl text-white"
        type="button"
        data-cy="newtodo-close"
      >
        Cancel
      </button>
      <button class="px-6 py-3 text-xl text-red-200" type="submit">
        {{ todoInfo.title ? 'Edit' : 'Add' }}
      </button>
    </p>
  </form>
</template>
