
    WinMove();
    var idOld;
    var conta, filtro;
    var P = {};
    var CodGrado;
    var boletin = {};
    
    var AnoAcademico = localStorage.getItem('SeccionAnoAcademico');
    
    validar_pagina();

    //---------------------------------- --------------------------------------------------------------------------------------
    if (localStorage.getItem('SeccionRol') == "ADMINISTRATIVO" || localStorage.getItem('SeccionRol') == "SUPER" || localStorage.getItem('SeccionRolTerciario') == "DIRECTOR_GRUPO") {
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
            cargarPeriodos();
            CargarEstudiantes();
            $("#formPPAL").show();
            $("#imgload").hide();
        });
    }
    var array = new Array(); // variable para las grillas en los formularios


    $('#txtId').keyup(function (e) {
        if (e.keyCode == 13) {
            var btn = $('#btnG')
            btn.button('loading')
            $.ajax(".....").always(function () {
                $(document.body).animate({ scrollTop: 300 }, 300);
                filtro = 1;
                verificarEstId();
                btn.button('reset')
            });
        }
    });

    $('#txtIdN').keyup(function (e) {
        if (e.keyCode == 13) {
            var btn = $('#btnG')
            btn.button('loading')
            $.ajax(".....").always(function () {
                $(document.body).animate({ scrollTop: 300 }, 300);
                //Aca redireccionamos al extraer el id de la persona
                var arr = $('#txtIdN').val().split('/');
                $('#txtId').val(arr[1]);
                filtro = 1;
                verificarEstId();
                btn.button('reset')
            });
        }
    });
    function CargarEstudiantes() {
        $.ajax({
            type: "POST",
            url: "/WS/personas.asmx/c_estudiantesXBusque",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {

                var dataPersonas = result.d;
                var PersonasSource =
                     {
                         localdata: dataPersonas,
                         datatype: "json",
                         datafields: [
                             { name: 'persona', type: 'string' }
                         ]
                     };
                var PersonasAdapter = new $.jqx.dataAdapter(PersonasSource, { autoBind: true });
                $("#txtIdN").jqxComboBox({ selectedIndex: 0, source: PersonasAdapter, promptText: "ESCRIBA O SELECCIONE...", displayMember: "persona", valueMember: "persona", width: 370, height: 21 });
            },
            error: function (result) {
            }

        });
    }


    $('#btnG').click(function () { // Botón gestionar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            $(document.body).animate({ scrollTop: 300 }, 300);
            //Aca redireccionamos al extraer el id de la persona
            var arr = $('#txtIdN').val().split('/');
            $('#txtId').val(arr[1]);
            filtro = 1;
            verificarEstId();
            btn.button('reset')
        });
    });


    $('#btnN').click(function () { // Botón Nuevo
        nuevo();
    });
   
    $('#txtId').click(function () { filtro = 1; });
    $('#txtIdN').click(function () { filtro = 2; });

    function nuevo() {
        Alerta("Digite una identificación en el cuadro de texto y luego presione la tecla <strong> enter</strong> o haga clic en el botón <strong> gestionar </strong>para continuar.", "info");
        $("#txtId").val("")
        $("#txtIdN").val("SELECCIONE...");
        $("#txtNomEst").val("");
        $("#txtApEst").val("");
        $('#f-grupo').hide();
        $("#txtId").removeAttr('disabled');
        $("#txtIdN").removeAttr('disabled');
        $('#txtId').focus();
    }

    function cargarGruposDelEst() {
        //------------------- primero cargamos la grilla con los datos del estudiante------------------------------
        jsonData = "{'dto':" + JSON.stringify(getDatosG()) +
                     ",'dtob':" + JSON.stringify(getBitacora("MATRICULAS", "LISTAR ", "FILTRO POR ESTUDIANTE PARA EL BOLETIN")) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/matriculas.asmx/c_matriculaXIdEst",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Este estudiante no contiene ninguna matricula academica. ", " No se encuentra matriculado.");
                    $("#f-grupo").hide();
                }
                else {
                    $("#f-grupo").show();
                    P = result.d;
                    conta = 0;
                    $("#comboIdgrupo").html("");
                    $("#comboIdgrupo").val("");
                    $.each(P, function (i, item) {
                        /*-- filtro por el año academico seleccionado ----- voy preguntando y añadiendo los que si y excluendo los que no*/
                        var obj = item.id_grupo.split('-');
                        var ano = obj[0];
                        if (ano == AnoAcademico) {
                            $("#comboIdgrupo").append("<option value=" + item.id_grupo + ">" + item.id_grupo + "</option>");
                            if (conta == 0) {
                                $("#txtIdAno").val(item.año);
                                $("#txtIdGrado").val(item.grado);
                                conta = conta + 1;
                            }
                        }
                    })
                }
            },
            error: function (result) {
                Modal("Server: Error de servidor.", "Error de servidor");
            }
        });
    }

    function cargarPeriodos() {
        $.ajax({
            type: "POST",
            url: "/WS/periodos.asmx/c_periodos",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Usted no puede proceder. <strong> No existen periodos académicos </strong> asignados. ");
                    redireccionar();
                }
                else {
                    P = result.d;
                    conta = 0;
                    $("#comboPeriodos").html("");
                    $("#comboPeriodos").val("");
                    $.each(P, function (i, item) {
                        var obj = item.id.split('-');
                        var ano = obj[0];
                        if (ano == AnoAcademico) {
                            $("#comboPeriodos").append("<option value=" + item.id + ">" + item.id + "</option>");
                            if (conta == 0) {
                                $("#txtRangoI").val(item.rangoI);
                                $("#txtRangoF").val(item.rangoF);
                                conta++;
                            }
                        }
                    })
                }
            },
            error: function (result) {
                Modal("Server: Error al cargar los periodos.", "Servidor no disponible");
                redireccionar();
            }
        });
    }

    var getDatos = function () {
        var dto = {};
        dto.id_estudiante = $("#txtId").val();
        dto.id_grupo = $("#comboIdgrupo").val();
        dto.id_periodo = $("#comboPeriodos").val();
        dto.observacion = "NA";
        dto.fecha = null;
        dto.acceso = false;
        dto.notificacion = null;
        return dto;
    };
   
    var getDatosGrupo = function () {
        var dto = {};
        dto.id = $("#comboIdgrupo").val();
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
    var getDatosPer = function () {
        var dto = {};
        dto.id = $("#comboPeriodos").val();
        return dto;
    };
    $("#comboPeriodos").change(function () {
        jsonData = "{'dto':" + JSON.stringify(getDatosPer()) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/periodos.asmx/c_periodo",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                P = result.d;
                $("#txtRangoI").val(P.rangoI);
                $("#txtRangoF").val(P.rangoF);
            },
            error: function (result) {
            }
        });
    });

    function verificarEstId() { // Verificamos que sea un estudiante
        if ($('#txtId').val() == '') {
            Alerta("Error: Digite una identificación en el cuadro de texto y luego presione la tecla <strong> enter</strong> o haga clic en el botón <strong> gestionar </strong>para continuar.", "danger");
            $("#f-grupo").hide();
            $('#txtId').focus();
        //} else if (($('#txtId').val()).length < 8) {
        //    Alerta("Error: La identificación debe tener <strong> 8 caracteres</strong>como minimo .", "danger");
        //    $("#f-grupo").hide();
        //    $('#txtId').focus();
        } else {
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
                        $("#f-grupo").hide();
                        Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no se encuentra registrada </strong> en la base de datos del sistema", "Error al intentar realizar esta acción");
                        $("#txtId").focus();
                    }
                    else {
                        P = result.d;
                        if (P.rol != "ESTUDIANTE") {
                            $("#formulario").hide();
                            $("#txtId").focus();
                            Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no le pertenece a un estudiante </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                        } else if (P.rol == "ESTUDIANTE") {
                            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
                            $("#txtId").attr('disabled', 'disabled');
                            $("#txtIdN").attr('disabled', 'disabled');
                            $("#txtId").val(P.id);
                            $("#txtApEst").val(P.apellidos);
                            $("#txtNomEst").val(P.nombres);

                            cargarGruposDelEst();
                            $("#f-grupo").show();
                            $("#comboIdgrupo").focus();


                        }
                    }
                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                }
            });
        }
    }
    function verificarEstNom() { // Verificamos que sea un estudiante
        if ($('#txtIdN').val() == '') {
            Alerta("Error: Digite un nombre en el cuadro de texto y luego haga clic en el botón <strong> gestionar </strong>para continuar.", "danger");
            $("#f-grupo").hide();
            $('#txtIdN').focus();
        }
        else {
            var dto = {};
            dto.id = $("#txtIdN").val();

            jsonData = "{'dto':" + JSON.stringify(dto) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/personas.asmx/c_personaXNombre",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        $("#f-grupo").hide();
                        Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no se encuentra registrado </strong> en la base de datos del sistema", "Error al intentar realizar esta acción");
                        $("#txtIdN").focus();
                    }
                    else {
                        P = result.d;
                        if (P.rol != "ESTUDIANTE") {
                            $("#formulario").hide();
                            $("#txtIdN").focus();
                            Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no le pertenece a un estudiante </strong> y no puede gestionar este proceso. Revise.", "Error al intentar realizar esta acción");
                        } else if (P.rol == "ESTUDIANTE") {
                            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
                            $("#txtId").attr('disabled', 'disabled');
                            $("#txtIdN").attr('disabled', 'disabled');
                            $("#txtApEst").val(P.apellidos);
                            $("#txtId").val(P.id);
                            $("#txtNomEst").val(P.nombres);
                            cargarGruposDelEst();
                            $("#f-grupo").show();
                            $("#comboIdgrupo").focus();
                        }
                    }
                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                }
            });
        }
    }
  
    $('#btnGenerar').click(function () { // Botón generar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            //--------------------EXTRAEMOS EL PERIODO SELECCIONADA ------------*/
            var periodoS = ($("#comboPeriodos").val()).split('-');
            var Ano = periodoS[0];
            var Periodo = periodoS[1];
            /*--------------------------------------------------------------------*/
            if ($('#comboIdgrupo').val() == null) {
                Alerta("Error: Debe de escoger un grupo.", "danger");
                $(document.body).animate({ scrollTop: 20 }, 300);
                $('#comboIdgrupo').focus();
            } else {
                $("#btnGenerar").attr('disabled', 'disabled');
                CodGrado = $("#comboIdgrupo").val().substring(5, 6);
                if (Periodo == 'V') { // Generarmos el boletin final individual

                    jsonData = "{'dto':" + JSON.stringify(getDatos()) + ",'dtob':" + JSON.stringify(getBitacora("REPORTES", "GENERAR", "BOLETIN FINAL INDIVIDUAL")) + "}"; //Registro de bitacora
                    $.ajax({
                        type: "POST",
                        url: "/WS/reportes.asmx/cg_boletinXestudianteFinal",
                        data: jsonData,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        async: true,
                        success: function (result) {
                            if (result.d == null) {
                                Modal("Ocurrio un error al intentar conectar al servidor. ", "Servidor no disponible");
                            } else {
                                // Recorremos a ver como esta la badera de resultado.---------
                                P = result.d;
                                var rs;
                                $.each(P, function (i, item) {
                                    rs = item.resultado;
                                })
                                //-------------------------------------------------------------
                                if (rs == 'El reporte que esta solicitando no esta habilitado por el colegio. Contactese con la administración de la institución.') {
                                    Modal("El reporte que esta solicitando <strong>no esta habilitado </strong> por el colegio. Contactese con la administración de la institución.", "Reporte no habilitado todavia.");
                                } else if (rs == 'Este reporte que solicita no ha sido generado por la administración.') {
                                    Modal("Este reporte que solicita no ha sido generado por la administración.", "Reporte no generado.");
                                }
                                else if (rs == 'c_no') {
                                    Modal("El grupo en que esta matriculado el estudiante no contiene asignaturas matriculadas.", "Grupo sin asignaturas.");
                                    Alerta("El grupo en que esta matriculado el estudiante no contiene asignaturas matriculadas.", "danger");
                                    $(document.body).animate({ scrollTop: 0 }, 300);
                                }
                                else if (rs == 'c_yes') {
                                    Alerta("Reporte generado de forma exitosa", "success");
                                    // BOLETIN PARA EL PERIODO tradicional y PARA PREESCOLAR
                                    if (CodGrado == "J" || CodGrado == "P" || CodGrado == "T") {
                                        window.open("/ACADEMIA/reportes/boletines/preescolar/boletinf.aspx"); // boletin de pre-escolar
                                    } else if (CodGrado == "1" || CodGrado == "2" || CodGrado == "3" || CodGrado == "4" || CodGrado == "5") {
                                        window.open("/ACADEMIA/reportes/boletines/primaria/boletinf.aspx"); // boletin de primaria
                                    }
                                    else if (CodGrado == "6" || CodGrado == "7" || CodGrado == "8" || CodGrado == "9" || CodGrado == "10" || CodGrado == "11") {
                                        window.open("/ACADEMIA/reportes/boletines/bachillerato/boletinf.aspx"); // boletinb = boletin de bachilletato
                                    }
                                    $(document.body).animate({ scrollTop: 0 }, 300);
                                }
                            }

                            $("#btnGenerar").removeAttr('disabled');

                        },
                        error: function (result) {
                            Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error del servidor");
                            $("#btnGenerar").removeAttr('disabled');
                        }
                    });
                } else {
                    jsonData = "{'dto':" + JSON.stringify(getDatos()) + ",'dtob':" + JSON.stringify(getBitacora("REPORTES", "GENERAR", "BOLETIN DE PERIODOS INDIVIDUAL")) + "}"; //Registro de bitacora
                    $.ajax({
                        type: "POST",
                        url: "/WS/reportes.asmx/cg_boletinXestudiante",
                        data: jsonData,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        async: true,
                        success: function (result) {
                            if (result.d == null) {
                                Modal("Ocurrio un error al intentar conectar al servidor. ", "Servidor no disponible");
                            } else {
                                // Recorremos a ver como esta la badera de resultado.---------
                                P = result.d;
                                var rs;
                                $.each(P, function (i, item) {
                                    rs = item.resultado;
                                })
                                //-------------------------------------------------------------
                               if ( rs== 'El reporte que esta solicitando no esta habilitado por el colegio. Contactese con la administración de la institución.') {
                                    Modal("El reporte que esta solicitando <strong>no esta habilitado </strong> por el colegio. Contactese con la administración de la institución.", "Reporte no habilitado todavia.");
                                } else if (rs == 'Este reporte que solicita no ha sido generado por la administración.') {
                                    Modal("Este reporte que solicita no ha sido generado por la administración.", "Reporte no generado.");
                                }
                                else if (rs == 'c_no') {
                                    Modal("El grupo en que esta matriculado el estudiante no contiene asignaturas matriculadas.", "Grupo sin asignaturas.");
                                    Alerta("El grupo en que esta matriculado el estudiante no contiene asignaturas matriculadas.", "danger");
                                    $(document.body).animate({ scrollTop: 0 }, 300);
                                }
                                else if (rs == 'c_yes') {
                                    Alerta("Reporte generado de forma exitosa", "success");
                                    // BOLETIN PARA EL PERIODO tradicional y PARA PREESCOLAR
                                    if (CodGrado == "J" || CodGrado == "P" || CodGrado == "T") {
                                        window.open("/ACADEMIA/reportes/boletines/preescolar/boletin.aspx"); // boletin de pre-escolar
                                    } else if (CodGrado == "1" || CodGrado == "2" || CodGrado == "3" || CodGrado == "4" || CodGrado == "5" ) {
                                        window.open("/ACADEMIA/reportes/boletines/primaria/boletin.aspx"); // boletin de primaria
                                    }
                                    else if (CodGrado == "6" || CodGrado == "7" || CodGrado == "8" || CodGrado == "9" || CodGrado == "10" || CodGrado == "11") {
                                        window.open("/ACADEMIA/reportes/boletines/bachillerato/boletin.aspx"); // boletinb = boletin de bachilletato
                                    }
                                    $(document.body).animate({ scrollTop: 0 }, 300);
                                }
                            }
                            $("#btnGenerar").removeAttr('disabled');

                        },
                        error: function (result) {
                            Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error del servidor");
                            $("#btnGenerar").removeAttr('disabled');

                        }
                    });
                }
            }
        
        btn.button('reset')
        });
    });


