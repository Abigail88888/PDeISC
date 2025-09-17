import { saveScore as modelSaveScore, getLeaderboard as modelGetLeaderboard } from '../models/Score.js';

// Renombramos las funciones del controller para evitar conflictos
const saveScoreController = (req, res) => {
  const { userId, score } = req.body;
  if (!userId || !score) {
    return res.status(400).json({ error: 'User ID and score are required' });
  }
  modelSaveScore(userId, score, (err) => {
    if (err) return res.status(500).json({ error: 'Error saving score' });
    res.status(201).json({ message: 'Score saved successfully' });
  });
};

const getLeaderboardController = (req, res) => {
  modelGetLeaderboard((err, results) => {
    if (err) return res.status(500).json({ error: 'Error fetching leaderboard' });
    res.status(200).json(results);
  });
};

export { saveScoreController, getLeaderboardController };