import React, { useState } from 'react';
import { register } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un email válido');
      return;
    }
    
    try {
      const response = await register(username, email, password);
      // Guardar token en localStorage (ejemplo)
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.userId);
      navigate('/game');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrarse');
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
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;