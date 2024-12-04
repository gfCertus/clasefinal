const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let ball;
let azulVertical, azulHorizontal, rojoVertical, rojoHorizontal;
let cursors, wasdKeys;

function preload() {
    this.load.image('ball', './assets/pongAmarillo.png'); // Cambia la ruta
    this.load.image('paddleA1', './assets/paddleAzul.png');
    this.load.image('paddleA2', './assets/paddleAzulH.png');
    this.load.image('paddleR1', './assets/paddleRojo.png');
    this.load.image('paddleR2', './assets/paddleRojoH.png');
}

function create() {
       // Crear los bordes de colores
       const graphics = this.add.graphics();

       // Borde Azul (derecha y abajo)
       graphics.lineStyle(4, 0x0000FF, 1); // Azul
       graphics.strokeRect(0, 596, 800, 4); // Línea inferior
       graphics.strokeRect(796, 0, 4, 600); // Línea derecha
   
       // Borde Rojo (izquierda y arriba)
       graphics.lineStyle(4, 0xFF0000, 1); // Rojo
       graphics.strokeRect(0, 0, 4, 600); // Línea izquierda
       graphics.strokeRect(0, 0, 800, 4); // Línea superior

    // Crear la pelota
    ball = this.physics.add.sprite(400, 300, 'ball');
    ball.setCollideWorldBounds(true);
    ball.setBounce(1);
    ball.setVelocity(300, 300);

    // Crear las barras
    azulVertical = this.physics.add.sprite(780, 300, 'paddleA1');
    azulVertical.setCollideWorldBounds(true);

    azulHorizontal = this.physics.add.sprite(400, 580, 'paddleA2');
    azulHorizontal.setCollideWorldBounds(true);

    rojoVertical = this.physics.add.sprite(20, 300, 'paddleR1');
    rojoVertical.setCollideWorldBounds(true);

    rojoHorizontal = this.physics.add.sprite(400, 20, 'paddleR2');
    rojoHorizontal.setCollideWorldBounds(true);

    // Hacer que las barras sean inmóviles
    azulVertical.body.immovable = true;
    azulHorizontal.body.immovable = true;
    rojoVertical.body.immovable = true;
    rojoHorizontal.body.immovable = true;

    // Colisiones entre la pelota y las barras
    this.physics.add.collider(ball, azulVertical);
    this.physics.add.collider(ball, azulHorizontal);
    this.physics.add.collider(ball, rojoVertical);
    this.physics.add.collider(ball, rojoHorizontal);

    // Controles para AzulVertical y AzulHorizontal
    cursors = this.input.keyboard.createCursorKeys();

    // Controles para RojoVertical y RojoHorizontal
    wasdKeys = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
    });
    const token = localStorage.getItem('token');
    const alias = localStorage.getItem('alias');
    console.log(alias);
      // Conexión a WebSocket 
      socket = new WebSocket('ws://192.168.10.100:3002'); // Dirección del servidor WebSocket
  
      socket.onopen = () => {
        console.log('Conexión WebSocket establecida');
      };
    
      socket.onmessage = () => {
        //const data = event.data;
        console.log('*>');
        // Aquí procesamos los movimientos de los jugadores (si es necesario)

      };
  

    // Eventos especiales
    this.input.keyboard.on('keydown-SPACE', () => {
        console.log('Espaciadora presionada');
    });

    this.input.keyboard.on('keydown-ESC', () => {
        console.log('Escape presionada');
    });

    // Enviar eventos de teclado
    document.addEventListener('keydown', (event) => {
        const message = {
            type: 'key_event',
            token,
            alias,
            key: event.key // Tecla presionada
        };
        socket.send(JSON.stringify(message));
    });
}

function update() {
    // Controles de AzulVertical
    if (cursors.up.isDown) {
        azulVertical.setVelocityY(-200);
    } else if (cursors.down.isDown) {
        azulVertical.setVelocityY(200);
    } else {
        azulVertical.setVelocityY(0);
    }

    // Controles de AzulHorizontal
    if (cursors.left.isDown) {
        azulHorizontal.setVelocityX(-400);
    } else if (cursors.right.isDown) {
        azulHorizontal.setVelocityX(400);
    } else {
        azulHorizontal.setVelocityX(0);
    }

    // Controles de RojoVertical
    if (wasdKeys.up.isDown) {
        rojoVertical.setVelocityY(-200);
    } else if (wasdKeys.down.isDown) {
        rojoVertical.setVelocityY(200);
    } else {
        rojoVertical.setVelocityY(0);
    }

    // Controles de RojoHorizontal
    if (wasdKeys.left.isDown) {
        rojoHorizontal.setVelocityX(-400);
    } else if (wasdKeys.right.isDown) {
        rojoHorizontal.setVelocityX(400);
    } else {
        rojoHorizontal.setVelocityX(0);
    }
}
