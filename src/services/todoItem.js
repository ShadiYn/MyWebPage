// src/api/todoApi.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/todos';

export const getList = () => axios.get(API_URL);
export const createTodo = (todo) => axios.post(API_URL, todo);
export const updateTodo = async (todo) => {
    return await axios.put(`${API_URL}/${todo.id}`, todo); // Asegúrate de que `todo.id` sea correcto
};export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);
