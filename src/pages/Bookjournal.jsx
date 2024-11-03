// src/components/Bookjournal.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBook, getBooks } from '../services/BookItem';
import '../app/cssBookJournal.css';
import { createTodo, deleteTodo, getList, updateTodo } from '../services/todoItem';

const Bookjournal = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    const [list, setList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newTodo, setNewTodo] = useState({ title: '', description: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingTodoId, setEditingTodoId] = useState(null);

    const handleEdit = (todo) => {
        setIsEditing(true);
        setNewTodo({ title: todo.title, description: todo.description });
        setEditingTodoId(todo.id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteTodo(id);
            setList(list.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
        }
    };

    const handleComplete = async (id) => {
        try {
            const todoToUpdate = list.find(todo => todo.id === id);
            const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
            await updateTodo(updatedTodo);
            setList(list.map((todo) => (todo.id === id ? updatedTodo : todo)));
        } catch (error) {
            console.error('Error al completar la tarea:', error);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTodo({ ...newTodo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                const updatedTodo = { ...newTodo, id: editingTodoId };
                await updateTodo(updatedTodo);
                setList(list.map((todo) => (todo.id === editingTodoId ? updatedTodo : todo)));
            } else {
                const response = await createTodo(newTodo);
                setList([...list, { ...response.data, completed: false }]);
            }
            setNewTodo({ title: '', description: '' });
            setShowForm(false);
            setIsEditing(false);
            setEditingTodoId(null);
        } catch (error) {
            console.error('Error al guardar la tarea:', error);
        }
    };

    const fetchList = async () => {
        const response = await getList();
        setList(response.data);
    };

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await getBooks();
            setBooks(response.data);
        };
        fetchBooks();
    }, []);

    const handleDeleteBook = async (id) => {
        try {
            await deleteBook(id);
            setBooks((prevBooks) => prevBooks.filter(book => book.id !== id));
        } catch (error) {
            console.error('Error eliminando el libro:', error);
        }
    };

    const handleClick = () => {
        navigate('/');
    };

    const gotCreate = () => {
        navigate('/create');
    };

    return (
        <div className="bookjournal-container">
            <div className="btn_containers">
                <button className="btn_home" onClick={handleClick}>🏠 Home</button>
                <button className="btn-create" onClick={gotCreate}>📚 Crear Libro</button>
            </div>

            <h1 className="titulo">My Book Journal</h1>

            <div className="content-container">
                <div className="lista-Libros">
                    {books.length === 0 ? (
                        <p>No hay libros disponibles. Crea uno nuevo.</p>
                    ) : (
                        books.map((book, index) => (
                            <div className="targeta-libro" key={index}>
                                <img className="img" src={'http://localhost:8080/' + book.imageUrl} alt={book.imageUrl} />
                                <div className="texto">
                                    <h3>{book.title}</h3>
                                    <ul className="lista_texto">
                                        <li>Autor: {book.author}</li>
                                        <li>Páginas: {book.pages}</li>
                                        <li>Calificación: {book.rating} <i className="fa fa-star"></i></li>
                                    </ul>
                                    <div className="button-container">
                                        <button type="button" onClick={() => handleDeleteBook(book.id)} className="btn-delete">Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="calendar-container">
                

                    <div className="DoList-container">
                        <div className="todo-header">
                            <h2>To-do List</h2>
                            <button className="add-todo-button" onClick={() => setShowForm(!showForm)}>
                                {showForm ? 'Cerrar' : 'Añadir'}
                            </button>
                        </div>

                        {showForm && (
                            <div className="todo-form-card">
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Título"
                                        value={newTodo.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <textarea
                                        name="description"
                                        placeholder="Descripción"
                                        value={newTodo.description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <button type="submit">{isEditing ? 'Actualizar Tarea' : 'Guardar Tarea'}</button>
                                </form>
                            </div>
                        )}

                        <div className="todo-list">
                            {list.map((todo) => (
                                <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                                    <div className="todo-main">
                                        <p className="todo-title">{todo.title}</p>
                                        <p className="todo-description">{todo.description}</p>
                                    </div>
                                    <div className="todo-actions">
                                        <button className="button-edit" onClick={() => handleEdit(todo)}>✏️</button>
                                        <button className="button-complete" onClick={() => handleComplete(todo.id)}>
                                            {todo.completed ? '↩️' : '✔️'}
                                        </button>
                                        <button className="button-delete" onClick={() => handleDelete(todo.id)}>🗑️</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bookjournal;
