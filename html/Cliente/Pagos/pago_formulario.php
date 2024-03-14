<nav class="navbar navbar-light justify-content-center fs-3 mb-3">
    Pagos
</nav>
<div class="container mb-3">
    <div class="sub-body">
        <header class="header">
            <h1 class="price"><span class="price__dollar">$</span>300.00<span class="price__time">/ mo</span></h1>
            <p class="desc">Subscripción mensual</p>
        </header>
    
        <div class="pay-select">
            <div class="pay-select__item pay-select--card is-active">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/346994/Card%20Icon.svg" alt="" />
                <p>Tarjeta Débito/Crédit</p>
            </div>
    
            <div class="separator"></div>
    
            <div class="pay-select__item pay-select--paypal">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/346994/Pp%20Icon.svg" alt="" />
                <p>PayPal</p>
            </div>
        </div>
    
        <div class="select-body">
            <div class="select-body__content select-body--card is-active">
                <form method="post" id="cardForm">
                    <!-- Aquí agregamos el campo oculto para el token de cliente -->
                    <input type="hidden" id="clientToken" value="">

                    <label class="form__label" for="card-number">Numero de tarjeta:</label>
                    <div class="card-input" id="card-number"></div>
    
                    <label class="form__label" for="expiration-month">Fecha de expiración</label>
                    <div class="date__container">
                        <div class="card-input" id="expiration-month"></div>
        
                        <div class="card-input" id="expiration-year"></div>
                    </div>
    
                    <label class="form__label" for="cvv">CVV:</label>
                    <div class="card-input" id="cvv"></div>
    
                    <label class="form__label" for="cvv">Código Postal:</label>
                    <div class="card-input" id="postal-code"></div>
                    
                    <input type="submit" value="Pagar" id="submit" />
                </form>
            </div>
            
            <div class="select-body__content select-body--paypal">
                <script src="https://www.paypalobjects.com/api/button.js?"
                    data-merchant="braintree"
                    data-id="paypal-button"
                    data-button="subscribe"
                    data-color="gold"
                    data-size="medium"
                    data-shape="pill"
                    data-button_type="submit"
                    data-button_disabled="false"
                ></script>
            </div>
        </div>
    </div>
</div>
<script>
    // Función para obtener el token de cliente desde el servidor
    function fetchClientToken() {
        $.ajax({
            url: "./Pagos/pago_Token.php", // Ruta a tu script en el servidor para obtener el token
            type: 'GET', // Método de la solicitud (en este caso, GET)
            dataType: 'json', // Tipo de datos esperados en la respuesta (en este caso, JSON)
            success: function(data) {
                // Verificar si el elemento #clientToken existe
                var clientTokenInput = $('#clientToken');
                if (clientTokenInput.length === 0) {
                    // Si no existe, agregalo al DOM
                    clientTokenInput = $('<input type="hidden" id="clientToken" value="">');
                    $('body').append(clientTokenInput);
                }
    
                // Asignar el valor del token al input
                clientTokenInput.val(data.clientToken);
                
                // Inicializar Braintree con el token obtenido
                initializeBraintree();
            },
            error: function(xhr, status, error) {
                // Manejo de errores en caso de que la solicitud falle
                console.error('Error al obtener el token de cliente:', error);
            }
        });
    }

    // Función para inicializar Braintree client y crear hosted fields
    function initializeBraintree() {
        var form = $('#cardForm');
        var submit = $('#submit');
        var clientToken = $('#clientToken').val();
        
        braintree.client.create({
            authorization: clientToken
        }, function(err, client) {
            if (err) {
                console.error('Error al inicializar braintree.client:', err);
                return;
            }
            console.log('Braintree client initialized successfully:', client);
    
            braintree.hostedFields.create({
                client: client,
                styles: {
                    'input, select': {
                        'font-size': '16px',
                        'font-family': 'helvetica, tahoma, calibri, sans-serif',
                        'color': '#000'
                    },
                    ':focus': {
                        'color': '#000'
                    },
                    '.invalid': {
                        'color': '#EB5757'
                    }
                },
                fields: {
                    number: {
                        selector: '#card-number',
                        placeholder: '•••• •••• •••• ••••',
                    },
                    cvv: {
                        selector: '#cvv',
                        placeholder: '123'
                    },
                    expirationMonth: {
                        selector: '#expiration-month',
                        placeholder: 'Month',
                        select: {
                            options: [
                                '01 - January',
                                '02 - February',
                                '03 - March',
                                '04 - April',
                                '05 - May',
                                '06 - June',
                                '07 - July',
                                '08 - August',
                                '09 - September',
                                '10 - October',
                                '11 - November',
                                '12 - December'
                            ]
                        }
                    },
                    expirationYear: {
                        selector: '#expiration-year',
                        placeholder: 'Year',
                        select: true
                    },
                    postalCode: {
                        selector: '#postal-code',
                        placeholder: '6000'
                    }
                }
            }, function(err, hostedFields) {
                if (err) {
                    console.error(err);
                    return;
                }
    
                submit.removeAttr('disabled');
    
                form.submit(function(event) {
                    event.preventDefault();
                    hostedFields.tokenize(function(err, payload) {
                        if (err) {
                            console.error(err);
                            return;
                        }
    
                        // Si esta fuera una integración real, aquí es donde enviarías el nonce a tu servidor.
                        console.log('Got a nonce: ' + payload.nonce);
    
                        // Agrega el valor del nonce al formulario
                        $('#payment_method_nonce').val(payload.nonce);

                        const pago = payload.nonce; // Obtén el nonce generado por Braintree
    
                        // Envía el formulario con AJAX
                        const data= { payment_method_nonce: nonce }; // Crea un objeto con el nonce
                        $.post('pago_validacion.php', data)
                            .done(function(response) {
                                // Procesamiento exitoso, haz lo que necesites aquí
                                console.log(response);
                            })
                            .fail(function(xhr, status, error) {
                                // Error en el procesamiento
                                console.error('Error al procesar el pago. Código de estado:', xhr.status);
                            });
                    });
                });
            });
        });
    }

    // Llama a la función para obtener el token de cliente cuando el documento está listo
    fetchClientToken();
</script>