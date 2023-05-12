import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('counter', () => {
  //state
  const todolist = ref([])
  const filter = ref('All')
  //getter
  const filteredTodolist = computed(() => {
    if (filter.value === 'All') {
      return todolist.value
    } else {
      return todolist.value.filter((list) => list.category === filter.value)
    }
  })
  //action
  const actions = {
    setTodo: (list) => {
      todolist.value = list
    },
    addTodo: (todo) => {
      todolist.value.push(todo)
      localStorage.setItem('todos', JSON.stringify(todolist.value))
    },
    deleteTodo: (id) => {
      todolist.value = todolist.value.filter((list) => list.id !== id)
      localStorage.setItem('todos', JSON.stringify(todolist.value))
    },
    editTodo: (todo) => {
      todolist.value = todolist.value.map((list) => {
        if (list.id === todo.id) {
          list = todo
        }
        return list
      })
      localStorage.setItem('todos', JSON.stringify(todolist.value))
    },
    changeSelect: (value) => {
      filter.value = value
    }
  }
  return { todolist, filter, filteredTodolist, actions }
})
