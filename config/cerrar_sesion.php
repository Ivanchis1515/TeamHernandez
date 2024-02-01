<?php
    session_start();

    // Comprueba si el usuario está autenticado
    if (isset($_SESSION['usuario'])) {
        // Cierra la sesión
        session_unset();
        session_destroy();
        echo json_encode(['message' => 'Sesión cerrada']);
    } else {
        // Si el usuario no está autenticado, simplemente redirige al formulario de inicio de sesión
        header('Location: ../html/Login/Sesion.html');
    }
?>
