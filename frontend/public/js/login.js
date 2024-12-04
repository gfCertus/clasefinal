document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const alias = document.getElementById('alias').value;
    const password = document.getElementById('password').value;
    try {
        // Autenticación HTTP
        const response = await fetch('http://192.168.10.100:3004/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ alias, password })
        });

        const data = await response.json();
        if (data.token != undefined) {
            // Autenticación exitosa
            console.log(">>>",data);

            alert(`¡Bienvenido, ${alias}! Conectándote al juego...`);

            // Guardar token en localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('alias', alias); // Alias asociado al token
            connectWebSocket();
            // Redirigir al juego
            window.location.href = 'index.html';
        } else {
            alert('Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error durante la autenticación:', error);
    }
});
// Conexión al WebSocket
function connectWebSocket() {
    const token = localStorage.getItem('token');
    const alias = localStorage.getItem('alias');
    const ws = new WebSocket('ws://192.168.10.100:3002');
console.log("ALIAS: ",alias);
    ws.onopen = () => {
        console.log('Conexión WebSocket establecida');
        // Enviar token y alias
        ws.send(JSON.stringify({ type: 'authenticate', token, alias }));
    };

    ws.onmessage = (event) => {
        console.log('Mensaje recibido:', event.data);
    };

    ws.onclose = () => {
        console.log('Conexión WebSocket cerrada');
    };

    // Enviar eventos de teclado
    document.addEventListener('keydown', (event) => {
        const message = {
            type: 'key_event',
            token,
            alias,
            key: event.key // Tecla presionada
        };
        ws.send(JSON.stringify(message));
    });
}