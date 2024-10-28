import axios from 'axios';
const instance = axios.create({ baseURL: 'http://localhost:8080/books'});

export const getBooks = async ()=> await instance.get('/')


//CREATE
export const createBook = async (book) => {
    const response = await axios.post('http://localhost:8080/books/create', book);
    return response.data; // Devuelve la respuesta si es necesario
};
//DELETE
export const deleteBook = async (id) => {
    try {
        return await instance.delete('/' + id);
    } catch (error) {
        console.error('Error eliminando el libro:', error.response ? error.response.data : error.message);
    }
};
