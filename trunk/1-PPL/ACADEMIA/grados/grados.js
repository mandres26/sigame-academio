/// <reference path="../reportes/reportViewers/repGrados.aspx" />

//$(document).ready(function () {
    WinMove();
    var idOld;
    var conta;
    var jsonData;
    var P = {};

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
    CargarDatosIniciales();
    function CargarDatosIniciales() {
        $("#formPPAL").hide();
        $("#imgload").show();
        $.ajax("...").always(function () {
            nuevo();
            $("#formPPAL").show();
            $("#imgload").hide();
        });
    }
    var array = new Array(); // variable para las grillas en los formularios

    var getDatos = function () {
        var dto = {};
        dto.id_grado = $("#txtId").val();
        dto.nom_grado = $("#txtNombre").val();
        return dto;
    };
    cargarGrados();

    function cargarGrados() {
        var C;
        $("#txtId").html("");
        C += '<option value="SELECCIONE">SELECCIONE</option>';
        C += '<option value="T">T</option>';
        C += '<option value="J">J</option>';
        C += '<option value="P">P</option>';
        C += '<option value="1">1</option>';
        C += '<option value="2">2</option>';
        C += '<option value="3">3</option>';
        C += '<option value="4">4</option>';
        C += '<option value="5">5</option>';
        C += '<option value="6">6</option>';
        C += '<option value="7">7</option>';
        C += '<option value="8">8</option>';
        C += '<option value="9">9</option>';
        C += '<option value="10">10</option>';
        C += '<option value="11">11</option>';
        $("#txtId").append(C);
    }


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
    $('#txtId').keypress(function () {
        if ($('#txtId').val() < 1 || $('#txtId').val() > 1) {
            return false;
        }
    });
    function Gestionar() {
        if ($('#txtId').val() == 'SELECCIONE') {
            Alerta("Error: Escoja una identificación del grado y haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
            $('#txtId').focus();
        } else {
            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
            jsonData = "{'dto':" + JSON.stringify(getDatosG()) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/grados.asmx/c_grado",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    $("#botones").show();
                    if (result.d == null) {
                        $('#btnR').show();
                        $('#btnE').hide();
                        $("#txtNombre").val("");
                        $("#txtNombre").removeAttr('disabled');
                        $("#txtId").attr('disabled', 'disabled');
                    }
                    else {
                        P = result.d; //OCULTAMOS LOS BOTONES RESPECTIVOS
                        $('#btnR').hide();
                        $('#btnE').show();
                        $("#txtNombre").val(P.nom_grado);
                        $("#txtId").attr('disabled', 'disabled');
                        $("#txtNombre").focus();
                    }
                },
                error: function (result) {
                    //Modal("UPSS ERROR DE SISTEMA: " + JSON.stringify(result), "Error de sistema");
                }
            });
        }
    }

    $('#btnG').click(function () { // Botón gestionar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            Gestionar();
            btn.button('reset')
        });

    });
    //---------------------------------- BOTONES DE ACCIONES ----------------------------
    $('#btnN').click(function () { // Botón Nuevo
        nuevo();
    });
    function nuevo() {
        Alerta("Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "info");
        $("#txtId").val("");
        $("#txtNombre").val("");
        $('#btnR').show();
        $('#btnE').show();
        $('#btnL').show();
        $("#txtId").val("SELECCIONE");
        $('#botones').hide();
        $('#formulario1').hide();
        $("#txtNombre").attr('disabled', 'disabled');
        $("#txtId").removeAttr('disabled');
        $('#txtId').focus();
    }

    $('#btnR').click(function () { // Botón Registrar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            jsonData = "{'dto':" + JSON.stringify(getDatos()) + ",'dtob':" + JSON.stringify(getBitacora("GRADOS", "REGISTRAR", "NINGUNA")) + "}"; //Registro de bitacora
            $.ajax({
                type: "POST",
                url: "/WS/grados.asmx/r_grado",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        Modal("Error al intentar realizar esta acción.", "  Existe un problema de consistencia con la base de datos del sistema. Contactese con el administrador.");
                    }
                    else {
                        Modal(JSON.stringify(result.d), "Registro de grados.");
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



    $('#btnE').click(function () { // Botón Eliminar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            jsonData = "{'dto':" + JSON.stringify(getDatosG()) + ",'dtob':" + JSON.stringify(getBitacora("GRADOS", "ELIMINAR", "NINGUNA")) + "}"; //Registro de bitacora
            $.ajax({
                type: "POST",
                url: "/WS/grados.asmx/e_grado",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        Modal("Error al intentar realizar esta acción.", "Verifique que la información que esta enviando sea la correcto o puede ser que el grado no se encuentra registrado en el sistema. ");
                    }
                    else {
                        Modal(JSON.stringify(result.d), "Eliminación de grados.");
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
            $(document.body).animate({ scrollTop: 400 }, 300);
            jsonData = "{'dtob':" + JSON.stringify(getBitacora("GRADOS", "LISTAR TODOS", "NINGUNA")) + "}"; //Registro de bitacora
            $.ajax({
                type: "POST",
                url: "/WS/grados.asmx/c_gradoss",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    $('#grilla').html("");
                    if (result.d == null) {
                        $('#formulario1').hide();
                        Modal("Error al intentar realizar esta acción.", "No existen grados registrados en el sistema. Contactese con el administrador.");
                    }
                    else {
                        P = result.d; //OCULTAMOS LOS BOTONES RESPECTIVOS
                        conta = 0;
                        titleGrilla();
                        $('#formulario1').show();
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
        var newtitle = "<tr class='text-center'>";
        newtitle += '<th class="col-sm-1">#</th>';
        newtitle += '<th class="col-sm-3">Identificación</th>';
        newtitle += '<th class="col-sm-3">Nombre</th>';
        newtitle += "</tr>";
        $("#grilla").append(newtitle);
    };
    var AddItemGrilla = function (item) { // CONTENIDO DE LA GRILLA
        conta++;
        array.push(item);
        var nuevaCol = "<tr>";
        nuevaCol += "<td>" + conta + "</td>";
        nuevaCol += "<td>" + item.id_grado + "</td>";
        nuevaCol += "<td>" + item.nom_grado + "</td>";
        nuevaCol += "</tr>";
        $("#grilla").append(nuevaCol);
    };
    //--------------------------------------------------------------------------------------------------
//});
