// src/components/Bookjournal.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBooks } from '../services/BookItem'; // Asegúrate de que la ruta sea correcta

const Bookjournal = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks();
                setBooks(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
            </ul>

            <div>
                <ul>
                    <li>Titulo: book journal</li>
                    <li>2. Crear un apartado para mostrar todos los libros registrados usando una base de datos: mostrar: portada, nombre, autor, y el numero de estrellas dadas</li>
                    <li>en la segunda cardview mostrar un calendario con colores los dias, esos dias significara que se ha registrado ese libro en ese dia</li>
                    <li>Añadir un conteo de libros leidos por año-mes</li>
                    <li>añadir un desplegabke por si se ha leido mas de 1 libro al dia ?¿</li>
                    <li>Añadir un boton, para poder añadir un libro: titulo, autor, y puntuación de 5 estrellas, y pedir que inserte la portada correspondiente, y si se desea, colocarle un color a la cardview para que sea mas vistosa.</li>
                    <li>Para ya cuando este lista, intentar convertirla en una aplicacion android-ios</li>
                </ul>
            </div>

            <div>
                <h1>Book List</h1>
                <ul>
                    {
                        books.map((book) => (
                            <div key={book.id}> {/* Asegúrate de usar la clave única */}
                                <p>Title: {book.title}</p>
                                <p>Author: {book.author}</p>
                                <p>Pages: {book.pages}</p>
                                <p>Rating: {book.rating}</p>
                                <img src={book.imageUrl} alt={book.title} width="100" />
                            </div>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Bookjournal;
