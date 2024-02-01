<?php
    //insertamos la conexion que nos permitira acceder ala BD
    include "../../../config/conexion_consultas.php";
    //pasamos los parametros
    $numDieta = $_POST['id'];
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
        //cerramos la conexion
        $stmt->close();

        //consultamos si existen dietas iguales
        if ($existe == 1) {
            echo "Error: La dieta ya existe, ingresa otra dieta diferente";
        } 
        else {
            // Consulta preparada para la actualización
            $query = "UPDATE dietas SET nombre = ?, caracteristicas = ?, tipos_alimentos= ?, fecha = ? WHERE iddieta = ?";
            $stmt = $conexion->prepare($query);
        
            if ($stmt) {
                // Vincula los parámetros y tipos de datos
                $stmt->bind_param("ssssi", $nombre, $caracteristicas, $tipo, $fecha, $numDieta);
    
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