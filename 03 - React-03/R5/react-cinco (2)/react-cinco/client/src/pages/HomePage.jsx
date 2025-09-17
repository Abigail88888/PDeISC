import React, { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';

const HomePage = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="centered-container app-container">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-space-white">Space Invaders</h1>
        <p className="text-space-white/70">Inicia sesión o regístrate para jugar</p>
      </div>
      
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowLogin(true)}
          className={`px-4 py-2 rounded-md font-medium transition ${
            showLogin
              ? "bg-space-green text-black"
              : "bg-space-blue/50 text-space-white hover:bg-space-blue/70"
          }`}
        >
          Iniciar Sesión
        </button>
        <button
          onClick={() => setShowLogin(false)}
          className={`ml-2 px-4 py-2 rounded-md font-medium transition ${
            !showLogin
              ? "bg-space-green text-black"
              : "bg-space-blue/50 text-space-white hover:bg-space-blue/70"
          }`}
        >
          Registrarse
        </button>
      </div>
      
      {showLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default HomePage;