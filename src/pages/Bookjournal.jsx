// src/components/Bookjournal.js
import { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { getBooks } from '../services/BookItem'; // Asegúrate de que la ruta sea correcta
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


    const handleClick = ()=>{
        navigate('/');
    }

    return (
        <div>
            <button className='btn_home' onClick={handleClick}>Home</button>


            <div className='titulo'>
            <h1>Book List</h1>
            </div>

            <div className='lista-Libros'>
                <div className='targeta-libro'>
                
                    {
                        books.map((book) => (
                            <div className='texto' key={book.id}> 
                            <ul className='lista_texto'>
                            <li>Title: {book.title}</li>
                                <li>Author: {book.author}</li>
                                <li>Pages: {book.pages}</li>
                                <li>Rating: {book.rating}</li>
                            </ul>
                            <img src={book.imageUrl} alt={book.title} />
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
