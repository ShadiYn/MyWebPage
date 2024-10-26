import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import '../app/cssBookJournal.css';
import 'react-calendar/dist/Calendar.css';

const Bookjournal = () => {
    const [books, setBooks] = useState([]);
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        const savedBooks = JSON.parse(localStorage.getItem('books')) || [];
        console.log("Books loaded from localStorage:", savedBooks); // Verificar libros cargados
        setBooks(savedBooks);
    }, []);

    const handleDelete = (id) => {
        const updatedBooks = books.filter((book) => book.title !== id); // Filtrar por título o id único
        setBooks(updatedBooks);
        localStorage.setItem('books', JSON.stringify(updatedBooks));
    };

    const handleClick = () => {
        navigate('/');
    };

    const gotCreate = () => {
        navigate('/create');
    };

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
