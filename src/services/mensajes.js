// src/services/mensajes.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export async function loginUser(nombre, contraseña) {
    try {
        const response = await axios.post('http://localhost:8080/user/login', {
            nombre: nombre,
            contraseña: contraseña
        });
        return response.data; // Suponiendo que la respuesta sea el ID del usuario
    } catch (error) {
        console.error('Error al hacer el login:', error); // Aquí capturamos el error
        throw error; // Re-lanzamos el error para que lo maneje el componente
    }
}

export const getUserIdByName = async (nombre) => {
    const response = await axios.get(`${API_BASE_URL}/user/${nombre}`);
    return response.data; 
};





export const getMessagesByUserId = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/message/${userId}`);
        console.log("Respuesta de la API:", response); // Verifica la respuesta completa
        return response.data; // Verifica que `data` contiene la lista de mensajes
    } catch (error) {
        console.error('Error al obtener los mensajes:', error.response ? error.response.data : error.message);
        throw error;
    }
};





// src/services/mensajes.js


// src/services/mensajes.js (ya modificado antes para registrar)

export const registerUser = async (nombre, contraseña) => {
    const response = await axios.post(`${API_BASE_URL}/user/register`, { nombre, contraseña });
    return response.data;
};



export const sendMessage = async (mensaje) => {
    await axios.post(`${API_BASE_URL}/message`, mensaje, {
        headers: {
            'Content-Type': 'application/json',  
        },
    });
};

export async function getContacts(userId) {
    try {
        const response = await fetch(`/api/contacts?userId=${userId}`);
        const data = await response.json();
        return Array.isArray(data) ? data : []; 
    } catch (error) {
        console.error("Error en getContacts:", error);
        return [];
    }
}



