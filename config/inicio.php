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
            'tipo_rol' => tipo($usuario) //agrega el tipo de rol a los datos del usuario
        ];

        $jwt = Firebase\JWT\JWT::encode($usuario, 'clave_secreta', 'HS256'); //generamos un token JWT

        //redirecciona al usuario después de iniciar sesión correctamente
        $redirect_url = '';
        switch ($tipo_rol) {
            case 'Administrador':
                $redirect_url = '../html/Admin/Adm.html';
                break;
            case 'Coach':
                $redirect_url = '../html/Coach/Coach.html';
                break;
            case 'Cliente':
                $redirect_url = '../html/Cliente/Cliente.html';
                break;
            default:
                die('Rol de usuario no válido');
        }

        //establece el token JWT como una cookie, este se termina cuando se cierre el navegador
        setcookie('jwt', $jwt, 0, '/', '', false, true);

        //redirige al usuario después de iniciar sesión
        header('Location: ' . $redirect_url);
        //finaliza el script para evitar envío de contenido adicional
        exit;
    }
    else{
        //si el usuario no es válido regresamos al login
        header('Location:../html/Login/Sesion.html');
        //finaliza el script para evitar envío de contenido adicional
        exit;
    }
?>