import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store.ts';

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.items);

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} readOnly />
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
