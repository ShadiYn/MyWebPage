// src/components/Bookjournal.js
import { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { deleteBook, getBooks } from '../services/BookItem'; // Asegúrate de que la ruta sea correcta
import '../app/cssBookJournal.css';
import Calendar from 'react-calendar';



const Bookjournal = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());


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
            <button className="btn_home" onClick={handleClick}>🏠 Home</button>
            <button className="btn btn-create" onClick={gotCreate}>📚 Crear Libro</button>

            <h1 className="titulo">Book List</h1>

            <div className="content-container">
                <div className='lista-Libros'>
                    {books.length === 0 ? (
                        <p>No hay libros disponibles. Crea uno nuevo.</p>
                    ) : (
                        books.map((book, index) => (
                            <div className='targeta-libro' key={index}>
                                <img className='img' src={book.imageUrl} alt={book.title} />
                                <div className='texto'>
                                    <h3>{book.title}</h3>
                                    <ul className='lista_texto'>
                                        <li>Autor: {book.author}</li>
                                        <li>Páginas: {book.pages}</li>
                                        <li>Calificación: {book.rating} <i className="fa fa-star"></i></li>
                                    </ul>
                                    <button type="button" onClick={() => handleDelete(book.title)} className="btn btn-delete">Delete</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className='calendar-container'>
                    <Calendar
                        onChange={setDate}
                        value={date}
                        tileContent={({ date }) => {
                            const matchingBooks = books.filter(
                                (book) =>
                                    (book.start_Date && new Date(book.start_Date).toDateString() === date.toDateString()) ||
                                    (book.finish_Date && new Date(book.finish_Date).toDateString() === date.toDateString())
                            );

                            return (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2px' }}>
                                    {matchingBooks.map((book, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                backgroundColor: book.highlightColor,
                                                borderRadius: '50%',
                                                width: '8px',
                                                height: '8px',
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            );
                        }}
                        className="custom-calendar"
                    />
                </div>
            </div>
        </div>
    );
};

export default Bookjournal;