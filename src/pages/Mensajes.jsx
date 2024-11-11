// src/pages/Mensajes.jsx
import { useState } from 'react';
import { loginUser, registerUser } from '../services/mensajes';
import { useNavigate } from 'react-router-dom';
import '../app/Mensaje.css';

function Mensajes({ setUserId }) {
    const [nombre, setNombre] = useState('');
    const [contraseña, setContraseña] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const userId = await loginUser(nombre, contraseña);
            if (userId) {
                // Guarda el userId en el localStorage
                localStorage.setItem('userId', userId);
                setUserId(userId);
                navigate('/SeeMessages'); // Redirige a la vista de mensajes
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        } catch (error) {
            console.error("Error en el login:", error);
            alert("No se pudo iniciar sesión");
        }
    };
    const handleHome=()=>{
        navigate('/')
    }

    const handleRegister = async () => {
        try {
            const userId = await registerUser(nombre, contraseña);
            if (userId) {
                alert('Registro exitoso. Ahora puedes iniciar sesión.');
            } else {
                alert('El nombre de usuario ya está en uso.');
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            alert("No se pudo registrar el usuario.");
        }
    };

    return (
        
        <div className="auth-container">
            <button onClick={handleHome}>Home</button>
            <div className="auth-card">
                <h3 className="auth-title">Iniciar Sesión</h3>
                <input
                    type="text"
                    className="auth-input"
                    placeholder="Nombre de usuario"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="password"
                    className="auth-input"
                    placeholder="Contraseña"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                />
                <div className="auth-actions">
                    <button className="auth-button" onClick={handleLogin}>Iniciar Sesión</button>
                    <button className="auth-button" onClick={handleRegister}>Registrarse</button>
                </div>
            </div>
        </div>
    );
}

export default Mensajes;
