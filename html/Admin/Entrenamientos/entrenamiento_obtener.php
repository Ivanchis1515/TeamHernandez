<?php
    //realiza una consulta a la base de datos para obtener los datos del usuario por su ID
    include("../../../config/conexion_consultas.php");
    $sql = "SELECT * FROM planes_menu";
    $result = mysqli_query($conexion, $sql);

    //array de los planes
    $planes = array();

    //si el query tiene más de una fila, entonces asócialo a resultado
    if ($result && mysqli_num_rows($result) > 0) {
        while($plan = mysqli_fetch_assoc($result)){
            //array asociativo con los datos del plan de entrenamiento
            $datosPlan = array(
                'id' => $plan['id_plan'],
                'nombre' => $plan['nombre'],
                'objetivo' => $plan['objetivo'],
                'descripcion' => $plan['descripcion'],
                'estado' => $plan['estado'],
                'foto' => $plan['foto'],
                'fecha' => $plan['fecha_creacion']
            );
            $planes[] = $datosPlan;
        }
        //codificar el array en formato JSON
        $jsonDatosPlanes = json_encode($planes);

        //enviar el JSON como respuesta
        echo $jsonDatosPlanes !== '[]' ? $jsonDatosPlanes : '{"error": "No se encontraron ejercicios."}';
    }
?>