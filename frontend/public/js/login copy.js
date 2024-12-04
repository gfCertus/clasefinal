document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const alias = document.getElementById('alias').value;
    const password = document.getElementById('password').value;

    // Enviar las credenciales al backend orquestador para validación
    fetch('http://localhost:3004/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ alias, password })
    })
    .then(response => response.json())
    .then(status=> {
        if (status) {
            // Si la autenticación es exitosa, redirigir al juego
            console.log("data:",JSON.stringify(status));
            window.location.href = 'index.html'; // Redirigir a la sala de juego
        } else {
            console.log(status);
            alert('Credenciales incorrectas',status);
        }
    })
    .catch(error => {
        console.error('Error de autenticación:', error);
    });
});
