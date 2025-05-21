    //Declaro las variables
    let moves, totalMoves, score = 0;
    let record = localStorage.getItem('record') || 0;

    // Mostramos el récord guardado
    document.getElementById('record').innerHTML = `Récord: ${record}`;

    // Sonidos para cada panel (1 a 4)
    const sounds = {
      1: new Audio('sonidos/sonido-rojo.mp3'),
      2: new Audio('sonidos/sonido-verde.mp3'),
      3: new Audio('sonidos/sonido-azul.mp3'),
      4: new Audio('sonidos/sonido-amarillo.mp3'),
    };

    // Ilumina el panel y reproduce su sonido
    function illuminate(cellPos, time) {
      setTimeout(() => {
        const cell = document.querySelector(`.cell[pos="${cellPos}"]`);
        cell.classList.add('active');
        const sound = sounds[cellPos];
        sound.currentTime = 0;
        sound.play();
        setTimeout(() => cell.classList.remove('active'), 300);
      }, time);
    }

    // Genera secuencia aleatoria
    function setMoves(current) {
      moves.push(Math.floor(Math.random() * 4) + 1);
      if (current < totalMoves) setMoves(++current);
    }

    // Inicia el juego desde cero
    function startGame() {
      moves = [];
      totalMoves = 2;
      score = 0;
      updateScore();
      document.getElementById('start').style.display = 'none';
      document.getElementById('retry').style.display = 'none';
      document.getElementById('message').style.display = 'block';
      sequence();
    }

    // Reinicia el juego
    function retryGame() {
      startGame();
    }

    // Muestra la secuencia
    function sequence() {
      moves = [];
      setMoves(1);
      document.getElementById('message').innerHTML = 'Simón dice:';
      for (let i = 0; i < moves.length; i++) {
        illuminate(moves[i], 600 * i);
      }
      setTimeout(() => {
        document.getElementById('message').innerHTML = 'Repite la secuencia';
      }, 600 * moves.length);
    }

    // Actualiza puntaje y récord
    function updateScore() {
      document.getElementById('score').innerHTML = `Puntaje: ${score}`;
      if (score > record) {
        record = score;
        localStorage.setItem('record', record);
        document.getElementById('record').innerHTML = `Récord: ${record}`;
      }
    }

    // Verifica los clics del jugador
    function cellClick(e) {
      let cellPos = e.target.getAttribute('pos');
      illuminate(cellPos, 0);

      if (moves && moves.length) {
        if (moves[0] == cellPos) {
          moves.shift();
          if (!moves.length) {
            score += 10;
            updateScore();
            totalMoves++;
            setTimeout(sequence, 1000);
          }
        } else {
          document.getElementById('message').innerHTML = '¡FIN DEL JUEGO!';
          document.getElementById('retry').style.display = 'inline-block';
        }
      }
    }

    // Eventos de botones y celdas
    document.getElementById('start').addEventListener('click', startGame);
    document.getElementById('retry').addEventListener('click', retryGame);
    Array.from(document.getElementsByClassName('cell')).forEach(cell => {
      cell.addEventListener('click', cellClick);
    });