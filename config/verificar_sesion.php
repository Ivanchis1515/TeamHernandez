<?php
    if (!isset($_SESSION['usuario'])) {
        http_response_code(401);
    }
    
    http_response_code(200);
    // // Continuar una sesión iniciada
    // // session_start();
    // //Si la variable $_SESSION no esta vacia (null) devuelve true
    // if (isset($_SESSION["usuario"])) {
    //     //si el usuario está autenticado, devuelve un código de estado 200 (OK)
    //     http_response_code(200);
    //     return true;
    // }
    // // Si no hay una sesión iniciada, verifica el token JWT
    // if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    //     $token = str_replace('Bearer ', '', $_SERVER['HTTP_AUTHORIZATION']);
    //     try {
    //         $decoded = Firebase\JWT\JWT::decode($token, 'clave_secreta', ['HS256']);
    //         // La verificación del token fue exitosa
    //         $_SESSION['usuario'] = $decoded->usuario; // Establece el usuario en la sesión
    //         //si el usuario está autenticado, devuelve un código de estado 200 (OK)
    //         http_response_code(200);
    //         return true;
    //     } 
    //     catch (Exception $e) {
    //         // Si el usuario no está autenticado, devuelve un código de estado 401 (No autorizado)
    //         http_response_code(401);
    //         // Si hay un error al verificar el token JWT, no se permite el acceso
    //         return false;
    //     }
    // }  
?>