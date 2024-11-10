import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosApi from '../../axiosAPI.ts';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoState {
  items: Todo[];
  loading: boolean;
  error: boolean;
}

const initialState: TodoState = {
  items: [],
  loading: false,
  error: false,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axiosApi.get<{ [key: string]: Todo }>('/todos.json');
  const data = response.data;
  return Object.keys(data).map((key) => ({ id: key, title: data[key].title, completed: data[key].completed }));
});

export const addTodo = createAsyncThunk('todos/addTodo', async (title: string) => {
  const newTodo = { title, completed: false };
  const response = await axiosApi.post<{ name: string }>('/todos.json', newTodo);
  return { id: response.data.name, ...newTodo };
});


const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchTodos.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
  },
});

export default todoSlice.reducer;
