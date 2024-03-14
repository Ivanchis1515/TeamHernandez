$(document).ready(function(){
    // // Función para obtener el token de cliente desde el servidor
    // function fetchClientToken() {
    //     $.ajax({
    //         url: "./Pagos/pago_Token.php", // Ruta a tu script en el servidor para obtener el token
    //         type: 'GET', // Método de la solicitud (en este caso, GET)
    //         dataType: 'json', // Tipo de datos esperados en la respuesta (en este caso, JSON)
    //         success: function(data) {
    //             // Verificar si el elemento #clientToken existe
    //             var clientTokenInput = $('#clientToken');
    //             if (clientTokenInput.length === 0) {
    //                 // Si no existe, agregalo al DOM
    //                 clientTokenInput = $('<input type="hidden" id="clientToken" value="">');
    //                 $('body').append(clientTokenInput);
    //             }
    
    //             // Asignar el valor del token al input
    //             clientTokenInput.val(data.clientToken);
                
    //             // Inicializar Braintree con el token obtenido
    //             initializeBraintree();
    //         },
    //         error: function(xhr, status, error) {
    //             // Manejo de errores en caso de que la solicitud falle
    //             console.error('Error al obtener el token de cliente:', error);
    //         }
    //     });
    // }

    // // Función para inicializar Braintree client y crear hosted fields
    // function initializeBraintree() {
    //     var form = $('#cardForm');
    //     var submit = $('#submit');
    //     var clientToken = $('#clientToken').val();
        
    //     console.log('Initializing Braintree client...');
    //     braintree.client.create({
    //         authorization: clientToken
    //     }, function(err, client) {
    //         if (err) {
    //             console.error('Error al inicializar braintree.client:', err);
    //             return;
    //         }
    //         console.log('Braintree client initialized successfully:', client);
    //         console.log('Creating hosted fields...');
    
    //         braintree.hostedFields.create({
    //             client: client,
    //             styles: {
    //                 'input, select': {
    //                     'font-size': '16px',
    //                     'font-family': 'helvetica, tahoma, calibri, sans-serif',
    //                     'color': '#000'
    //                 },
    //                 ':focus': {
    //                     'color': '#000'
    //                 },
    //                 '.invalid': {
    //                     'color': '#EB5757'
    //                 }
    //             },
    //             fields: {
    //                 number: {
    //                     selector: '#card-number',
    //                     placeholder: '•••• •••• •••• ••••',
    //                 },
    //                 cvv: {
    //                     selector: '#cvv',
    //                     placeholder: '123'
    //                 },
    //                 expirationMonth: {
    //                     selector: '#expiration-month',
    //                     placeholder: 'Month',
    //                     select: {
    //                         options: [
    //                             '01 - January',
    //                             '02 - February',
    //                             '03 - March',
    //                             '04 - April',
    //                             '05 - May',
    //                             '06 - June',
    //                             '07 - July',
    //                             '08 - August',
    //                             '09 - September',
    //                             '10 - October',
    //                             '11 - November',
    //                             '12 - December'
    //                         ]
    //                     }
    //                 },
    //                 expirationYear: {
    //                     selector: '#expiration-year',
    //                     placeholder: 'Year',
    //                     select: true
    //                 },
    //                 postalCode: {
    //                     selector: '#postal-code',
    //                     placeholder: '6000'
    //                 }
    //             }
    //         }, function(err, hostedFields) {
    //             if (err) {
    //                 console.error(err);
    //                 return;
    //             }
    //             console.log('Hosted fields created successfully:', hostedFields);
    
    //             submit.removeAttr('disabled');
    
    //             form.submit(function(event) {
    //                 event.preventDefault();
    //                 hostedFields.tokenize(function(err, payload) {
    //                     if (err) {
    //                         console.error(err);
    //                         return;
    //                     }
    
    //                     // Si esta fuera una integración real, aquí es donde enviarías el nonce a tu servidor.
    //                     console.log('Got a nonce: ' + payload.nonce);
    
    //                     // Agrega el valor del nonce al formulario
    //                     $('#payment_method_nonce').val(payload.nonce);
    
    //                     // Envía el formulario con AJAX
    //                     var formData = form.serialize();
    //                     $.post('pago_validacion.php', formData)
    //                         .done(function(response) {
    //                             // Procesamiento exitoso, haz lo que necesites aquí
    //                             console.log(response);
    //                         })
    //                         .fail(function(xhr, status, error) {
    //                             // Error en el procesamiento
    //                             console.error('Error al procesar el pago. Código de estado:', xhr.status);
    //                         });
    //                 });
    //             });
    //         });
    //     });
    // }

    // // Llama a la función para obtener el token de cliente cuando el documento está listo
    // fetchClientToken();

    // Tab selection
    $(document).on('click', '.pay-select__item', function(){
        $('.pay-select__item').removeClass('is-active');
        $(this).addClass('is-active');
        
        if($(this).hasClass('pay-select--card')) {
            $('.select-body__content').removeClass('is-active');
            $('.select-body--card').addClass('is-active');
        } else {
            $('.select-body__content').removeClass('is-active');
            $('.select-body--paypal').addClass('is-active');
        }
    });
});

    