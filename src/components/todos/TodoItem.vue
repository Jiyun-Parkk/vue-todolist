<script setup>
import { ref } from 'vue'
import DefaultModal from '@/components/DefaultModal.vue'
import NewTodo from '@/components/todos/NewTodo.vue'
import { useTodoStore } from '@/stores/useTodoStore.js'
import { useIcons } from '@/stores/useIcons.js'

const store = {
  todo: useTodoStore(),
  icons: useIcons()
}
const props = defineProps({
  todoInfo: {
    type: Object,
    default: {
      id: 0,
      title: '',
      summary: '',
      category: ''
    }
  }
})
const isModalOpen = ref(false)
const handleClickClose = () => {
  isModalOpen.value = false
}
const handleEditTodo = () => {
  isModalOpen.value = true
}
const handleDeleteTodo = () => {
  store.todo.actions.deleteTodo(props.todoInfo.id)
}
</script>
<template>
  <li
    class="p-5 border border-gray-300 w-full flex justify-between items-center"
  >
    <div>
      <h3 class="text-orange-500 font-extrabold inline-block rounded-xl my-2">
        {{ todoInfo.title }}
      </h3>
      <span class="mx-2">{{ store.icons.list[todoInfo.category] }}</span>
      <p>{{ todoInfo.summary }}</p>
    </div>
    <div>
      <button
        @click="handleEditTodo"
        class="w-8 text-xl font-semibold cursor-pointer"
      >
        ✏️
      </button>
      <Teleport to="body">
        <DefaultModal v-if="isModalOpen" @close-modal="handleClickClose">
          <template #header>
            <h3>New Todo</h3>
          </template>
          <template #body>
            <NewTodo :todoInfo="todoInfo" @close-modal="handleClickClose" />
          </template>
        </DefaultModal>
      </Teleport>
      <button
        @click="handleDeleteTodo"
        class="w-8 text-xl font-semibold text-red-300 cursor-pointer"
      >
        X
      </button>
    </div>
  </li>
</template>
