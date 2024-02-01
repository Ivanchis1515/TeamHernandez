<?php
    //insertamos la conexion que nos permitira acceder ala BD
    include "../../../config/conexion_consultas.php";
    //pasamos los parametros
    $nombre = $_POST['nombredieta'];
    $caracteristicas = $_POST['caract'];
    $tipo = $_POST['tipo_ali'];
    $fecha = date("Y-m-d H:i:s");

    // Verificando si la dieta ya existe
    $sql = "SELECT EXISTS (SELECT * FROM dietas WHERE nombre = ?)";
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
        
        //consultamos si existen dietas iguales
        if ($existe == 1) {
            //Si existen resultados se ejecutará esto
            echo "Error: Dieta existente, agregue una nueva dieta";
        } else {
            //esto se ejecutará SI NO existe alguna coincidencia
            $query="INSERT INTO dietas (nombre, caracteristicas, tipos_alimentos, fecha) values (?, ?, ?, ?)";
            $stmt = $conexion->prepare($query);
            $stmt->bind_param("ssss", $nombre, $caracteristicas, $tipo, $fecha);
            //si la conexion es exitosa
            if ($stmt->execute()) {
                echo "Dieta agregada";
            } else {
                //si fallase la conexion
                echo "Error al agregar la dieta: " . $stmt->error;
            }
            //volvemos a cerrar la conexion
            $stmt->close();
        }
    }
    else{
        echo "Error en la preparación de la consulta: " . $conexion->error; 
    }
    $conexion->close();
?>