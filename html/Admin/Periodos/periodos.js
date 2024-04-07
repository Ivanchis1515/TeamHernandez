$(document).ready(function(){
    //MODAL INSERTAR PERIODOS
    $(document).on('click', '#botonAbrirModalPeriodos', function(){
        //configuración del modal antes de abrirlo
        $("#miModalPeriodos").modal({
            show: true,
            backdrop: false, //desactiva el fondo semitransparente
            keyboard: false
        });
        //obtener la fecha actual en formato YYYY-MM-DD
        const fechaActual = new Date().toISOString().split('T')[0];
        var year = new Date().getFullYear();

        $('#modal_titulo').html('<strong>Nuevo Periodo</strong>');
        const formContent  = 
            '<div class="row mb-3">' +
                '<div class="col mb-3">' +
                    '<label class="form-label">Nombre periodo:</label>' +
                    '<input type="text" class="form-control" id=nombre name="nombreperi" placeholder="Nombre del periodo" required>' +
                '</div>' +
                '<div class="col mb-3">' +
                    '<label class="form-label">Periodo:</label>' +
                    '<input type="number" class="form-control" id="periodo" name="periodo" placeholder="Año" readonly required="required" value="'+ year +'">' +
                '</div>' +
            '</div>' +

            '<div class="row mb-3">' +
                '<div class="col mb-3">' +
                    '<label class="form-label">Inicio del periodo:</label>' +
                    '<input type="text" class="form-control" id="inicioPeri" name="inicioPeri" placeholder="Fecha de hoy" value="'+ fechaActual +'" readonly>' +
                '</div>' +
                '<div class="col mb-3">' +
                    '<label class="form-label">Disponible:</label>' +
                    '<input type="date" class="form-control" id="disponiblePeri" name="disponiblePeri" placeholder="Fecha en que será disponible">' +
                '</div>' +
            '</div>' + 

            '<div class="row mb-3">' +
                '<div class="col mb-3">' +
                    '<label class="form-label">Estado:</label>' +
                    '<input type="text" class="form-control" id="estado" name="estado" placeholder="1 => activo || 0 => inactivo" required="required">' +
                '</div>' +
                '<div class="col mb-3">' +
                    '<label class="form-label">Inscripciones:</label>' +
                    '<input type="text" class="form-control" id="inscripcion" name="inscripcion" placeholder="1 => Si || 0 => No" disbled>' +
                '</div>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<button id="boton_insertarPeriodo" type="button" class="btn btn-success">Guardar Periodo</button>' +
                '<button id="boton_cancelar" type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>' +
            '</div>';
        $('.cuerpo_form').html(formContent);
    });

    //insertar Periodos
    $(document).on('click', '#boton_insertarPeriodo', function(event){
        event.preventDefault(); //detiene la accion predeterminada
        var formdata = $('#insertar_periodo').serialize();
        console.log(formdata);
        $.ajax({
            type:"POST",
            url:"./Periodos/periodo_insertar.php",
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
                            $("#miModalPeriodos").modal('hide');
                        }
                    });
                }
            },
            error: function() {
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Hubo un problema al insertar el nuevo periodo',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
            }
        });
    });

    //MODAL EDITAR PERIODO
    //maneja el clic en el enlace para abrir el modal de edición
    $(document).on('click', '.abrir-sweetPeriodos', function(event) {
        event.preventDefault(); //evita la acción predeterminada del enlace
        var idPeriodoCifrado = $(this).data('id'); //recupera el id cifrado de la tabla
        var ivBase64 = $(this).data('iv'); //recupera el IV en base64
        console.log("Modal con id cifrado: ", idPeriodoCifrado);

        Swal.fire({
            title: '¿Quieres cerrar el período?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
               //si el usuario hizo clic en "Sí", enviar la solicitud AJAX para cerrar el período
               cerrarPeriodo(idPeriodoCifrado, ivBase64);
            }
        });
    });
    function cerrarPeriodo(idCifrado, ivBase64) {
        //usa el ID cifrado y el IV para enviar la información al servidor
        $.ajax({
            url: './Periodos/periodo_actualizar.php',
            type: 'POST',
            data: { id: idCifrado, iv: ivBase64 },
            success: function(response) {
                console.log(response);
                // Puedes manejar la respuesta según tus necesidades
                if (response === 'Success') {
                    Swal.fire('Éxito', 'El período se cerró correctamente.', 'success');
                    // Actualizar la interfaz según sea necesario
                } else {
                    Swal.fire('Error', 'Hubo un error al cerrar el período.', 'error');
                }
            },
            error: function() {
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Hubo un problema al intentar cerrar el periodo',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
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

});