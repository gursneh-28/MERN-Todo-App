import base from './baseFile';

export const loginUser = (data) => base.post("/auth/login", data);
export const signupUser = (data) => base.post("/auth/signup", data);
export const fetchTodos = () => base.get("/todos");
export const getTodosById = (id) => base.get(`/todos/${id}`);
export const createTodo = (data) => base.post("/todos", data);
export const updateTodo = (id, data) => base.patch(`/todos/${id}`, data);
export const deleteTodo = (id) => base.delete(`/todos/${id}`);