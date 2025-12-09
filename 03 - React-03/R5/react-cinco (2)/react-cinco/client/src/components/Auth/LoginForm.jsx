import React, { useState } from 'react';
import { login } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await login(username, password);
      // Guardar token en localStorage (ejemplo)
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.user.id);
      navigate('/game');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="app-container">
      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}
      
      <div className="form-control">
        <label>Usuario</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div className="form-control">
        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <button
        type="submit"
        className="btn btn-primary"
      >
        Iniciar Sesión
      </button>
    </form>
  );
};

export default LoginForm;