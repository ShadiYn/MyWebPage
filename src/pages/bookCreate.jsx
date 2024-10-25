import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../services/BookItem';

const BookCreate = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const [pages, setPages] = useState('');
    const [rating, setRating] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        const newBook = {
            title,
            author,
            start_Date: startDate,
            finish_Date: finishDate,
            pages: parseInt(pages),
            rating: parseFloat(rating),
            imageUrl,
            user: {
                id: 1 // Asigna el ID del usuario correspondiente
            }
        };

        await createBook(newBook); // Esperar a que se cree el libro
        navigate('/book-journal'); // Navegar después de crear el libro
    };

    const handleReadClick = () => {
        navigate('/book-journal');
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-sm">
                <h2 className="text-center mb-4">Crear Nuevo Libro</h2>
                <button onClick={handleReadClick} className='btn btn-outline-secondary mb-3'>Volver</button>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Título:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Autor:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={author} 
                            onChange={(e) => setAuthor(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha de inicio:</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha de finalización:</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            value={finishDate} 
                            onChange={(e) => setFinishDate(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Número de páginas:</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            value={pages} 
                            onChange={(e) => setPages(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Calificación (0 a 5):</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            step="0.1" 
                            value={rating} 
                            onChange={(e) => setRating(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">URL de la imagen:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={imageUrl} 
                            onChange={(e) => setImageUrl(e.target.value)} 
                        />
                    </div>
                    <button type='submit' className="btn btn-success w-100">Crear</button>
                </form>
            </div>
        </div>
    );
};

export default BookCreate;
