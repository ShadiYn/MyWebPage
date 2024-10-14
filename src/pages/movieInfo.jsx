import { Link } from 'react-router-dom';
import { getPopularMovies } from '../services/api';
import { useEffect, useState } from 'react';
import '../app/cssMovies.css'

const MovieInfo = () => {
    const [movie, setMovie] = useState([]); 
    useEffect(() => {
        getPopularMovies().then(setMovie);
    }, []);

    return (
        <div className="container">
            <ul>
                <li><Link to="/">Página 1</Link></li>
            </ul>
            <div>
                <p>Página 1</p>
                <p>Consultar la API key de The Movie DB para mostrar las cosas</p>

                <ul>
                    <li>Página de inicio mostrando algunas de las películas de la API de TMDB</li>
                    <li>Luego una sub cardview o algo a la derecha mostrando películas de TMDB mediante un JSON.</li>
                    <li>Añadir un apartado para añadir o eliminar películas del JSON</li>
                    <li>Poner de título centrando los créditos para TMDB/importante para poder usarlo correctamente</li>
                </ul>

                <div className="movie-grid">
                    {movie.map((movie) => (

                        <div className="movie-card" key={movie.id}>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}  />

                            <p className="movie-card-title">{movie.title}</p>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieInfo;