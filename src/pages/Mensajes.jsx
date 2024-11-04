// src/Mensajes.js
import { useState } from 'react';
import * as api from '../services/mensajes';
import SeeMessages from '../pages/SeeMessages';
import WriteMessages from '../pages/WriteMessage';
import {useNavigate} from 'react-router-dom';
import '../app/Mensaje.css'; // Importamos el CSS

function Mensajes() {
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState('');
    const [selectedUser, setSelectedUser] = useState(''); // Usuario seleccionado
    const navigate = useNavigate();

    const handleLogin = async () => {
        const id = await api.loginUser(userName);
        setUserId(id);
    };
      const handleHome = ()=>{
      navigate('/');
    }

    return (
        <div className="Mensajes">
          <button onClick={handleHome}>Home</button>
            {!userId ? (
                <div className="login-section">
                    <input
                        type="text"
                        placeholder="Ingrese su nombre"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="login-input"
                    />
                    <button onClick={handleLogin} className="login-button">Iniciar Sesión</button>
                </div>
            ) : (
                <div className="chat-area">
                    <h2>Bienvenido, {userName}</h2>
                    <h3>Escribe un mensaje o selecciona un chat</h3>
                    <SeeMessages userId={userId} selectedUser={selectedUser} />
                    <WriteMessages userId={userId} destinatario={selectedUser} />
                </div>
            )}
        </div>
    );
}

export default Mensajes;