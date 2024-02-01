<?php
    // Verifica si se proporcionó un ID válido a través de la solicitud GET
    if (isset($_GET['id']) && isset($_GET['iv'])) {
        // Obtén el ID cifrado y el IV en base64
        $idCifrado = $_GET['id'];
        $ivBase64 = $_GET['iv'];

        // Define la clave de cifrado que debe coincidir con la utilizada en el cliente
        $clave_cifrado = "ClaveDieta";

        // Decodifica el IV desde base64
        $iv = base64_decode($ivBase64);
        // Descifra el ID cifrado
        $idDescifrado = openssl_decrypt($idCifrado, "AES-256-CFB", $clave_cifrado, 0, $iv);

        // Realiza una consulta a la base de datos para obtener los datos de la dieta por su ID
        include("../../../config/conexion_consultas.php"); //Incluir la conexión a la base de datos
        $idDieta = mysqli_real_escape_string($conexion, $idDescifrado); // Escapa el ID para evitar inyección SQL
        $sql = "SELECT * FROM dietas WHERE iddieta = '$idDieta'";
        $result = mysqli_query($conexion, $sql);

        //si el query tiene mas de una renglon entonces asocialo a resultado
        if ($result && mysqli_num_rows($result) > 0) {
            $Dieta = mysqli_fetch_assoc($result);

            $datosDieta = array(
                'id' => $Dieta['iddieta'],
                'nombre' => $Dieta['nombre'],
                'caracteristicas' => $Dieta['caracteristicas'],
                'alimentos' => $Dieta['tipos_alimentos']
            );
            //codifica el array en json
            $jsondatosDieta = json_encode($datosDieta);
            //envia los datos del json como respuesta
            echo $jsondatosDieta;
        } else {
            echo 'No se encontró la dieta.';
        }
    } else {
        echo 'ID no válido.';
    }
?>