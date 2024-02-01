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
                '<input type="text" class="form-control" name="nombredieta" placeholder="ejem: Baja en grasa" required>' +
            '</div>' +
            '<div class="mb-3">' +
                '<label class="form-label">Caracteristicas:</label>' +
                '<textarea type="text" class="form-control" name="caract" placeholder="ejem: descripcion de la dieta" required></textarea>'+
            '</div>'+
            '<div class="mb-3">' +
                '<label class="form-label">Alimentos:</label>' +
                '<textarea type="text" class="form-control" name="tipo_ali" placeholder="ejem: Alimentos recomendados" required></textarea>' +
            '</div>';
        $('.cuerpo_formDietas').html(formContent);
    });

    //MODAL INSERTAR DIETA
    $(document).on('click', '#boton_insertarDietas', function(){
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
                //descifra el ID antes de cargar los datos
                var idUsuario = descifrarID(idDietaCifrada, ivBase64);

                $('#modal_tituloDietas').html('<strong>Editar Dieta</strong>');
                const formContent =
                    '<input type="hidden" name="id" value="'+ datos.id + '">' +
                    '<div class="mb-3">' +
                        '<label class="form-label">Nombre Dieta:</label>' +
                        '<input type="text" class="form-control" name="nombredieta" placeholder = "ejem: Baja en grasa" value="'+ datos.nombre +'" required>' +
                    '</div>' +
                    '<div class="mb-3">' +
                        '<label class="form-label">Caracteristicas:</label>' +
                        '<textarea type="text" class="form-control" name="caract" placeholder="ejem: descripcion de la dieta" required>'+ datos.caracteristicas +'</textarea>' +
                    '</div>' +
                    '<div class="mb-3">' +
                        '<label class="form-label">Alimentos:</label>'+
                        '<textarea type="text" class="form-control" name="tipo_ali" placeholder="ejem: Alimentos recomendados" required>'+ datos.alimentos +'</textarea>'+
                    '</div>'
                $('.cuerpo_formDietas').html(formContent);
                $('#boton_insertarDietas').html('Guardar cambios');
                //abirr el modal de edición
                $('#miModalDieta').modal('show');

                //ACTUALIZAR DIETAS
                $('#boton_insertarDietas').off('click').on('click', function(){
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
                }).attr('id', 'boton_actualizarDieta');
            },
            error: function() {
                alert('Error al cargar los datos de la dieta.');
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
