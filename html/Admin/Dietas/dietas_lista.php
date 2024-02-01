<nav class="navbar navbar-light justify-content-center fs-3 mb-3">
    Dietas
</nav>
<div class="container mb-3">
    <button id="botonAbrirModalDietas" class="btn btn-dark mb-3">Agregar Dieta</button>
    <div class="table-responsive" id="TablaDietas">
        <table id="tablaJson" class="table table-hover table-sm text-center">
            <thead class="table-dark">
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Caracteristicas</th>
                    <th scope="col">Tipo de alimentos</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php
                    require('dietas_modal.php');
                    include("../../../config/conexion_consultas.php");
                    $sql ="SELECT * FROM dietas";
                    $result = mysqli_query($conexion, $sql);
                    // Define la clave de cifrado
                    $clave_cifrado = "ClaveDieta";
                    $conta=0;
                    while ($row = mysqli_fetch_assoc($result)){
                        $conta++;
                        //asignamos el resultado de id a una variable
                        $id_dieta = $row['iddieta'];
                        //Generamos un IV aleatorio para evitar huecos de seguridad
                        $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length("AES-256-CFB"));
                        //Encriptamos el id usando el IV
                        $id_dieta_cifrada = openssl_encrypt($id_dieta, "AES-256-CFB", $clave_cifrado, 0, $iv);
                        // Codificacion del IV en base64 para enviarlo al servidor cuando descifre
                        $iv_base64 = base64_encode($iv);
                        ?>
                            <tr>
                                <td><?php echo $conta ?></td>
                                <td><?php echo $row['nombre'] ?></td>
                                <td><?php echo $row['caracteristicas'] ?></td>
                                <td><?php echo $row['tipos_alimentos'] ?></td>
                                <td><?php echo $row['fecha'] ?></td>
                                <td>
                                    <!-- Ciframos los datos para junto con su llave -->
                                    <a href="#" class="link-dark abrir-editar-modalDieta" data-id="<?php echo $id_dieta_cifrada; ?>" data-iv="<?php echo $iv_base64; ?>">
                                        <li class = "fa-solid fa-pen-to-square fs-5 me-3"></li>
                                    </a>
                                    <a href="#" class = "link-dark eliminar-Dieta" data-id="<?php echo $id_dieta_cifrada; ?>" data-iv="<?php echo $iv_base64; ?>">
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