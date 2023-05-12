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
const todoSelector = Object.keys(store.icons.list)
const isModalOpen = ref(false)
const selectValue = ref('All')
const handleClickClose = () => {
  isModalOpen.value = false
}
const handleClickOpen = () => {
  isModalOpen.value = true
}
const filterTodo = () => {
  store.todo.actions.changeSelect(selectValue.value)
}
</script>
<template>
  <section class="flex justify-between items-center">
    <button @click="handleClickOpen" class="p-2 bg-teal-950">Add Todo</button>
    <Teleport to="body">
      <DefaultModal v-if="isModalOpen" @close-modal="handleClickClose">
        <template #header>
          <h3>New Todo</h3>
        </template>
        <template #body>
          <NewTodo @close-modal="handleClickClose" />
        </template>
      </DefaultModal>
    </Teleport>
    <select
      @change="filterTodo"
      v-model="selectValue"
      name="todo"
      id="todo"
      class="w-32 p-2 bg-gray-800"
    >
      <option value="All">All</option>
      <option v-for="item in todoSelector" :key="item.id" :value="item">
        {{ item }} {{ store.icons.list[item] }}
      </option>
    </select>
  </section>
</template>
