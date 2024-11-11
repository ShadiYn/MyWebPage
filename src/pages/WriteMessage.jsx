import { useState, useEffect } from 'react';
import axios from 'axios';

function WriteMessage() {
    const [mensaje, setMensaje] = useState('');
    const [recipientId, setRecipientId] = useState(''); // ID del destinatario
    const [usuarios, setUsuarios] = useState([]); // Lista de usuarios
    const [status, setStatus] = useState('');

    // Obtener la lista de usuarios cuando se monta el componente
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:8080/user/all');
                setUsuarios(response.data); // Guardamos la lista de usuarios
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        };

        fetchUsuarios();
    }, []);

    const handleChange = (event) => {
        setMensaje(event.target.value);
    };

    const handleRecipientChange = (event) => {
        setRecipientId(event.target.value); // Establecer el destinatario
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const userId = localStorage.getItem('userId');
        const newMessage = {
            remitenteId: userId,
            destinatarioId: recipientId,
            texto: mensaje
        };
    
        // Validar que los campos no estén vacíos
        if (!newMessage.remitenteId.trim() || !newMessage.destinatarioId.trim() || !newMessage.texto.trim()) {
            alert('Los campos no pueden estar vacíos');
            return;
        }
    
        console.log("Mensaje que se va a enviar:", newMessage);
    
        try {
            await axios.post('http://localhost:8080/message', newMessage);
            setStatus('Mensaje enviado correctamente');
            setMensaje('');
        } catch (error) {
            setStatus('Error al enviar el mensaje');
            console.error('Error al enviar el mensaje:', error);
        }
    };
    
    
    
    

    return (
        <div>
            <h2>Enviar mensaje</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Selecciona destinatario:
                                <select value={recipientId} onChange={handleRecipientChange} required>
                                <option value="">Selecciona un usuario</option>
                                {usuarios.map((usuario) => (
                                    <option key={usuario.id} value={usuario.id}>
                                        {usuario.nombre}
                                    </option>
                                ))}
                        </select>


                    </label>
                </div>
                <div>
                    <label>
                        Escribe tu mensaje:
                        <textarea value={mensaje} onChange={handleChange} required />
                    </label>
                </div>
                <button type="submit">Enviar</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
}

export default WriteMessage;
