
$(document).ready(function () {
    WinMove();
    var CodAsig,Ref, NombreAsig, e, a, Notificacion,Acceso, Descripcion, Tipo, Busqueda, CodGrado, CodGrupo, CodProfe;
    var jsonData
    cargarTipos();
    cargarEst();
    cargarPeriodo();
    cargarProfe();
    cargarAsig();
    cargarGrup();
    nuevo();
    $('#btnG').click(function () { // Botón gestionar registros
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            Gestionar();
            btn.button('reset')
        });
    });
    $('#txtIdR').keyup(function (e) {
        if (e.keyCode == 13) {
            var btn = $('#btnG')
            btn.button('loading')
            $.ajax(".....").always(function () {
                Gestionar();
                btn.button('reset')
            });

        }
    });
    function cargarTipos() {
        var A;
        $("#txtTipo").val("");
        A = '<option value="SELECCIONE">SELECCIONE</option>';
        A += '<option value="POSITIVA">POSITIVA</option>';
        A += '<option value="NEGATIVA">NEGATIVA</option>';
        $("#txtTipo").append(A);
    }
    function cargarEst() {
        var A;
        $("#txtIdEst").val("");
        A = '<option value="SELECCIONE">SELECCIONE</option>';
        A += '<option value="101756">101756</option>';
        A += '<option value="1031556">1031556</option>';
        $("#txtIdEst").append(A);
    }
    function cargarPeriodo() {
        var A;
        $("#txtIdPer").val("");
        A = '<option value="SELECCIONE">SELECCIONE</option>';
        A += '<option value="I">I</option>';
        A += '<option value="II">II</option>';
        $("#txtIdPer").append(A);
    }
    function cargarProfe() {
        var A;
        $("#txtIdPro").val("");
        A = '<option value="SELECCIONE">SELECCIONE</option>';
        A += '<option value="234166">234166</option>';
        A += '<option value="1345560">1345560</option>';
        $("#txtIdPro").append(A);
    }
    function Alerta(Mensaje, Color) {
        $("#alerta").html("");
        var newtitle;
        newtitle = '  <div class="alert alert-' + Color + ' alert-dismissable text-center">';
        newtitle += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
        newtitle += '' + Mensaje + '';
        newtitle += "</div> ";
        $("#alerta").append(newtitle);
    }
    //-------------------------------- Modal dinamico para las operaciones del sistema ------------- -----
    function Modal(Mensaje, Titulo) {
        $("#textoModal").text("");
        $("#tituloModal").text("");
        $("#ModalFooter").text("");
        $("#textoModal").append("<strong> Mensaje de la operaci&oacute;n: </strong> " + Mensaje + "");
        $("#tituloModal").append(Titulo);  // ACA CAMBIO LA URL DE LA IMGANE QUE APRECE EN TODOS LOS MODALES
        $("#ModalFooter").append('<img src="BOOTSTRAP/img/COMPRILET/Slogan-ComprileSoftt.png" class="img-thumbnail" />    ');
        $("#Modal").modal("show");
    }

    function cargarAsig() {
        var A;
        $("#txtIdAsig").val("");
        A = '<option value="SELECCIONE">SELECCIONE</option>';
        A += '<option value="ESP">ESP</option>';
        A += '<option value="MAT">MAT</option>';
        $("#txtIdAsig").append(A);
    }
    function cargarGrup() {
        var A;
        $("#txtIdGrupo").val("");
        A = '<option value="SELECCIONE">SELECCIONE</option>';
        A += '<option value="2013-0A">2013-1A</option>';
        A += '<option value="2013-1A">2013-1A</option>';
        $("#txtIdGrupo").append(A);
    }
    var getDatosG = function () {
        var dto = {};
        dto.referencia = Ref;
        return dto;
    };
    $('#formulario').hide();
     //----------------------------------------------------------------------------------------------------
    $('#btnN').click(function () { // Botón Nuevo
        nuevo();
    });
    function nuevo() {
        Alerta("Digite una referencia para procesar la observación", "info");
        $("#txtIdGrupo").val("SELECCIONE");
        $("#txtIdEst").val("SELECCIONE");
        $("#txtIdPer").val("SELECCIONE");

        $("#txtIdAsig").val("SELECCIONE");
        $("#txtIdPro").val("SELECCIONE");
        $('#formulario').hide();
        $("#txtTipo").val("SELECCIONE");
        $("#txtDes").val("");
        $("#txtIdR").val("");
        $('#txtIdR').focus();
    }
   //GET
    function Gestionar() { // Verificamos que sea un estudiante
        if ($('#txtIdR').val() == '') {
            Alerta("Error: Digite una referencia.", "danger");
            $('#txtIdR').focus();
        } else {
            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
            var id = $('#txtIdR').val();
            //jsonData = "{'dto':" + JSON.stringify(getDatosG()) + "}";
            $.ajax({
                type: "GET",
                url: "http://190.109.185.138:8012/api/observaciones/" + id + "",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    $('#formulario').show();
                    if (result == null) {
                       
                        $('#btnR').show();
                        $('#btnM').hide();
                        $('#btnE').hide();
                        Modal("Aplicación lista para registrar. ", "Nuevo registro");
                    }
                    else {
                        $('#btnR').hide();
                        $('#btnM').show();
                        $('#btnE').show();
                        $("#txtIdEst").val(result.id_estudiante);
                        $("#txtIdAsig").val(result.id_asignatura);
                        $("#txtIdGrupo").val(result.id_grupo);
                        $("#txtIdPer").val(result.id_periodo);
                        $("#txtIdPro").val(result.id_profesor);
                        $("#txtDes").val(result.observacion);
                        $("#txtTipo").val(result.tipo);
                        Modal("Datos cargados con exito.", "Carga de datos");
                    }
                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Error en el servidor");
                }
            });
        }
    }  
    //POST
    $(document).on('click', '.clsR', function () { // METODO PARA REGISTRAR
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
          
        if ($('#txtDes').val() == '') {
            Alerta("Error: Digite una descripcion a la observacion para continuar.", "danger");
            $('#txtDes').focus();
        } else {
            Notificacion = "PENDIENTE";
            Acceso = "SIN ARCHIVAR";
            var dto = {
                referencia: $("#txtIdR").val(),
                id_estudiante: $("#txtIdEst").val(),
                id_asignatura: $("#txtIdAsig").val(),
                id_grupo: $("#txtIdGrupo").val(),
                id_periodo: $("#txtIdPer").val(),
                id_profesor: $("#txtIdPro").val(),
                observacion: $("#txtDes").val(),
                fecha: "",
                tipo: $("#txtTipo").val(),
                notificacion: Notificacion,
                acceso: Acceso
            };
            $.ajax({
                type: "POST",
                url: "http://190.109.185.138:8012/api/observaciones",
                data: JSON.stringify(dto),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    Modal(JSON.stringify(result), "  Registro de observaciones disciplinarias");
                    nuevo();
                    $('#txtIdR').focus();
                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Error en el servidor");
                }
            });
        }
        btn.button('reset')
        });

    });
    //PUT
    $(document).on('click', '.clsM', function () { // METODO PARA MODIFICAR
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
            var dto = {
                referencia: $("#txtIdR").val(),
                id_estudiante: $("#txtIdEst").val(),
                id_asignatura: $("#txtIdAsig").val(),
                id_grupo: $("#txtIdGrupo").val(),
                id_periodo: $("#txtIdPer").val(),
                id_profesor: $("#txtIdPro").val(),
                observacion: $("#txtDes").val(),
                fecha: "",
                tipo: $("#txtTipo").val(),
                notificacion: Notificacion,
                acceso: Acceso
            };

            var id = $('#txtIdR').val();
            $.ajax({
                url: "http://190.109.185.138:8012/api/observaciones/" + id + "",
                type: 'PUT',
                data: JSON.stringify(dto),
                contentType: "application/json;charset=utf-8",
                success: function (result) {
                    Modal(JSON.stringify(result), "Actualización de observaciones disciplinarias");
                    nuevo();
                    $('#txtIdR').focus();
                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Error en el servidor");
                }
            });
            btn.button('reset')
        });

    });
    //DELETE
    $(document).on('click', '.clsE', function () { // METODO PARA ELIMINAR
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
            var id = $('#txtIdR').val();
            $.ajax({
                type: "DELETE",
                url: "http://190.109.185.138:8012/api/observaciones/" + id + "",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    Modal(JSON.stringify(result), "Eliminación de observaciones disciplinarias");
                    nuevo();
                    $('#txtIdR').focus();
                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Error en el servidor");
                }
            });
            btn.button('reset')
        });
    });


});
