<script setup>
import { ref } from 'vue'
import TodoItem from './TodoItem.vue'
import { useTodoStore } from '@/stores/useTodoStore.js'

const todoStore = useTodoStore()
</script>
<template>
  <ul class="space-y-5 items-center my-5">
    <TodoItem
      v-for="item in todoStore.filteredTodolist"
      :key="item.id"
      :todoInfo="item"
    />
  </ul>
</template>
