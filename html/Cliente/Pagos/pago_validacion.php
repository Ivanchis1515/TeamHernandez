<?php 
    session_start(); // Inicia la sesión para acceder a las variables de sesión
    include("../../../config/conexion_consultas.php");
    // Verifica si se recibió el método de pago nonce
    if(isset($_POST["payment_method_nonce"])) {
        // Obtén el método de pago nonce del cliente
        $nonceFromTheClient = $_POST["payment_method_nonce"];

        // Ahora puedes usar el nonce para crear una transacción
        require_once '../../../vendor/autoload.php'; //incluye el autoloader de Composer composer require braintree/braintree_php

        // Crea una instancia de la pasarela de Braintree
        $gateway = new Braintree\Gateway([
            'environment' => 'sandbox', // Cambia a 'production' en producción
            'merchantId' => 'f3pwwyv3cmd2gqn5',
            'publicKey' => 'bypcysvzxpr5wpwn',
            'privateKey' => '8493f9c18937d2bccb781464f885b966'
        ]);

        // Obtén el monto de la transacción desde los datos del formulario
        $amount = isset($_POST['amount']) ? $_POST['amount'] : '0.00';
        $idServicio = $_POST["id_servicio"]; //obten el id del servicio a pagar
        $idPeriodo = $_POST["id_periodo"]; //obten el id_periodo en que se esta pagando

        // Obtén el id_usuario de la sesión
        $idUsuario = isset($_SESSION['id_usuario']) ? $_SESSION['id_usuario'] : null;
        echo "este es el id del usuario: $idUsuario";

        // Crea una transacción utilizando el nonce del método de pago y otros detalles necesarios
        $result = $gateway->transaction()->sale([
            'amount' => $amount, // El monto de la transacción
            'paymentMethodNonce' => $nonceFromTheClient, // El nonce del método de pago recibido del cliente
            'options' => [
                'submitForSettlement' => true // Envía la transacción para su liquidación
            ]
        ]);

        // Verifica si la transacción fue exitosa
        if ($result->success) {
            // La transacción se realizó con éxito, muestra el ID de la transacción
            $transaction = $result->transaction;
            echo "Transacción exitosa. ID de transacción: " . $transaction->id;

            // Guarda los detalles de la transacción en la base de datos
            $transactionId = $transaction->id;
            $monto = $transaction->amount;
            $estado = $transaction->status;

            // Prepara la consulta de inserción
            $query = "INSERT INTO transacciones (id_usuario, id_servicio, id_periodo, transaction_id, monto, estado, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())";
            $statement = $conexion->prepare($query);

            // Vincula los parámetros y ejecuta la consulta
            $statement->bind_param("iiisds", $idUsuario, $idServicio, $idPeriodo, $transactionId, $amount, $estado);
            $statement->execute();

            // Verifica si la inserción fue exitosa
            if ($statement->affected_rows > 0) {
                echo "Detalles de la transacción guardados en la base de datos.";
            } else {
                echo "Error al guardar los detalles de la transacción en la base de datos.";
            }

            // Cierra la declaración y la conexión
            $statement->close();
        } else {
            // Hubo un error al procesar la transacción
            echo "Error al procesar la transacción: " . $result->message;
        }

    } else {
        // Si no se recibió el método de pago nonce, muestra un mensaje de error
        echo "No se recibió el método de pago nonce.";
    }
?>