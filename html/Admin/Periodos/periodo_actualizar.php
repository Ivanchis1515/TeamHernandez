<?php 
    if (isset($_POST['id']) && isset($_POST['iv'])) {
        $idCifrado = $_POST['id'];
        $ivBase64 = $_POST['iv'];

        $clave_cifrado = "ClaveSupersecreta";
        $iv = base64_decode($ivBase64);
        $idDescifrado = openssl_decrypt($idCifrado, "AES-256-CFB", $clave_cifrado, 0, $iv);

        // Realiza las operaciones necesarias para cerrar el período en la base de datos
        include("../../../config/conexion_consultas.php");
        $idPeriodo = mysqli_real_escape_string($conexion, $idDescifrado);

        // Realiza la actualización del período a estado cerrado (ajusta la consulta según tu estructura de base de datos)
        $sql = "UPDATE `periodos` SET `estado`='0',`estado_inscripcion`='0' WHERE idperiodo = '$idPeriodo'";
        
        if (mysqli_query($conexion, $sql)) {
           echo 'Success';
        } else {
            echo 'Error al cerrar el período: ' . mysqli_error($conexion);
        }

    } else {
        echo 'ID de período no válido.';
    }
?>