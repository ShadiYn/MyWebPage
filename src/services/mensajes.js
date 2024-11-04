// src/services/mensajes.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Autenticar o registrar un usuario
export const loginUser = async (nombre) => {
    const response = await axios.get(`${API_BASE_URL}/user/${nombre}`);
    return response.data; // Retorna el ID del usuario
};

// Obtener el ID de un usuario por nombre
export const getUserIdByName = async (nombre) => {
    const response = await axios.get(`${API_BASE_URL}/user/${nombre}`);
    return response.data; // Retorna el ID del usuario
};
// src/services/mensajes.js
export const getUsersChattedWith = async (userId) => {
    // Aquí harías la llamada a la API para obtener la lista de usuarios
    const response = await fetch(`/api/users/chatted/${userId}`);
    if (!response.ok) {
        throw new Error('Error al obtener los usuarios chateados');
    }
    return await response.json(); // Asumiendo que devuelve una lista de usuarios
};

// Asegúrate de tener una función para obtener mensajes entre dos usuarios
export const getMessagesByUserIdAndRecipient = async (userId, recipientId) => {
    const response = await fetch(`/api/messages/${userId}/${recipientId}`);
    if (!response.ok) {
        throw new Error('Error al cargar los mensajes');
    }
    return await response.json();
};


// Obtener mensajes por ID de usuario
export const getMessagesByUserId = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/message/${userId}`);
        return response.data; // Devuelve los datos obtenidos
    } catch (error) {
        console.error('Error al obtener los mensajes:', error);
        throw error;
    }
};

// Enviar un nuevo mensaje
export const sendMessage = async (mensaje) => {
    await axios.post(`${API_BASE_URL}/message`, mensaje, {
        headers: {
            'Content-Type': 'application/json',  // Especificar el tipo de contenido como JSON
        },
    });
};
