//$(document).ready(function () {
    WinMove();
    var conta = 0;
    var conta2 = 0;
    var CodAsig, TotalEst, NombreAsig, Busqueda, CodGrado, CodGrupo, CodProfe, Periodo;
    var jsonData;
    var dataEstudiant;
    var AnoAcademico = localStorage.getItem('SeccionAnoAcademico');
    validar_pagina();
    //---------------------------------- --------------------------------------------------------------------------------------
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
            cargarPeriodos();
            cargarGrupos();
            nuevo();

            $("#formPPAL").show();
            $("#imgload").hide();
        });
    }
    var getDatos = function () {
        var dto = {};
        dto.rows = $('#grillaGrupo').jqxGrid('getboundrows');
        dto.id_grupo = $("#comboIdgrupo").val();
        dto.id_periodo = $("#comboPeriodos").val();
        return dto;
    };
    var getDatosFor = function () {
        var dto = {};
        dto.id_grupo = $("#comboIdgrupo").val();
        dto.id_periodo = $("#comboPeriodos").val();
        return dto;
    };
 

    function nuevo() {
                $('#formulario').hide();
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
                    P = result.d;
                    $("#comboPeriodos").html("");
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
                Modal(("Servidor no disponible", "E1:2 al cargarPeriodos"));
                redireccionar();
            }
        });
    }
    //----------------------------------------------------------------------------------------------------
    $('#btnG').click(function () { 
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
            $("#formulario").hide();
            $(document.body).animate({ scrollTop: 350 }, 300);
            GetEstudiantesXgrupoForGrilla();
            btn.button('reset')
        });
    });
    function cargarGrupos() {
        $.ajax({ // Carga de grupos
            type: "POST",
            url: "/WS/grupos.asmx/c_grupos",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Error de congruenciá: No existen grupos asignados. ");
                    
                }
                else {
                    P = result.d;
                    $("#comboIdgrupo").html("");
                    $.each(P, function (i, item) {
                        var obj = item.id_grupo.split('-');
                        var ano = obj[0];
                        if (ano == AnoAcademico) {
                            $("#comboIdgrupo").append("<option value=" + item.id_grupo + ">" + item.id_grupo + "</option>");
                        }
                    })
                }
            },
            error: function (result) {
                Modal("Server: Error al cargar los grupos.", "Error de sistema");
                redireccionar();
            }
        });
    }
    function GetEstudiantesXgrupoForGrilla() {

        jsonData = "{'dto':" + JSON.stringify(getDatosFor()) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/reportes.asmx/cg_reporteGrupo",
            data: jsonData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Tenemos problemas al cargar este grupo - <strong> este grupo no contiene estudiantes matriculados</strong>.",
                       "Problemas al cargar el grupo. Grupo vacio");
                    $("#formulario").hide();
                }
                else {
                    dataEstudiant = result.d;
                    $("#formulario").show();
                    SetGrilla(dataEstudiant);
                        var Bandera;
                        TotalEst = 0;
                        $.each(dataEstudiant, function (i, item) {
                            Bandera = item.uid;
                            TotalEst++; // Calculamos el numeor de estudiantes
                        })
                        $("#Ltotal").text("Total:" + TotalEst);
                        if (Bandera == 'NUEVO_REGISTRO') {
                            $("#btnR").show();
                            $("#btnM").hide();
                            $("#btnE").hide();
                        } else  if (Bandera == 'LISTO_PARA_MODIFICAR'){
                            $("#btnR").hide();
                            $("#btnM").show();
                            $("#btnE").show();
                        }
                   
                }
            },
            error: function (result) {
                Modal("Server: Error al cargar estudiantes matriculados...", "Problemas al cargar el grupo.");
                $("#formulario").hide();
            }
        });
    }
    var SetGrilla = function (dataE) {

        var source =
        {
            localdata: dataE,
            datatype: "json",
            updaterow: function (rowid, rowdata, commit) {
                commit(true);
            },
            datafields:
            [
                { name: 'id_estudiante', type: 'string' },
                { name: 'apellidos', type: 'string' },
                { name: 'nombres', type: 'string' },
                { name: 'acceso', type: 'bool'},
                { name: 'notificacion', type: 'string' }
            ]
        };
        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#grillaGrupo").jqxGrid(
        {
            width: 750,
            source: dataAdapter,
            pageable: true,
            autoheight: true,
            sortable: true,
            altrows: true,
            enabletooltips: true,
            editable: true,
            //selectionmode: 'multiplecellsadvanced',
            ready: function () {
                // called when the Grid is loaded. Call methods or set properties here.         


            },
            selectionmode: 'checkbox',

            columns: [
              { text: 'Id', columntype: 'textbox', datafield: 'id_estudiante', width: 100, editable: false },
              { text: 'Apellidos', columntype: 'textbox', datafield: 'apellidos', width: 180, editable: false },
              { text: 'Nombres', columntype: 'textbox ', datafield: 'nombres', width: 180, editable: false },
              { text: 'Habilitar', columntype: 'checkbox' ,datafield: 'acceso', width: 90, editable: true },
              { text: 'Notificación', columntype: 'textbox ', datafield: 'notificacion', width: 180, editable: false },
              { text: '', columntype: 'textbox ', datafield: '', width: 501, editable: false }
            ]
        });
    };
    //==================================================================================================
    //    ============================== BTN Enviar los Datos  ==========================================

    $(document).on('click', '.clsR', function () {
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
             jsonData = "{'dto':" + JSON.stringify(getDatos()) + ",'dtob':" + JSON.stringify(getBitacora("REPORTES", "HABILITAR-R", "HABILITACION DE REPOTES DE UN GRUPO")) + "}"; //Registro de bitacora";
        $.ajax({
            type: "POST",
            url: "/WS/reportes.asmx/rg_reporteGrupo",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                if (result.d != null) {

                    Modal(JSON.stringify(result.d), "Registro de reportes");
                    if (JSON.stringify(result.d) != '"Lo sentimos. Tuvimos problemas para procesar este grupo. Al parecer no envió los datos correctos. Revise y reintente. "') {
                        nuevo();
                    }
                }
                else {
                    Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                }
              
            },
            error: function (result) {
                Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
            }
        });
        btn.button('reset')
        });

    });
    $(document).on('click', '.clsE', function () {
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
            jsonData = "{'dto':" + JSON.stringify(getDatos()) + ",'dtob':" + JSON.stringify(getBitacora("REPORTES", "HABILITAR-E", "ELIMINACION DE REPOTES HABILITADOS DE UN GRUPO")) + "}"; //Registro de bitacora";
            $.ajax({
                type: "POST",
                url: "/WS/reportes.asmx/eg_reporteGrupo",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d != null) {

                        Modal(JSON.stringify(result.d), "Eliminación de reportes");
                        if (JSON.stringify(result.d) != '"Lo sentimos. Tuvimos problemas para procesar este grupo. Al parecer no envió los datos correctos. Revise y reintente. "') {
                            nuevo();
                        }
                    }
                    else {
                        Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                    }
                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                }
            });
            btn.button('reset')
        });
    });

    $(document).on('click', '.clsM', function () {
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
            jsonData = "{'dto':" + JSON.stringify(getDatos()) + ",'dtob':" + JSON.stringify(getBitacora("REPORTES", "HABILITAR-M", "MODIFICACIÓN DE REPORTES HABILITADOS DE UN GRUPO")) + "}"; //Registro de bitacora";
            $.ajax({
                type: "POST",
                url: "/WS/reportes.asmx/mg_reporteGrupo",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d != null) {
                        Modal(JSON.stringify(result.d), "Modificación de reportes");
                        if (JSON.stringify(result.d) != '"Lo sentimos. Tuvimos problemas para procesar este grupo. Al parecer no envió los datos correctos. Revise y reintente. "') {
                            nuevo();
                        }
                    }
                    else {
                        Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                    }

                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                }
            });
            btn.button('reset')
        });
    });
//});

