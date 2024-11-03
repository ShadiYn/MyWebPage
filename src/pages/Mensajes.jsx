import {useNavigate} from 'react-router-dom';



const Mensajes = ()=>{
    const navigate = useNavigate();
    const handleSeeMessages = ()=>{
        navigate('/seeMessages')
    }

    const handleWriteMessage = ()=>{
        navigate('/writeMessage')
    }


  return(
    <div>
         <button  onClick={handleSeeMessages}>Ver Mensajes</button> 
              <button  onClick={handleWriteMessage}>Escribir Mnesaje</button> 
    </div>
  )
}

export default Mensajes;