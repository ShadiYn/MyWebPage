import {  useNavigate } from 'react-router-dom';

const Home = ()=>{
    const navigate = useNavigate();


    const handleBook = ()=>{
        navigate('/book-journal');

    }

    const handleMovies = ()=>{
        navigate('/movieInfo');
    }


    
    return(
        <div>
            <button onClick={handleMovies}>Movies Info</button>
            <button  onClick={handleBook}>Book Journal</button>
            <p></p>

        </div>
    )
}
export default Home;