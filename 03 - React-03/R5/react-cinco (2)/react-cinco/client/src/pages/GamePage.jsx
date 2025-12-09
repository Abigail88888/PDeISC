import React from 'react';
import GameCanvas from '../components/Game/GameCanvas';

const GamePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-space-blue text-space-white p-4">
      <h1 className="text-4xl font-bold mb-6">SPACE INVADERS</h1>
      <p className="text-lg mb-8">Usa ← → para moverte y ESPACIO para disparar</p>
      <GameCanvas />
    </div>
  );
};

export default GamePage;