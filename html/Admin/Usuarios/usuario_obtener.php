<?php
    //verifica si se proporcionó un ID válido a través de la solicitud GET
    if (isset($_GET['id']) && isset($_GET['iv'])) {
        //obtén el ID cifrado y el IV en base64
        $idCifrado = $_GET['id'];
        $ivBase64 = $_GET['iv'];
        
        //la clave de cifrado que debe coincidir con la utilizada en el cliente
        $clave_cifrado = "ClaveSupersecreta";

        //decodifica el IV desde base64
        $iv = base64_decode($ivBase64);
        
        //descifra el ID cifrado
        $idDescifrado = openssl_decrypt($idCifrado, "AES-256-CFB", $clave_cifrado, 0, $iv);

        //realiza una consulta a la base de datos para obtener los datos del usuario por su ID
        include("../../../config/conexion_consultas.php");
        $idUsuario = mysqli_real_escape_string($conexion, $idDescifrado); //escapa el ID para evitar inyección SQL
        $sql = "SELECT * FROM usuario WHERE id = '$idUsuario'";
        $result = mysqli_query($conexion, $sql);

        //si el query tiene mas de una renglon entonces asocialo a resultado
        if ($result && mysqli_num_rows($result) > 0) {
            $usuario = mysqli_fetch_assoc($result);
            //array asociativo con los datos del usuario
            $datosUsuario = array(
                'id' => $usuario['id'],
                'nombrecom' => $usuario['nombre'],
                'usuario' => $usuario['usuario'],
                'contraseña' => $usuario['psswd'],
                'tipo' => $usuario['tipo_rol'],
                'edad' => $usuario['edad'],
                'estado' => $usuario['estado']
            );
            // Codificar el array en formato JSON
            $jsonDatosUsuario = json_encode($datosUsuario);

            // Enviar el JSON como respuesta
            echo $jsonDatosUsuario;
        } else {
            echo 'No se encontró el usuario.';
        }
    } else {
        echo 'ID de usuario no válido.';
    }
?>