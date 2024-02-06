<style>
    .boton_mostrar_ejercicios {
        display: none;
    }
</style>
<!-- Modal -->
<div class="modal fade" id="miModalEntrenamiento" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal_tituloEntrenamiento"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="insertarEntrenamiento" method="post" enctype="multipart/form-data">
                <div class="modal-body" id="cuerpo_formEntrenamiento">
                    
                </div>
            </form>
        </div>
    </div>
</div>