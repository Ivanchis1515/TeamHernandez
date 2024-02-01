<?php
    //configuración de la base de datos y las consultas
    include("../../../../config/conexion_consultas.php");

    //si no esta vacia la variable
    if (isset($_POST['id'])) {
        //recuperamos el id del ejercicio
        $idejercicio = $_POST['id'];

        // Eliminación del ejercicio en la base de datos
        $eliminacion = "DELETE FROM planes_ejercicios WHERE id_ejercicio = ?"; //consulta para evitar inyeccion sql
        $stmt = $conexion->prepare($eliminacion);
        if ($stmt) {
            // Vincula los parámetros y tipos de datos
            //la palabra 'i' representa que hay 1 objeto de tipo entero
            $stmt->bind_param("i", $idejercicio);
        
            // Ejecuta la consulta
            if ($stmt->execute()) {
                echo "Eliminación exitosa";
            } else {
                echo "Error al eliminar: " . $stmt->error;
            }
            // Cierra la declaración
            $stmt->close();
        }
        else {
            echo "Error en la preparación de la consulta: " . $conexion->error;
        }
    }
    else {
        echo "Error: No se proporcionó un ID de ejercicio válido";
    }
?>
