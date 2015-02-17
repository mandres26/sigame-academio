
//$(document).ready(function () {
    WinMove();
    var jsonData;
    var conta;
    var P = {};
    nuevo();
    //---------------------------------- validamos que este logueado el usuario ----------------------------------------------
    validar_pagina();
    vigencia();
    //---------------------------------- validamos que el rol del usuario pueda ingresar a esta pagina -----------------------
    if (localStorage.getItem('SeccionRol') == "ADMINISTRATIVO" || localStorage.getItem('SeccionRol') == "SUPER") {
        conta = 0;
    } else {
        DenegarAccesoToAdmin();
    }
    //---------------------------------- --------------------------------------------------------------------------------------
    var array = new Array(); // variable para las grillas en los formularios
   
    $('#txtId').keyup(function (e) {
        if (e.keyCode == 13) {
            var btn = $('#btnG')
            btn.button('loading')
            $.ajax(".....").always(function () {
            
                Gestionar();
                btn.button('reset')
            });

        }
    });

    $('#btnG').click(function () { // Botón gestionar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            Gestionar();
            btn.button('reset')
        });

    });
    function Gestionar() {
        if ($('#txtId').val() == '') {
            Alerta("Error: Digite una jornada en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
            $('#txtId').focus();
        } else if (($('#txtId').val()).length < 4) {
            Alerta("Error: La jornada debe tener <strong> 4 caracteres</strong>como minimo .", "danger");
            $('#txtId').focus();
        } else {
            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
            jsonData = "{'dto':" + JSON.stringify(getDatosGJ()) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/jornadas.asmx/c_jornada",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    $("#botones").show();
                    if (result.d == null) {
                        $('#btnR').show();
                        $('#btnE').hide();
                        $('#btnM').hide();
                        $("#txtId").attr('disabled', 'disabled');
                    }
                    else if (result.d != null) {
                        P = result.d; //OCULTAMOS LOS BOTONES RESPECTIVOS
                        $('#txtHoraI').val(P.horaI);
                        $('#txtHoraF').val(P.horaF);
                        $('#btnR').hide();
                        $('#btnM').show();
                        $('#btnE').show();
                        $("#txtId").attr('disabled', 'disabled');
                    }
                },
                error: function (result) {
                }
            });
        }
    }


    //---------------------------------- BOTONES DE ACCIONES ----------------------------
    $('#btnN').click(function () { // Botón Nuevo
        nuevo();
    });
    $('#btnI').click(function () { // Botón Nuevo
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            Modal("La seccion que redirecciona este botón aun no esta en total funcionamiento. Estamos trabajando en ella.", "Sección en construción.");
            btn.button('reset')
        });
    });
    function nuevo() {
        $("#txtId").val("");
        $('#formulario').hide();
        $('#txtId').focus();
        $('#txtHoraI').val("");
        $('#txtHoraF').val("");
        $("#botones").hide();
        $("#txtId").removeAttr('disabled');
        $('#btnR').show();
        $('#btnM').show();
        $('#btnE').show();
        $('#btnL').show();
        Alerta("Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "info");

    }

    $('#btnR').click(function () { // Botón Registrar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            ValidarHoras();
            if (bandera == 1) {
                jsonData = "{'dto':" + JSON.stringify(getDatosGJ()) + ",'dtob':" + JSON.stringify(getBitacora("JORNADAS", "REGISTRAR", "NINGUNA")) + "}"; //Registro de bitacora

                $.ajax({

                    type: "POST",
                    url: "/WS/jornadas.asmx/r_jornada",
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    success: function (result) {
                        if (result.d == null) {
                            Modal("Error al intentar realizar esta acción.", "  Existe un problema de consistencia con la base de datos del servidor. Contactese con el administrador.");
                        }
                        else {
                            Modal(JSON.stringify(result.d), "Registro de jornadas");
                            Alerta("Registro realizado de forma correcta", "success");

                            nuevo();
                        }
                    },
                    error: function (result) {
                        Modal("Upss en el sistema: Error al intentar realizar esta acción.", "Error de servidor");
                    }
                });
            }
        btn.button('reset')
        });
    });
    var getDatosGJ = function () {
        var dto = {};
        dto.id = $("#txtId").val();
        dto.horaI = $("#txtHoraI").val();
        dto.horaF = $("#txtHoraF").val();
        return dto;
    };
    function ValidarHoras() {
        var HI = new Array();
        var HF = new Array();
        HI = $('#txtHoraI').val().split(":");
        HF = $('#txtHoraF').val().split(":");

        var HORA_HI = (parseInt(HI[1]) + parseInt((HI[0] * 60)));
        var HORA_HF = (parseInt(HF[1]) + parseInt((HF[0] * 60)));

        if (HI != '' && HF != '') {
            if (HORA_HF > HORA_HI) {  // VALIDACION ENTRE HORAS
                bandera = 1;
            }
            else { bandera = 0; $('#txtHoraF').focus(); Alerta("Error: La hora final debe ser mayor que la inicial. Ajuste por favor.", "danger"); }
        } else { bandera = 0; $('#txtHoraI').focus(); Alerta("Error: las horas que esta ingresando no son correctas.", "danger"); }
    }


    $('#btnM').click(function () { // Botón modificar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            ValidarHoras();
            if (bandera == 1) {
                jsonData = "{'dto':" + JSON.stringify(getDatosGJ()) + ",'dtob':" + JSON.stringify(getBitacora("JORNADAS", "MODIFICAR", "NINGUNA")) + "}"; //Registro de bitacora
                $.ajax({
                    type: "POST",
                    url: "/WS/jornadas.asmx/m_jornada",
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    success: function (result) {
                        if (result.d == null) {
                            Modal("Error al intentar realizar esta acción.", " Servidor no disponible.");
                        }
                        else {
                            Modal(JSON.stringify(result.d), "Modificación de jornadas");
                            Alerta("Modificación realizado de forma correcta", "success");
                            nuevo();
                        }
                    },
                    error: function (result) {
                        Modal("Upss en el sistema: Error al intentar realizar esta acción.", "Error de servidor");
                    }
                });
            }
            btn.button('reset')
        });
    });


    $('#btnE').click(function () { // Botón Eliminar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            jsonData = "{'dto':" + JSON.stringify(getDatosG()) + ",'dtob':" + JSON.stringify(getBitacora("JORNADAS", "ELIMINAR", "NINGUNA")) + "}"; //Registro de bitacora
        $.ajax({
            type: "POST",
            url: "/WS/jornadas.asmx/e_jornada",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Error al intentar realizar esta acción.", "Verifique que la información que esta enviando. ");
                }
                else {
                    Modal(JSON.stringify(result.d), "Eliminación de jornadas");
                    nuevo();
                }
            },
            error: function (result) {
                Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error de servidor");
            }
        });
        btn.button('reset')
        });

    });

    $('#btnL').click(function () { // Botón Listar todos
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            $(document.body).animate({ scrollTop: 300 }, 300);
          jsonData = "{'dtob':" + JSON.stringify(getBitacora("JORNADAS", "LISTAR TODOS", "NINGUNA")) + "}"; //Registro de bitacora
        $.ajax({
            type: "POST",
            url: "/WS/jornadas.asmx/c_jornadass",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                $('#grilla').html("");
                if (result.d == null) {
                    $('#formulario').hide();
                    Modal("Error al intentar realizar esta acción.", "  Existe un problema de consistencia con la base de datos del sistema. Contactese con el administrador.");
                }
                else {
                    P = result.d; //OCULTAMOS LOS BOTONES RESPECTIVOS
                    conta = 0;
                    $('#formulario').show();
                    titleGrilla();
                    $.each(P, function (i, item) {
                        AddItemGrilla(item);
                    })
                }
            },
            error: function (result) {
                Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error de servidor");
            }

        });
        btn.button('reset')
        });

    });

    //--------------------------------------------------------------------------------------------------
    function titleGrilla() { // TITULO DE LA GRILLA
        $("#grilla").val("");
        var newtitle = "<tr>";
        newtitle += '<th class="col-sm-1 text-center">#</th>';
        newtitle += '<th class="col-sm-3 text-center">Jornadas</th>';
        newtitle += '<th class="col-sm-3 text-center">Hora de inicio</th>';
        newtitle += '<th class="col-sm-3 text-center">Hora de finalización</th>';
        newtitle += "</tr>";
        $("#grilla").append(newtitle);
    };
    var AddItemGrilla = function (item) { // CONTENIDO DE LA GRILLA
        conta++;
        array.push(item);
        var nuevaCol = "<tr>";
        nuevaCol += "<td>" + conta + "</td>";
        nuevaCol += "<td>" + item.id + "</td>";
        nuevaCol += "<td>" + item.horaI + "</td>";
        nuevaCol += "<td>" + item.horaF + "</td>";
        nuevaCol += "</tr>";
        $("#grilla").append(nuevaCol);
    };
    //--------------------------------------------------------------------------------------------------
//});
