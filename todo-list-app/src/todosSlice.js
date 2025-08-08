import { createSlice } from "@reduxjs/toolkit";
import { loadingCompleted } from "./loadingSlice";


export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    value: [],
  },
  reducers: {
    markAsCompleted: (state, action) => {
      const text = action.payload;
      const todo = state.value.find(t => t.text === text);
      todo.isCompleted = true;
    },
    deleteTodo: (state, action) => {
      const text = action.payload;
      state.value = state.value.filter(t => t.text !== text);
    },
    todosUpdated: (state, action) => {
      const updatedTodos = action.payload;
      state.value = updatedTodos;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadingCompleted, (state, action) => {
      state.value = action.payload;
    });
  }
})

export const {
  markAsCompleted, 
  deleteTodo,
  todosUpdated
} = todosSlice.actions;