$(document).ready(function(){
    ///MODAL INSERTAR ENTRENAMIENTOS
    $(document).on('click', '#botonAbrirModalEntrenamientos', function() {
        //configuración del modal antes de abrirlo
        $("#miModalEntrenamiento").modal({
            show: true,
            backdrop: false, //desactiva el fondo semitransparente
            keyboard: false
        });
        $('#modal_tituloEntrenamiento').html('<strong>Agregar Plan</strong>');
        const formContent  = 
            '<div class="row mb-3">' +
                '<div class="col mb-3">' +
                    '<label class="form-label">Plan:</label>' +
                    '<input type="text" class="form-control" name="nplan" placeholder="Plan de entrenamiento" required="required">' +
                '</div>' +
                '<div class="col mb-3">' +
                    '<label class="form-label">Objetivos:</label>' +
                    '<textarea type="text" class="form-control" name="obj" placeholder="Objetivos del plan" required></textarea>'+
                '</div>' +
            '</div>' +
            '<div class="mb-3">' +
                '<label class="form-label">Descripción:</label>' +
                '<textarea type="text" class="form-control" name="desc" placeholder="Descripción del plan" required></textarea>'+
            '</div>' +
            '<div class="mb-3">' +
                '<label class="form-label">Estado:</label>' +
                '<input class="form-control" type="text" name="estado" placeholder="Activo 1 || Inactivo 0" required>' +
            '</div>'+
            '<div class="mb-3">' +
                '<label class="form-label">Foto:</label>' +
                '<input class="form-control" type="file" name="foto">' +
            '</div>' +
            '<div class="modal-footer">' +
                '<button id="boton_insertarEntrenamiento" type="button" class="btn btn-success">Agregar plan de entrenamiento</button>' +
                '<button id="boton_cancelarEntrenamiento" type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>' +
            '</div>';
        $('#cuerpo_formEntrenamiento').html(formContent);

        $('#boton_insertarEntrenamiento').off('click').on('click', function(event){
            event.preventDefault(); //detiene la accion predeterminada
            var formData = new FormData($('#insertarEntrenamiento')[0]);
            $.ajax({
                type:"POST",
                url:"./Entrenamientos/entrenamiento_insertar.php",
                data: formData,
                contentType: false,
                processData: false,
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
                                $("#miModalEntrenamiento").modal('hide');
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
    });

    function cargarPlanes() {
        $.ajax({
            url: './Entrenamientos/entrenamiento_obtener.php',
            method: 'GET',
            success: function (data) {
                datos = JSON.parse(data);
                $("#contenedorPlanes").empty();
                for (var i = 0; i < datos.length; i++) {
                    //utilizar la ruta de la imagen directamente
                    var urlImagen = datos[i].foto;
    
                    //construir la tarjeta con la ruta de imagen
                    const card =
                        '<div class="card mb-3 mr-3" style="width: 18rem;" id="' + datos[i].id +'">' +
                            '<img src="' + urlImagen + '" class="card-img-top" alt="' + datos[i].nombre + '">' +
                            '<div class="card-body">' +
                                '<h5 class="card-title">' + datos[i].nombre + '</h5>' +
                                '<p class="card-text">Objetivo: ' + datos[i].objetivo + '</p>' +
                                '<p class="card-text">' + datos[i].descripcion + '</p>' +
                                '<button class="btn btn-primary mb-2 agregar-ejercicios" id="' + datos[i].id + '">Agregar ejercicio</button>' +
                                '<button class="btn btn-info ver-ejercicios" id="' + datos[i].id + '">Ver ejercicios</button>' +
                            '</div>' +
                        '</div>';
                    $("#contenedorPlanes").append(card);
                }
            },
            error: function () {
                console.error('Error al cargar los planes.');
            }
        });
    }
    cargarPlanes();
    setInterval(cargarPlanes, 5000);

    //AGREGAR EJERCICIOS
    $(document).on('click', '.agregar-ejercicios', function(event){
        //deten la navegacion predeterminada
        event.preventDefault();
        //obten el id del plan
        idPlanSeleccionado = $(this).attr('id');
        $("#miModalEntrenamiento").modal({
            show: true,
            backdrop: false, //desactiva el fondo semitransparente
            keyboard: false
        });

        $('#modal_tituloEntrenamiento').html('<strong>Agregar Ejercicio</strong>');
        const generarValores = (start, end) => {
            let valores = '';
            for (let i = start; i <= end; i++) {
                valores += `<option value="${i}">${i}</option>`;
            }
            return valores;
        };
        const formContent  = 
            '<input type="hidden" name="id" value="'+ idPlanSeleccionado +'">' +
            '<div class="mb-3">' +
                '<label class="form-label">Nombre ejercicio:</label>' +
                '<input type="text" class="form-control" name="nom_ejericicio" placeholder="Nombre ejercicio" required="required">' +
            '</div>' +
            '<div class="row mb-3">' +
                '<div class="col mb-3">' +
                    '<label class="form-label">Descripción:</label>' +
                    '<textarea type="text" class="form-control" name="desc" placeholder="Descripcion del ejercicio" required></textarea>'+
                '</div>' +
                '<div col class="col mb-3">' +
                    '<label class="form-label">Instrucciones:</label>' +
                    '<textarea type="text" class="form-control" name="instrucciones" placeholder="Instrucciones para llevar a cabo" required></textarea>' +
                '</div>' +
            '</div>' +
            '<div class="row mb-3">' +
                '<div class="col mb-3">' +
                    '<label class="form-label">Series: </label>' +
                    `<select class="form-select" name="series" required>${generarValores(1, 10)}</select>` +
                '</div>'+
                '<div class="col mb-3">' +
                    '<label class="form-label">Repeticiones: </label>' +
                    `<select class="form-select" name="repeticiones" required>${generarValores(1, 20)}</select>` +
                '</div>' +
            '</div>' +
            '<div id="contenedorLottie"></div>' +
            '<div class="modal-footer">' +
                '<button id="boton_insertarEjercicio" type="button" class="btn btn-success">Agregar ejercicio al plan</button>' +
                '<button id="boton_cancelar" type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>' +
            '</div>';
        $('#cuerpo_formEntrenamiento').html(formContent);
        
        //información de las animaciones
        const animaciones = {
            'animacion1': {
                nombre: 'Zancadas con cambio',
                path: 'http://localhost/TeamHernandez/Img/Animations/Animation_1706495027655.json'
            },
            'animacion2': {
                nombre: 'Burpees',
                path: 'http://localhost/TeamHernandez/Img/Animations/Animation_1706502909318.json'
            },
            'animacion3': {
                nombre: 'Planchas laterales',
                path: 'http://localhost/TeamHernandez/Img/Animations/Animation_1706502928162.json'
            }
        };

        // Obtener el contenedor de Lottie
        const contenedorLottie = $('#contenedorLottie');
        // Crear el select
        const selectLottie = $('<select>', {
            class: 'form-select',
            name: 'material_apoyo',
            id: 'lottieSelect',
            required: true
        });
        // Agregar una opción por cada animación
        Object.keys(animaciones).forEach(key => {
            const animacion = animaciones[key];
            const option = $('<option>', {
                value: key,
                'data-animation-path': animacion.path,
                text: animacion.nombre
            });
            selectLottie.append(option);
        });
        // Agregar el select al contenedor
        contenedorLottie.append('<label class="form-label">Material de apoyo:</label>');
        contenedorLottie.append(selectLottie);
        // Agregar el contenedor de previsualización
        contenedorLottie.append('<div id="lottiePreview" style="width: 100%; height: 100%;"></div>');

        // Cargar y mostrar la previsualización de la animación Lottie seleccionada
        const lottieSelect = $('#lottieSelect');
        const lottiePreview = $('#lottiePreview');
        lottieSelect.on('change', function () {
            const selectedOption = $(this).find(':selected');
            const animationPath = selectedOption.data('animation-path');

            if (animationPath) {
                // Detener la animación anterior si la hay
                if (lottiePreview.animation) {
                    lottiePreview.animation.destroy();
                }

                // Mostrar la nueva animación
                lottiePreview.animation = lottie.loadAnimation({
                    container: lottiePreview[0],
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: animationPath
                });
            }
        });
        //insertar ejercicio
        $('#boton_insertarEjercicio').off('click').on('click', function(){
            //obtener la animación seleccionada
            const selectedOption = $('#lottieSelect').find(':selected');
            const animationPath = selectedOption.data('animation-path');
            var formData = new FormData($('#insertarEntrenamiento')[0]);
            formData.append('animation', animationPath);//agrega la animacion al objeto formdata
            $.ajax({
                type:"POST",
                url:"./Entrenamientos/Ejercicios/ejercicio_insertar.php",
                data: formData,
                contentType:false,
                processData:false,
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
                                $("#miModalEntrenamiento").modal('hide');
                            }
                        });
                    }
                },
                error: function() {
                    Swal.fire({
                        icon: 'error',
                        title: '¡Error!',
                        text: 'Hubo un problema al insertar el ejercicio',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    });
                }
            });
        });
    });

    //MOSTRAR EJERCICIOS 
    $(document).on('click', '.ver-ejercicios', function(event){
        //deten la navegacion predeterminada
        event.preventDefault();
        //obten el id del plan
        idPlanSeleccionado = $(this).attr('id');
        $("#miModalEntrenamiento").modal({
            show: true,
            backdrop: false, //desactiva el fondo semitransparente
            keyboard: false
        });
        $('#modal_tituloEntrenamiento').html('<strong>Ejercicios</strong>');
        $.ajax({
            url: "./Entrenamientos/Ejercicios/ejercicio_obtener.php",
            data: { idPlan: idPlanSeleccionado },
            method: "POST",
            dataType: "json",
            success: function (data) {
                //verificar si hay datos
                if (!data || data.length === 0) {
                    $('#cuerpo_formEntrenamiento').html('<p>No hay ejercicios disponibles.</p>');
                    return;
                }
                let ulContent = '<ul class="list-group">';
                data.forEach(ejercicio => {
                    ulContent +=
                        '<li class="list-group-item ejercicio-item" data-id="' + ejercicio.id + '">' +
                            '<div class="row">' +
                                '<div class="col-6 d-flex align-items-center">' +
                                    '<span class="text-left">' + ejercicio.nombre + '</span>' +
                                '</div>' +
                                '<div class="col-6">' +
                                    '<div id="lottieContainer_' + ejercicio.id + '" style="width: 100%; height: 100%;"></div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="detalles" style="display:none;">' +
                                '<p class="text-left">Descripción: ' + ejercicio.descripcion + '</p>' +
                                // '<p>Instrucciones: ' + ejercicio.instrucciones + '</p>' +
                                '<p class="text-left">Series: ' + ejercicio.series + '</p>' +
                                '<p class="text-left">Repeticiones: ' + ejercicio.repeticiones + '</p>' +
                                '<button class="btn btn-danger eliminar-ejercicio" data-id="' + ejercicio.id + '">Eliminar</button>' +
                            '</div>' +
                        '</li>';
                });
                ulContent += '</ul>' +
                    '<div class="modal-footer">' +
                        '<button id="boton_cancelar" type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>' +
                    '</div>';
                $('#cuerpo_formEntrenamiento').html(ulContent);
                data.forEach(ejercicio => {
                    const lottieContent = document.getElementById('lottieContainer_' + ejercicio.id);
                    const animationPath = ejercicio.video;

                    //cargar la animación Lottie
                    const lottieInstance = lottie.loadAnimation({
                        container: lottieContent,
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        path: animationPath
                    });
                });

                //Desplegar la lista de cada ejercicio
                $('.ejercicio-item').on('click', function () {
                    $(this).find('.detalles').slideToggle();
                });
                //evento de clic a los botones de eliminar
                $('.eliminar-ejercicio').on('click', function (event) {
                    //deten la navegación predeterminada
                    event.preventDefault();
                    const ejercicioId = $(this).data('id');
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
                            EliminarEjercicio(ejercicioId);
                        }
                    });
                });
            },
            error: function () {
                // Manejar errores de la solicitud AJAX
                console.error('Error en la solicitud AJAX.');
                $('#cuerpo_formEntrenamiento').html('<p>Ocurrió un error al obtener los ejercicios.</p>');
            }
        });
    });
    function EliminarEjercicio(ejercicioId){
        //funcion ajax para eliminar el ejercicio
        $.ajax({
            type:"POST",
            url:"./Entrenamientos/Ejercicios/ejercicio_eliminar.php",
            data: {id: ejercicioId },
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
                    })
                }
            },
            error:function(){
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Hubo un problema al eliminar el ejercicio.',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
            }
        });
    }
});