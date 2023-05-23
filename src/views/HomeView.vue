<script setup>
import { ref } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppSection from '@/components/AppSection.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { useTodoStore } from '@/stores/useTodoStore.js';
const store = useTodoStore();
const list = JSON.parse(localStorage.getItem('todos'));
list && store.actions.setTodo(list);
</script>

<template>
  <DefaultLayout>
    <h2>todo</h2>
    <AppHeader />
    <AppSection />
  </DefaultLayout>
</template>
