import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { loadTodos } from './thunks';
import './App.css'
import TodoList from './TodoList'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTodos());
  }, []);

  return (
    <>
      <TodoList />
    </>
  )
}

export default App