import { useDispatch } from "react-redux";
import { deleteTodo, markAsCompleted } from "./thunks";
import styled from "styled-components";

const CardContainer = styled.div`
  ${props => props.important && 'background-color: yellow;'}
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 10px;
  padding: 16px 0px;
`;

const CardHeader = styled.h3`
  background: #000;
  color: #fff;
`;

export default function TodoListItem({ todo }) {
  const dispatch = useDispatch();

  return (
    <CardContainer important={todo.text.endsWith('*')}>
      <CardHeader>{todo.text}</CardHeader>
      {todo.isCompleted && <p>Complete!</p>}
      {todo.isCompleted 
        ? <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete Item</button>
        : <button onClick={() => dispatch(markAsCompleted(todo.id))}>Mark as Completed</button>
      }
    </CardContainer>   
  );
}