<?php 
    require_once '../../../vendor/autoload.php'; //incluye el autoloader de Composer composer require braintree/braintree_php
    Braintree\Configuration::environment('sandbox'); //cambiar a 'production' en producción
    Braintree\Configuration::merchantId('f3pwwyv3cmd2gqn5'); //codigo de cliente
    Braintree\Configuration::publicKey('bypcysvzxpr5wpwn'); //lave publica braintree
    Braintree\Configuration::privateKey('8493f9c18937d2bccb781464f885b966'); //llave privada braintree

    // Genera el token de cliente
    $clientToken = Braintree\ClientToken::generate();

    // Devuelve el token de cliente como un objeto JSON
    echo json_encode(['clientToken' => $clientToken]);
?>
