<?php
    // Creamos donde se almacenara la actualizacion del usuario
    include ("../../../config/conexion_consultas.php");
    $numus = $_POST['id'];   
    $nombre = $_POST['nombrecom'];
    $usuario = $_POST['usuario'];
    $password = $_POST['contraseña'];
    $tipo_rol = $_POST['tipo'];
    $edad = $_POST['edad'];
    $estado = $_POST['estado'];

    // Verificando si el nombre de usuario ya existe
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
        //cerramos la conexion
        $stmt->close();

        //consultamos si existen usuarios iguales
        if ($existe == 1) {
            echo "Error: El nombre de usuario ya existe, ingresa un usuario diferente";
        } 
        else {
            // El usuario no existe, ciframos la contraseña con hash
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
            // Consulta preparada para la actualización
            $query = "UPDATE usuario SET nombre = ?, usuario = ?, psswd = ?, tipo_rol = ?, edad = ?, estado = ? WHERE id = ?";
            $stmt = $conexion->prepare($query);
            
            if ($stmt) {
                // Vincula los parámetros y tipos de datos
                $stmt->bind_param("ssssiii", $nombre, $usuario, $hashed_password, $tipo_rol, $edad, $estado, $numus);
    
                // Ejecuta la consulta
                if ($stmt->execute()) {
                    echo "Actualización exitosa";
                } else {
                    echo "Error al actualizar: " . $stmt->error;
                }
                // Cierra la declaración
                $stmt->close();
            } else {
                echo "Error en la preparación de la consulta: " . $conexion->error;
            }
        }
    }
?>