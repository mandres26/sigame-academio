
//$(document).ready(function () {
    WinMove();
    var filtro;
    var conta;
    var Pos;
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
            cargarEquivalencias();
            FiltrosDisponibles();
            nuevo();
            $("#formPPAL").show();
            $("#imgload").hide();
        });
    }
    var array = new Array();
    function FiltrosDisponibles() {
        var A;
        $("#comboFiltros").html("");
        A += '<option value="0">POR X GRUPOS/PERIODO</option>';
        A += '<option value="1">POR X GRUPOS/PERIODO/ASIGNATURA</option>';
        $("#comboFiltros").append(A);
    }
    $("#comboFiltros").click(function () {
        $("#botones").hide();
    });
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
    var getDatosAsig = function () {
        var dto = {};
        dto.id = $("#comboIdAsig").val();
        return dto;
    };


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
                Modal("Servidor no disponible", "E1:2 al cargarPeriodos");
                redireccionar();
            }
        });
    }

    $('#btnG').click(function () { // Botón gestionar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            filtro = $("#comboFiltros").val();
            if (filtro == 0) {
                $('#f-grupo').show();
                $('#f-asignatura').hide();
                $('#botones').show();
                $('#f-equi').hide();
                $('#comboGrupo').focus();
            }
            if (filtro == 1) {
                $('#f-grupo').show();
                $('#f-asignatura').show();
                $('#botones').show();
                $('#f-equi').hide();
                $('#comboIdAsig').focus();
            }
            btn.button('reset')
        });
    });

    $('#btnE').click(function () { // Botón EQUIVALENCIAS
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            $('#f-grupo').show();
            $('#f-asignatura').show();
            $('#botones').show();
            $('#f-equi').show();
            $('#comboEqui').focus();
            filtro = 2;
            btn.button('reset')
        });
    });

    var getDatosGrupo = function () {
        var dto = {};
        dto.id_grupo = $("#comboIdgrupo").val();
        dto.id_periodo = $("#comboPeriodos").val();
        dto.id_asignatura = $("#comboIdAsig").val();
        dto.equivalencia = $("#comboEqui").val();
        return dto;
    };
    function cargarEquivalencias() {
        var A;
        $("#comboEqui").html("");
        A += '<option value="DS">(DS) DESEMPEÑO SUPERIOR </option>';
        A += '<option value="DA">(DA) DESEMPEÑO ALTO     </option>';
        A += '<option value="DB">(DB) DESEMPEÑO BASICO   </option>';
        A += '<option value="B">(B) DESEMPEÑO BAJO     </option>';
        $("#comboEqui").append(A);
    }

    $('#btnL').click(function () { // Botón gestionar el listado
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            $(document.body).animate({ scrollTop: 450 }, 300);
            if (filtro == 0) {
                filtrarXIdGrupoXPeriodo();
            } else if (filtro == 1) {
                filtrarXIdGrupoXPeriodoXAsig();
            }
            else if (filtro == 2) {
                filtrarXIdGrupoXPeriodoXAsigXEqui();
            }
           
            
            btn.button('reset')
        });
    });

    function filtrarXIdGrupoXPeriodo() {
        if ($('#comboIdgrupo').val() == '') {
            Alerta("Error: Escoja una identificación de un grupo y luego haga clic en el botón <strong> Listar todos </strong>para continuar.", "danger");
            $('#comboIdgrupo').focus();
        } else {
            jsonData = "{'dto':" + JSON.stringify(getDatosGrupo()) +
                      ",'dtob':" + JSON.stringify(getBitacora("NOTAS", "LISTAR", "FILTRO POR GRUPO Y PERIODO")) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/notas.asmx/c_notasXGrupoXIdP",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    $("#f-grilla").show();
                    $('#grilla').html("");

                    conta = 0;
                    if (result.d == null) {
                        Modal("No existen estudiantes para filtrar", " Personal vacio");
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
    function filtrarXIdGrupoXPeriodoXAsig() {
        if ($('#comboIdAsig').val() == '') {
            Alerta("Error: Escoja una identificación de asignatura y luego haga clic en el botón <strong> Listar todos </strong>para continuar.", "danger");
            $('#comboIdAsig').focus();
        } else {
            jsonData = "{'dto':" + JSON.stringify(getDatosGrupo()) +
                      ",'dtob':" + JSON.stringify(getBitacora("NOTAS", "LISTAR", "FILTRO POR GRUPO, PERIODO Y ASIGNATURA")) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/notas.asmx/c_notasXGrupoXIdPXAsig",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    $("#f-grilla").show();
                    $('#grilla').html("");
                    conta = 0;
                    if (result.d == null) {
                        Modal("No existen estudiantes para filtrar", " Personal vacio");
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
    function filtrarXIdGrupoXPeriodoXAsigXEqui() {
        if ($('#comboEqui').val() == '') {
            Alerta("Error: Escoja una identificación de asignatura y luego haga clic en el botón <strong> Listar todos </strong>para continuar.", "danger");
            $('#comboEqui').focus();
        } else {
            jsonData = "{'dto':" + JSON.stringify(getDatosGrupo()) +
                      ",'dtob':" + JSON.stringify(getBitacora("NOTAS", "LISTAR", "FILTRO POR GRUPO, PERIODO, ASIGNATURA Y EQUIVALENCIA")) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/notas.asmx/c_notasXGrupoXIdPXAsigXEqui",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    $("#f-grilla").show();
                    $('#grilla').html("");
                    conta = 0;
                    if (result.d == null) {
                        Modal("No existen estudiantes para filtrar", " Personal vacio");
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
        newtitle += '<th class="col-sm-1">IdEst </th>';
        newtitle += '<th class="col-sm-2">Apellidos</th>';
        newtitle += '<th class="col-sm-2">Nombres</th>';
        newtitle += '<th class="col-sm-1">IdLogro</th>';
        newtitle += '<th class="col-sm-2">Asignatura</th>';
        newtitle += '<th class="col-sm-1">Nota</th>';
        newtitle += '<th class="col-sm-1">Equivale</th>';
        newtitle += "</tr>";
        $("#grilla").append(newtitle);
    };
    var AddItemGrilla = function (item) { // CONTENIDO DE LA GRILLA
        conta++;
        array.push(item);
        var nuevaCol = "<tr>";
        nuevaCol += "<td>" + item.id_periodo + "</td>";
        nuevaCol += "<td>" + item.id_estudiante + "</td>";
        nuevaCol += "<td>" + item.apellidos + "</td>";
        nuevaCol += "<td>" + item.nombres + "</td>";
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
