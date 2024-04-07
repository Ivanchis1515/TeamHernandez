<nav class="navbar navbar-light justify-content-center fs-3 mb-3">
    Registrar servicios
</nav>
<div class="container mb-3">
    <button id="botonAbrirModalServicios" class="btn btn-dark mb-3">Agregar servicio</button>
    <div class="table-responsive" id="TablaUsuarios">
        <table id="tablaJson" class="table table-hover table-sm text-center">
            <thead class="table-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Servicio</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Costo</th>
                    <th scope="col">Ofertado</th>
                    <th scope="col">Descuento</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php
                    require("servicios_modal.php");
                    include("../../../config/conexion_consultas.php");
                    $sql ="SELECT * FROM servicios_costos";
                    $result = mysqli_query($conexion, $sql);
                    //define la clave de cifrado
                    $clave_cifrado = "ClaveSupersecreta";
                    $conta = 0;
                    while ($row = mysqli_fetch_assoc($result)){
                        $conta++;
                        //asignamos el resultado de id a una variable
                        $id_servicio = $row['id_servicio'];
                        //generamos un IV aleatorio para evitar huecos de seguridad
                        $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length("AES-256-CFB"));
                        //encriptamos el id usando el IV
                        $id_servicio_cifrado = openssl_encrypt($id_servicio, "AES-256-CFB", $clave_cifrado, 0, $iv);
                        //codificacion del IV en base64 para enviarlo al servidor cuando descifre
                        $iv_base64 = base64_encode($iv);
                        ?>
                            <tr>
                                <td><?php echo $conta ?></td>
                                <td><?php echo $row['servicio'] ?></td>
                                <td><?php echo $row['descripcion'] ?></td>
                                <td><?php echo $row['costo'] ?></td>
                                <td><?php echo $row['oferta'] ? 'Si' : 'No' ?></td>
                                <td><?php echo $row['descuento'] != 0 ? $row['descuento']. '%' : 'Ninguno' ?></td>
                                <td><?php echo $row['estado'] ? 'Activo' : 'Inactivo' ?></td>
                                <td><?php echo $row['fecha'] ?></td>
                                <td>
                                    <!-- Ciframos los datos para junto con su llave -->
                                    <a href="#" class="link-dark abrir-editar-modalServicio" data-id="<?php echo $id_servicio_cifrado; ?>" data-iv="<?php echo $iv_base64; ?>">
                                        <li class = "fa-solid fa-pen-to-square fs-5 me-3"></li>
                                    </a>
                                    <a href="#" class = "link-dark eliminar-Servicio" data-id="<?php echo $id_servicio_cifrado; ?>" data-iv="<?php echo $iv_base64; ?>">
                                        <li class = "fa-solid fa-trash fs-5 me-3"></li>
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