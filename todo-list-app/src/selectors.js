import { createSelector } from "@reduxjs/toolkit";

export const getTodos = state => state.todos.value;
export const getTodosLoading = state => !state.loading.value.completed;

// Simpilier Selectors
// export const getCompletedTodos = state => {
//   const todos = getTodos(state);
//   return todos.filter(t => t.isCompleted);
// }
// export const getIncompletedTodos = state => {
//   const todos = getTodos(state);
//   return todos.filter(t => !t.isCompleted);
// }

export const getCompletedTodos = createSelector([getTodos], todos => todos.filter(t => t.isCompleted));
export const getIncompletedTodos = createSelector([getTodos], todos => todos.filter(t => !t.isCompleted));