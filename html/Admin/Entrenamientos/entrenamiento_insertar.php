<?php
    //insertamos la conexion que nos permitira acceder ala BD
    include "../../../config/conexion_consultas.php";
    //pasamos los parametros
    $nombre = $_POST['nplan'];
    $objetivo = $_POST['obj'];
    $descripcion = $_POST['desc'];
    $estado = $_POST['estado'];
    $fotografia = $_FILES['foto'];
    $fecha = date("Y-m-d H:i:s");

    //verificando si el plan ya existe
    $sql = "SELECT EXISTS (SELECT * FROM planes_menu WHERE nombre = ?)";
    $stmt = $conexion->prepare($sql);
    if($stmt){
        //asociamos los parametros y tipos de datos
        $stmt->bind_param("s", $nombre);
        //ejecutamos la consulta
        $stmt->execute();
        //traemos el resultado
        $stmt->bind_result($existe);
        $stmt->fetch();

        //cerramos la conexión
        $stmt->close();
        //consultamos si existen planes iguales
        if ($existe == 1) {
            //esto se ejecutará si existe algún resultado igual
            echo "Error: El plan de entrenamiento ya existe, ingresa un plan diferente";
        }
        else {
            //esto se ejecutará SI NO existe ninguna coincidencia
            //consulta preparada para la inserción
            $query = "INSERT INTO planes_menu (nombre, objetivo, descripcion, estado, foto, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?)";
            $stmt = $conexion->prepare($query);
            if($stmt){
                //cambiando el nombre de la imagen
                $nombre_archivo = "foto_entrenamiento_" . strtolower(str_replace(' ', '_', $nombre)) . "." . pathinfo($fotografia['name'], PATHINFO_EXTENSION);
                $ruta_destino = "C:/xampp/htdocs/TeamHernandez/Uploads/planes_imagenes". "/";
                $ruta_completa = $ruta_destino . $nombre_archivo;
                $urlImagen = 'http://localhost/TeamHernandez/Uploads/planes_imagenes/' . $nombre_archivo;

                if(move_uploaded_file($fotografia['tmp_name'], $ruta_completa)){
                    $stmt->bind_param("ssssss", $nombre, $objetivo, $descripcion, $estado, $urlImagen, $fecha);
                    //ejecuta la consulta
                    if ($stmt->execute()) {
                        //si la ejecucion es exitosa
                        echo "Plan de entrenamiento agregado";
                    } else {
                        //si falla la consulta
                        echo "Error al agregar el plan: " . $stmt->error;
                    }
                } else{
                    echo "Error al subir la foto.";
                }
                //cierra la conexion
                $stmt->close();
            } else{
                echo "Error en la preparación de la consulta: " . $conexion->error;
            }
        }
    }
    else{
        echo "Error en la preparación de la consulta: " . $conexion->error;
    }
    mysqli_close($conexion);
?>