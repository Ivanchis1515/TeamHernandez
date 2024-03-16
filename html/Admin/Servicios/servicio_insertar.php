<?php
    //insertamos la conexion que nos permitira acceder ala BD
    include "../../../config/conexion_consultas.php";
    //pasamos los parametros
    $nombre = $_POST['servicio'];
    $descripcion = $_POST['descript'];
    $costo = $_POST['costo'];
    $oferta = $_POST['oferta'];
    $descuento = isset($_POST['descuento']);
    $estado = $_POST['estado'];
    $fecha = date("Y-m-d H:i:s");

    // Verificando si la dieta ya existe
    $sql = "SELECT COUNT(*) FROM servicios_costos WHERE servicio = ?";
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
            echo "Error: Servicio existente, agregue una nuevo servicio NO existente";
        } else {
            //esto se ejecutará SI NO existe alguna coincidencia
            $query="INSERT INTO servicios_costos (servicio, descripcion, costo, oferta, descuento, estado, fecha) values (?, ?, ?, ?, ?, ?, ?)";
            $stmt = $conexion->prepare($query);
            $stmt->bind_param("ssdiiis", $nombre, $descripcion, $costo, $oferta, $descuento, $estado, $fecha);
            //si la conexion es exitosa
            if ($stmt->execute()) {
                echo "Servicio agregado";
            } else {
                //si fallase la conexion
                echo "Error al agregar el servicio: " . $stmt->error;
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