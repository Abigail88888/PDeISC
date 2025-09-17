import React, { useState, useEffect, useRef } from 'react';

// Imágenes
import pacmanBocaCerrada from '../../assets/images/pacman/pacman_boca_cerrada.png';
import pacmanBocaAbierta from '../../assets/images/pacman/pacman_boca_abierta.png';
import bala1 from '../../assets/images/balas/bala1.png';
import bala2 from '../../assets/images/balas/bala2.png';
import explosionInicial from '../../assets/images/explosion/explosion_inicial.png';
import explosionFinal from '../../assets/images/explosion/explosion_final.png';
import rojoDerecha from '../../assets/images/fantasmas/rojo_derecha.png';
import rojoIzquierda from '../../assets/images/fantasmas/rojo_izquierda.png';
import rosaDerecha from '../../assets/images/fantasmas/rosa_derecha.png';
import rosaIzquierda from '../../assets/images/fantasmas/rosa_izquierda.png';
import naranjaDerecha from '../../assets/images/fantasmas/naranja_derecha.png';
import naranjaIzquierda from '../../assets/images/fantasmas/naranja_izquierda.png';
import turquesaDerecha from '../../assets/images/fantasmas/turquesa_derecha.png';
import turquesaIzquierda from '../../assets/images/fantasmas/turquesa_izquierda.png';
import muroSano from '../../assets/images/muros/muro_sano.png';
import muroDañado1 from '../../assets/images/muros/muro_dañado1.png';
import muroDañado2 from '../../assets/images/muros/muro_dañado2.png';

