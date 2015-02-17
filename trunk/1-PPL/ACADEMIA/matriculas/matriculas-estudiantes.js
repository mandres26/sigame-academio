/// <reference path="../reportes/reports/constancia.aspx" />

//$(document).ready(function () {
    WinMove();
    var idOld;
    var conta;
    var Consta;
    var filtro, filtroAcu;
    var AccionBD;
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
            cargarGrupos();
            Mes1();
            Mes2();
            CargarEstudiantes();
            CargarAcudientes();
            $("#formPPAL").show();
            $("#imgload").hide();
        });
    }
    var array = new Array(); // variable para las grillas en los formularios

    function Mes1() {
        var B;
        $("#comboMes1").html("");
        B = '<option value="ENERO">ENERO</option>';
        B += '<option value="FEBRERO">FEBRERO</option>';
        B += '<option value="MARZO">MARZO</option>';
        B += '<option value="ABRIL">ABRIL</option>';
        B += '<option value="MAYO">MAYO</option>';
        B += '<option value="JUNIO">JUNIO</option>';
        B += '<option value="JULIO">JULIO</option>';
        B += '<option value="AGOSTO">AGOSTO</option>';
        B += '<option value="SEPTIEMBRE">SEPTIEMBRE</option>';
        B += '<option value="OCTUBRE">OCTUBRE</option>';
        B += '<option value="NOVIEMBRE">NOVIEMBRE</option>';
        B += '<option value="DICIEMBRE">DICIEMBRE</option>';
        $("#comboMes1").append(B);
    }
    function Mes2() {
        var B;
        $("#comboMes2").html("");
        B = '<option value="ENERO">ENERO</option>';
        B += '<option value="FEBRERO">FEBRERO</option>';
        B += '<option value="MARZO">MARZO</option>';
        B += '<option value="ABRIL">ABRIL</option>';
        B += '<option value="MAYO">MAYO</option>';
        B += '<option value="JUNIO">JUNIO</option>';
        B += '<option value="JULIO">JULIO</option>';
        B += '<option value="AGOSTO">AGOSTO</option>';
        B += '<option value="SEPTIEMBRE">SEPTIEMBRE</option>';
        B += '<option value="OCTUBRE">OCTUBRE</option>';
        B += '<option value="NOVIEMBRE">NOVIEMBRE</option>';
        B += '<option value="DICIEMBRE">DICIEMBRE</option>';
        $("#comboMes2").append(B);
    }
    $('#txtId').keyup(function (e) {
        if (e.keyCode == 13) {
            $(document.body).animate({ scrollTop: 300 }, 300);
            var btn = $('#btnG')
            btn.button('loading')
            $.ajax(".....").always(function () {
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
    $('#txtIdAcu').keyup(function (e) {
        if (e.keyCode == 13) {
            $(document.body).animate({ scrollTop: 600 }, 300);
            var btn = $('#btnGA')
            btn.button('loading')
            $.ajax(".....").always(function () {
                filtroAcu = 1;
                verificarAcuId();
                btn.button('reset')
            });
        }
    });
    $('#txtIdAcuN').keyup(function (e) {
        if (e.keyCode == 13) {
            var btn = $('#btnGA')
            btn.button('loading')
            $.ajax(".....").always(function () {
                $(document.body).animate({ scrollTop: 600 }, 300);
                //Aca redireccionamos al extraer el id de la persona
                var arr = $('#txtIdAcuN').val().split('/');
                $('#txtIdAcu').val(arr[1]);
                filtroAcu = 1;
                verificarAcuId();
                btn.button('reset')
            });
        }
    });
    function CargarAcudientes() {
        $.ajax({
            type: "POST",
            url: "/WS/personas.asmx/c_acudientesXBusque",
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
                $("#txtIdAcuN").jqxComboBox({ selectedIndex: 0, source: PersonasAdapter, promptText: "ESCRIBA O SELECCIONE...", displayMember: "persona", valueMember: "persona", width: 370, height: 21 });
            },
            error: function (result) {
            }

        });
    }
    $('#txtId').click(function () { filtro = 1; });
    $('#txtIdN').click(function () { filtro = 1; });
    $('#txtIdAcu').click(function () { filtroAcu = 1; });
    $('#txtIdAcuN').click(function () { filtroAcu = 1; });

    $('#btnG').click(function () { // Botón gestionar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            if (filtro == 1) {
                verificarEstId();
            }
            else if (filtro == 2) {
                verificarEstNom();
            }
            btn.button('reset')
        });
    });
    $('#btnGA').click(function () { // Botón gestionar acudiente
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            if (filtroAcu == 1) {
                verificarAcuId();
            }
            else if (filtroAcu == 2) {
                verificarAcuNom();
            }
            btn.button('reset')
        });
    });

    $('#btnN').click(function () { // Botón Nuevo
        nuevo();
    });
   

    function nuevo() {
        Alerta("Digite una identificación o nombre en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "info");
        $("#txtId").val("");
        $("#txtIdN").val("");
        $("#txtIdAcu").val("");
        $("#txtIdAcuN").val("");
        $("#txtNomEst").val("");
        $("#txtApEst").val("");
        $("#txtNomAcu").val("");
        $("#txtApAcu").val("");
        //$("#btnGenerar").hide();
        $('#f-grupo').hide();
        $('#formulario').hide();
        $("#txtId").removeAttr('disabled');
        $("#txtIdN").removeAttr('disabled');
        $("#txtIdAcu").removeAttr('disabled');
        $("#txtIdAcuN").removeAttr('disabled');
        $('#meses').hide();
        $('#txtId').focus();
    }
    var getDatosGA = function () {
        var dto = {};
        dto.id = $("#txtIdAcu").val();
        return dto;
    };

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
                    redireccionar();
                }
                else {
                    P = result.d;
                    conta=0;
                    $("#comboIdgrupo").html("");
                    $.each(P, function (i, item) {
                        var obj = item.id_grupo.split('-');
                        var ano = obj[0];
                        if (ano == AnoAcademico) {
                            $("#comboIdgrupo").append("<option value=" + item.id_grupo + ">" + item.id_grupo + "</option>");
                            if (conta == 0) {
                                $("#txtIdGrado").val(item.id_grado);
                                $("#txtIdAula").val(item.id_aula);
                                $("#txtIdAno").val(item.año);
                                $("#txtIdJornada").val(item.jornada);
                            }
                        }
                    })
                }
            },
            error: function (result) {
                Modal("Server: Error al cargar los grupos.", "Servidor no disponible");
                redireccionar();
            }
        });
    }
   
    var getDatos = function () {
        var dto = {};
        dto.id_estudiante = $("#txtId").val();
        dto.id_grupo = $("#comboIdgrupo").val();
        dto.id_acudiente = $("#txtIdAcu").val();  

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

    function verificarEstId() { // Verificamos que sea un estudiante
        if ($('#txtId').val() == '') {
            Alerta("Error: Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
            $('#formulario').hide();
            $('#txtId').focus();
        //} else if (($('#txtId').val()).length < 8) {
        //    Alerta("Error: La identificación debe tener <strong> 8 caracteres</strong>como minimo .", "danger");
        //    $('#formulario').hide();
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
                        $("#formulario").hide();
                        Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no se encuentra registrada </strong> en la base de datos del sistema.<strong> Intente otra vez </strong>.", "Busqueda fallida.");
                        $("#txtId").focus();
                    }
                    else {
                        P = result.d;
                        if (P.rol != "ESTUDIANTE") {
                            $("#formulario").hide();
                            $("#txtId").focus();
                            Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no le pertenece a un estudiante </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                        } else if (P.rol == "ESTUDIANTE") {
                            $("#txtId").attr('disabled', 'disabled');
                            $("#txtIdN").attr('disabled', 'disabled');
                            $("#txtId").val(P.id);
                            $("#txtApEst").val(P.apellidos);
                            $("#txtNomEst").val(P.nombres);
                            $("#formulario").show();
                            $("#txtIdAcu").focus();
                            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");

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
            Alerta("Error: Digite un nombre en el cuadro de texto y luego haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
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
                        $("#formulario").hide();
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
                            $("#txtId").attr('disabled', 'disabled');
                            $("#txtIdN").attr('disabled', 'disabled');
                            $("#txtApEst").val(P.apellidos);
                            $("#txtId").val(P.id);
                            $("#txtNomEst").val(P.nombres);
                            $("#formulario").show();
                            $("#txtIdAcu").focus();
                            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");

                        }
                    }
                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                }
            });
        }
    }
    function verificarAcuId() { // Verificamos que sea un acudiente

        if ($('#txtIdAcu').val() == '') {
            Alerta("Error: Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
            $("#f-grupo").hide();
            $('#txtIdAcu').focus();
        //} else if (($('#txtIdAcu').val()).length < 8) {
        //    Alerta("Error: La identificación debe tener <strong> 8 caracteres</strong>como minimo .", "danger");
        //    $("#f-grupo").hide();
        //    $('#txtIdAcu').focus();
        } else {
           
            jsonData = "{'dto':" + JSON.stringify(getDatosGA()) + "}";
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
                        $("#txtIdAcu").focus();
                        Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no se encuentra registrada </strong> en la base de datos del sistema", "Error al intentar realizar esta acción");
                    }
                    else {
                        P = result.d;
                            if (P.rol != "ACUDIENTE"  && P.rol_secundario != "ACUDIENTE") {
                            $("#f-grupo").hide();
                            $("#txtIdAcu").focus();
                            Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no le pertenece a un acudiente </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                            } else if (P.rol == "ACUDIENTE" || P.rol_secundario == "ACUDIENTE") {
                            $("#txtIdAcu").attr('disabled', 'disabled');
                            $("#txtIdAcuN").attr('disabled', 'disabled');
                            $("#txtApAcu").val(P.apellidos);
                            $("#txtIdAcu").val(P.id);
                            $("#txtNomAcu").val(P.nombres);
                            $("#f-grupo").show();
                            $("#comboIdgrupo").focus();
                            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");

                        }
                    }
                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                }
            });
        }
    }
    function verificarAcuNom() { // Verificamos que sea un acudiente
    
        if ($('#txtIdAcuN').val() == '') {
            Alerta("Error: Digite un nombre en el cuadro de texto y luego haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
            $('#txtIdN').focus();
        }
        else {
            var dto = {};
            dto.id = $("#txtIdAcuN").val();

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
                        $("#txtIdAcuN").focus();
                        Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no se encuentra registrado </strong> en la base de datos del sistema", "Error al intentar realizar esta acción");
                    }
                    else {
                        P = result.d;
                            if (P.rol != "ACUDIENTE"  && P.rol_secundario != "ACUDIENTE") {
                            $("#f-grupo").hide();
                            $("#txtIdAcuN").focus();
                            Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no le pertenece a un acudiente </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                        } else if (P.rol == "ACUDIENTE" || P.rol_secundario == "ACUDIENTE") {
                            $("#txtIdAcu").attr('disabled', 'disabled');
                            $("#txtIdAcuN").attr('disabled', 'disabled');
                            $("#txtApAcu").val(P.apellidos);
                            $("#txtIdAcu").val(P.id);
                            $("#txtNomAcu").val(P.nombres);
                            $("#f-grupo").show();
                            $("#comboIdgrupo").focus();
                            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");

                        }
                    }
                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                }
            });
        }
    }

        $('#btnR').click(function () { // Botón Registrar
            var btn = $(this)
            btn.button('loading')
            $.ajax(".....").always(function () {
                btn.button('reset')
            });
            jsonData = "{'dto':" + JSON.stringify(getDatos()) + ",'dtob':" + JSON.stringify(getBitacora("MATRICULAS", "REGISTRAR", "ACCIÓN REALZIADA A UN ESTUDIANTE")) + "}"; //Registro de bitacora
            $.ajax({
                type: "POST",
                url: "/WS/matriculas.asmx/r_matriculaEstudiante",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        Modal("Error al intentar realizar esta acción.", " Existe un problema de inconsistencia con la base de datos del sistema. Contactese con el administrador.");
                    }
                    else {
                        Modal(JSON.stringify(result.d), "Registro de matriculas estudiantiles");
                    }
                },
                error: function (result) {
                    Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error del servidor");
                }
            });
        });

        $('#btnE').click(function () { // Botón Eliminar
            var btn = $(this)
            btn.button('loading')
            $.ajax(".....").always(function () {
                btn.button('reset')
            });
            jsonData = "{'dto':" + JSON.stringify(getDatos()) + ",'dtob':" + JSON.stringify(getBitacora("MATRICULAS", "ELIMINAR", "ACCIÓN REALIZADA A UN ESTUDIANTE")) + "}"; //Registro de bitacora
            $.ajax({
                type: "POST",
                url: "/WS/matriculas.asmx/e_matriculaEstudiante",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        Modal("Error al intentar realizar esta acción.", " Existe un problema de inconsistencia con la base de datos del sistema. Contactese con el administrador.");
                    }
                    else {
                        Modal(JSON.stringify(result.d), "Eliminación de matriculas estudiantiles");
                        nuevo();
                        $("#txtId").focus();
                    }
                },
                error: function (result) {
                    Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error del servidor");
                }
            });
        });
        //--------------------------------------------------------------------------------------------------
        $('#btnGenerar').click(function () { // Botón constancia de estudio
            var btn = $(this)
            btn.button('loading')
            $.ajax(".....").always(function () {            
                jsonData = "{'dto':" + JSON.stringify(getDatos()) + ",'dtob':" + JSON.stringify(getBitacora("REPORTES", "GENERAR", "CONSTANCIA DE ESTUDIO EN EL SISTEMA")) + "}"; //Registro de bitacora
                $.ajax({
                    type: "POST",
                    url: "/WS/reportes.asmx/cg_constanciaXestud",
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    success: function (result) {
                        if (result.d == null) {
                            Modal("Ocurrio un error al intentar conectar al servidor. ", "Servidor no disponible");
                        }
                        else {
                            if (result.d.resultado == 'c_no') {
                                Modal("No puede generar la constancia de estudio, ya que no existe ninguna matricula para con esta identificación en en este grupo. ", "No esta matriculado este estudiante.");
                            }
                            else if (result.d.resultado == 'c_yes') {
                                window.open("/ACADEMIA/reportes/reports/constanciaest.aspx");
                            }
                        }
                    },
                    error: function (result) {
                        Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error del servidor");
                    }
                });
                btn.button('reset')
            });
        });
   
        $('#btnGenerarFam').click(function () { // Botón generar constancia de familias en accion
            var btn = $(this)
            btn.button('loading')
            $.ajax(".....").always(function () {
                $('#meses').show();
                $('#comboMes1').focus();
                btn.button('reset')
            });
        });
    //--------------------------------------------------------------------------------------------------
        $('#btnGenerarFam2').click(function () { // Botón generar constancia de familias en accion
            var btn = $(this)
            btn.button('loading')
            $.ajax(".....").always(function () {             
                var dto = {};
                dto.id_estudiante = $("#txtId").val();
                dto.id_grupo = $("#comboIdgrupo").val();
                dto.mes1 = $("#comboMes1").val();
                dto.mes2 = $("#comboMes2").val();

                jsonData = "{'dto':" + JSON.stringify(dto) + ",'dtob':" + JSON.stringify(getBitacora("REPORTES", "GENERAR", "CONSTANCIA DE ESTUDIO PARA ACCION SOCIAL")) + "}"; //Registro de bitacora
                $.ajax({
                    type: "POST",
                    url: "/WS/reportes.asmx/cg_constanciaXfamily",
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    success: function (result) {
                        if (result.d == null) {
                            Modal("Ocurrio un error al intentar conectar al servidor. ", "Servidor no disponible");
                        }
                        else {
                            if (result.d.resultado == 'c_no') {
                                Modal("No puede generar la constancia de estudio, ya que no existe ninguna matricula para con esta identificación en en este grupo. ", "No esta matriculado este estudiante.");
                            }
                            else if (result.d.resultado == 'c_yes') {
                                window.open("/ACADEMIA/reportes/reports/constanciafam.aspx");
                            }
                        }
                    },
                    error: function (result) {
                        Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error del servidor");
                    }
                });


                btn.button('reset')
            });
        });
        $('#txtId').focus();
    //});
