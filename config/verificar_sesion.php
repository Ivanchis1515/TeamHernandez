<?php
    // session_start();
    //comprueba si el usuario está autenticado
    if (isset($_SESSION['usuario'])) {
        //la sesión del usuario sigue siendo válida
        //devuelve una respuesta de éxito
        echo json_encode(['message' => 'Sesión válida']);
    } else {
        //la sesión ha expirado o el usuario no está autenticado
        //devuelve una respuesta de error
        echo json_encode(['error' => 'Sesión no válida']);
    }
?>