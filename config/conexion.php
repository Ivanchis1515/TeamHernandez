<?php
    // ARCHIVO CONEXIÓN.PHP
    require '../vendor/autoload.php'; // Asegúrate de cargar la biblioteca JWT

    //funcion que hace la conexion a la base de datos y verifica el usuario
    function conexion($usuario, $password) {
        $mysqli = new mysqli('localhost', 'root', '', 'team_hernandez');
    
        // Verificar la conexión
        if ($mysqli->connect_error) {
            die('Error de conexión a la base de datos: ' . $mysqli->connect_error);
        }
    
        // Consulta preparada para buscar el usuario
        $query = "SELECT usuario, psswd FROM usuario WHERE usuario = ?";
        
        if ($stmt = $mysqli->prepare($query)) {
            // Vincular el parámetro
            $stmt->bind_param('s', $usuario);
    
            // Ejecutar la consulta
            if ($stmt->execute()) {
                // Obtener el resultado
                $stmt->store_result();
    
                // Verificar si se encontró un usuario
                if ($stmt->num_rows > 0) {
                    // Vincular el resultado a variables
                    $stmt->bind_result($usuario_db, $hash_almacenado);
                    $stmt->fetch();
    
                    // Verificar si la contraseña proporcionada coincide con el hash almacenado
                    if (password_verify($password, $hash_almacenado)) {
                        // Inicio de sesión
                        session_start();
                        // Configurar un elemento usuario dentro del arreglo global $_SESSION
                        $_SESSION['usuario'] = $usuario;
                        // Cerrar la consulta preparada
                        $stmt->close();
                        $mysqli->close();
                        // Retornar verdadero
                        return true;
                    }
                }
            }
            // Cerrar la consulta preparada
            $stmt->close();
        } else {
            die('Error en la preparación de la consulta: ' . $mysqli->error);
        }
        // Cerrar la conexión
        $mysqli->close();
        // Retornar falso
        return false;
    }
    
    //funcion que verifica el tipo de usuario
    function tipo($usuario){
         //conexion a la BD
        $conect = mysqli_connect('localhost', 'root', '');
        //Acceso a la base de datos apartir de la conexion
        mysqli_select_db($conect, 'team_hernandez'); 
        //aqui se consulta al usuario
        $query = "SELECT `tipo_rol` FROM `usuario` WHERE `usuario` = '$usuario'"; 

        //ejecucion de la sentencia sql
        $ejecutar_sql = mysqli_query($conect, $query);

        // Obtener el tipo de usuario
        $row = mysqli_fetch_assoc($ejecutar_sql);
        $tipo = $row['tipo_rol'];
        
        //que retorne el usuario y su tipo
        return $tipo; 
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