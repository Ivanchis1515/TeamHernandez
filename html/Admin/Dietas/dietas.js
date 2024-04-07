$(document).ready(function(){
    $(document).on('click', '#botonAbrirModalDietas', function(){
        //configuración del modal antes de abrirlo
        $("#miModalDieta").modal({
            show: true,
            backdrop: false, //desactiva el fondo semitransparente
            keyboard: false
        });
        $('#modal_tituloDietas').html('<strong>Nueva Dieta</strong>');
        const formContent  = 
            '<div class="mb-3">' +
                '<label class="form-label">Nombre Dieta:</label>' +
                '<input type="text" class="form-control" name="nombredieta" placeholder="Nombre de la dieta..." required />' +
            '</div>' +
            '<div class="mb-3">' +
                '<label class="form-label">Caracteristicas:</label>' +
                '<textarea type="text" class="form-control" name="caract" placeholder="Descripcion de la dieta..." required></textarea>'+
            '</div>'+
            '<div class="mb-3">' +
                '<label class="form-label">Alimentos:</label>' +
                '<textarea type="text" class="form-control" name="tipo_ali" placeholder="Alimentos recomendados..." required></textarea>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<button id="boton_insertarDietas" type="button" class="btn btn-success">Guardar dieta</button>' +
                '<button id="boton_cancelarDietas" type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>' +
            '</div>';
        $('.cuerpo_formDietas').html(formContent);
    });

    //MODAL INSERTAR DIETA
    $(document).on('click', '#boton_insertarDietas', function(){
        if ($('#insertarDieta')[0].checkValidity()) {
            var formdata = $('#insertarDieta').serialize();
            $.ajax({
                type:"POST",
                url:"./Dietas/dieta_insertar.php",
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
                                $("#miModalDieta").modal('hide');
                            }
                        });
                    }
                },
                error: function() {
                    Swal.fire({
                        icon: 'error',
                        title: '¡Error!',
                        text: 'Hubo un problema al insertar la dieta',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    });
                }
            });
        } else{
            //si el formulario no es válido, mostrar mensaje de error con SweetAlert
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Por favor completa todos los campos del formulario',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            })
        }
    });

    //MODAL EDITAR DIETA
    //maneja el clic en el enlace para abrir el modal de edición
    $(document).on('click', '.abrir-editar-modalDieta', function(event) {
        event.preventDefault(); //evita la acción predeterminada del enlace
        $("#miModalDieta").modal({
            show: true,
            backdrop: false, //desactiva el fondo semitransparente
            keyboard: false
        });
        var idDietaCifrada = $(this).data('id'); //recupera el id cifrado
        var ivBase64 = $(this).data('iv'); //recupera el IV en base64
        console.log("Modal con id cifrado: ", idDietaCifrada);
        cargarDatosdieta(idDietaCifrada, ivBase64);
    });
    function cargarDatosdieta(idDietaCifrada, ivBase64) {
        //AJAX para obtener los datos de la dieta por su ID
        $.ajax({
            url: './Dietas/dieta_obtener.php',
            type: 'GET',
            data: { id: idDietaCifrada, iv: ivBase64 }, //enviamos el IV en base64 al servidor
            success: function(data) {
                datos = JSON.parse(data);

                $('#modal_tituloDietas').html('<strong>Editar Dieta</strong>');
                const formContent =
                    '<input type="hidden" name="id" value="'+ datos.id + '">' +
                    '<div class="mb-3">' +
                        '<label class="form-label">Nombre Dieta:</label>' +
                        '<input type="text" class="form-control" name="nombredieta" placeholder = "ejem: Baja en grasa" value="'+ datos.nombre +'" required />' +
                    '</div>' +
                    '<div class="mb-3">' +
                        '<label class="form-label">Caracteristicas:</label>' +
                        '<textarea type="text" class="form-control" name="caract" placeholder="ejem: descripcion de la dieta" required>'+ datos.caracteristicas +'</textarea>' +
                    '</div>' +
                    '<div class="mb-3">' +
                        '<label class="form-label">Alimentos:</label>'+
                        '<textarea type="text" class="form-control" name="tipo_ali" placeholder="ejem: Alimentos recomendados" required>'+ datos.alimentos +'</textarea>'+
                    '</div>' +
                    '<div class="modal-footer">' +
                        '<button id="boton_editarDietas" type="button" class="btn btn-success">Actualizar dieta</button>' +
                        '<button id="boton_cancelarDietas" type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>' +
                    '</div>';
                $('.cuerpo_formDietas').html(formContent);

                //ACTUALIZAR DIETAS
                $('#boton_editarDietas').on('click', function(){
                    var formData = $('#insertarDieta').serialize();
                    $.ajax({
                        type:"POST",
                        url:"./Dietas/dieta_actualizar.php",
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
                                        $("#miModalDieta").modal('hide');
                                    }
                                });
                            }
                        },
                        error:function(){
                            //error de ajax
                            Swal.fire({
                                icon: 'error',
                                title: '¡Error!',
                                text: 'Hubo un problema al actualizar la dieta',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'OK'
                            });                        
                        }
                    });
                });
            },
            error: function() {
                alert('Error al cargar los datos de la dieta.');
            }
        });
    }

    //ELIMINAR DIETAS
    $(document).on('click', '.eliminar-Dieta', function(event){
        event.preventDefault(); //evita la acción predeterminada del enlace
        //obtenemos el id cifrado y su llave iv
        var idDietaCifrada = $(this).data('id');
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
                eliminarDieta(idDietaCifrada, ivBase64);
            }
        });
    });
    function eliminarDieta(idDietaCifrada, ivBase64){
        //funcion ajax para eliminar el usuario por el id cifrado
        $.ajax({
            type:"POST",
            url:"./Dietas/dieta_eliminar.php",
            data: {id : idDietaCifrada, iv: ivBase64},
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
                    text: 'Hubo un problema al eliminar la dieta.',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
            }
        });
    }
});
