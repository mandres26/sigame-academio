
//$(document).ready(function () {
    WinMove();
    var jsonData;
    var conta;
    var P = {};
    nuevo();
    //---------------------------------- validamos que este logueado el usuario ----------------------------------------------
    validar_pagina();
    //---------------------------------- validamos que el rol del usuario pueda ingresar a esta pagina -----------------------
    DenegarAccesoToSuper();
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
            Alerta("Error: Digite un rol en el cuadro de texto y luego presione la tecla <strong> enter</strong> o haga clic en el botón <strong> gestionar </strong>para continuar.", "danger");
            $('#txtId').focus();
        } else {
            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
            jsonData = "{'dto':" + JSON.stringify(getDatosG()) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/roles.asmx/c_rol",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    $("#botones").show();
                    if (result.d == null) {
                        $('#btnR').show();
                        $('#btnE').hide();
                        $("#txtId").attr('disabled', 'disabled');
                    }
                    else if (result.d != null) {
                        P = result.d; //OCULTAMOS LOS BOTONES RESPECTIVOS
                        $('#btnR').hide();
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
    
    function nuevo() {
        $("#txtId").val("");
        $('#formulario').hide();
        $('#txtId').focus();
        $("#botones").hide();
        $("#txtId").removeAttr('disabled');
        $('#btnR').show();
        $('#btnE').show();
        $('#btnL').show();
        Alerta("Digite una identificación en el cuadro de texto y luego presione la tecla <strong> enter</strong> o haga clic en el botón <strong> gestionar </strong>para continuar.", "info");
    }
    $('#btnR').click(function () { // Botón Registrar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            jsonData = "{'dto':" + JSON.stringify(getDatosG()) + ",'dtob':" + JSON.stringify(getBitacora("ROLES", "REGISTRAR", "NINGUNA")) + "}"; //Registro de bitacora
            $.ajax({
                type: "POST",
                url: "/WS/roles.asmx/r_rol",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        Modal("Error al intentar realizar esta acción.", "  Existe un problema de consistencia con la base de datos del servidor. Contactese con el administrador.");
                    }
                    else {
                        Modal(JSON.stringify(result.d), "Registro de roles");
                        nuevo();
                    }
                },
                error: function (result) {
                    Modal("Upss en el sistema: Error al intentar realizar esta acción.", "Servidor no disponible");
                }
            });
            btn.button('reset')
        });

    });

    $('#btnE').click(function () { // Botón Eliminar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
           

            jsonData = "{'dto':" + JSON.stringify(getDatosG()) + ",'dtob':" + JSON.stringify(getBitacora("ROLES", "ELIMINAR", "NINGUNA")) + "}"; //Registro de bitacora
            $.ajax({
                type: "POST",
                url: "/WS/roles.asmx/e_rol",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        Modal("Error al intentar realizar esta acción.", "Verifique que la información que esta enviando sea la correcto o puede ser que el rol no se encuentra registrado en el sistema. ");
                    }
                    else {
                        Modal(JSON.stringify(result.d), "Eliminación de roles");
                        nuevo();
                    }
                },
                error: function (result) {
                    Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Servidor no disponible");
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

            jsonData = "{'dtob':" + JSON.stringify(getBitacora("ROLES", "LISTAR TODOS", "NINGUNA")) + "}"; //Registro de bitacora
            $.ajax({
                type: "POST",
                url: "/WS/roles.asmx/c_rolss",
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
                    Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Servidor no disponible");
                }
            });
            btn.button('reset')
        });

    });

    //--------------------------------------------------------------------------------------------------
    function titleGrilla() { // TITULO DE LA GRILLA
        $("#grilla").val("");
        var newtitle = "<tr>";
        newtitle += '<th class="col-sm-2 text-center">#</th>';
        newtitle += '<th class="col-sm-10 text-center">Roles</th>';
        newtitle += "</tr>";
        $("#grilla").append(newtitle);
    };
    var AddItemGrilla = function (item) { // CONTENIDO DE LA GRILLA
        conta++;
        array.push(item);
        var nuevaCol = "<tr>";
        nuevaCol += "<td>" + conta + "</td>";
        nuevaCol += "<td>" + item.id + "</td>";
        nuevaCol += "</tr>";
        $("#grilla").append(nuevaCol);
    };
    //--------------------------------------------------------------------------------------------------
//});
