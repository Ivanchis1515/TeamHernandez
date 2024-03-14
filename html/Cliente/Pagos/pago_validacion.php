<?php 
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

        // Crea una transacción utilizando el nonce del método de pago y otros detalles necesarios
        $result = $gateway->transaction()->sale([
            'amount' => '10.00', // El monto de la transacción
            'paymentMethodNonce' => $nonceFromTheClient, // El nonce del método de pago recibido del cliente
            'options' => [
                'submitForSettlement' => true // Envía la transacción para su liquidación
            ]
        ]);

        // Verifica si la transacción fue exitosa
        if ($result->success) {
            // La transacción se realizó con éxito, haz lo que necesites aquí
            $transaction = $result->transaction;
            echo "Transacción exitosa. ID de transacción: " . $transaction->id;
        } else {
            // Hubo un error al procesar la transacción
            echo "Error al procesar la transacción: " . $result->message;
        }
    } else {
        // Si no se recibió el método de pago nonce, muestra un mensaje de error
        echo "No se recibió el método de pago nonce.";
    }
?>