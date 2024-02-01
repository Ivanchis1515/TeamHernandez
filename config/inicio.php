<?php
    // ARCHIVO INICIO.PHP
    require '../vendor/autoload.php'; //Biblioteca JWT (JSON WEB TOKEN)

    //funcion que contiene los datos del usuario
    include('conexion.php');

    //datos enviados por el formulario
    $usuario = $_POST['usuario'];
    $password = $_POST['contraseña'];
    
    //Usamos la funcion en conexion para redirigir al usuario
    if (conexion($usuario, $password)){        
        //si retorna verdadero damos ingreso dependiendo el tipo de usuario
        //guardamos el tipo de rol
        $tipo_rol = tipo($usuario);
        // Inicio de sesión exitoso
        $usuario = [
            'usuario' => $usuario,
            'tipo_rol' => tipo($usuario) // Agrega el tipo de rol a los datos del usuario
        ];

        $jwt = Firebase\JWT\JWT::encode($usuario, 'clave_secreta', 'HS256'); // Generamos un token JWT

        // Devuelve el token JWT como respuesta
        echo json_encode(['token' => $jwt, 'tipo_rol' => $tipo_rol]);
    }
    else{
        // die("Inicio de sesión fallido.");
        //si el usuario no es válido regresamos al login
        header('Location:../html/Login/Sesion.html');
    }
?>