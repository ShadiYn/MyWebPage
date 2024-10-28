import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../app/createBook.css';

const BookCreate = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const [pages, setPages] = useState('');
    const [rating, setRating] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [highlightColor, setHighlightColor] = useState('#ee998a');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        const bookData = {
            title,
            author,
            start_Date: startDate,
            finish_Date: finishDate,
            pages: parseInt(pages),
            rating: parseFloat(rating),
            user: { id: 1 } // Asegúrate de que el usuario con ID 1 existe en la base de datos
        };

        formData.append("file", imageFile);
        formData.append("bookData", JSON.stringify(bookData));

        console.log("Book data JSON:", JSON.stringify(bookData)); // Log para verificar los datos

        try {
            const response = await fetch('http://localhost:8080/books/create', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                navigate('/book-journal');
            } else {
                console.error("Error al crear el libro");
            }
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
    };

    const handleReadClick = () => {
        navigate('/book-journal');
    };

    return  (
        <div className="container">
            <div>
            <h2>Crear Nuevo Libro</h2>
            <button type="button" className="btn-back" onClick={handleReadClick}>Volver</button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label className="form-label" htmlFor="title">Título:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="author">Autor:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="startDate">Fecha de inicio:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="finishDate">Fecha de finalización:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="finishDate"
                            value={finishDate}
                            onChange={(e) => setFinishDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="pages">Número de páginas:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="pages"
                            value={pages}
                            onChange={(e) => setPages(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="rating">Calificación (0 a 5):</label>
                        <input
                            type="number"
                            className="form-control"
                            id="rating"
                            step="0.1"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="imageFile">Imagen del libro:</label>
                        <input
                            type="file"
                            className="form-control"
                            id="imageFile"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="highlightColor">Color de resaltado:</label>
                        <input
                            type="color"
                            className="form-control"
                            id="highlightColor"
                            value={highlightColor}
                            onChange={(e) => setHighlightColor(e.target.value)}
                        />
                    </div>
                </div>
                <button type="submit" className="btn-success">Crear</button>
            </form>
        </div>
    );
};

export default BookCreate;
