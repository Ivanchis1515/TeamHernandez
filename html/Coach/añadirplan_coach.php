<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- JQuery para el uso de ajax -->
    <script src="../../lib/jquery-3.6.0.min.js"></script>
    <!-- estilos -->
    <link rel="stylesheet" href="../../Styles/adm_usuarioslist.css">
    <!-- Bootstrap4css -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <nav class="navbar navbar-light justify-content-center fs-3 mb-3">
        Plan nutricional
    </nav>
    <div class="container mb-3">
        <!-- <button id="botonAbrirModal" class="btn btn-dark mb-3">Agregar Dieta</button> -->
            <div class="table-responsive">
                <table id="tablaJson" class="table table-hover table-sm text-center">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Edad</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- <?php
                            require('usuarios_editar_modal.php');
                            include("../../config/conexion_consultas.php");
                            $sql ="SELECT * FROM usuario";
                            $result = mysqli_query($conexion, $sql);
                            while ($row = mysqli_fetch_assoc($result)){
                                ?>
                                    <tr>
                                        <td><?php echo $row['id']?></td>
                                        <td><?php echo $row['nombre']?></td>
                                        <td><?php echo $row['usuario']?></td>
                                        <td><?php echo $row['psswd']?></td>
                                        <td><?php echo $row['tipo_rol']?></td>
                                        <td><?php echo $row['edad']?></td>
                                        <td><?php echo $row['estado']?></td>
                                        <td>
                                            <a href="#" class="link-dark abrir-editar-modal" data-id="<?php echo $row['id']; ?>">
                                                <li class = "fa-solid fa-pen-to-square fs-5 me-3"></li>
                                            </a>
                                            <a href="#" class = "link-dark eliminar-usuario" data-id="<?php echo $row['id']; ?>">
                                                <li class = "fa-solid fa-trash fs-5 me-3"></li>
                                            </a>
                                        </td>
                                    </tr>
                                <?php
                            }
                        ?> -->
                    </tbody>
                </table>
            </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>