// Sonidos
import balaSound from '../../assets/sounds/bala.mp3';
import enemigoDerrotadoSound from '../../assets/sounds/enemigo_derrotado.mp3';
import muerteSound from '../../assets/sounds/muerte.mp3';
import musicaFondoSound from '../../assets/sounds/musica_fondo.mp3';

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  // Estado del juego
  const [gameState, setGameState] = useState({
    player: { 
      x: 380, 
      y: 550, 
      width: 40, 
      height: 40, 
      speed: 4,
      isShooting: false, 
      movingLeft: false, 
      movingRight: false 
    },
    aliens: [],
    bullets: [],
    explosions: [],
    barriers: [],
    score: 0,
    lives: 3,
    level: 1,
    gameRunning: true,
    gameOver: false,
  });

  const [images, setImages] = useState({});
  const [sounds, setSounds] = useState({});

  // Cargar imágenes y sonidos
  useEffect(() => {
    const loadAssets = async () => {
      const imgMap = {};
      const soundMap = {};

      const imagePaths = [
        { key: 'pacmanBocaCerrada', src: pacmanBocaCerrada },
        { key: 'pacmanBocaAbierta', src: pacmanBocaAbierta },
        { key: 'bala1', src: bala1 },
        { key: 'bala2', src: bala2 },
        { key: 'explosionInicial', src: explosionInicial },
        { key: 'explosionFinal', src: explosionFinal },
        { key: 'rojoDerecha', src: rojoDerecha },
        { key: 'rojoIzquierda', src: rojoIzquierda },
        { key: 'rosaDerecha', src: rosaDerecha },
        { key: 'rosaIzquierda', src: rosaIzquierda },
        { key: 'naranjaDerecha', src: naranjaDerecha },
        { key: 'naranjaIzquierda', src: naranjaIzquierda },
        { key: 'turquesaDerecha', src: turquesaDerecha },
        { key: 'turquesaIzquierda', src: turquesaIzquierda },
        { key: 'muroSano', src: muroSano },
        { key: 'muroDañado1', src: muroDañado1 },
        { key: 'muroDañado2', src: muroDañado2 },
      ];

      const soundPaths = [
        { key: 'bala', src: balaSound },
        { key: 'enemigoDerrotado', src: enemigoDerrotadoSound },
        { key: 'muerte', src: muerteSound },
        { key: 'musicaFondo', src: musicaFondoSound },
      ];

      for (let item of imagePaths) {
        const img = new Image();
        img.src = item.src;
        await new Promise((resolve) => (img.onload = resolve));
        imgMap[item.key] = img;
      }

      for (let item of soundPaths) {
        const snd = new Audio(item.src);
        snd.preload = 'auto';
        soundMap[item.key] = snd;
      }

      setImages(imgMap);
      setSounds(soundMap);
    };

    loadAssets();
  }, []);

  // Reproducir música de fondo
  useEffect(() => {
    if (sounds.musicaFondo) {
      sounds.musicaFondo.loop = true;
      sounds.musicaFondo.play().catch(e => console.warn('Error reproduciendo música:', e));
    }
    return () => {
      if (sounds.musicaFondo) sounds.musicaFondo.pause();
    };
  }, [sounds.musicaFondo]);

  // Iniciar juego
  useEffect(() => {
    if (!Object.values(images).every(img => img !== null)) return;

    const initGame = () => {
      const aliens = [];
      const colors = ['rojo', 'rosa', 'naranja', 'turquesa'];
      const rows = 5;
      const cols = 10;
      const spacingX = 60;
      const spacingY = 50;
      const startX = 50;
      const startY = 50;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const color = colors[row % colors.length];
          const speed = 0.5 + (gameState.level - 1) * 0.2;
          aliens.push({
            x: startX + col * spacingX,
            y: startY + row * spacingY,
            width: 40,
            height: 40,
            speed,
            direction: 'right',
            color,
            lastShot: 0, // ✅ Nuevo: timestamp del último disparo
          });
        }
      }

      const barriers = [];
      const spacing = 150;
      const startXBar = 100;
      const startYBar = 400;
      for (let i = 0; i < 4; i++) {
        barriers.push({
          x: startXBar + i * spacing,
          y: startYBar,
          width: 100,
          height: 60,
          state: 'sano',
        });
      }

      setGameState(prev => ({
        ...prev,
        aliens,
        barriers,
        player: { ...prev.player, x: 380, y: 550, movingLeft: false, movingRight: false },
        bullets: [],
        explosions: [],
        gameRunning: true,
        gameOver: false,
      }));
    };

    if (gameState.gameOver || gameState.aliens.length === 0) {
      initGame();
    }
  }, [images, gameState.level, gameState.gameOver]);

  // Control de movimiento continuo
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameState.gameRunning) return;

      setGameState(prev => {
        let newState = { ...prev };
        switch (e.key) {
          case 'ArrowLeft':
            newState.player.movingLeft = true;
            break;
          case 'ArrowRight':
            newState.player.movingRight = true;
            break;
          case ' ':
            if (sounds.bala) sounds.bala.currentTime = 0;
            if (sounds.bala) sounds.bala.play();
            newState.bullets.push({
              x: prev.player.x + prev.player.width / 2 - 2,
              y: prev.player.y,
              width: 4,
              height: 10,
              speed: 7,
            });
            newState.player.isShooting = true;
            break;
        }
        return newState;
      });
    };

    const handleKeyUp = (e) => {
      setGameState(prev => {
        let newState = { ...prev };
        switch (e.key) {
          case 'ArrowLeft':
            newState.player.movingLeft = false;
            break;
          case 'ArrowRight':
            newState.player.movingRight = false;
            break;
          case ' ':
            newState.player.isShooting = false;
            break;
        }
        return newState;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState.gameRunning, sounds.bala]);

  // Mover jugador continuamente
  useEffect(() => {
    if (!gameState.gameRunning || !Object.values(images).every(img => img !== null)) return;

    const movePlayer = () => {
      setGameState(prev => {
        let newState = { ...prev };
        const { player } = newState;

        if (player.movingLeft) {
          player.x = Math.max(0, player.x - player.speed);
        }
        if (player.movingRight) {
          player.x = Math.min(800 - player.width, player.x + player.speed);
        }

        return newState;
      });

      requestAnimationFrame(movePlayer);
    };

    const id = requestAnimationFrame(movePlayer);
    return () => cancelAnimationFrame(id);
  }, [gameState.gameRunning, images]);

  // Calcular cooldown basado en nivel
  const getCooldownMs = () => {
    return Math.max(500, 2000 - (gameState.level - 1) * 150); // Min 0.5s, Max 2s
  };

  // Loop principal del juego
  useEffect(() => {
    if (!canvasRef.current || !Object.values(images).every(img => img !== null)) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    const updateGame = () => {
      setGameState(prev => {
        let newState = { ...prev };

        // Mover balas: jugador sube, enemigos bajan
        newState.bullets = newState.bullets
          .map(b => ({
            ...b,
            y: b.fromAlien ? b.y + b.speed : b.y - b.speed
          }))
          .filter(b => b.y > 0 && b.y < 600);

        // Mover fantasmas
        let moveDown = false;
        let moveLeft = false;
        let moveRight = false;

        newState.aliens.forEach(a => {
          if (a.direction === 'right' && a.x + a.width >= 800) moveDown = moveLeft = true;
          if (a.direction === 'left' && a.x <= 0) moveDown = moveRight = true;
        });

        newState.aliens = newState.aliens.map(a => ({
          ...a,
          x: moveDown ? a.x : a.direction === 'right' ? a.x + a.speed : a.x - a.speed,
          y: moveDown ? a.y + 20 : a.y,
          direction: moveDown ? (moveLeft ? 'left' : 'right') : a.direction,
        }));

        // ✅ DISPARO DE FANTASMAS CON COOLDOWN
        const currentTimestamp = Date.now();
        const cooldown = getCooldownMs();

        // Solo un disparo por fantasma, con cooldown
        newState.aliens.forEach(alien => {
          if (
            alien.lastShot === 0 || // Nunca ha disparado
            currentTimestamp - alien.lastShot >= cooldown // Pasó el cooldown
          ) {
            // Disparo aleatorio (probabilidad baja)
            if (Math.random() < 0.0015) {
              // Dispara
              newState.bullets.push({
                x: alien.x + 20,
                y: alien.y + 40,
                width: 4,
                height: 10,
                speed: 5 + gameState.level * 0.3,
                fromAlien: true,
              });

              // Actualiza el timestamp del último disparo
              alien.lastShot = currentTimestamp;
            }
          }
        });

        // Colisiones: bala jugador vs fantasma
        newState.bullets.forEach((bullet, bIdx) => {
          if (bullet.fromAlien) return;

          newState.aliens.forEach((alien, aIdx) => {
            if (
              bullet.x < alien.x + alien.width &&
              bullet.x + bullet.width > alien.x &&
              bullet.y < alien.y + alien.height &&
              bullet.y + bullet.height > alien.y
            ) {
              newState.bullets = newState.bullets.filter((_, i) => i !== bIdx);
              newState.aliens = newState.aliens.filter((_, i) => i !== aIdx);
              newState.score += 100;

              if (sounds.enemigoDerrotado) {
                sounds.enemigoDerrotado.currentTime = 0;
                sounds.enemigoDerrotado.play();
              }

              newState.explosions.push({
                x: alien.x,
                y: alien.y,
                frame: 0,
              });
            }
          });
        });

        // Colisiones: bala enemiga vs jugador
        newState.bullets.forEach((bullet, bIdx) => {
          if (!bullet.fromAlien) return;

          if (
            bullet.x < newState.player.x + newState.player.width &&
            bullet.x + bullet.width > newState.player.x &&
            bullet.y < newState.player.y + newState.player.height &&
            bullet.y + bullet.height > newState.player.y
          ) {
            newState.bullets = newState.bullets.filter((_, i) => i !== bIdx);
            newState.lives -= 1;

            if (sounds.muerte && newState.lives <= 0) {
              sounds.muerte.currentTime = 0;
              sounds.muerte.play();
            }

            if (newState.lives <= 0) {
              newState.gameRunning = false;
              newState.gameOver = true;
            }
          }
        });

        // Colisiones: jugador vs fantasma (contacto directo)
        newState.aliens.forEach(alien => {
          if (
            newState.player.x < alien.x + alien.width &&
            newState.player.x + newState.player.width > alien.x &&
            newState.player.y < alien.y + alien.height &&
            newState.player.y + newState.player.height > alien.y
          ) {
            newState.lives -= 1;

            if (sounds.muerte && newState.lives <= 0) {
              sounds.muerte.currentTime = 0;
              sounds.muerte.play();
            }

            if (newState.lives <= 0) {
              newState.gameRunning = false;
              newState.gameOver = true;
            }
          }
        });

        // Colisiones: bala vs muro
        newState.bullets.forEach((bullet, bIdx) => {
          newState.barriers.forEach((barrier, bIdx) => {
            if (
              bullet.x < barrier.x + barrier.width &&
              bullet.x + bullet.width > barrier.x &&
              bullet.y < barrier.y + barrier.height &&
              bullet.y + bullet.height > barrier.y
            ) {
              newState.bullets = newState.bullets.filter((_, i) => i !== bIdx);

              let newStateBar = barrier.state;
              if (barrier.state === 'sano') newStateBar = 'dañado1';
              else if (barrier.state === 'dañado1') newStateBar = 'dañado2';
              else if (barrier.state === 'dañado2') newStateBar = 'destruido';

              newState.barriers[bIdx] = { ...barrier, state: newStateBar };
            }
          });
        });

        // Nivel completado
        if (newState.aliens.length === 0) {
          newState.level += 1;
          newState.bullets = [];
          newState.explosions = [];
        }

        // Perdiste: fantasmas llegaron abajo
        if (newState.aliens.some(a => a.y + a.height >= 550)) {
          newState.gameRunning = false;
          newState.gameOver = true;
          if (sounds.muerte) {
            sounds.muerte.currentTime = 0;
            sounds.muerte.play();
          }
        }

        return newState;
      });
    };

    const drawGame = () => {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 800, 600);

      // Fondo
      ctx.fillStyle = '#0a192f';
      ctx.fillRect(0, 0, 800, 600);

      // Jugador
      const playerImg = gameState.player.isShooting ? images.pacmanBocaAbierta : images.pacmanBocaCerrada;
      if (playerImg) {
        ctx.drawImage(playerImg, gameState.player.x, gameState.player.y, 40, 40);
      }

      // Balas
      gameState.bullets.forEach(bullet => {
        const bImg = Math.floor(Date.now() / 100) % 2 === 0 ? images.bala1 : images.bala2;
        if (bImg) {
          ctx.drawImage(bImg, bullet.x, bullet.y, 4, 10);
        }
      });

      // Fantasmas
      gameState.aliens.forEach(alien => {
        let img;
        switch (alien.color) {
          case 'rojo':
            img = alien.direction === 'right' ? images.rojoDerecha : images.rojoIzquierda;
            break;
          case 'rosa':
            img = alien.direction === 'right' ? images.rosaDerecha : images.rosaIzquierda;
            break;
          case 'naranja':
            img = alien.direction === 'right' ? images.naranjaDerecha : images.naranjaIzquierda;
            break;
          case 'turquesa':
            img = alien.direction === 'right' ? images.turquesaDerecha : images.turquesaIzquierda;
            break;
          default:
            img = images.rojoDerecha;
        }
        if (img) ctx.drawImage(img, alien.x, alien.y, 40, 40);
      });

      // Muros
      gameState.barriers.forEach(barrier => {
        let img;
        switch (barrier.state) {
          case 'sano': img = images.muroSano; break;
          case 'dañado1': img = images.muroDañado1; break;
          case 'dañado2': img = images.muroDañado2; break;
          default: img = null;
        }
        if (img) ctx.drawImage(img, barrier.x, barrier.y, 100, 60);
      });

      // Explosiones
      gameState.explosions.forEach(exp => {
        const img = exp.frame < 5 ? images.explosionInicial : images.explosionFinal;
        if (img) {
          ctx.drawImage(img, exp.x, exp.y, 40, 40);
          setGameState(prev => ({
            ...prev,
            explosions: prev.explosions.map(e =>
              e === exp ? { ...e, frame: e.frame + 1 } : e
            )
          }));
        }
      });

      // Puntaje y vidas
      ctx.fillStyle = '#ccd6f6';
      ctx.font = '20px Arial';
      ctx.fillText(`Puntaje: ${gameState.score}`, 20, 30);
      ctx.fillText(`Vidas: ${gameState.lives}`, 20, 60);
      ctx.fillText(`Nivel: ${gameState.level}`, 20, 90);
      ctx.fillText(`Cooldown: ${getCooldownMs()}ms`, 20, 120); // 👈 DEBUG: muestra cooldown actual
    };

    const animate = () => {
      updateGame();
      drawGame();
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [gameState, images, sounds]);

  // Reiniciar juego
  const restartGame = () => {
    setGameState(prev => ({
      ...prev,
      level: 1,
      score: 0,
      lives: 3,
      gameRunning: true,
      gameOver: false,
      player: { x: 380, y: 550, width: 40, height: 40, speed: 4, isShooting: false, movingLeft: false, movingRight: false },
      aliens: [],
      bullets: [],
      explosions: [],
      barriers: [],
    }));
  };

  // Ir a inicio
  const goToHome = () => {
    window.location.href = '/';
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className="mt-6 border-2 border-green-400 rounded-xl shadow-lg"
        style={{ background: '#0a192f' }}
      />

      {gameState.gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
          <div className="bg-space-blue p-8 rounded-xl text-center">
            <h1 className="text-3xl font-bold text-space-white mb-4">¡Juego Terminado!</h1>
            <p className="text-space-white/70 mb-6">Puntaje final: {gameState.score}</p>
            <button
              onClick={restartGame}
              className="btn btn-primary mx-2 px-6 py-3 bg-space-green text-black font-bold rounded-md hover:bg-space-green/90 transition"
            >
              Reintentar
            </button>
            <button
              onClick={goToHome}
              className="btn btn-secondary mx-2 px-6 py-3 bg-space-blue-dark text-space-white font-bold rounded-md hover:bg-space-blue/70 transition"
            >
              Ir a Inicio
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GameCanvas;