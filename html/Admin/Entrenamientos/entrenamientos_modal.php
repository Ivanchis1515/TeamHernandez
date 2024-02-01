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
                <div class="modal-footer">
                    <button id="boton_insertarEntrenamiento" type="button" class="btn btn-success">Guardar</button>
                    <button id="boton_cancelarEntrenamiento" type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
</div>