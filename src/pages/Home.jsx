import {Link} from 'react-router-dom';

const Home = ()=>{
    return(
        <div>
            <ul>
                <li><Link to="/page1">Pagina 1</Link></li>
            </ul>
            <p>Pgina home</p>

        </div>
    )
}
export default Home;