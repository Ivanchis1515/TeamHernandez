$(document).ready(function() {
    // Verifica si el usuario está autenticado al cargar la página
    verificarAutenticacion();

    //manejador de eventos para cargar una página al hacer clic en un enlace
    $('.btn-enlace').click(function(event) {
        event.preventDefault(); //evita la navegación predeterminada
        var nuevaPaginaURL = $(this).data('url'); //obten la URL de la nueva página
        console.log('URL de la nueva página:', nuevaPaginaURL); //agregar esto para depuración
        $('#contenido').empty();
        cargarPagina(nuevaPaginaURL); //carga la nueva pagina
    });
    
    //función para cargar una nueva página y reemplazar el contenido actual
    function cargarPagina(url) {
        //agrega la clase de transición antes de cargar la página
        $('#contenido').addClass('transicion-contenido');
        $.ajax({
            url: url,
            method: 'GET',
            success: function(data) {
                setTimeout(function() {
                    $('#contenido').html(data); //reemplaza el contenido actual con la nueva página
                    //quita la clase de transición después de cargar la página
                    $('#contenido').removeClass('transicion-contenido');
                }, 300); //ajusta el tiempo según la duración de la transición CSS
            },
            error: function() {
                alert('Error al cargar la página');
            }
        });
    }

    // Función para verificar si el usuario está autenticado
    function verificarAutenticacion() {
        $.ajax({
            url: '../../config/verificar_sesion.php', // URL para verificar la autenticación
            method: 'GET',
            success: function(response, status, xhr) {
                if (xhr.status === 200) {
                    // Si el usuario está autenticado (código de estado 200), puedes realizar otras acciones aquí
                    console.log('El usuario está autenticado');
                    console.log(xhr.status);
                } else if (xhr.status === 401) {
                    // Si el usuario no está autenticado (código de estado 401), redirige al formulario de inicio de sesión
                    window.location.href = '../html/Login/Sesion.html';
                }
            },
            error: function(xhr, status, error) {
                // Manejo de errores
                console.error(xhr.responseText);
            }
        });
    }

    // Forzar recarga de página al retroceder desde la caché del navegador
    window.onpageshow = function(event) {
        if (event.persisted) {
            window.location.reload();
        }
    };
});