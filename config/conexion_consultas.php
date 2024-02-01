<?php
    //parametros del servidor y base de datos
    $servername = "localhost";
    $user = "root";
    $password = "";
    $BD = "team_hernandez";
    //usamos mysqli_connect dentro de este le pasamos los parametros para conectarse
    $conexion = mysqli_connect($servername, $user, $password, $BD);

    //hacemos una condicional si es que la conexion falla
    if(!$conexion){
        die("Fallo la conexión: ". mysqli_connect_error());
    }
    //echo "Conexion exitosa";
?>