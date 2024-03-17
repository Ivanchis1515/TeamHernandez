$(document).ready(function() {
    // Verificar sesión al cargar la página
    // verificarSesion();

    // Manejador de eventos para cargar una página al hacer clic en un enlace
    $('.enlace').click(function(event) {
        event.preventDefault(); // Evita la navegación predeterminada
        var nuevaPaginaURL = $(this).attr('href'); // Obtiene la URL de la nueva página
        console.log('URL de la nueva página:', nuevaPaginaURL); // Agregar esto para depuración
        $('#contenido').empty();
        cargarPagina(nuevaPaginaURL); // Carga la nueva págin
        // var dataPage = $(this).data('page');
        // switch (dataPage){
        //     case "usuarios_lista.php":
        //         $('#contenido').empty();
        //         cargarPagina(nuevaPaginaURL); // Carga la nueva página
        //         break;
        //     case "dietas_lista.php":
        //         // Remueve el contenido actual
        //         $('#contenido').empty();
        //         cargarPagina(nuevaPaginaURL);
        //         break;
        //     case "entrenamientos_lista.php":
        //         // Remueve el contenido actual
        //         $('#contenido').empty();
        //         cargarPagina(nuevaPaginaURL);
        //         break;
        //     case "periodos_lista.php":
        //         // Remueve el contenido actual
        //         $('#contenido').empty();
        //         cargarPagina(nuevaPaginaURL);
        //         break;
        //     case "servicios_lista.php":
        //         // Remueve el contenido actual
        //         $('#contenido').empty();
        //         cargarPagina(nuevaPaginaURL);
        //         break;
        // }
    });
    
    // Función para cargar una nueva página y reemplazar el contenido actual
    function cargarPagina(url) {
        // Agrega la clase de transición antes de cargar la página
        $('#contenido').addClass('transicion-contenido');
        $.ajax({
            url: url,
            method: 'GET',
            success: function(data) {
                setTimeout(function() {
                    $('#contenido').html(data); // Reemplaza el contenido actual con la nueva página
                    // Quita la clase de transición después de cargar la página
                    $('#contenido').removeClass('transicion-contenido');
                }, 300); // Ajusta el tiempo según la duración de la transición CSS
            },
            error: function() {
                alert('Error al cargar la página');
            }
        });
    }

    //manejador de eventos para cerrar sesión
    // $('#cerrar-sesion').click(function(event) {
    //     event.preventDefault(); //evita la navegación predeterminada
    //     //realiza una solicitud AJAX para cerrar sesión
    //     $.ajax({
    //         url: '../../config/cerrar_sesion.php',
    //         method: 'GET',
    //         success: function(data) {
    //             //elimina el token JWT del almacenamiento local
    //             localStorage.removeItem('jwt');
    //             //redirige al formulario de inicio de sesión
    //             window.location.href = '../Login/Sesion.html';
    //         },
    //         error: function() {
    //             alert('Error al cerrar sesión');
    //         }
    //     });
    // });

    //funcion para verificar la sesión del usuario
    function verificarSesion() {
        $.ajax({
            url: '../../config/verificar_sesion.php', //ruta a tu script PHP para verificar la sesión
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                //maneja la respuesta del servidor
                if (data && data.error) {
                    //si hay un error en la sesión, redirige al formulario de inicio de sesión
                    window.location.href = '../Login/Sesion.html';
                }
            },
            error: function() {
                alert('Error al verificar la sesión');
            }
        });
    }
});