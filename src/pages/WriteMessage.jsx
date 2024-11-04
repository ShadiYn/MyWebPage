// src/components/writemessages.jsx
import { useState } from 'react';
import * as api from '../services/mensajes';
import {useNavigate} from 'react-router-dom';

function WriteMessages({ userId }) {
    const [texto, setTexto] = useState('');
    const [destinatarioNombre, setDestinatarioNombre] = useState('');
    const navigate = useNavigate();

    const handleSendMessage = async () => {
        try {
            const destinatarioId = await api.getUserIdByName(destinatarioNombre);
            
            if (destinatarioId) {
                // Crear el objeto mensaje con el remitente y el destinatario
                const mensaje = {
                    texto: texto,
                    remitente: { id: userId },
                    destinatario: { id: destinatarioId },
                };
                
                // Enviar el mensaje
                await api.sendMessage(mensaje);
                setTexto('');
                setDestinatarioNombre('');
                alert('Mensaje enviado con éxito');
            } else {
                alert('Destinatario no encontrado');
            }
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
            alert("No se pudo enviar el mensaje");
        }
    };
   const handleHome = ()=>{
      navigate('/');
    }

    return (
        <div>
            <h3>Enviar Mensaje</h3>
            <input
                type="text"
                placeholder="Nombre del destinatario"
                value={destinatarioNombre}
                onChange={(e) => setDestinatarioNombre(e.target.value)}
            />
            <textarea
                placeholder="Escribe tu mensaje"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
            />
            <button onClick={handleSendMessage}>Enviar</button>
        </div>
    );
}

export default WriteMessages;
