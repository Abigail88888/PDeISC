import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../services/scores';
import Leaderboard from '../components/Leaderboard';

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await getLeaderboard();
        setLeaderboard(data);
        setError('');
      } catch (err) {
        setError('Error al cargar el leaderboard');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="centered-container app-container">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-space-white">Ranking de Jugadores</h1>
        <p className="text-space-white/70">Mejores puntajes del juego</p>
      </div>
      
      {loading ? (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p className="text-space-white/70 mt-4">Cargando...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-400">
          {error}
        </div>
      ) : (
        <Leaderboard leaderboard={leaderboard} />
      )}
    </div>
  );
};

export default LeaderboardPage;