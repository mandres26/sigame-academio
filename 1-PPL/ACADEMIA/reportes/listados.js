
//$(document).ready(function () {
    WinMove();
    var idOld;
    var conta;
    var Pos;
    var P = {};
    var filtro;
    var CodProfe;
    //---------------------------------- validamos que este logueado el usuario ----------------------------------------------
    validar_pagina();
    //---------------------------------- validamos que el rol del usuario pueda ingresar a esta pagina -----------------------
    if (localStorage.getItem('SeccionRol') == "PROFESOR" || localStorage.getItem('SeccionRol') == "ADMINISTRATIVO" || localStorage.getItem('SeccionRol') == "SUPER") {
        conta = 0;
    } else {
        DenegarAccesoToProfe();
    }//---------------------------------- --------------------------------------------------------------------------------------
    CargarDatosIniciales();
    function CargarDatosIniciales() {
        $("#formPPAL").hide();
        $("#imgload").show();
       
        $.ajax("...").always(function () {
            nuevo();
            FiltrosDisponibles();
            verificarSiEsProfesor();
         
            cargarPeriodos();
   
            $("#formPPAL").show();
            $("#imgload").hide();
        });
    }

    function verificarSiEsProfesor() {
        if (localStorage.getItem('SeccionRol') == "PROFESOR") {
           
            CodProfe = localStorage.getItem('SeccionId');
            cargarGruposDelProfe();
        } else {
            cargarGrupos();
        }
    }

    function cargarGruposDelProfe() {
        var dto = {};
        dto.id = CodProfe;
        //------------------- primero cargamos la grilla con los datos del estudiante------------------------------
        jsonData = "{'dto':" + JSON.stringify(dto) +"}";
        $.ajax({
            type: "POST",
            url: "/WS/matriculas.asmx/c_gruposDelProfe",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Usted no contiene ninguna matricula academica. ", " No se encuentra matriculado a ningún grupo.");
                    redireccionar();
                }
                else {
                    P = result.d;
                    $("#comboGrupo").html("");
                    $("#comboGrupo").val("");
                    $.each(P, function (i, item) {
                        var obj = item.id.split('-');
                        var ano = obj[0];
                        if (ano == AnoAcademico) {
                            $("#comboGrupo").append("<option value=" + item.id + ">" + item.id + "</option>");
                        }

                    })
                }
            },
            error: function (result) {
                Modal("Server: Error de servidor.", "Error de servidor");
            }
        });
    }


    function FiltrosDisponibles() {
        var A;
        $("#comboFiltros").html("");
        A += '<option value="0">REGISTRO DE DESEMPEÑO</option>';
        A += '<option value="1">REGISTRO DE ASISTENCIA </option>';
        $("#comboFiltros").append(A);
    }

    $('#btnG').click(function () { // Botón gestionar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            filtro = $("#comboFiltros").val();
            if (filtro == 0) {
                $('#f-grupo').show();
            }
            if (filtro == 1) {
                $('#f-grupo').show();
            }
            $('#botones').show();
            btn.button('reset')
        });
    });

    function cargarGrupos() {
        $.ajax({
            type: "POST",
            url: "/WS/grupos.asmx/c_grupos",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Error de congruencia: No existen grupos asignados para gestionar este tipo de reportes en el sistema. ");
                    redireccionar();
                }
                else {
                    P = result.d;
                    //alert(JSON.stringify(P));
                    $("#comboGrupo").html("");
                    $.each(P, function (i, item) {
                        var obj = item.id_grupo.split('-');
                        var ano = obj[0];
                        if (ano == AnoAcademico) {
                            $("#comboGrupo").append("<option value=" + item.id_grupo + ">" + item.id_grupo + "</option>");
                        }
                    })
                }
            },
            error: function (result) {
                Modal("Server: Error al cargar los grupos.", "Error de servidor");
                redireccionar();
            }
        });
    }


    var getDatosGrupo = function () {
        var dto = {};
        dto.id_grupo = $("#comboGrupo").val();
        return dto;
    };

   
    $('#btnGenerar').click(function () { // Botón gestionar el listado
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {

            if (filtro == 0) {
                ReporteDesempeno();
            } else if (filtro == 1) {
                ReporteAsistencia();
            }
            $('#btnI').focus();
            btn.button('reset')
        });
    });
    $("#comboFiltros").click(function () {
        $("#botones").hide();
    });
    $('#btnN').click(function () { // Botón nuevo
        nuevo();
    });
    function nuevo() {
        Alerta("Escoja el tipo de <strong>filtro</strong> que desea aplicar para generar el reporte de estudiantes matriculados en el sistema y luego haga clic en el botón <strong>Generar</strong>.", "info");
       $('#f-grupo').hide();
        $('#botones').hide();
        pos = 0;
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
                    $("#comboPeriodos").removeAttr('disabled');
                    $("#comboPeriodos").html("");
                    P = result.d;
                    $.each(P, function (i, item) {

                        var obj = item.id.split('-');
                        var ano = obj[0];
                        if (ano == AnoAcademico) {
                            $("#comboPeriodos").append("<option value=" + item.id + ">" + item.id + "</option>");
                        }

                    })
                }
            },
            error: function (result) {
                Modal("Servidor no disponible", "E1:2 al cargarPeriodos");
                redireccionar();
            }
        });
    }

    function ReporteDesempeno() {
            var dto = {};
            dto.id_grupo = $("#comboGrupo").val();
            dto.id_periodo = $("#comboPeriodos").val();

            jsonData = "{'dto':" + JSON.stringify(dto) + ",'dtob':" + JSON.stringify(getBitacora("REPORTES", "GENERAR", "NINGUNA")) + "}"; //Registro de bitacora
            $.ajax({
                type: "POST",
                url: "/WS/reportes.asmx/cg_listadoXGrupo",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        Modal("Ocurrio un error al intentar conectar al servidor. ", "Servidor no disponible");
                    }
                    else {
                        // Recorremos a ver como esta la badera de resultado.---------
                        P = result.d;
                        var rs;
                        $.each(P, function (i, item) {
                            rs = item.resultado;
                        })
                        if (rs == 'c_no') {
                            Modal("<strong> Este grupo no contiene estudiantes matriculados</strong>.",
                            "Problemas al cargar el grupo. Grupo vacio");
                        }
                        else if (rs == 'c_yes') {
                            Alerta("Listado generado de forma exitosa", "success");
                            window.open("/ACADEMIA/reportes/reports/listadodesempeno.aspx");
                        }
                    }


                },
                error: function (result) {
                    Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error del servidor");
                }
            });
           
    }
    function ReporteAsistencia() {
        var dto = {};
        dto.id_grupo = $("#comboGrupo").val();
        dto.id_periodo = $("#comboPeriodos").val();

        jsonData = "{'dto':" + JSON.stringify(dto) + ",'dtob':" + JSON.stringify(getBitacora("REPORTES", "GENERAR", "NINGUNA")) + "}"; //Registro de bitacora
        $.ajax({
            type: "POST",
            url: "/WS/reportes.asmx/cg_listadoXGrupo",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Ocurrio un error al intentar conectar al servidor. ", "Servidor no disponible");
                }
                else {
                    // Recorremos a ver como esta la badera de resultado.---------
                    P = result.d;
                    var rs;
                    $.each(P, function (i, item) {
                        rs = item.resultado;
                    })
                    if (rs == 'c_no') {
                        Modal("<strong> Este grupo no contiene estudiantes matriculados</strong>.",
                        "Problemas al cargar el grupo. Grupo vacio");
                    }
                    else if (rs == 'c_yes') {
                        Alerta("Listado generado de forma exitosa", "success");
                        window.open("/ACADEMIA/reportes/reports/listadoasistencia.aspx");
                    }
                }

            },
            error: function (result) {
                Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error del servidor");
            }
        });

    }
//});
