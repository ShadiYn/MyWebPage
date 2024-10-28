import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../services/BookItem';

import '../app/createBook.css'

const BookCreate = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const [pages, setPages] = useState('');
    const [rating, setRating] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [highlightColor, setHighlightColor] = useState('#ee998a'); // Color por defecto
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBook = {
            title,
            author,
            start_Date: startDate,
            finish_Date: finishDate,
            pages: parseInt(pages),
            rating: parseFloat(rating),
            imageUrl,
            highlightColor,
            user: { id: 1 }
        };

        await createBook(newBook); // Guardar en el backend si tienes configurado un servicio
        saveToLocalStorage(newBook); // Guardar también en localStorage
        navigate('/book-journal');
    };

    const saveToLocalStorage = (book) => {
        const savedBooks = JSON.parse(localStorage.getItem('books')) || [];
        localStorage.setItem('books', JSON.stringify([...savedBooks, book]));
    };

    const handleReadClick = () => {
        navigate('/book-journal');
    };

    return (
        <div className="container">
            <div>
                <h2 className="text-center mb-4">Crear Nuevo Libro</h2>
                <button onClick={handleReadClick} className='btn-back'>Volver</button>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Título:</label>
                        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Autor:</label>
                        <input type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha de inicio:</label>
                        <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha de finalización:</label>
                        <input type="date" className="form-control" value={finishDate} onChange={(e) => setFinishDate(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Número de páginas:</label>
                        <input type="number" className="form-control" value={pages} onChange={(e) => setPages(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Calificación (0 a 5):</label>
                        <input type="number" className="form-control" step="0.1" value={rating} onChange={(e) => setRating(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">URL de la imagen:</label>
                        <input type="text" className="form-control" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Color de resaltado:</label>
                        <input type="color" className="form-control" value={highlightColor} onChange={(e) => setHighlightColor(e.target.value)} />
                    </div>
                    <button type='submit' className="btn btn-success w-100">Crear</button>
                </form>
            </div>
        </div>
    );
};

export default BookCreate;