$(document).ready(function() {
    ///MODAL INSERTAR USUARIOS
    $(document).on('click', '#botonAbrirModal', function() {
        //configuración del modal antes de abrirlo
        $("#miModal").modal({
            show: true,
            backdrop: false, //desactiva el fondo semitransparente
            keyboard: false
        });
        $('#modal_titulo').html('<strong>Nuevo Usuario</strong>');
        const formContent  = 
            '<div class="mb-3">' +
                '<label class="form-label">Nombre completo:</label>' +
                '<input type="text" class="form-control" id=nombre name="nombrecom" placeholder="Nombre completo sin números" required="required">' +
            '</div>' +
            '<div class="mb-3">' +
                '<label class="form-label">Edad:</label>' +
                '<input type="number" class="form-control" id="edad" name="edad" placeholder="Edad" min="0" max="100" required="required">' +
            '</div>' +
            '<div class="row mb-3">' +
                '<div class="col mb-3">' +
                    '<label class="form-label">Usuario:</label>' +
                    '<input type="text" class="form-control" id="usuario" name="usuario" placeholder="ejem: Ivanchis" required="required">' +
                '</div>' +
                '<div class="col mb-3">' +
                    '<label class="form-label">Contraseña:</label>' +
                    '<input type="text" class="form-control" id="contraseña" name="contraseña" placeholder="ejem: 12345" required="required">' +
                '</div>' +
                '<div class="col mb-3">' +
                    '<label class="form-label">Tipo de rol:</label>' +
                    '<input type="text" class="form-control" id="tipo" name="tipo" placeholder="ejem: Admin/Coach/Cliente" required="required">' +
                '</div>' +
            '</div>' +
            '<div class="mb-3">' +
                '<label class="form-label">Estado:</label>' +
                '<input type="number" class="form-control" id="estado" name="estado" placeholder="1=>Activo | 0=>Inactivo" min="0" max="1" required="required">' +
            '</div>';
        $('.cuerpo_form').html(formContent);
    });

    $(document).on('click', '#boton_insertar', function(event){
        event.preventDefault(); //detiene la accion predeterminada
        var formdata = $('#insertar').serialize();
        $.ajax({
            type:"POST",
            url:"./Usuarios/usuario_insertar.php",
            data: formdata,
            success:function(data){
                if (data.includes("Error")) {
                    //si la respuesta contiene "Error", muestra el mensaje de error
                    Swal.fire({
                        icon: 'error',
                        title: '¡Error!',
                        text: data,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    });
                } else {
                    //si no contiene muestra exito
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: data,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $("#miModal").modal('hide');
                        }
                    });
                }
            },
            error: function() {
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Hubo un problema al insertar el usuario',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
            }
        });
    });

    //MODAL EDITAR USUARIOS
    //maneja el clic en el enlace para abrir el modal de edición
    $(document).on('click', '.abrir-editar-modal', function(event) {
        event.preventDefault(); //evita la acción predeterminada del enlace
        $("#miModal").modal({
            show: true,
            backdrop: false, //desactiva el fondo semitransparente
            keyboard: false
        });
        var idUsuarioCifrado = $(this).data('id'); //recupera el id cifrado de la tabla
        var ivBase64 = $(this).data('iv'); //recupera el IV en base64
        console.log("Modal con id cifrado: ", idUsuarioCifrado);
        cargarDatosUsuario(idUsuarioCifrado, ivBase64);
    });
    function cargarDatosUsuario(idUsuarioCifrado, ivBase64) {
        //AJAX para obtener los datos del usuario por su ID
        $.ajax({
            url: './Usuarios/usuario_obtener.php',
            type: 'GET',
            data: { id: idUsuarioCifrado, iv: ivBase64 }, //enviamos el IV en base64 al servidor
            success: function(data) {
                var datos = JSON.parse(data);
                //descifrar el ID antes de cargar los datos
                var idUsuario = descifrarID(idUsuarioCifrado, ivBase64);

                $('#modal_titulo').html('<strong>Editar Usuario</strong>');
                //llena el formulario de edición del modal con los datos del usuario
                const formContent  = 
                    '<input type="hidden" name="id" value="'+ datos.id +'">' +
                    '<div class="mb-3">' +
                        '<label class="form-label">Nombre completo:</label>' +
                        '<input type="text" class="form-control" name="nombrecom" placeholder="Ejem: Jorge Iván Hernández..." value="'+ datos.nombrecom +'" required>' +
                    '</div>' +
                    '<div class="mb-3">' +
                        '<label class="form-label">Edad:</label>' +
                        '<input type="number" class="form-control" name="edad" placeholder="ejem: 20" min="0" max="100" value="'+ datos.edad +'" required>' +
                    '</div>' +
                    '<div class="row mb-3">' +
                        '<div class="col mb-3">' +
                            '<label class="form-label">Usuario:</label>' +
                            '<input type="text" class="form-control" name="usuario" placeholder="ejem: Ivanchis" value="'+ datos.usuario +'" required>' +
                        '</div>' +
                        '<div class="col mb-3">' +
                            '<label class="form-label">Contraseña:</label>' +
                            '<input type="text" class="form-control" name="contraseña" placeholder="ejem: 12345" value="'+ datos.contraseña +'" required>' +
                        '</div>' +
                        '<div class="col mb-3">' +
                            '<label class="form-label">Tipo de rol:</label>' +
                            '<input type="text" class="form-control" name="tipo" placeholder="ejem: Admin/Coach/Cliente" value="'+ datos.tipo +'" required>' +
                        '</div>' +
                    '</div>' +
                    '<div class="mb-3">' +
                        '<label class="form-label">Estado:</label>' +
                        '<input type="number" class="form-control" name="estado" placeholder="1=>Activo | 0=>Inactivo" min="0" max="1" value="'+ datos.estado +'" required>' +
                    '</div>';
                $('.cuerpo_form').html(formContent);
                $('#boton_insertar').html('Guardar cambios');
                console.log(data);
                console.log(formContent);
                //abrir el modal de edición
                $('#miModal').modal('show');

                //ACTUALIZAR USUARIOS
                $('#boton_insertar').off('click').on('click', function(){
                    var formData = $('#insertar').serialize();
                    console.log(formData);
                    $.ajax({
                        type:"POST",
                        url:"./Usuarios/usuario_actualizar.php",
                        data: formData,
                        success:function(data){
                            if (data.includes("Error")) {
                                //si la respuesta contiene "Error", muestra el mensaje de error
                                Swal.fire({
                                    icon: 'error',
                                    title: '¡Error!',
                                    text: data,
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'OK'
                                });
                            } else {
                                //si no contiene muestra exito
                                Swal.fire({
                                    icon: 'success',
                                    title: '¡Éxito!',
                                    text: data,
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'OK'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        $("#miModal").modal('hide');
                                    }
                                });
                            }
                        },
                        error:function(){
                            //error de ajax
                            Swal.fire({
                                icon: 'error',
                                title: '¡Error!',
                                text: 'Hubo un problema al actualizar el usuario',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'OK'
                            });                        
                        }
                    });
                }).attr('id', 'boton_actualizar');
            },
            error: function() {
                alert('Error al cargar los datos del usuario.');
            }
        });
    }
    function descifrarID(idCifrado, ivBase64) {
        if (typeof CryptoJS === "undefined") {
            console.error("CryptoJS no está definido. Asegúrate de cargar la biblioteca.");
            return;
        }
        else{
            // Descifra el ID utilizando el IV proporcionado
            var iv = atob(ivBase64); // Decodifica el IV desde base64
            var idDescifrado = CryptoJS.AES.decrypt(idCifrado, "ClaveSupersecreta", { iv: iv });
            return idDescifrado.toString(CryptoJS.enc.Utf8);
        }
    }

    //ELIMINAR USUARIOS
    $(document).on('click', '.eliminar-usuario', function(event){
        event.preventDefault(); //evita la acción predeterminada del enlace
        //obtenemos el id cifrado y su llave iv
        var idUsuarioCifrado = $(this).data('id');
        var ivBase64 = $(this).data('iv');
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarUsuario(idUsuarioCifrado, ivBase64);
            }
        });
    });         
    function eliminarUsuario(idUsuarioCifrado, ivBase64){
        //funcion ajax para eliminar el usuario por el id cifrado
        $.ajax({
            type:"POST",
            url:"./Usuarios/usuario_eliminar.php",
            data: {id: idUsuarioCifrado, iv: ivBase64 },
            success:function(data){
                if (data.includes("Error")) {
                    //si la respuesta contiene "Error", muestra el mensaje de error
                    Swal.fire({
                        icon: 'error',
                        title: '¡Error!',
                        text: data,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    });
                } else {
                    //si no contiene muestra exito
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: data,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $("#miModal").modal('hide');
                        }
                    });
                }
            },
            error:function(){
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Hubo un problema al eliminar el usuario.',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
            }
        });
    }
});