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

    const handleSubmit =  () => {
    
        
        const newBook = {
            title,
            author,
            start_Date: startDate, // Ajustar el nombre de la propiedad según tu modelo
            finish_Date: finishDate,
            pages: parseInt(pages), // Asegúrate de que pages sea un número
            rating: parseFloat(rating), // Asegúrate de que rating sea un número
            imageUrl,
            user: {
                id: 1 // Aquí debes asignar el ID del usuario correspondiente
            }
        }
        createBook(newBook);
    };

    const handeReadClick = ()=>{
        navigate('/book-journal');
    }

    return (
        <div>
            <h2>Crear Nuevo Libro</h2>
            <button onClick={handeReadClick} className='btn btn-outline-success'>volver</button>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Autor:</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <div>
                    <label>Fecha de inicio:</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                </div>
                <div>
                    <label>Fecha de finalización:</label>
                    <input type="date" value={finishDate} onChange={(e) => setFinishDate(e.target.value)} required />
                </div>
                <div>
                    <label>Número de páginas:</label>
                    <input type="number" value={pages} onChange={(e) => setPages(e.target.value)} required />
                </div>
                <div>
                    <label>Calificación (0 a 5):</label>
                    <input type="number" step="0.1" value={rating} onChange={(e) => setRating(e.target.value)} required />
                </div>
                <div>
                    <label>URL de la imagen:</label>
                    <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </div>
                <button type='button' className="btn btn-outline-info-m3" onClick={async () => {
                            await handleSubmit({imageUrl});
                            navigate('/book-journal');
                        }}>Create</button>
            </form>
        </div>
    );
};

export default BookCreate;
