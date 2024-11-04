import { useEffect, useState } from 'react';
import * as api from '../services/mensajes';
import {useNavigate} from 'react-router-dom';

function SeeMessages({ userId }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const fetchedMessages = await api.getMessagesByUserId(userId);
                setMessages(fetchedMessages); // Esto asume que fetchedMessages es un array de objetos con "nombreRemitente" y "texto"
            } catch (error) {
                console.error("Error al cargar los mensajes:", error);
            }
        };

        fetchMessages();
    }, [userId]);

  


    return (
        <div>
            <h3>Mensajes Recibidos</h3>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}> {/* Cambié key para que sea index si no tienes un id único en el mensaje */}
                        <p><strong>De:</strong> {message.nombreRemitente}</p> {/* Cambié a nombreRemitente */}
                        <p><strong>Mensaje:</strong> {message.texto}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SeeMessages;
