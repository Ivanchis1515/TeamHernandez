<?php
    // ARCHIVO CONEXIÓN.PHP
    require '../vendor/autoload.php'; // Asegúrate de cargar la biblioteca JWT

    //funcion que hace la conexion a la base de datos y verifica el usuario
    function conexion($usuario, $password) {
        $mysqli = new mysqli('localhost', 'root', '', 'team_hernandez');
    
        //verificar la conexion
        if ($mysqli->connect_error) {
            die('Error de conexión a la base de datos: ' . $mysqli->connect_error);
        }
    
        //consulta preparada para buscar el usuario
        $query = "SELECT usuario, psswd FROM usuario WHERE usuario = ?";
        
        if ($stmt = $mysqli->prepare($query)) {
            //vincular el parametro
            $stmt->bind_param('s', $usuario);
    
            //ejecutar la consulta
            if ($stmt->execute()) {
                //obten el resultado
                $stmt->store_result();
    
                //verificar si se encontró un usuario
                if ($stmt->num_rows > 0) {
                    //vincular el resultado a variables
                    $stmt->bind_result($usuario_db, $hash_almacenado);
                    $stmt->fetch();
    
                    //verificar si la contraseña proporcionada coincide con el hash almacenado
                    if (password_verify($password, $hash_almacenado)) {
                        //inicio de sesión
                        session_start();
                        //configurar un elemento usuario dentro del arreglo global $_SESSION
                        $_SESSION['usuario'] = $usuario;
                        //cerrar la consulta preparada
                        $stmt->close();
                        $mysqli->close();
                        //retornar verdadero
                        return true;
                    }
                }
            }
            //cerrar la consulta preparada
            $stmt->close();
        } else {
            die('Error en la preparación de la consulta: ' . $mysqli->error);
        }
        //cerrar la conexión
        $mysqli->close();
        //retornar falso
        return false;
    }
    
    //funcion que verifica el tipo de usuario
    function tipo($usuario){
        //conexion a la BD
        $mysqli = new mysqli('localhost', 'root', '', 'team_hernandez');

        // Verificar la conexión
        if ($mysqli->connect_error) {
            die('Error de conexión a la base de datos: ' . $mysqli->connect_error);
        }

        //aqui se consulta al usuario
        $query = "SELECT tipo_rol FROM usuario WHERE usuario = ?";

        if ($stmt = $mysqli->prepare($query)) {
            //vincular parametro
            $stmt->bind_param('s', $usuario);
    
            //ejecuta la consulta
            if ($stmt->execute()) {
                //obten el resultado
                $stmt->store_result();
    
                //verificar si se encontro un usuario
                if ($stmt->num_rows > 0) {
                    //vincula el resultado a variables
                    $stmt->bind_result($tipo_rol);
                    $stmt->fetch();
    
                    //cerrar la consulta preparada
                    $stmt->close();
                    $mysqli->close();
    
                    //retorna el tipo de rol
                    return $tipo_rol;
                }
            }
            //cierra la consulta preparada
            $stmt->close();
        } else {
            die('Error en la preparación de la consulta: ' . $mysqli->error);
        }
        //cerrar la conexion a la bd
        $mysqli->close();
    
        //si no se encuentra el usuario, retornar false o un valor predeterminado
        return false;
    }

    function verificar_usuario() {
        // Continuar una sesión iniciada
        session_start();
        //Si la variable $_SESSION no esta vacia (null) devuelve true
        if (isset($_SESSION["usuario"])) {
            return true;
        }
    
        // Si no hay una sesión iniciada, verifica el token JWT
        if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $token = str_replace('Bearer ', '', $_SERVER['HTTP_AUTHORIZATION']);
            try {
                $decoded = Firebase\JWT\JWT::decode($token, 'clave_secreta', ['HS256']);
                // La verificación del token fue exitosa
                $_SESSION['usuario'] = $decoded->usuario; // Establece el usuario en la sesión
                return true;
            } 
            catch (Exception $e) {
                // Si hay un error al verificar el token JWT, no se permite el acceso
                return false;
            }
        }
    }
?>