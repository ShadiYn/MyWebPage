// src/components/Bookjournal.js
import { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { deleteBook, getBooks } from '../services/BookItem'; // Asegúrate de que la ruta sea correcta
import '../app/cssBookJournal.css';




const Bookjournal = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            
                const response = await getBooks();
                setBooks(response.data);
                console.log(response.data);
            
        };
        fetchBooks();
    }, []);

    const handleDelete = async (id) => {
        // Primero realiza la solicitud para eliminar el libro en el backend
        await deleteBook(id);
    
        // Luego, actualiza el estado para eliminar el libro del frontend
        setBooks((prevBooks) => prevBooks.filter(book => book.id !== id));
    };
    

    const handleClick = ()=>{
        navigate('/');
    }
    const gotCreate = ()=>{
        navigate('/create')
    }

    return (
        <div>
            <button className='btn_home' onClick={handleClick}>Home</button>
            <div>
            <h1>Bienvenido a tu diario de libros</h1>
            <button className="btn btn-outline-success" onClick={gotCreate}>Crear Libro</button>
            {/* Otros enlaces o contenido */}
        </div>

            <div className='titulo'>
            <h1>Book List</h1>
            </div>

            <div className='lista-Libros'>
                <div className='targeta-libro'>
                        
                    {
                        books.map((book) => (
                            <div className='texto' key={book.id}> 
                            <ul className='lista_texto'>
                            <button type="button" 
                                onClick={() => handleDelete(book.id)}  // Pasa el ID aquí
                                className="btn btn-outline-danger">
                            delete
                        </button>
                        




                            <button className='btn btn-outline-warning'>editar</button>
                            <li>Title: {book.title}</li>
                                <li>Author: {book.author}</li>
                                <li>Pages: {book.pages}</li>
                                <li>Rating: {book.rating}</li>
                            </ul>
                            <img className='img' src={book.imageUrl} alt={book.title} style={{ width: '220px', height: '238px' }} />

                            </div>
                        ))
                    }
                </div>
            </div>
            
            <div className='calendario'></div>




        </div>
    );
}

export default Bookjournal;
