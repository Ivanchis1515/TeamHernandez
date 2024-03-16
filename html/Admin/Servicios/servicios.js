$(document).ready(function(){
    ///MODAL INSERTAR SERVICIOS
    $(document).on('click', '#botonAbrirModalServicios', function() {
        //configuración del modal antes de abrirlo
        $("#miModalServicios").modal({
            show: true,
            backdrop: false, //desactiva el fondo semitransparente
            keyboard: false
        });
        $('#modal_titulo').html('<strong>Nuevo servicio</strong>');
        const formContent  = 
            '<div class="mb-3">' +
                '<label class="form-label">Nombre del servicio:</label>' +
                '<input type="text" class="form-control" name="servicio" placeholder="Subscripción Mensual" required />' +
            '</div>' +
            '<div class="mb-3">' +
                '<label class="form-label">Descripción del servicio:</label>' +
                '<textarea type="text" class="form-control" name="descript" placeholder="Acceso ilimitado" required></textarea>'+
            '</div>'+
            '<div class="row">' + 
                '<div class="col mb-3">' +
                    '<label class="form-label">Costo:</label>' +
                    '<input type="number" class="form-control" name="costo" placeholder="300$" required />' +
                '</div>' +
                '<div class="col mb-3">' +
                    '<label class="form-label">Oferta:</label>' +
                    '<div class="form-group">' +
                        '<select class="form-select" name="oferta" required>' +
                            '<option value="0" selected>No</option>' +
                            '<option value="1">Sí</option>' +
                        '</select>' +
                    '</div>' +
                '</div>' +
                '<div class="col mb-3">' +
                    '<label class="form-label">Descuento:</label>' +
                    '<input type="number" class="form-control" name="descuento" placeholder="10%" required />' +
                '</div>' +
            '</div>' +
            '<div class="mb-3">' +
                '<label class="form-label">Estado:</label>' +
                '<select class="form-select" name="estado" required>' +
                    '<option value="1" selected>Activo</option>' +
                    '<option value="0">Inactivo</option>' +
                '</select>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<button id="boton_insertarServicio" type="button" class="btn btn-success">Guardar Servicio</button>' +
                '<button id="boton_cancelar" type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>' +
            '</div>';
        $('.cuerpo_formServicios').html(formContent);
        // Deshabilitar el campo de descuento si la oferta es "no" al cargar el modal
        if ($('select[name="oferta"]').val() === '0') {
            $('input[name="descuento"]').prop('disabled', true).val('');
        }

        // Manejar el cambio en la selección de oferta
        $('select[name="oferta"]').change(function() {
            if ($(this).val() === '0') {
                $('input[name="descuento"]').prop('disabled', true).val('');
            } else {
                $('input[name="descuento"]').prop('disabled', false);
            }
        });
    });

    $(document).on('click', '#boton_insertarServicio', function(event){
        event.preventDefault(); //detiene la accion predeterminada
        var formdata = $('#insertarServicio').serialize();
        console.log(formdata);
        $.ajax({
            type:"POST",
            url:"./Servicios/servicio_insertar.php",
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
                            $("#miModalServicios").modal('hide');
                        }
                    });
                }
            },
            error: function() {
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Hubo un problema al insertar el nuevo servicio',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
            }
        });
    });

    //MODAL EDITAR SERVICIO
    //maneja el clic en el enlace para abrir el modal de edición
    $(document).on('click', '.abrir-editar-modalServicio', function(event) {
        event.preventDefault(); //evita la acción predeterminada del enlace
        $("#miModalServicios").modal({
            show: true,
            backdrop: false, //desactiva el fondo semitransparente
            keyboard: false
        });
        var idServicioCifrado = $(this).data("id"); //recupera el id cifrado
        var ivBase64 = $(this).data("iv"); //recupera el IV en base64
        console.log("Modal con id cifrado: ", idServicioCifrado);
        cargarDatosdieta(idServicioCifrado, ivBase64);
    });
    function cargarDatosdieta(idServicioCifrado, ivBase64) {
        //AJAX para obtener los datos de la dieta por su ID
        $.ajax({
            url: './Servicios/servicio_obtener.php',
            type: 'GET',
            data: { id: idServicioCifrado, iv: ivBase64 }, //enviamos el IV en base64 al servidor
            success: function(data) {
                datos = JSON.parse(data);
                //descifra el ID antes de cargar los datos
                // var idUsuario = descifrarID(idServicioCifrado, ivBase64);

                $('#modal_titulo').html('<strong>Editar servicio</strong>');
                const formContent  = 
                '<input type="hidden" name="id" value="'+ datos.id_servicio + '">' +
                '<div class="mb-3">' +
                    '<label class="form-label">Nombre del servicio:</label>' +
                    '<input type="text" class="form-control" name="servicio" placeholder="Subscripción Mensual" value="'+ datos.servicio +'" required />' +
                '</div>' +
                '<div class="mb-3">' +
                    '<label class="form-label">Descripción del servicio:</label>' +
                    '<textarea type="text" class="form-control" name="descript" placeholder="Acceso ilimitado" required>'+ datos.descripcion +'</textarea>'+
                '</div>'+
                '<div class="row">' + 
                    '<div class="col mb-3">' +
                        '<label class="form-label">Costo:</label>' +
                        '<input type="number" class="form-control" name="costo" placeholder="300$" value="'+ datos.costo +'" required />' +
                    '</div>' +
                    '<div class="col mb-3">' +
                        '<label class="form-label">Oferta:</label>' +
                        '<div class="form-group">' +
                            '<select class="form-select" name="oferta" required>' +
                                '<option value="0"' + (datos.oferta === 0 ? ' selected' : '') + '>No</option>' +
                                '<option value="1"' + (datos.oferta === 1 ? ' selected' : '') + '>Sí</option>' +
                            '</select>' +
                        '</div>' +
                    '</div>' +
                    '<div class="col mb-3">' +
                        '<label class="form-label">Descuento:</label>' +
                        '<input type="number" class="form-control" name="descuento" placeholder="10%" value="'+ datos.descuento +'" required />' +
                    '</div>' +
                '</div>' +
                '<div class="mb-3">' +
                    '<label class="form-label">Estado:</label>' +
                    '<select class="form-select" name="estado" required>' +
                        '<option value="1"' + (datos.estado === '1' ? ' selected' : '') + '>Activo</option>' +
                        '<option value="0"' + (datos.estado === '0' ? ' selected' : '') + '>Inactivo</option>' +
                    '</select>' +
                '</div>' +
                '<div class="modal-footer">' +
                    '<button id="boton_editarServicio" type="button" class="btn btn-success">Guardar cambios</button>' +
                    '<button id="boton_cancelar" type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>' +
                '</div>';
                $('.cuerpo_formServicios').html(formContent);
                // Deshabilitar el campo de descuento si la oferta es "no" al cargar el modal
                if ($('select[name="oferta"]').val() === '0') {
                    $('input[name="descuento"]').prop('disabled', true).val('');
                }
        
                // Manejar el cambio en la selección de oferta
                $('select[name="oferta"]').change(function() {
                    if ($(this).val() === '0') {
                        $('input[name="descuento"]').prop('disabled', true).val('');
                    } else {
                        $('input[name="descuento"]').prop('disabled', false);
                    }
                });

                //abirr el modal de edición
                // $('#miModalServicios').modal('show');

                //ACTUALIZAR DIETAS
                $('#boton_editarServicio').on('click', function(){
                    var formData = $('#insertarServicio').serialize();
                    $.ajax({
                        type:"POST",
                        url:"./Servicios/servicio_actualizar.php",
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
                                        $("#miModalServicios").modal('hide');
                                    }
                                });
                            }
                        },
                        error:function(){
                            //error de ajax
                            Swal.fire({
                                icon: 'error',
                                title: '¡Error!',
                                text: 'Hubo un problema al actualizar el servicio',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'OK'
                            });                        
                        }
                    });
                });
            },
            error: function(xhr, status, error) {
                var errorMessage = xhr.responseText; // Obtén el mensaje de error del servidor
                if(errorMessage) {
                    try {
                        var errorObj = JSON.parse(errorMessage); // Intenta convertir el mensaje de error a un objeto JSON
                        // Si el mensaje de error es un objeto JSON con una propiedad 'message', muestra ese mensaje
                        if(errorObj.message) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: errorObj.message
                            });
                        } else {
                            // Si no hay un mensaje específico, muestra un mensaje genérico de error
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Error al cargar los datos del Servicio.'
                            });
                        }
                    } catch (e) {
                        // Si hay algún error al intentar convertir el mensaje de error a JSON, muestra un mensaje genérico de error
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error al cargar los datos del Servicio.'
                        });
                    }
                } else {
                    // Si no hay ningún mensaje de error del servidor, muestra un mensaje genérico de error
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al cargar los datos del Servicio.'
                    });
                }
            }
        });
    }
    //Funcion que desencripta el id
    function descifrarID(idCifrado, ivBase64) {
        if (typeof CryptoJS === "undefined") {
            console.error("CryptoJS no está definido. Asegúrate de cargar la biblioteca.");
            return;
        }
        else{
            // Descifra el ID utilizando el IV proporcionado
            var iv = atob(ivBase64); // Decodifica el IV desde base64
            var idDescifrado = CryptoJS.AES.decrypt(idCifrado, "ClaveDieta", { iv: iv });
            return idDescifrado.toString(CryptoJS.enc.Utf8);
        }
    }

    //ELIMINAR SERVICIOS
    $(document).on('click', '.eliminar-Servicio', function(event){
        event.preventDefault(); //evita la acción predeterminada del enlace
        //obtenemos el id cifrado y su llave iv
        var idServicioCifrado = $(this).data('id');
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
                eliminarServicio(idServicioCifrado, ivBase64);
            }
        });
    });
    function eliminarServicio(idServicioCifrado, ivBase64){
        //funcion ajax para eliminar el usuario por el id cifrado
        $.ajax({
            type:"POST",
            url:"./Servicios/servicio_eliminar.php",
            data: {id : idServicioCifrado, iv: ivBase64},
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
                    });
                }
            },
            error:function(){
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Hubo un problema al eliminar el Servicio.',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
            }
        });
    }
});