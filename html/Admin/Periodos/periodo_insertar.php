<?php
    //insertamos la conexion que nos permitira acceder ala BD
    include "../../../config/conexion_consultas.php";

    //pasamos los parametros
    $nombrePeriodo = $_POST['nombreperi'];
    $periodo = $_POST['periodo'];
    $inicioPeri = $_POST['inicioPeri'];
    $disponible = $_POST['disponiblePeri'];
    // print_r($disponible);
    $estado = $_POST['estado'];
    $inscripcion = $_POST['inscripcion'];

    //sumamos un mes a la fecha de inicio y ese es la fecha fin
    $fin = date('Y-m-d', strtotime($disponible . ' +1 month'));

    //verificando si el usuario ya existe
    $sql = "SELECT EXISTS (SELECT * FROM periodos WHERE nombre = ? and periodo = ?)";
    $stmt = $conexion->prepare($sql);
    if($stmt){
        //asociamos los parámetros y tipos de datos
        $stmt->bind_param("ss", $nombrePeriodo, $periodo);
        //ejecutamos la consulta
        $stmt->execute();
        //traemos el resultado
        $stmt->bind_result($existe);
        $stmt->fetch();

        //cerramos la conexión
        $stmt->close();

        // Consultamos si existen periodos iguales
        if($existe == 1){
            echo "Error: El periodo ya existe, ingresa un nuevo periodo";
        } else{
            //esto se ejecutará SI NO existe ninguna coincidencia
            //consulta preparada para la inserción
            $query = "INSERT INTO periodos (nombre, periodo, inicio, fin, estado, inicio_disponibilidad, estado_inscripcion) VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt = $conexion->prepare($query);
            
            //vincula los parametros y tipos de datos
            $stmt->bind_param("ssssisi", $nombrePeriodo, $periodo, $inicioPeri, $fin, $estado, $disponible, $inscripcion);

            //ejecuta la consulta
            if ($stmt->execute()) {
                //si la ejecución es exitosa
                echo "Periodo agregado";
            } else {
                //si falla la consulta
                echo "Error al agregar el periodo: " . $stmt->error;
            }

            //cierra la conexión
            $stmt->close();
        }
    } else{
        echo "Error en la preparación de la consulta: " . $conexion->error;
    }
?>