import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store.ts';

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.items);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Todo List</h2>
      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item d-flex align-items-center">
            <input type="checkbox" checked={todo.completed} readOnly className="me-3"/>
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
