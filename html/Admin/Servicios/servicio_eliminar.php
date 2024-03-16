<?php
    //configuración de la base de datos y las consultas
    include("../../../config/conexion_consultas.php");

    if (isset($_POST['id']) && isset($_POST['iv'])) {
        //recuperamos los datos de la dieta
        $idCifrado = $_POST['id'];
        $ivBase64 = $_POST['iv'];
        $clave_cifrado = "ClaveSupersecreta";

        //decodificamos el IV desde base64
        $iv = base64_decode($ivBase64);

        //descifra el ID cifrado
        $idDescifrado = openssl_decrypt($idCifrado, "AES-256-CFB", $clave_cifrado, 0, $iv);

        // Eliminación de la dieta en la base de datos
        $eliminacion = "DELETE FROM servicios_costos WHERE id_servicio = ?"; //consulta para evitar inyeccion sql
        $stmt = $conexion->prepare($eliminacion);
        if ($stmt) {
            //vincula los parámetros y tipos de datos
            //la palabra 'i' representa que hay 1 objeto entero
            $stmt->bind_param("i", $idDescifrado);
        
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
        echo "Error: No se proporcionó un ID de usuario válido";
    }
?>