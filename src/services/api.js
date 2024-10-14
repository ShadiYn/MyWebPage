//para implementar la api de cualquiera que sea una galeria con informacion para implementarla correctamente!

//apikey: d801d7cff4e032fae504d22d2d7dcf45  PARA EL MOVIE DB

//https://api.themoviedb.org/3/movie/297802?api_key=d801d7cff4e032fae504d22d2d7dcf45&append_to_response=images,credits

import axios from "axios";

const apiKey = 'd801d7cff4e032fae504d22d2d7dcf45';

export const api = axios.create({
    baseURL: `https://api.themoviedb.org/3/`
});

export const getPopularMovies = async () => {
   
        const response = await api.get(`movie/popular?api_key=${apiKey}`);
        console.log(response)
        return response.data.results; 
    
};


