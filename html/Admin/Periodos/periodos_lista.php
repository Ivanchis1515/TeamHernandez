<nav class="navbar navbar-light justify-content-center fs-3 mb-3">
    Periodos
</nav>
<div class="container mb-3">
    <button id="botonAbrirModalPeriodos" class="btn btn-dark mb-3">Agregar periodo</button>
    <div class="table-responsive">
        <table id="tablaJson" class="table table-hover table-sm text-center">
            <thead class="table-dark">
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Periodo</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Inicio</th>
                    <th scope="col">Fin</th>
                    <th scope="col">Inscripción</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php
                    require("periodos_modal.php");
                    require("../../../config/conexion_consultas.php");
                    $sql = "SELECT * FROM periodos";
                    $result = mysqli_query($conexion, $sql);
                    //define la clave de cifrado
                    $clave_cifrado = "ClaveSupersecreta";
                    $conta = 0; //para establecer el numero de periodos en la tabla
                    while($row = mysqli_fetch_assoc($result)){
                        $conta ++;
                        //asignamos el resultado de id a una variable
                        $idperiodo = $row['idperiodo'];
                        //generamos un IV aleatorio para evitar huecos de seguridad
                        $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length("AES-256-CFB"));
                        //encriptamos el id usando el IV
                        $id_periodo_cifrado = openssl_encrypt($idperiodo, "AES-256-CFB", $clave_cifrado, 0, $iv);
                        // Codificacion del IV en base64 para enviarlo al servidor cuando descifre
                        $iv_base64 = base64_encode($iv);
                        ?>
                            <tr>
                                <td> <?php echo $conta ?> </td>
                                <td> <?php echo $row['nombre'] ?> </td>
                                <td> <?php echo $row['periodo'] ?> </td>
                                <td> <?php echo $row['estado'] == 1 ? 'Activo' : 'Inactivo'; ?> </td>
                                <td> <?php echo $row['inicio_disponibilidad'] ?> </td>
                                <td> <?php echo $row['fin'] ?> </td>
                                <td> <?php echo $row['estado_inscripcion'] == 1 ? 'Abierto' : 'Cerrado'; ?> </td>
                                <td>
                                    <a href="#" class="link-dark abrir-sweetPeriodos" data-id="<?php echo $id_periodo_cifrado; ?>" data-iv="<?php echo $iv_base64; ?>">
                                        <i class="fa-solid fa-square-check"></i>
                                    </a>
                                </td>
                            </tr>
                        <?php
                    }
                ?>
            </tbody>
        </table>
    </div>
</div>