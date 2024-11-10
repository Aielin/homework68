import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { addTodo, fetchTodos, deleteTodo, toggleTodo, Todo } from './todoSlice.ts';


const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.items);
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.todos.loading);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodoTitle.trim()) {
      dispatch(addTodo(newTodoTitle));
      setNewTodoTitle('');
    }
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleToggleTodo = (todo: Todo) => {
    dispatch(toggleTodo(todo));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Todo List</h2>
      {loading ? (
        <div className="d-flex justify-content-center mb-3">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <ul className="list-group mb-3">
          {todos.map((todo) => (
            <li key={todo.id} className="list-group-item d-flex align-items-center justify-content-between">
              <div>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo)}
                  className="me-3"/>
                <span>{todo.title}</span>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTodo(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddTodo}>
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TodoList;
