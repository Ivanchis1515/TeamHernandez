<?php
    //realiza una consulta a la base de datos para obtener los datos del usuario por su ID
    include("../../../../config/conexion_consultas.php");
    $id_plan = $_POST['idPlan'];
    $sql = "SELECT * FROM planes_ejercicios where id_plan =".$id_plan;
    $result = mysqli_query($conexion, $sql);

    //array de los planes
    $planes = array();

    //si el query tiene más de una fila, entonces asócialo a resultado
    if ($result && mysqli_num_rows($result) > 0) {
        while($plan = mysqli_fetch_assoc($result)){
            $seriesRep = json_decode($plan['series_rep'], true); //decodificar el json
            // Acceder a los valores de $seriesRep
            $series = $seriesRep['series'];
            $repeticiones = $seriesRep['repeticiones'];

            //array asociativo con los datos del plan de entrenamiento
            $datosPlan = array(
                'id' => $plan['id_ejercicio'],
                'id_plan' => $plan['id_plan'],
                'nombre' => $plan['nombre'],
                'descripcion' => $plan['descripcion'],
                'instrucciones' => $plan['instrucciones'],
                'series' => $series,
                'repeticiones' => $repeticiones,
                'estado' => $plan['estado'],
                'video' => $plan['video_ejercicio'],
                'fecha' => $plan['fecha_registro']
            );
            $planes[] = $datosPlan;
        }
        //codificar el array en formato JSON
        $jsonDatosEjercicios = json_encode($planes);

        //enviar el JSON como respuesta
        echo $jsonDatosEjercicios;
    } else {
        echo 'No se encontraron ejercicios para el plan de entrenamiento.';
    }
?>