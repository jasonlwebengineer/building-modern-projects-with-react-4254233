import axios from "axios"
import { loadingStarted, loadingCompleted, loadingFailed } from "./loadingSlice";
import { todosUpdated } from "./todosSlice";

export const loadTodos = () => async (dispatch) => {
  dispatch(loadingStarted)
  try {
    const response = await axios.get('/api/todos');
    const todos = response.data;
    dispatch(loadingCompleted(todos));
  } catch (e) {
    dispatch(loadingFailed(e));
  }  
}

export const createTodo = (newTodoText) => async (dispatch, getState) => {
  try {
    const response = await axios.post('/api/todos', { text: newTodoText })
    const newTodo = response.data;
    const updatedTodos = getState().todos.value.concat(newTodo);
    dispatch(todosUpdated(updatedTodos));
  } catch (e) {
    dispatch(loadingFailed(e));
  }
}

export const deleteTodo = (todoId) => async (dispatch, getState) => {
  try {
    await axios.delete('/api/todos/' + todoId);
    const updatedTodos = getState().todos.value.filter(t => t.id !== todoId);
    dispatch(todosUpdated(updatedTodos));
  } catch (e) {
    dispatch(loadingFailed(e));
  }
}

export const markAsCompleted = (todoId) => async (dispatch, getState) => {
  try {
    const response = await axios.put('/api/todos/' + todoId, { isCompleted: true });
    const updatedTodo = response.data;
    const updatedTodos = getState().todos.value.map(t => t.id === todoId ? updatedTodo: t);
    dispatch(todosUpdated(updatedTodos));
  } catch (e) {
    dispatch(loadingFailed(e));
  }
}