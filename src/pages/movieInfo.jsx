import { Link } from 'react-router-dom';
import { getPopularMovies } from '../services/api';
import { useEffect, useState } from 'react';
import '../app/cssMovies.css';
import  img from '../app/tmdbIMG.png'

const apiKey = 'd801d7cff4e032fae504d22d2d7dcf45';
const urlBase = 'https://api.themoviedb.org/3/';
const MovieInfo = () => {
    const [movie, setMovie] = useState([]);
    const [localmovie, setLocalMovies] = useState([]);

    
    useEffect(() => {
        getPopularMovies().then(setMovie);
    }, []);

    const getRandomMovie = async ()=>{
        const randomPage = Math.floor(Math.random()* 500)+1;
        const response = await fetch(`${urlBase}movie/popular?api_key=${apiKey}&page=${randomPage}`);
        const data = await response.json();
        const randomMovie = data.results[Math.floor(Math.random()* data.results.length)];
        return randomMovie;
    }

    useEffect(() => {
        const pelisGuardadas = localStorage.getItem('../data/movies.json');
        if (pelisGuardadas) {
            setLocalMovies(JSON.parse(pelisGuardadas));
        }
    }, []);


    const addRandomMovie = async ()=>{
        const movie = await getRandomMovie();
        if(movie){
            setMovie((prevMovies)=> [...prevMovies, movie]);
        }
    }

    
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
                <li><Link to="/">Home page</Link></li>
            </ul>
            <div>
                
            </div>
            <div>
                <p>Página 1</p>
                <p>Consultar la API key de The Movie DB para mostrar las cosas</p>

                <ul>
                    <li>Página de inicio mostrando algunas de las películas de la API de TMDB---HECHO</li>
                    <li>Luego una sub cardview o algo a la derecha mostrando películas de TMDB mediante un JSON.----HECHO</li>
                    
                    <li>Añadir un apartado para añadir o eliminar películas del JSON---HECHO (pero no se guardan)</li>
                    <li>Poner de título centrando los créditos para TMDB/importante para poder usarlo correctamente---HECHO!!</li>
                </ul>

                <div>
                                    <img src={img} width="100" height="100" />

                </div>

                <div className="movies-titles">
                    <h1 className="title">JSON MOVIES</h1>
                    <h1 className="title">API MOVIES</h1>
                    <button onClick={()=> addRandomMovie()}>Añadir peliculas</button>
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
