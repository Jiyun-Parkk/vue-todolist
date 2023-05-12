<script setup>
import TodoHeader from './todos/TodoHeader.vue'
import TodoList from './todos/TodoList.vue'

const props = defineProps({
  icon: {
    type: Object,
    default() {
      return {
        todo: '',
        progress: '',
        done: ''
      }
    }
  }
})
</script>
<template>
  <section>
    <TodoHeader :icon="icon" />
    <TodoList />
  </section>
</template>
<style scoped></style>
