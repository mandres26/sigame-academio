
//$(document).ready(function () {
    WinMove();
    var conta;
    var Pos;
    var filtro;
    var buscarEst;
    var P = {};
   

    validar_pagina();
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
            cargarGrupos();
            cargarAsignaturas();
            cargarPeriodos();
            FiltrosDisponibles();
            nuevo();
            $("#formPPAL").show();
            $("#imgload").hide();
        });
    }

    var array = new Array(); 
    var jsonData;
    $("#comboIdAsig").change(function () {
        jsonData = "{'dto':" + JSON.stringify(getDatosAsig()) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/asignaturas.asmx/c_asignatura",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                P = result.d;
                $("#txtIdNomAsi").val(P.nombre);
                $("#txtIdHoras").val(P.horas);
            },
            error: function (result) {
            }
        });
    });
    function FiltrosDisponibles() {
        var A;
        $("#comboFiltros").html("");
        A += '<option value="0">POR X GRUPOS/ESTUDIANTE/PERIODO</option>';
        A += '<option value="1">POR X GRUPOS/ESTUDIANTE/ASIGNATURA</option>';
        $("#comboFiltros").append(A);
    }

    $('#btnG').click(function () { // Botón gestionar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            filtro = $("#comboFiltros").val();
            if (filtro == 0) {
                $('#f-grupo').show();
                $('#f-asignatura').hide();
                $('#f-periodo').show();
                $('#botones').show();
                $('#txtId').focus();
            }
            if (filtro == 1) {
                $('#f-grupo').show();
                $('#f-asignatura').show();
                $('#f-periodo').hide();
                $('#botones').show();
                $('#comboIdAsig').focus();
            }
            btn.button('reset')
        });
    });

    
    var getDatosAsig = function () {
        var dto = {};
        dto.id = $("#comboIdAsig").val();
        return dto;
    };
    var getDatosGrupo = function () {
        var dto = {};
        dto.id = $("#comboIdgrupo").val();
        return dto;
    };
    $('#txtId').keyup(function (e) {
        if (e.keyCode == 13) {
            var btn = $('#btnL')
            btn.button('loading')
            $.ajax(".....").always(function () {
                $(document.body).animate({ scrollTop: 400 }, 300);
                verificarEst();
                btn.button('reset')
            });
        }
    });
    $("#comboIdgrupo").change(function () {
        jsonData = "{'dto':" + JSON.stringify(getDatosGrupo()) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/grupos.asmx/c_grupo",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                P = result.d;
                $("#txtIdGrado").val(P.id_grado);
                $("#txtIdAula").val(P.id_aula);
                $("#txtIdAno").val(P.año);
                $("#txtIdJornada").val(P.jornada);
            },
            error: function (result) {
            }
        });
    });
    function cargarAsignaturas() {
        $.ajax({ // Carga de asignaturas
            type: "POST",
            url: "/WS/asignaturas.asmx/c_asignaturas",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Error de congruenciá: No existen asignaturas en el sistema. ");
                    redireccionar();
                }
                else {
                    P = result.d;
                    conta = 0;
                    $("#comboIdAsig").html("");
                    $.each(P, function (i, item) {
                        $("#comboIdAsig").append("<option value=" + item.id + ">" + item.id + "</option>");
                        if (conta == 0) {
                            $("#txtIdNomAsi").val(item.nombre);
                            $("#txtIdHoras").val(item.horas);
                        }
                        conta++;
                    })
                }
            },
            error: function (result) {
                Modal("Server: Error al cargar las asignaturas.", "Error de sistema");
                redireccionar();
            }
        });
    }
    function cargarGrupos() {
        $.ajax({
            type: "POST",
            url: "/WS/grupos.asmx/c_grupos",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Error de congruencia: No existen grupos asignados  para gestionar las personas en el sistema. ");
                }
                else {
                    P = result.d;
                    $("#comboIdgrupo").html("");
                    $.each(P, function (i, item) {
                        $("#comboIdgrupo").append("<option value=" + item.id_grupo + ">" + item.id_grupo + "</option>");
                    })
                }
            },
            error: function (result) {
                Modal("Server: Error al cargar los grupos.", "Error de servidor");
            }
        });
    }
    function cargarPeriodos() {
        $.ajax({ // Carga de periodos
            type: "POST",
            url: "/WS/periodos.asmx/c_periodos",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    $("#comboPeriodos").attr('disabled', 'disabled');
                    Modal("Error de congruenciá: No existen periodos asignados. ");
                    redireccionar();

                }
                else {
                    P = result.d;
                    $("#comboPeriodos").html("");
                    $.each(P, function (i, item) {
                        $("#comboPeriodos").append("<option value=" + item.id + ">" + item.id + "</option>");
                    })
                }
            },
            error: function (result) {
                Modal("Servidor no disponible", "E1:2 al cargar los periodos");
                redireccionar();
            }
        });
    }

    var getDatosIndividual = function () {
        var dto = {};
        dto.id_grupo = $("#comboIdgrupo").val();
        dto.id_periodo = $("#comboPeriodos").val();
        dto.id_asignatura = $("#comboIdAsig").val();
        dto.id_estudiante = $("#txtId").val();
        return dto;
    };
    function verificarEst() { // Verificamos que sea un estudiante
        buscarEst = 0;
        if ($('#txtId').val() == '') {
            Alerta("Error: Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
            $('#txtId').focus();
        }
        else if (($('#txtId').val()).length < 8) {
            Alerta("Error: La identificación debe tener <strong> 8 caracteres</strong>como minimo .", "danger");
            $('#txtId').focus();
            $('#f-grilla').hide();
        }
        else {

            
            jsonData = "{'dto':" + JSON.stringify(getDatosG()) + "}";

            $.ajax({
                type: "POST",
                url: "/WS/personas.asmx/c_persona",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        $("#f-grilla").hide();
                        Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no se encuentra registrada </strong> en la base de datos del sistema", "Error al intentar realizar esta acción");
                        $("#txtId").focus();
                        buscarEst = 0;
                    }
                    else {

                        P = result.d;
                        if (P.rol != "ESTUDIANTE") {
                            $("#f-grilla").hide();
                            $("#txtId").focus();
                            buscarEst = 0;
                            Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no le pertenece a un estudiante </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                        } else if (P.rol == "ESTUDIANTE") {
                            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
                            $("#f-grilla").show();
                            buscarEst = 1;
                        }
                    }
                    if (buscarEst == 1) {
                        if (filtro == 0) {
                            filtrarXGrupoXIdPXIdEst();
                        } else if (filtro == 1) {
                            filtrarXGrupoXIdAsigXIdEst();
                        }
                    } else {
                        nuevo();
                    }

                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                }
            });
        }
    }
    $("#comboFiltros").click(function () {
        $("#botones").hide();
    });
    $("#btnL").click(function () { 
            var btn = $(this)
            btn.button('loading')
            $.ajax(".....").always(function () {
                $(document.body).animate({ scrollTop: 400 }, 300);
                verificarEst();
                btn.button('reset')
            });
    });

    function filtrarXGrupoXIdPXIdEst() {
        if ($('#comboIdgrupo').val() == '') {
            Alerta("Error: Escoja una identificación de un grupo y luego haga clic en el botón <strong> Listar </strong>para continuar.", "danger");
            $('#comboIdgrupo').focus();
        } else {
            jsonData = "{'dto':" + JSON.stringify(getDatosIndividual()) +
                      ",'dtob':" + JSON.stringify(getBitacora("NOTAS", "LISTAR", "FILTRO POR GRUPO Y PERIODO /INDIVIDUALMENTE")) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/notas.asmx/c_notasXGrupoXIdPXIdEst",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    $("#f-grilla").show();
                    $('#grilla').html("");
                    $('#grilla').show();

                    conta = 0;
                    if (result.d == null) {
                        Modal("El estudiante no contiene notas para este tipo de filtro. ", " No hay notas");
                        $("#f-grilla").hide();
                    }
                    else {
                        Alerta("Filtro del estudiante por grupo realizado de forma exitosa", "success");
                        P = result.d;
                        titleGrilla();
                        $.each(P, function (i, item) {
                            AddItemGrilla(item);
                        })
                    }
                },
                error: function (result) {
                    Modal("Server: Error de servidor.", "Error de servidor");
                }
            });
        }

    }
    function filtrarXGrupoXIdAsigXIdEst() {
        if ($('#comboIdAsig').val() == '') {
            Alerta("Error: Escoja una identificación de asignatura y luego haga clic en el botón <strong> Listar </strong>para continuar.", "danger");
            $('#comboIdAsig').focus();
        } else {

            jsonData = "{'dto':" + JSON.stringify(getDatosIndividual()) +
                      ",'dtob':" + JSON.stringify(getBitacora("NOTAS", "LISTAR", "FILTRO POR GRUPO Y ASIGNATURA /INDIVIDUALMENTE")) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/notas.asmx/c_notasXGrupoXIdAsigXIdEst",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    $("#f-grilla").show();
                    $('#grilla').html("");
                    $('#grilla').show();
                    conta = 0;
                    if (result.d == null) {
                        Modal("El estudiante no contiene notas para este tipo de filtro. ", " No hay notas");
                        $("#f-grilla").hide();
                    }
                    else {
                        Alerta("Filtro del estudiantes por grupo realizado de forma exitosa", "success");
                        P = result.d;
                        titleGrilla();
                        $.each(P, function (i, item) {
                            AddItemGrilla(item);
                        })
                    }
                },
                error: function (result) {
                    Modal("Server: Error de servidor.", "Error de servidor");
                }
            });
        }

    }
 
    $('#btnN').click(function () { // Botón nuevo
        nuevo();
    });
    function nuevo() {
        Alerta("Escoja el tipo de <strong>filtro</strong> que desea aplicar a la consulta de estudiantes matriculados en el sistema y luego haga clic en el botón <strong>Listar</strong>.", "info");
        $('#f-grilla').hide();
        $('#f-grupo').hide();
        $('#f-asignatura').hide();
        $('#f-equi').hide();
        $('#botones').hide();
       
     
        pos = 0;
    }
    //grilla para  llistar
    function titleGrilla() {
        $("#grilla").val("");
        $("#Ltotal").text("");
        var newtitle = "<tr>";
        newtitle += '<th class="col-sm-1">IdPeriodo</th>';
        newtitle += '<th class="col-sm-1">Horas </th>';
        newtitle += '<th class="col-sm-2">IdLogro</th>';
        newtitle += '<th class="col-sm-2">Asignatura</th>';
        newtitle += '<th class="col-sm-1">Nota</th>';
        newtitle += '<th class="col-sm-2">Equivale</th>';
        newtitle += "</tr>";
        $("#grilla").append(newtitle);
    };
    var AddItemGrilla = function (item) { // CONTENIDO DE LA GRILLA
        conta++;
        array.push(item);
        var nuevaCol = "<tr>";
        nuevaCol += "<td>" + item.id_periodo + "</td>";
        nuevaCol += "<td>" + item.horas + "</td>";
        nuevaCol += "<td>" + item.id_logro + "</td>";
        nuevaCol += "<td>" + item.nom_asig + "</td>";
        nuevaCol += "<td>" + item.nota + "</td>";
        nuevaCol += "<td>" + item.equivalencia + "</td>";
        nuevaCol += "</tr>";
        $("#Ltotal").text("Total:" + conta);
        $("#grilla").append(nuevaCol);
    };

        //--------------------------------------------------------------------------------------------------

//});
