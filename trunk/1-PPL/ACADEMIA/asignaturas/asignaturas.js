
//$(document).ready(function () {
    WinMove();
    var conta;
    var P = {};
    var jsonData;
  
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
            cargarAreas();
            nuevo();
            $("#formPPAL").show();
            $("#imgload").hide();
        });
    }
    var array = new Array(); // variable para las grillas en los formularios
    var getDatos = function () {
        var dto = {};
        dto.id = $("#txtId").val();
        dto.nombre = $("#txtNombre").val();
        dto.horas = $("#txtHoras").val();
        dto.area = $("#txtArea").val();
        return dto;
    };
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

    function cargarAreas() {
        $.ajax({ // Carga de areas
            type: "POST",
            url: "/WS/areas.asmx/c_areas",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Error de congruenciá: No existen areas asignadas. ");
                    redireccionar();
                }
                else {
                    $("#txtArea").html("");
                    $("#txtArea").html("");
                    P = result.d
                    $.each(P, function (i, item) {
                        $("#txtArea").append("<option value=" + item.id + ">" + item.id + "</option>");
                    })
                }
            },
            error: function (result) {
                Modal("Server.", "Error: No disponible");
                redireccionar();
            }
        });
    }
   
    $('#txtHoras').keypress(function () {
        if ($('#txtHoras').val() < 1 || $('#txtHoras').val() > 1) {
            return false;
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
    $('#btnI').click(function () { // Botón Nuevo
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            Modal("La seccion que redirecciona este botón aun no esta en total funcionamiento. Estamos trabajando en ella.", "Sección en construción.");
            btn.button('reset')
        });
    });
    function Gestionar() {
        if ($('#txtId').val() == '') {
            Alerta("Error: Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
            $('#txtId').focus();
            $('#formulario').hide();
        } else {
            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
            $('#formulario').show();
            $('#txtNombre').focus();

            jsonData = "{'dto':" + JSON.stringify(getDatosG()) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/asignaturas.asmx/c_asignatura",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    $("#botones").show();
                    if (result.d == null) {
                        $("#btnM").hide();
                        $("#btnE").hide();
                        $("#txtNombre").val("");
                        $("#txtHoras").val("");
                        $("#txtId").attr('disabled', 'disabled');
                        $("#btnR").show();
                    }
                    else {
                        P = result.d;
                        $("#btnR").hide();
                        $("#btnM").show();
                        $("#btnE").show();
                        $("#txtNombre").val(P.nombre);
                        $("#txtHoras").val(P.horas);
                        $("#txtArea").val(P.area);
                        $("#txtId").attr('disabled', 'disabled');
                    }
                },
                error: function (result) {
                    //Modal("UPSS ERROR DE SISTEMA: " + JSON.stringify(result), "Error de sistema");
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
            $("#txtNombre").val("");
            $("#txtHoras").val("");
            $("#txtArea").val("NINGUNA");
            $('#btnR').show();
            $('#btnM').show();
            $('#btnE').show();
            $('#btnL').show();
            $('#formulario1').hide();
            $('#formulario').hide();
            $('#txtId').focus();
            $("#txtId").removeAttr('disabled');
            $("#botones").hide();
            Alerta("Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "info");
        }
        $('#btnR').click(function () { // Botón Registrar
            var btn = $(this)
            btn.button('loading')
            $.ajax(".....").always(function () {
                 jsonData = "{'dto':" + JSON.stringify(getDatos()) + ",'dtob':" + JSON.stringify(getBitacora("ASIGNATURAS", "REGISTRAR", "NINGUNA")) + "}"; //Registro de bitacora
     
            $.ajax({
                type: "POST",
                url: "/WS/asignaturas.asmx/r_asignatura",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        Modal("Error al intentar realizar esta acción.", "  Existe un problema de consistencia con la base de datos del sistema. Contactese con el administrador.");
                    }
                    else {
                        Modal(JSON.stringify(result.d), "Registro de asignaturas.");
                        nuevo();
                    }
                },
                error: function (result) {
                   Modal("Upss en el sistema: Error al intentar realizar esta acción." , "Error de servidor");
                }
            });
            btn.button('reset')
            });

        });


        $('#btnM').click(function () { // Botón Modificar
            var btn = $(this)
            btn.button('loading')
            $.ajax(".....").always(function () {
                 jsonData = "{'dtonew':" + JSON.stringify(getDatos()) + ",'dto':" + JSON.stringify(getDatosG()) + ",'dtob':" + JSON.stringify(getBitacora("ASIGNATURAS", "MODIFICAR", "NINGUNA")) + "}"; //Registro de bitacora
            $.ajax({
                type: "POST",
                url: "/WS/asignaturas.asmx/m_asignatura",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        Modal("Error al intentar realizar esta acción.", "Verifique que la información que esta enviando sea la correcta o puede ser que la asignatura no se encuentra registrado en el sistema. ");
                    }
                    else {
                        Modal(JSON.stringify(result.d), "Modificación de la asignatura.");
                        nuevo();
                    }
                },
                error: function (result) {
                    Modal("Upss en el sistema: Error al intentar realizar esta acción." , "Error de servidor");
                }
            });
            btn.button('reset')
            });

        });

        $('#btnE').click(function () { // Botón Eliminar
            var btn = $(this)
            btn.button('loading')
            $.ajax(".....").always(function () {
            
            jsonData = "{'dto':" + JSON.stringify(getDatosG()) + ",'dtob':" + JSON.stringify(getBitacora("ASIGNATURAS", "ELIMINAR", "NINGUNA")) + "}"; //Registro de bitacora
            $.ajax({
                type: "POST",
                url: "/WS/asignaturas.asmx/e_asignatura",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        Modal("Error al intentar realizar esta acción.", "Verifique que la información que esta enviando sea la correcto o puede ser que el grado no se encuentra registrado en el sistema. ");
                    }
                    else {
                        Modal(JSON.stringify(result.d), "Eliminación de la asignatura.");
                        nuevo();
                    }
                },
                error: function (result) {
                    Modal("Upss en el sistema: Error al intentar realizar esta acción.", "Error de servidor");
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
                 jsonData = "{'dtob':" + JSON.stringify(getBitacora("ASIGNATURAS", "LISTAR TODOS", "NINGUNA")) + "}"; //Registro de bitacora

            $.ajax({
                type: "POST",
                url: "/WS/asignaturas.asmx/c_asignaturass",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                
                    $('#grilla').html("");
                    if (result.d == null) {
                        $('#formulario1').hide();
                        Modal("Error al intentar realizar esta acción.", "  Existe un problema de consistencia con la base de datos del sistema. Contactese con el administrador.");
                    }
                    else {
                        P = result.d; //OCULTAMOS LOS BOTONES RESPECTIVOS
                        conta = 0;
                        titleGrilla();
                        $('#formulario1').show();
                        $.each(P, function (i, item) {
                            AddItemGrilla(item);
                        });
                        GenerarPdf()
                    }
                },
                error: function (result) {
                    Modal("Upss en el sistema: Error al intentar realizar esta acción." , "Error de servidor");
                }

            });
            btn.button('reset')
            });
        });

        //}
        //--------------------------------------------------------------------------------------------------
        function titleGrilla() { // TITULO DE LA GRILLA
            $("#grilla").val("");
            var newtitle = "<tr class='text-center'>";
            newtitle += '<th class="col-sm-1">#</th>';
            newtitle += '<th class="col-sm-3">Identificación</th>';
            newtitle += '<th class="col-sm-3">Nombre</th>';
            newtitle += '<th class="col-sm-4">Horas</th>';
            newtitle += '<th class="col-sm-2">Area</th>';
            newtitle += "</tr>";
            $("#grilla").append(newtitle);
        };
        var AddItemGrilla = function (item) { // CONTENIDO DE LA GRILLA
            conta++;
            array.push(item);
            var nuevaCol = "<tr>";
            nuevaCol += "<td>" + conta + "</td>";
            nuevaCol += "<td>" + item.id + "</td>";
            nuevaCol += "<td>" + item.nombre + "</td>";
            nuevaCol += "<td>" + item.horas + "</td>";
            nuevaCol += "<td>" + item.area + "</td>";
            nuevaCol += "</tr>";
            $("#grilla").append(nuevaCol);
        };
    //--------------------------------------------------------------------------------------------------
//});










