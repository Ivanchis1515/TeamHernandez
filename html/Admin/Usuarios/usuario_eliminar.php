<?php
    //configuración de la base de datos y las consultas
    include("../../../config/conexion_consultas.php");

    //si esta vacia la variable traida por post id y iv
    if (isset($_POST['id']) && isset($_POST['iv'])) {
        //recuperamos los datos del usuario
        $idCifrado = $_POST['id'];
        $ivBase64 = $_POST['iv'];
        $clave_cifrado = "ClaveSupersecreta";

        // Decodificamos el IV desde base64
        $iv = base64_decode($ivBase64);

        // Descifra el ID cifrado
        $idDescifrado = openssl_decrypt($idCifrado, "AES-256-CFB", $clave_cifrado, 0, $iv);

        // Eliminación del usuario en la base de datos
        $eliminacion = "DELETE FROM usuario WHERE id = ?"; //consulta para evitar inyeccion sql
        $stmt = $conexion->prepare($eliminacion);
        if ($stmt) {
            // Vincula los parámetros y tipos de datos
            //la palabra 'i' representa que hay 1 objeto de tipo entero
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
