import {Link} from 'react-router-dom';

const  Bookjournal = ()=>{
    return(

        <div>
            <ul>
            <li><Link to="/">Home</Link></li>
            </ul>

            <div>
                <ul>
                    <li>Titulo: book journal</li>
                    <li>2. Crear un apartado para mostrar todos los libros registrados usando una base de datos: mostrar: portada, nombre, autor, y el numero de estrellas dadas</li>
                    <li>en la segunda cardview mostrar un calendario con colores los dias, esos dias significara que se ha registrado ese libro en ese dia</li>
                    <li>Añadir un conteo de libros leidos por año-mes</li>
                    <li>añadir un desplegabke por si se ha ledio mas de 1 libro al dia ?¿</li>
                    <li>Añadir un boton , para poder añadir un libro: titulo, autor, y puntuación de 5 estrellas, y pedir que inserte la portada correspondiente, y si se desea, colocarle un color a la cardview para que sea mas vistosa.</li>

                    <li>Para ya cuando este lista, intentar convertirla en una aplicacion android-ios</li>
                </ul>
            </div>

        </div>

      
        
 
    )
}
export default Bookjournal