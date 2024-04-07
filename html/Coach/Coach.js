$(document).ready(function(){
    // Manejador de eventos para cargar una página al hacer clic en un enlace
    $('#enlace').click(function(event) {
        event.preventDefault(); // Evita la navegación predeterminada
        var nuevaPaginaURL = $(this).attr('href'); // Obtiene la URL de la nueva página
        console.log('URL de la nueva página:', nuevaPaginaURL); // Agregar esto para depuración
        var dataPage = $(this).data('page');
        switch (dataPage){
            case "plan_usuarios_lista.php":
                $('#contenido').empty();
                cargarPagina(nuevaPaginaURL); // Carga la nueva página
                break;
        }
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
});