document.getElementById('loginform').addEventListener('submit', function(event) {
    event.preventDefault();
    // Realiza la solicitud de inicio de sesión al servidor
    fetch('../../config/inicio.php', {
        method: 'POST',
        body: new FormData(this)
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Almacena el token JWT en el almacenamiento local
            localStorage.setItem('jwt', data.token);
            // Redirige a la página principal según el tipo de usuario
            switch (data.tipo_rol) {
                case 'Administrador':
                    window.location.href = '../Admin/Adm.html';
                    break;
                case 'Coach':
                    window.location.href = '../Coach/Coach.html';
                    break;
                case 'Cliente':
                        window.location.href = '../Cliente/Cliente.html';
                        break;
                default:
                    alert('Rol de usuario no válido');
                    break;
            }
            console.log('tipo_rol:', data.tipo_rol);
        } 
        else {
            // Maneja el error de inicio de sesión
            alert('Inicio de sesión fallido');
        }
    })
    .catch(error => {
        // Maneja otros errores
        console.error(error);
        alert('Error de inicio de sesión');
    });
});
