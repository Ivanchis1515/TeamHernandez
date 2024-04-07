<?php
    //inicializa la sesión
    // session_start();
    
    //cierra la sesión
    // session_unset();
    session_destroy();
    setcookie('PHPSESSID', '', time() - 3600, '/'); //establece el tiempo de expiración en el pasado
    //Invalida la cookie JWT
    setcookie('jwt', '', time() - 3600, '/', '', false, true);

    // Evitar almacenamiento en caché en el lado del cliente
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
    header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Fecha en el pasado

    //redirige al formulario de inicio de sesión
    header('Location: ../html/Login/Sesion.html');
    exit(); // Asegúrate de terminar la ejecución del script después de la redirección
?>
