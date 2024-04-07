<?php
    //verifica si se proporcionó un ID válido a través de la solicitud GET
    if (isset($_GET['id']) && isset($_GET['iv'])) {
        //obtén el ID cifrado y el IV en base64
        $idCifrado = $_GET['id'];
        $ivBase64 = $_GET['iv'];

        //clave de cifrado que debe coincidir con la utilizada en el cliente
        $clave_cifrado = "ClaveSupersecreta";

        //decodifica el IV desde base64
        $iv = base64_decode($ivBase64);
        //descifra el ID cifrado
        $idDescifrado = openssl_decrypt($idCifrado, "AES-256-CFB", $clave_cifrado, 0, $iv);

        //realiza una consulta a la base de datos para obtener los datos de la Servicio por su ID
        include("../../../config/conexion_consultas.php"); //incluir la conexión a la base de datos
        $idServicio = mysqli_real_escape_string($conexion, $idDescifrado); //escapa el ID para evitar inyección SQL
        $sql = "SELECT * FROM servicios_costos WHERE id_servicio = '$idServicio'";
        $result = mysqli_query($conexion, $sql);

        //si el query tiene mas de una renglon entonces asocialo a resultado
        if ($result && mysqli_num_rows($result) > 0) {
            $Servicio = mysqli_fetch_assoc($result);

            $datosServicio = array(
                'id_servicio' => $Servicio['id_servicio'],
                'servicio' => $Servicio['servicio'],
                'descripcion' => $Servicio['descripcion'],
                'costo' => $Servicio['costo'],
                'oferta' => $Servicio['oferta'],
                'descuento' => $Servicio['descuento'],
                'estado' => $Servicio['estado'],
                'fecha' => $Servicio['fecha'],
            );
            //codifica el array en json
            $jsondatosServicio = json_encode($datosServicio);
            //envia los datos del json como respuesta
            echo $jsondatosServicio;
        } else {
            // Si no se encontró el Servicio, devuelve un objeto JSON con un mensaje
            $response = array(
                'error' => true,
                'message' => 'No se encontró el Servicio.'
            );
            echo json_encode($response);
        }
    } else {
        // Si no se proporcionó un ID válido, devuelve un objeto JSON con un mensaje
        $response = array(
            'error' => true,
            'message' => 'ID no válido.'
        );
        echo json_encode($response);
    }
?>