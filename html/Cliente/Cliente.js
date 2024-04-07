$(document).ready(function() {
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
});