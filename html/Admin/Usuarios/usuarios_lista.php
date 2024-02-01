<nav class="navbar navbar-light justify-content-center fs-3 mb-3">
    Usuarios
</nav>
<div class="container mb-3">
    <button id="botonAbrirModal" class="btn btn-dark mb-3">Agregar usuario</button>
    <div class="table-responsive" id="TablaUsuarios">
        <table id="tablaJson" class="table table-hover table-sm text-center">
            <thead class="table-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Usuario</th>
                    <!-- <th scope="col">Contraseña</th> -->
                    <th scope="col">Tipo</th>
                    <!-- <th scope="col">Edad</th> -->
                    <th scope="col">Estado</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php
                    require("usuarios_modal.php");
                    include("../../../config/conexion_consultas.php");
                    $sql ="SELECT * FROM usuario";
                    $result = mysqli_query($conexion, $sql);
                    // Define la clave de cifrado
                    $clave_cifrado = "ClaveSupersecreta";
                    $conta = 0;
                    while ($row = mysqli_fetch_assoc($result)){
                        $conta++;
                        //asignamos el resultado de id a una variable
                        $id_usuario = $row['id'];
                        //Generamos un IV aleatorio para evitar huecos de seguridad
                        $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length("AES-256-CFB"));
                        //Encriptamos el id usando el IV
                        $id_usuario_cifrado = openssl_encrypt($id_usuario, "AES-256-CFB", $clave_cifrado, 0, $iv);
                        // Codificacion del IV en base64 para enviarlo al servidor cuando descifre
                        $iv_base64 = base64_encode($iv);
                        ?>
                            <tr>
                                <td><?php echo $conta ?></td>
                                <td><?php echo $row['nombre'] ?></td>
                                <td><?php echo $row['usuario'] ?></td>
                                <!-- <td><?php echo $row['psswd'] ?></td> -->
                                <td><?php echo $row['tipo_rol'] ?></td>
                                <!-- <td><?php echo $row['edad'] ?></td> -->
                                <td><?php echo $row['estado'] ?></td>
                                <td>
                                    <!-- Ciframos los datos para junto con su llave -->
                                    <a href="#" class="link-dark abrir-editar-modal" data-id="<?php echo $id_usuario_cifrado; ?>" data-iv="<?php echo $iv_base64; ?>">
                                        <li class = "fa-solid fa-pen-to-square fs-5 me-3"></li>
                                    </a>
                                    <a href="#" class = "link-dark eliminar-usuario" data-id="<?php echo $id_usuario_cifrado; ?>" data-iv="<?php echo $iv_base64; ?>">
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