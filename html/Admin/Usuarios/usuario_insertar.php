<?php
    //insertamos la conexion que nos permitira acceder ala BD
    include "../../../config/conexion_consultas.php";
    //pasamos los parametros
    $nombre = $_POST['nombrecom'];
    $edad = $_POST['edad'];
    $usuario = $_POST['usuario'];
    $password = $_POST['contraseña'];
    $tiporol = $_POST['tipo'];
    $estado = $_POST['estado'];

    //verificando si el usuario ya existe
    $sql = "SELECT EXISTS (SELECT * FROM usuario WHERE usuario = ?)";
    $stmt = $conexion->prepare($sql);
    if($stmt){
        //asociamos los parametros y tipos de datos
        $stmt->bind_param("s", $usuario);
        //ejecutamos la consulta
        $stmt->execute();
        //traemos el resultado
        $stmt->bind_result($existe);
        $stmt->fetch();

        //cerramos la conexión
        $stmt->close();
        //consultamos si existen usuarios iguales
        if ($existe == 1) {
            //esto se ejecutará si existe algún resultado igual
            echo "Error: El usuario ya existe, ingresa un nombre de usuario diferente";
        }
        else {
            //esto se ejecutará SI NO existe ninguna coincidencia
            //el usuario no existe, ciframos la contraseña con hash
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
            // Consulta preparada para la inserción
            $query = "INSERT INTO usuario (nombre, usuario, psswd, tipo_rol, edad, estado) VALUES (?, ?, ?, ?, ?, ?)";
            $stmt = $conexion->prepare($query);
            // Vincula los parámetros y tipos de datos
            $stmt->bind_param("ssssis", $nombre, $usuario, $hashed_password, $tiporol, $edad, $estado);

            // Ejecuta la consulta
            if ($stmt->execute()) {
                //si la ejecucion es exitosa
                echo "Usuario agregado";
            } else {
                //si falla la consulta
                echo "Error al agregar el usuario: " . $stmt->error;
            }
            // Cierra la conexion
            $stmt->close();
        }
    }
    else{
        echo "Error en la preparación de la consulta: " . $conexion->error;
    }
?>