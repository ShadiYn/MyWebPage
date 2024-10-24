import axios from 'axios';
const instance = axios.create({ baseURL: 'http://localhost:8080/books'});

export const getBooks = async ()=> await instance.get('/')