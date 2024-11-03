import {  useNavigate } from 'react-router-dom';

const Home = ()=>{
    const navigate = useNavigate();
    
    const handleBook = ()=>{
        navigate('/book-journal');
    }
    const handleMovies = ()=>{
        navigate('/movieInfo');
    }

        const handleMensajes = ()=>{
            navigate('/mensajes');
        }


    return(
        <div>

            <div className='buttons-div'>
            <button onClick={handleMovies}>Movies Info</button>
            <button  onClick={handleBook}>Book Journal</button>  
            <button onClick={handleMensajes}>Mensajes</button>
            </div>
        
        </div>
    )
}
export default Home;