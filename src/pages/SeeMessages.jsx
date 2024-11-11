import { useState, useEffect } from 'react';
import { getMessagesByUserId } from '../services/mensajes';
import { useNavigate } from 'react-router-dom';
import '../app/seeMessages.css'; // Importa el CSS

function SeeMessages() {
    const [userId, setUserId] = useState(null);
    const [messages, setMessages] = useState([]);

    // Asignar el userId de alguna manera
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        console.log("User ID almacenado:", storedUserId); // Verifica si el userId se recupera
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);
    
    useEffect(() => {
        if (userId) {
            const fetchMessages = async () => {
                try {
                    console.log("Requesting messages for userId:", userId); // Verifica que userId sea correcto
                    const messages = await getMessagesByUserId(userId);
                    console.log("Mensajes obtenidos:", messages);
                    setMessages(messages);
                } catch (error) {
                    console.error("Error al obtener los mensajes:", error);
                }
            };
            fetchMessages();
        }
    }, [userId]);

    const navigate = useNavigate();
    const handleReturn = () => {
        navigate('/mensajes');
    }

    const handleCreateMensaje = ()=>{
        navigate('/WriteMessage')
    }
    return (
        <div className="see-messages-container"> {/* Aquí agregamos la clase para aplicar el estilo */}
            <div>
                <button onClick={handleReturn}>Login/register</button>
                <button onClick={handleCreateMensaje}>Crear Mensaje</button>
            </div>
            {messages.length > 0 ? (
                messages.map((msg, index) => (
                    <div key={index} className='mensaje'>
                        <p>{msg.nombreRemitente}</p>
                        <p>{msg.texto}</p>
                    </div>  
                ))
            ) : (
                <p>No hay mensajes.</p>
            )}
        </div>
    );
}

export default SeeMessages;
