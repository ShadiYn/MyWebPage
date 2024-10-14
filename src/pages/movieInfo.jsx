import { Link } from 'react-router-dom';
import { getPopularMovies } from '../services/api';
import { useEffect, useState } from 'react';
import '../app/cssMovies.css';

const MovieInfo = () => {
    const [movie, setMovie] = useState([]);
    const [localmovie, setLocalMovies] = useState([]);

    useEffect(() => {
        getPopularMovies().then(setMovie);
    }, []);

    useEffect(() => {
        const pelisGuardadas = localStorage.getItem('../data/movies.json');
        if (pelisGuardadas) {
            setLocalMovies(JSON.parse(pelisGuardadas));
        }
    }, []);

    // Cargar películas desde el JSON
    useEffect(() => {
        const loadLocalMovies = async () => {
            const response = await fetch('/movies.json'); 
            const data = await response.json();
            setLocalMovies(data.results);
        };

        loadLocalMovies();
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
                    <li>Página de inicio mostrando algunas de las películas de la API de TMDB---HECHO</li>
                    <li>Luego una sub cardview o algo a la derecha mostrando películas de TMDB mediante un JSON.----HECHO</li>
                    
                    <li>Añadir un apartado para añadir o eliminar películas del JSON</li>
                    <li>Poner de título centrando los créditos para TMDB/importante para poder usarlo correctamente</li>
                </ul>

                <div className="movies-titles">
                    <h1 className="title">JSON MOVIES</h1>
                    <h1 className="title">API MOVIES</h1>
                </div>




                <div className="movies-container">
                    
                    <div className="local-movies">
                        {localmovie.map((movie) => (
                            <div className="movie-card" key={movie.id}>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                <p className="movie-card-title">{movie.title}</p>
                            </div>
                        ))}
                    </div>

                    <div className="movie-grid">
                        {movie.map((movie) => (
                            <div className="movie-card" key={movie.id}>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                <p className="movie-card-title">{movie.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieInfo;
