<?php
    //insertamos la conexion que nos permitira acceder ala BD
    include "../../../config/conexion_consultas.php";
    //pasamos los parametros
    $idServicio = $_POST['id'];
    $servicio = $_POST['servicio'];
    $descripcion = $_POST['descript'];
    $costo = $_POST['costo'];
    $oferta = $_POST['oferta'];
    $descuento = $_POST['descuento'];
    $estado = $_POST['estado'];

    //verificando si la dieta ya existe
    $sql = "SELECT COUNT(*) FROM servicios_costos WHERE id_servicio = ?";
    $stmt = $conexion->prepare($sql);
    if($stmt){
        //asociamos los parametros y tipos de datos
        $stmt->bind_param("i", $idServicio);
        //ejecutamos la consulta
        $stmt->execute();
        //traemos el resultado
        $stmt->bind_result($existe);
        $stmt->fetch();
        //cerramos la conexion
        $stmt->close();

        //consultamos si existen dietas iguales
        if ($existe == 0) {
            echo "Error: El servicio no existe.";
        } 
        else {
            //consulta preparada para la actualización
            $query = "UPDATE servicios_costos SET servicio = ?, descripcion = ?, costo = ?, oferta = ?, descuento = ?, estado = ?, fecha = NOW() WHERE id_servicio = ?";
            $stmt = $conexion->prepare($query);
        
            if ($stmt) {
                //vincula los parámetros y tipos de datos
                $stmt->bind_param("ssdiiii", $servicio, $descripcion, $costo, $oferta, $descuento, $estado, $idServicio);
    
                //ejecuta la consulta
                if ($stmt->execute()) {
                    echo "Actualización exitosa";
                } else {
                    echo "Error al actualizar: " . $stmt->error;
                }
                //cierra la declaración
                $stmt->close();
            } else {
                echo "Error en la preparación de la consulta: " . $conexion->error;
            }
        }
    } 
    $conexion->close(); //cierra la conexion
?>