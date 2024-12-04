// src/game/main.js

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
      preload,
      create,
      update
    }
  };
  
  let player1, player2, ball, cursors;
  let socket;
  
  function preload() {
    this.load.image('paddle1', 'assets/paddleRojo.png'); // Barra de los jugadores
    this.load.image('paddle2', 'assets/paddleAzul.png'); // Barra de los jugadores
    this.load.image('ball', 'assets/pongAmarillo.png'); // Pelota
  }
  
  function create() {
    // Crear las barras de los jugadores y la pelota
    player1 = this.physics.add.image(50, 300, 'paddle1').setImmovable();
    player2 = this.physics.add.image(750, 300, 'paddle2').setImmovable();
    ball = this.physics.add.image(400, 300, 'ball').setBounce(1).setCollideWorldBounds(true);
  
    // Añadir la física a la pelota
    ball.setVelocityX(200);
    ball.setVelocityY(200);
  
    // Control de las barras con las teclas
    cursors = this.input.keyboard.createCursorKeys();
  
    // Conexión a WebSocket
    socket = new WebSocket('ws://localhost:3000'); // Dirección del servidor WebSocket
  
    socket.onopen = () => {
      console.log('Conexión WebSocket establecida');
    };
  
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Aquí procesamos los movimientos de los jugadores (si es necesario)
    };
  }
  
  function update() {
    // Movimiento de las barras de los jugadores
    if (cursors.up.isDown) {
      player1.setVelocityY(-300);
    } else if (cursors.down.isDown) {
      player1.setVelocityY(300);
    } else {
      player1.setVelocityY(0);
    }
  
    // Aquí podríamos enviar la posición de la barra al servidor (WebSocket)
    socket.send(JSON.stringify({ player: 'player1', y: player1.y }));
  
    // Movimiento automático de la segunda barra para simplificar
    if (ball.y < player2.y) {
      player2.setVelocityY(-300);
    } else if (ball.y > player2.y) {
      player2.setVelocityY(300);
    } else {
      player2.setVelocityY(0);
    }
  
    // Verificar colisiones con la pelota
    this.physics.collide(ball, player1);
    this.physics.collide(ball, player2);
  }
  
  // Iniciar el juego
  new Phaser.Game(config);
  