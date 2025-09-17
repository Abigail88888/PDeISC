import React, { useState, useEffect } from 'react';
import GameCanvas from '../components/Game/GameCanvas';

const TwoPlayerPage = () => {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const handlePlayerDeath = (score) => {
    if (currentPlayer === 1) {
      setScores({ ...scores, player1: score });
      setCurrentPlayer(2);
    } else {
      setScores({ ...scores, player2: score });
      setGameOver(true);
      
      // Determinar ganador
      if (scores.player1 > score) {
        setWinner(1);
      } else if (score > scores.player1) {
        setWinner(2);
      } else {
        setWinner(0); // Empate
      }
    }
  };

  const resetGame = () => {
    setCurrentPlayer(1);
    setScores({ player1: 0, player2: 0 });
    setGameOver(false);
    setWinner(null);
  };

  if (gameOver) {
    return (
      <div className="centered-container app-container">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-space-white mb-4">¡Juego Terminado!</h1>
          
          {winner === 1 && <p className="text-space-green text-xl">¡Jugador 1 gana!</p>}
          {winner === 2 && <p className="text-space-green text-xl">¡Jugador 2 gana!</p>}
          {winner === 0 && <p className="text-space-white text-xl">¡Es un empate!</p>}
          
          <div className="mt-8">
            <p className="text-space-white">Puntajes:</p>
            <p className="text-space-white">Jugador 1: {scores.player1}</p>
            <p className="text-space-white">Jugador 2: {scores.player2}</p>
          </div>
          
          <button
            onClick={resetGame}
            className="btn btn-primary mt-8"
          >
            Jugar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="centered-container app-container">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-space-white">Modo 2 Jugadores</h1>
        <p className="text-space-white/70">Turno del Jugador {currentPlayer}</p>
      </div>
      
      <GameCanvas 
        isTwoPlayerMode={true}
        currentPlayer={currentPlayer}
        onPlayerDeath={handlePlayerDeath}
      />
    </div>
  );
};

export default TwoPlayerPage;