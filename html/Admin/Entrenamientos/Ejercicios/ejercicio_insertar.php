<?php
    //insertamos la conexion que nos permitira acceder ala BD
    include "../../../../config/conexion_consultas.php";
    //pasamos los parametros
    $idPlan = $_POST['id'];
    $ejercicio = $_POST['nom_ejericicio'];
    $descripcion = $_POST['desc'];
    $instrucciones = $_POST['instrucciones'];
    $series = $_POST['series'];
    $repeticiones = $_POST['repeticiones'];
    $estado = 1;
    $animationPath = $_POST['animation'];
    $fecha = date("Y-m-d H:i:s");
    //convirtiendo en json las series y rep
    $series_rep_json = json_encode(['series' => $series, 'repeticiones' => $repeticiones]);

    //verificando si el plan ya existe
    $sql = "SELECT EXISTS (SELECT * FROM planes_ejercicios WHERE nombre = ?)";
    $stmt = $conexion->prepare($sql);
    if($stmt){
        //asociamos los parametros y tipos de datos
        $stmt->bind_param("s", $ejercicio);
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
            echo "Error: El ejercicio ya existe, ingresa uno diferente";
        }
        else {
            //esto se ejecutará SI NO existe ninguna coincidencia
            //consulta preparada para la inserción
            $query = "INSERT INTO planes_ejercicios (id_plan, nombre, descripcion, instrucciones, series_rep, estado, video_ejercicio, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $conexion->prepare($query);
            if($stmt){
                $stmt->bind_param("ssssssss", $idPlan, $ejercicio, $descripcion, $instrucciones, $series_rep_json, $estado, $animationPath, $fecha);
                //ejecuta la consulta
                if ($stmt->execute()) {
                    //si la ejecucion es exitosa
                    echo "Ejercicio agregado";
                } else {
                    //si falla la consulta
                    echo "Error al agregar el ejercicio: " . $stmt->error;
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