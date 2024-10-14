import {Link} from 'react-router-dom';

const Home = ()=>{
    return(
        <div>
            <ul>
                <li><Link to="/movieInfo">Movies Info</Link></li>
                <li><Link to="/book-journal">Book Journal</Link></li>
            </ul>
            <p>Pgina home</p>

        </div>
    )
}
export default Home;