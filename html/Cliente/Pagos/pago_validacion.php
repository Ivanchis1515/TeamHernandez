<?php 
    require_once 'vendor/autoload.php'; //incluye el autoloader de Composer composer require braintree/braintree_php
    Braintree\Configuration::environment('sandbox'); //cambiar a 'production' en producción
    Braintree\Configuration::merchantId('f3pwwyv3cmd2gqn5'); //codigo de cliente
    Braintree\Configuration::publicKey('bypcysvzxpr5wpwn'); //lave publica braintree
    Braintree\Configuration::privateKey('8493f9c18937d2bccb781464f885b966'); //llave privada braintree

    $nonceFromTheClient = $_POST['payment_method_nonce'];

    $result = Braintree\Transaction::sale([
        'amount' => '10.00',
        'paymentMethodNonce' => $nonceFromTheClient,
        'options' => [
            'submitForSettlement' => true
        ]
    ]);
    
    if ($result->success) {
        // La transacción fue exitosa
        $transactionId = $result->transaction->id;
        // Puedes enviar una respuesta de éxito al cliente si lo deseas
    } else {
        // La transacción falló
        $errorString = "";
        foreach ($result->errors->deepAll() as $error) {
            $errorString .= 'Error: ' . $error->code . ": " . $error->message . "\n";
        }
        // Puedes enviar una respuesta de error al cliente si lo deseas
    }    
?>
