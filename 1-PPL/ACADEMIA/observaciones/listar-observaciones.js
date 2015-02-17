
//$(document).ready(function () {
    WinMove();
    var conta;
    var Pos;
    var filtro;
    var buscarEst, buscarPro1, buscarPro2, CodProfe, CodEst, CodGrupo;
    var P = {};
    
    validar_pagina();

    //---------------------------------- validamos que el rol del usuario pueda ingresar a esta pagina -----------------------
    if (localStorage.getItem('SeccionRol') == "PROFESOR" || localStorage.getItem('SeccionRol') == "ADMINISTRATIVO" || localStorage.getItem('SeccionRol') == "SUPER") {
        conta = 0;
    } else {
        DenegarAccesoToProfe();
    }
    //---------------------------------- --------------------------------------------------------------------------------------

    CargarDatosIniciales();
    function CargarDatosIniciales() {
        $("#formPPAL").hide();
        $("#imgload").show();
        $.ajax("...").always(function () {
            nuevo();
            cargarGrupos();
            cargarAsignaturas();
            cargarPeriodos();
            cargarNotifiaciones();
            cargarArchivos();
            cargarfechaFin();
            cargarfechaInicio();
            FiltrosDisponibles();

            verificarSiEsProfesor();

            $("#formPPAL").show();
            $("#imgload").hide();
        });
    }
    function verificarSiEsProfesor() {
        if (localStorage.getItem('SeccionRol') == "PROFESOR") {
            $("#f-inicial").hide();
         
            CodProfe = localStorage.getItem('SeccionId');
            verificarProfe2();
        } else {
            $("#f-inicial").show();
            $("#comboFiltros").focus();
        }
    }

    $('#comboIdgrupo').click(function () { 
        $("#botones").show();
    });
    $('#comboIdAsig').click(function () {
        $("#botones").show();
    });
    $('#comboPeriodos2').click(function () {
        $("#botones").show();
    });
    $('#comboArchivo').click(function () {
        $("#botones").show();
    });
    $('#comboNoti').click(function () {
        $("#botones").show();
    });
    var array = new Array();
    var jsonData;
    function FiltrosDisponibles() {
        var A;
        $("#comboFiltros").html("");
        A += '<option value="0">POR X GRUPOS</option>';
        A += '<option value="1">POR X GRUPOS/PERIODO/PROFESOR</option>';
        A += '<option value="2">POR X ASIGNATURAS</option>';
        A += '<option value="3">POR X ESTUDIANTES</option>';
        A += '<option value="4">POR X PERIODOS ACADÉMICOS</option>';
        A += '<option value="5">POR X PROFESORES</option>';
        A += '<option value="6">POR X FECHA</option>';
        A += '<option value="7">POR X ARCHIVACIÓN</option>';
        A += '<option value="8">POR X NOTIFICACIÓN</option>';
        A += '<option value="9">LISTAR TODAS LAS OBSERVACIONES REGISTRAS</option>';
        $("#comboFiltros").append(A);
    }
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
    $("#comboFiltros").click(function () {
        $("#botones").hide();
        $("#f-grilla").hide();
        $("#btnI").hide();
        $("#LcomboIdgrupoEst").hide();
        $("#comboIdgrupoEst").hide();
    });
    $("#btnI").click(function () {
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            CodEst = $("#txtIdEst").val();
            CodGrupo = $("#comboIdgrupoEst").val();
            

            var dto = {};
            dto.id = CodEst;
            dto.id_grupo = CodGrupo;

            jsonData = "{'dto':" + JSON.stringify(dto) +
                        ",'dtob':" + JSON.stringify(getBitacora("OBSERVACIONES", "GENERAR", "GENERAR UN ARCHIVO CON LAS OBSERVACIONES DE UN ESTUDIANTE")) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/reportes.asmx/c_observacionesEst",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        Modal("Ocurrio un error al intentar conectar al servidor. ", "Servidor no disponible");
                    } else {
                        P = result.d;
                        var rs;
                        $.each(P, function (i, item) {
                            rs = item.resultado;
                        })
                        //-------------------------------------------------------------
                        if (rs == 'c_no') {
                            Modal("El estudiante en este grupo no contiene ninguna observacion asignada", "Estudiante sin observaciones.");
                        }
                        else if (rs == 'c_yes') {
                            window.open("/ACADEMIA/reportes/reports/observacionesEst.aspx");
                        }
                    }

                },
                error: function (result) {
                    //Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Servidor no disponible");
                }
            });


            btn.button('reset')
        });
    });
    function cargarGruposDelEst() {
        //------------------- primero cargamos la grilla con los datos del estudiante------------------------------
        var dto = {};
        dto.id = $("#txtIdEst").val();
        jsonData = "{'dto':" + JSON.stringify(dto) +
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
                    $("#comboIdgrupoEst").html("");
                    $.each(P, function (i, item) {
                        $("#comboIdgrupoEst").append("<option value=" + item.id_grupo + ">" + item.id_grupo + "</option>");
                    })
                }
            },
            error: function (result) {
                Modal("Server: Error de servidor.", "Error de servidor");
            }
        });
    }

    var getDatosAsig = function () {
        var dto = {};
        dto.id = $("#comboIdAsig").val();
        return dto;
    };
    function cargarfechaInicio() {
        var A;
        $("#comboFdia").html("");
        A += '<option value="01">01</option>';
        A += '<option value="02">02</option>';
        A += '<option value="03">03</option>';
        A += '<option value="04">04</option>';
        A += '<option value="05">05</option>';
        A += '<option value="06">06</option>';
        A += '<option value="07">07</option>';
        A += '<option value="08">08</option>';
        A += '<option value="09">09</option>';
        A += '<option value="10">10</option>';
        A += '<option value="11">11</option>';
        A += '<option value="12">12</option>';
        A += '<option value="13">13</option>';
        A += '<option value="14">14</option>';
        A += '<option value="15">15</option>';
        A += '<option value="16">16</option>';
        A += '<option value="17">17</option>';
        A += '<option value="18">18</option>';
        A += '<option value="19">19</option>';
        A += '<option value="20">20</option>';
        A += '<option value="21">21</option>';
        A += '<option value="22">22</option>';
        A += '<option value="23">23</option>';
        A += '<option value="24">24</option>';
        A += '<option value="25">25</option>';
        A += '<option value="26">26</option>';
        A += '<option value="27">27</option>';
        A += '<option value="28">28</option>';
        A += '<option value="29">29</option>';
        A += '<option value="30">30</option>';
        A += '<option value="31">31</option>';
        $("#comboFdia").append(A);
        var B;
        $("#comboFmes").html("");
        B += '<option value="01">ENERO</option>';
        B += '<option value="02">FEBRERO</option>';
        B += '<option value="03">MARZO</option>';
        B += '<option value="04">ABRIL</option>';
        B += '<option value="05">MAYO</option>';
        B += '<option value="06">JUNIO</option>';
        B += '<option value="07">JULIO</option>';
        B += '<option value="08">AGOSTO</option>';
        B += '<option value="09">SEPTIEMBRE</option>';
        B += '<option value="10">OCTUBRE</option>';
        B += '<option value="11">NOVIEMBRE</option>';
        B += '<option value="12">DICIEMBRE</option>';
        $("#comboFmes").append(B);
        var C;
        $("#comboFano").html("");
        for (var i = 2016; i >= 2014; i--) {
            C += '<option value=' + i + '>' + i + ' </option>';
        }
        $("#comboFano").append(C);
    }
    function cargarfechaFin() {
        var A;
        $("#comboFdiaF").html("");
        A += '<option value="01">01</option>';
        A += '<option value="02">02</option>';
        A += '<option value="03">03</option>';
        A += '<option value="04">04</option>';
        A += '<option value="05">05</option>';
        A += '<option value="06">06</option>';
        A += '<option value="07">07</option>';
        A += '<option value="08">08</option>';
        A += '<option value="09">09</option>';
        A += '<option value="10">10</option>';
        A += '<option value="11">11</option>';
        A += '<option value="12">12</option>';
        A += '<option value="13">13</option>';
        A += '<option value="14">14</option>';
        A += '<option value="15">15</option>';
        A += '<option value="16">16</option>';
        A += '<option value="17">17</option>';
        A += '<option value="18">18</option>';
        A += '<option value="19">19</option>';
        A += '<option value="20">20</option>';
        A += '<option value="21">21</option>';
        A += '<option value="22">22</option>';
        A += '<option value="23">23</option>';
        A += '<option value="24">24</option>';
        A += '<option value="25">25</option>';
        A += '<option value="26">26</option>';
        A += '<option value="27">27</option>';
        A += '<option value="28">28</option>';
        A += '<option value="29">29</option>';
        A += '<option value="30">30</option>';
        A += '<option value="31">31</option>';
        $("#comboFdiaF").append(A);
        var B;
        $("#comboFmes").html("");
        B += '<option value="01">ENERO</option>';
        B += '<option value="02">FEBRERO</option>';
        B += '<option value="03">MARZO</option>';
        B += '<option value="04">ABRIL</option>';
        B += '<option value="05">MAYO</option>';
        B += '<option value="06">JUNIO</option>';
        B += '<option value="07">JULIO</option>';
        B += '<option value="08">AGOSTO</option>';
        B += '<option value="09">SEPTIEMBRE</option>';
        B += '<option value="10">OCTUBRE</option>';
        B += '<option value="11">NOVIEMBRE</option>';
        B += '<option value="12">DICIEMBRE</option>';
        $("#comboFmesF").append(B);
        var C;
        $("#comboFanoF").html("");
        for (var i = 2016; i >= 2014; i--) {
            C += '<option value=' + i + '>' + i + ' </option>';
        }
        $("#comboFanoF").append(C);
    }
    var getDatosPROFE1 = function () {
        var dto = {};
        dto.id = $("#txtIdPro1").val();
        return dto;
    };
    var getDatosPROFE2 = function () {
        var dto = {};
        dto.id = $("#txtIdPro2").val();
        return dto;
    };
    var getDatosEST = function () {
        var dto = {};
        dto.id = $("#txtIdEst").val();
        return dto;
    };
    //----------------------------------------------------
    $('#txtIdEst').keyup(function (e) {
        if (e.keyCode == 13) {
            $(document.body).animate({ scrollTop: 800 }, 300);
            var btn = $('#btnL')
            btn.button('loading')
            $.ajax(".....").always(function () {
                filtro = 11;
                verificarEstId();
                btn.button('reset')
            });
        }
    });
    $('#txtIdEstN').keyup(function (e) {
        if (e.keyCode == 13) {
            $(document.body).animate({ scrollTop: 800 }, 300);
            var btn = $('#btnL')
            btn.button('loading')
            $.ajax(".....").always(function () {
                filtro = 12;
                verificarEstNom();
                btn.button('reset')
            });
        }
    });
    $('#txtIdProfe').keyup(function (e) {
        if (e.keyCode == 13) {
            $(document.body).animate({ scrollTop: 700 }, 300);
            var btn = $('#btnL')
            btn.button('loading')
            $.ajax(".....").always(function () {
                filtro = 21;
                
                verificarProfeId();
                btn.button('reset')
            });
        }
    });
    $('#txtIdProfeN').keyup(function (e) {
        if (e.keyCode == 13) {
            $(document.body).animate({ scrollTop: 700 }, 300);
            var btn = $('#btnL')
            btn.button('loading')
            $.ajax(".....").always(function () {
                filtro = 22;
                verificarProfeNom();
                btn.button('reset')
            });
        }
    });


    $('#txtIdEst').click(function () { filtro = 11; });
    $('#txtIdEstN').click(function () { filtro = 12; });
    $('#txtIdProfe').click(function () { filtro = 21; });
    $('#txtIdProfeN').click(function () { filtro = 22; });

    $('#txtIdPro1').keyup(function (e) {
        if (e.keyCode == 13) {
            var btn = $('#btnL')
            btn.button('loading')
            $.ajax(".....").always(function () {
                $(document.body).animate({ scrollTop: 500 }, 300);
                verificarProfe1();
                $("#botones").hide();
                btn.button('reset')
            });
        }
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
                    $("#comboIdAsig").html("");
                    conta = 0;
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
                Modal("Server: Error al cargar las asignaturas.", "Servidor no disponible");
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
                    redireccionar();
                }
                else {
                    $("#comboIdgrupo").html("");
                    P = result.d;
                    $.each(P, function (i, item) {
                        $("#comboIdgrupo").append("<option value=" + item.id_grupo + ">" + item.id_grupo + "</option>");
                    })
                }
            },
            error: function (result) {
                Modal("Server: Error al cargar los grupos.", "Servidor no disponible");
                redireccionar();
            }
        });
    }
    //pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp
    function verificarEstId() { // Verificamos que sea un estudiante
        if ($('#txtIdEst').val() == '') {
            Alerta("Error: Digite una identificación en el cuadro de texto y luego presione la tecla <strong> enter</strong> o haga clic en el botón <strong> gestionar </strong>para continuar.", "danger");
            $('#f-grilla').hide();
            $('#txtIdEst').focus();
        //} else if (($('#txtIdEst').val()).length < 8) {
        //    Alerta("Error: La identificación debe tener <strong> 8 caracteres</strong> como minimo .", "danger");
        //    $('#f-grilla').hide();
        //    $('#txtIdEst').focus();
        } else {
            var dto = {};
            dto.id = $("#txtIdEst").val();
            jsonData = "{'dto':" + JSON.stringify(dto) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/personas.asmx/c_persona",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        $('#f-grilla').hide();
                        Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no se encuentra registrada </strong> en la base de datos del sistema.<strong> Intente otra vez </strong>.", "Busqueda fallida.");
                        $("#txtIdEst").focus();
                    }
                    else {
                        P = result.d;
                        if (P.rol != "ESTUDIANTE") {
                            $('#f-grilla').hide();
                            $("#txtIdEst").focus();
                            Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no le pertenece a un estudiante </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                        } else if (P.rol == "ESTUDIANTE") {
                            $("#txtIdEst").attr('disabled', 'disabled');
                            $("#txtIdEstN").attr('disabled', 'disabled');
                            $("#txtIdEst").val(P.id);
                            CodEst = P.id;
                            filtrarXEst();
                            $("#txtApEst").val(P.apellidos);
                            $("#txtNomEst").val(P.nombres);
                            $('#f-grilla').show();

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
        if ($('#txtIdEstN').val() == '') {
            Alerta("Error: Digite un nombre en el cuadro de texto y luego haga clic en el botón <strong> gestionar </strong>para continuar.", "danger");
            $('#txtIdEstN').focus();
            $('#f-grilla').hide();
        }
        else {
            var dto = {};
            dto.id = $("#txtIdEstN").val();
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
                        $("#f-grilla").hide();
                        Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no se encuentra registrado </strong> en la base de datos del sistema", "Error al intentar realizar esta acción");
                        $("#txtIdEstN").focus();
                    }
                    else {
                        P = result.d;
                        if (P.rol != "ESTUDIANTE") {
                            $("#f-grilla").hide();
                            $("#txtIdEstN").focus();
                            Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no le pertenece a un estudiante </strong> y no puede gestionar este proceso. Revise.", "Error al intentar realizar esta acción");
                        } else if (P.rol == "ESTUDIANTE") {
                            $("#txtIdEst").attr('disabled', 'disabled');
                            $("#txtIdEstN").attr('disabled', 'disabled');
                            $("#txtApEst").val(P.apellidos);
                            $("#txtIdEst").val(P.id);
                            CodEst = P.id;
                            filtrarXEst();

                            $("#txtNomEst").val(P.nombres);
                            $("#f-grilla").show();
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
    function verificarProfeId() { // Verificamos que sea un Profediente
        if ($('#txtIdProfe').val() == '') {
            Alerta("Error: Digite una identificación en el cuadro de texto y luego presione la tecla <strong> enter</strong> o haga clic en el botón <strong> gestionar </strong>para continuar.", "danger");
            $("#f-grilla").hide();
            $('#txtIdProfe').focus();
        } else if (($('#txtIdProfe').val()).length < 8) {
            Alerta("Error: La identificación debe tener <strong> 8 caracteres</strong>como minimo .", "danger");
            $("#f-grilla").hide();
            $('#txtIdProfe').focus();
        } else {
            var dto = {};
            dto.id = $("#txtIdProfe").val();
            jsonData = "{'dto':" + JSON.stringify(dto) + "}";
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
                        $("#txtIdProfe").focus();
                        Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no se encuentra registrada </strong> en la base de datos del sistema", "Error al intentar realizar esta acción");
                    }
                    else {
                        P = result.d;
                        if (P.rol != "PROFESOR") {
                            $("#f-grilla").hide();
                            $("#txtIdProfe").focus();
                            Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no le pertenece a un acudiente </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                        } else if (P.rol == "PROFESOR" ) {
                            $("#txtIdProfe").attr('disabled', 'disabled');
                            $("#txtIdProfeN").attr('disabled', 'disabled');
                            $("#txtApProfe").val(P.apellidos);
                            $("#txtIdProfe").val(P.id);
                            CodProfe = P.id;
                            $("#txtNomProfe").val(P.nombres);
                            filtrarXProfe2();
                            $(document.body).animate({ scrollTop: 800 }, 300);
                            $("#f-grilla").show();
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
    function verificarProfeNom() { // Verificamos que sea un acudiente

        if ($('#txtIdProfeN').val() == '') {
            Alerta("Error: Digite un nombre en el cuadro de texto y luego haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
            $('#txtIdProfeN').focus();
        }
        else {
            var dto = {};
            dto.id = $("#txtIdProfeN").val();

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
                        $("#f-grilla").hide();
                        $("#txtIdProfeN").focus();
                        Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no se encuentra registrado </strong> en la base de datos del sistema", "Error al intentar realizar esta acción");
                    }
                    else {
                        P = result.d;
                        if (P.rol != "PROFESOR") {
                            $("#f-grilla").hide();
                            $("#txtIdProfeN").focus();
                            Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no le pertenece a un acudiente </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                        } else if (P.rol == "PROFESOR" ) {
                            $("#txtIdProfe").attr('disabled', 'disabled');
                            $("#txtIdProfeN").attr('disabled', 'disabled');
                            $("#txtApProfe").val(P.apellidos);
                            $("#txtIdProfe").val(P.id);
                            CodProfe = P.id;
                            $("#txtNomProfe").val(P.nombres);
                            filtrarXProfe2();
                            $(document.body).animate({ scrollTop: 800 }, 300);
                            $("#f-grilla").show();
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

//pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp

    function cargarPeriodos() {
        $.ajax({ // Carga de periodos
            type: "POST",
            url: "/WS/periodos.asmx/c_periodos",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Error de congruenciá: No existen periodos asignados. ");
                    redireccionar();
                }
                else {
                    P = result.d;
                    $("#comboPeriodos1").html("");
                    $("#comboPeriodos2").html("");
                    $.each(P, function (i, item) {
                        $("#comboPeriodos1").append("<option value=" + item.id + ">" + item.id + "</option>");
                        $("#comboPeriodos2").append("<option value=" + item.id + ">" + item.id + "</option>");
                    })
                }
            },
            error: function (result) {
                Modal("Servidor no disponible", "E1:2 al cargarPeriodos");
                redireccionar();
            }
        });
    }
    function cargarNotifiaciones() {
        var A;
        $("#comboNoti").html("");
        A += '<option value="PENDIENTE">PENDIENTE</option>';
        A += '<option value="VISTA">VISTA</option>';
        $("#comboNoti").append(A);
    }
    function cargarArchivos() {
        var A;
        $("#comboArchivo").html("");
        A += '<option value="SIN ARCHIVAR">SIN ARCHIVAR</option>';
        A += '<option value="ARCHIVADO">ARCHIVADO</option>';
        $("#comboArchivo").append(A);
    }
    /////////////////////////////////// DINAMISMOS DE LOS FILTROS ////////////////////////////////// 
    $('#btnPP').click(function () { //   1.1) Botón periodos y profesores 
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            $('#f-grupo').show(); $('#f-profeGrupo').show();
            $('#f-asignaturas').hide();
            $('#f-estudiantes').hide();
            $('#f-periodos').hide();
            $('#f-profesores').hide();
            $('#f-fechas').hide();
            $('#f-archivos').hide();
            $('#f-notificacion').hide();
            $('#botones').show();
            $('#txtIdProG').focus();
            filtro = 1;
            btn.button('reset')
        });
       
    });

    /////////////////////////////////// FIN DEL DINAMISMOS DE LOS FILTROS //////////////////////////////////
    var getDatosFiltro = function () {
        var dto = {};
        dto.id_grupo = $("#comboIdgrupo").val();
        dto.id_periodo1 = $("#comboPeriodos1").val();
        dto.id_periodo2 = $("#comboPeriodos2").val();
        dto.id_profe1 = $("#txtIdPro1").val();
        dto.id_profe2 = $("#txtIdPro2").val();
        dto.id_asignatura = $("#comboIdAsig").val();
        dto.id_estudiante = $("#txtIdEst").val();
        dto.id_archivo = $("#comboArchivo").val();
        dto.fecha_ini = $("#comboFdia").val() + "/" + $("#comboFmes").val() + "/" + $("#comboFano").val();
        dto.fecha_fin = $("#comboFdiaF").val() + "/" + $("#comboFmesF").val() + "/" + $("#comboFanoF").val();
        dto.id_notificacion = $("#comboNoti").val();

        return dto;
    };
    var getDatosFiltro2 = function () {
        var dto = {};
        dto.id_grupo = $("#comboIdgrupo").val();
        dto.id_periodo1 = $("#comboPeriodos1").val();
        dto.id_periodo2 = $("#comboPeriodos2").val();
        dto.id_profe1 = $("#txtIdPro1").val();
        dto.id_profe2 = CodProfe;
        dto.id_asignatura = $("#comboIdAsig").val();
        dto.id_estudiante = CodEst;
        dto.id_archivo = $("#comboArchivo").val();
        dto.fecha_ini = $("#comboFdia").val() + "/" + $("#comboFmes").val() + "/" + $("#comboFano").val();
        dto.fecha_fin = $("#comboFdiaF").val() + "/" + $("#comboFmesF").val() + "/" + $("#comboFanoF").val();
        dto.id_notificacion = $("#comboNoti").val();

        return dto;
    };
   
    function verificarProfe1() { // Verificamos que sea un estudiante
        buscarPro1 = 0;
        if ($('#txtIdPro1').val() == '') {
            Alerta("Error: Digite una identificación en el cuadro de texto y luego presione la tecla <strong> enter</strong> o haga clic en el botón <strong> gestionar </strong>para continuar.", "danger");
            $('#txtIdPro1').focus();
        } else if (($('#txtIdPro1').val()).length < 8) {
            Alerta("Error: La identificación debe tener <strong> 8 caracteres</strong>como minimo .", "danger");
            $('#txtIdPro1').focus();
            $('#f-grilla').hide();
        } else {
            
            jsonData = "{'dto':" + JSON.stringify(getDatosPROFE1()) + "}";

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
                        $("#txtIdPro1").focus();
                        buscarPro1 = 0;
                    }
                    else {
                        P = result.d;
                        if (P.rol != "PROFESOR") {
                            $("#f-grilla").hide();
                            $("#txtIdPro1").focus();
                            buscarPro1 = 0;
                            Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no le pertenece a un profesor </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                        } else if (P.rol == "PROFESOR") {
                            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
                            $("#f-grilla").show();
                            buscarPro1 = 1;
                        }
                    }

                    if (buscarPro1 == 1) {
                        filtrarXGrupoXPXProfe1();}
                  

                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                }
            });
        }

    }
 
    $('#btnG').click(function () { // Botón gestionar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            filtro = $("#comboFiltros").val();
            if (filtro == 0) {
                $('#f-grupo').show(); $('#f-profeGrupo').hide();
                $('#f-asignaturas').hide();
                $('#f-estudiantes').hide();
                $('#f-periodos').hide();
                $('#f-profesores').hide();
                $('#f-fechas').hide();
                $('#f-archivos').hide();
                $('#f-notificacion').hide();
                $('#botones').show();
                $('#comboIdgrupo').focus();
            }
            if (filtro == 1) {
                $('#f-grupo').show(); $('#f-profeGrupo').show();
                $('#f-asignaturas').hide();
                $('#f-estudiantes').hide();
                $('#f-periodos').hide();
                $('#f-profesores').hide();
                $('#f-fechas').hide();
                $('#f-archivos').hide();
                $('#f-notificacion').hide();
                $('#botones').show();
                $('#txtIdProG').focus();
            }
            if (filtro == 2) {
                $('#f-grupo').hide(); $('#f-profeGrupo').hide();
                $('#f-asignaturas').show();
                $('#f-estudiantes').hide();
                $('#f-periodos').hide();
                $('#f-profesores').hide();
                $('#f-fechas').hide();
                $('#f-archivos').hide();
                $('#f-notificacion').hide();
                $('#botones').show();
                $('#comboIdAsig').focus();
            }
            if (filtro == 3) {
                $('#f-grupo').hide(); $('#f-profeGrupo').hide();
                $('#f-asignaturas').hide();
                $('#f-estudiantes').show();
                $('#f-periodos').hide();
                $('#f-profesores').hide();
                $('#f-fechas').hide();
                $('#f-archivos').hide();
                $('#f-notificacion').hide();
                $('#botones').show();
                $('#txtIdEst').focus();
            }
            if (filtro == 4) {
                $('#f-grupo').hide(); $('#f-profeGrupo').hide();
                $('#f-asignaturas').hide();
                $('#f-estudiantes').hide();
                $('#f-periodos').show();
                $('#f-profesores').hide();
                $('#f-fechas').hide();
                $('#f-archivos').hide();
                $('#f-notificacion').hide();
                $('#botones').show();
                $('#comboPeriodos2').focus();
            }
            if (filtro == 5) {
                $('#f-grupo').hide(); $('#f-profeGrupo').hide();
                $('#f-asignaturas').hide();
                $('#f-estudiantes').hide();
                $('#f-periodos').hide();
                $('#f-profesores').show();
                $('#f-fechas').hide();
                $('#f-archivos').hide();
                $('#f-notificacion').hide();
                $('#botones').show();
                $('#txtIdPro').focus();
            }
            if (filtro == 6) {
                $('#f-grupo').hide(); $('#f-profeGrupo').hide();
                $('#f-asignaturas').hide();
                $('#f-estudiantes').hide();
                $('#f-periodos').hide();
                $('#f-profesores').hide();
                $('#f-fechas').show();
                $('#f-archivos').hide();
                $('#f-notificacion').hide();
                $('#botones').show();
                $('#fechaIni').focus();
            }
            if (filtro == 7) {
                $('#f-grupo').hide(); $('#f-profeGrupo').hide();
                $('#f-asignaturas').hide();
                $('#f-estudiantes').hide();
                $('#f-periodos').hide();
                $('#f-profesores').hide();
                $('#f-fechas').hide();
                $('#f-archivos').show();
                $('#f-notificacion').hide();
                $('#botones').show();
                $('#comboArchivo').focus();
            }
            if (filtro == 8) {
                $('#f-grupo').hide(); $('#f-profeGrupo').hide();
                $('#f-asignaturas').hide();
                $('#f-estudiantes').hide();
                $('#f-periodos').hide();
                $('#f-profesores').hide();
                $('#f-fechas').hide();
                $('#f-archivos').hide();
                $('#f-notificacion').show();
                $('#botones').show();
                $('#comboNoti').focus();
            }
            if (filtro == 9) {
                $('#f-grupo').hide(); $('#f-profeGrupo').hide();
                $('#f-asignaturas').hide();
                $('#f-estudiantes').hide();
                $('#f-periodos').hide();
                $('#f-profesores').hide();
                $('#f-fechas').hide();
                $('#f-archivos').hide();
                $('#f-notificacion').hide();
                $('#botones').show();
            }

            btn.button('reset')
        });
    });
    $('#btnL').click(function () { // Botón gestionar el listado
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            if (filtro == 0) {
                $(document.body).animate({ scrollTop: 500 }, 300);
                filtrarXGroup();
            } else if (filtro == 1) {
                $(document.body).animate({ scrollTop: 500 }, 300);
                verificarProfe1();
            }
            else if (filtro == 2) {
                $(document.body).animate({ scrollTop: 700 }, 300);
                filtrarXAsig();
            }
            else if (filtro == 11) {
                $(document.body).animate({ scrollTop: 700 }, 300);
                verificarEstId();
            }
            else if (filtro == 12) {
                $(document.body).animate({ scrollTop: 700 }, 300);
                verificarEstNom();
            }
            else if (filtro == 4) {
                $(document.body).animate({ scrollTop: 500 }, 300);
                filtrarXPer();
            }
            else if (filtro == 21) {
                $(document.body).animate({ scrollTop: 700 }, 300);
                
                verificarProfeId();
            }
            else if (filtro == 22) {
                $(document.body).animate({ scrollTop: 700 }, 300);
                verificarProfeNom();
                
            }
            else if (filtro == 6) {
                $(document.body).animate({ scrollTop: 600 }, 300);
                filtrarXFecha();
                

            }
            else if (filtro == 7) {
                $(document.body).animate({ scrollTop: 500 }, 300);
                filtrarXArchivo();
            }
            else if (filtro == 8) {
                $(document.body).animate({ scrollTop: 500 }, 300);
                filtrarXNoti();
            }
            else if (filtro == 9) {
                $(document.body).animate({ scrollTop: 1500 }, 300);
                filtrarXAll();
            }
            $("#botones").hide();
            btn.button('reset')
        });
    });
    //---------------------------FUNCIONES DE LOS FILTROS ------------------------
    function filtrarXGrupoXPXProfe1() {
          jsonData = "{'dto':" + JSON.stringify(getDatosFiltro()) +
                      ",'dtob':" + JSON.stringify(getBitacora("OBSERVACIONES", "LISTAR", "FILTRO POR GRUPO, PERIODO Y PROFESOR")) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/observaciones.asmx/c_obserxIdGXPerXProfe",
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
                        Modal("No hay listado de observaciones para este tipo de filtro. ", " No hay observaciones");
                        $("#f-grilla").hide();
                    }
                    else {
                        Alerta("Filtro de observaciones por grupo, periodo y profesor realizado de forma exitosa", "success");
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
    function filtrarXAsig() {
        jsonData = "{'dto':" + JSON.stringify(getDatosFiltro()) +
                      ",'dtob':" + JSON.stringify(getBitacora("OBSERVACIONES", "LISTAR", "FILTRO POR ASIGNATURAS")) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/observaciones.asmx/c_obserXIdAsig",
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
                    Modal("No hay listado de observaciones para este tipo de filtro. ", " No hay observaciones");
                    $("#f-grilla").hide();
                }
                else {
                    Alerta("Filtro de observaciones por asignaturas realizado de forma exitosa", "success");
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
    function filtrarXGroup() {
        jsonData = "{'dto':" + JSON.stringify(getDatosFiltro()) +
                      ",'dtob':" + JSON.stringify(getBitacora("OBSERVACIONES", "LISTAR", "FILTRO POR GRUPOS")) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/observaciones.asmx/c_obserXIdGY",
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
                    Modal("No hay listado de observaciones para este tipo de filtro. ", " No hay observaciones");
                    $("#f-grilla").hide();
                }
                else {
                    Alerta("Filtro de observaciones por grupos realizado de forma exitosa", "success");
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
    function filtrarXPer() {
            jsonData = "{'dto':" + JSON.stringify(getDatosFiltro()) +
                      ",'dtob':" + JSON.stringify(getBitacora("OBSERVACIONES", "LISTAR", "FILTRO POR PERIODOS")) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/observaciones.asmx/c_obserXIdP",
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
                        Modal("No hay listado de observaciones para este tipo de filtro. ", " No hay observaciones");
                        $("#f-grilla").hide();
                    }
                    else {
                        Alerta("Filtro de observaciones por periodo realizado de forma exitosa", "success");
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
    function filtrarXProfe2() {
        jsonData = "{'dto':" + JSON.stringify(getDatosFiltro2()) +
                  ",'dtob':" + JSON.stringify(getBitacora("OBSERVACIONES", "LISTAR", "FILTRO POR PROFESOR")) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/observaciones.asmx/c_obserXIdProfe",
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
                    Modal("No hay listado de observaciones para este tipo de filtro. ", " No hay observaciones");
                    $("#f-grilla").hide();
                }
                else {
                    Alerta("Filtro de observaciones por profesor realizado de forma exitosa", "success");
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
    function filtrarXEst() {
        $(document.body).animate({ scrollTop: 800 }, 300);
        jsonData = "{'dto':" + JSON.stringify(getDatosFiltro()) +
                  ",'dtob':" + JSON.stringify(getBitacora("OBSERVACIONES", "LISTAR", "FILTRO POR ESTUDIANTE")) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/observaciones.asmx/c_obserXIdEst",
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
                    Modal("No hay listado de observaciones para este tipo de filtro. ", " No hay observaciones");
                    $("#f-grilla").hide();
                    $("#LcomboIdgrupoEst").hide();
                    $("#comboIdgrupoEst").hide();
                    $("#btnI").hide();
                }
                else {
                    Alerta("Filtro de observaciones por estudiante realizado de forma exitosa", "success");
                    P = result.d;
                    $("#btnI").show();
                    $("#LcomboIdgrupoEst").show();
                    $("#comboIdgrupoEst").show();
                    cargarGruposDelEst();
                    titleGrilla();
                    $.each(P, function (i, item) {
                        AddItemGrilla(item);
                    });
                }
            },
            error: function (result) {
                Modal("Server: Error de servidor.", "Error de servidor");
            }
        });
    }
    function filtrarXFecha() {
        jsonData = "{'dto':" + JSON.stringify(getDatosFiltro()) +
                  ",'dtob':" + JSON.stringify(getBitacora("OBSERVACIONES", "LISTAR", "FILTRO POR FECHA")) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/observaciones.asmx/c_obserXFecha",
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
                    Modal("No hay listado de observaciones para este tipo de filtro. ", " No hay observaciones");
                    $("#botones").show();
                    $("#f-grilla").hide();
                }
                else {
                    Alerta("Filtro de observaciones por fecha realizado de forma exitosa", "success");
                    $("#botones").show();
                    P = result.d;
                    titleGrilla();
                    $.each(P, function (i, item) {
                        AddItemGrilla(item);
                    });
                }
            },
            error: function (result) {
                Modal("Server: Error de servidor.", "Error de servidor");
            }
        });
    }
    function filtrarXArchivo() {
        jsonData = "{'dto':" + JSON.stringify(getDatosFiltro()) +
                   ",'dtob':" + JSON.stringify(getBitacora("OBSERVACIONES", "LISTAR", "FILTRO POR ARCHIVO")) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/observaciones.asmx/c_obserXArchivo",
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
                    Modal("No hay listado de observaciones para este tipo de filtro. ", " No hay observaciones");
                    $("#f-grilla").hide();
                }
                else {
                    Alerta("Filtro de observaciones por estado de archivación realizado de forma exitosa", "success");
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
    function filtrarXNoti() {
        jsonData = "{'dto':" + JSON.stringify(getDatosFiltro()) +
                   ",'dtob':" + JSON.stringify(getBitacora("OBSERVACIONES", "LISTAR", "FILTRO POR NOTIFICACION")) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/observaciones.asmx/c_obserXNotificacion",
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
                    Modal("No hay listado de observaciones para este tipo de filtro. ", " No hay observaciones");
                    $("#f-grilla").hide();
                }
                else {
                    Alerta("Filtro de observaciones por estado de notificación realizado de forma exitosa", "success");
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
    $('#btnN').click(function () { // Botón nuevo
        nuevo();
    });
    function filtrarXAll() {
       
        jsonData = "{'dtob':" + JSON.stringify(getBitacora("OBSERVACIONES", "LISTAR TODOS", "NINGUNA")) + "}";
      
        $.ajax({
            type: "POST",
            url: "/WS/observaciones.asmx/c_listaObservaciones",
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
                    Modal("No hay observaciones para este tipo de filtro. ", " No hay observaciones");
                    $("#f-grilla").hide();
                }
                else {
                    Alerta("Listado de todas las observaciones registradas en el sistema de forma exitosa", "success");
                    $("#f-grilla").show();
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
    function nuevo() {
        Alerta("Usuario: Escoja el tipo de <strong>filtro</strong> que desea aplicar a la consulta de observaciones registradas en el sistema y luego haga clic en el botón <strong>Listar</strong>.", "info");
        $('#f-grilla').hide();
        $('#f-grupo').hide();
        $('#f-profeGrupo').hide();
        $('#f-asignaturas').hide();
        $('#f-estudiantes').hide();
        $('#f-periodos').hide();
        $('#f-profesores').hide();
        $('#f-fechas').hide();
        $('#f-archivos').hide();
        $('#f-notificacion').hide();
        $('#botones').hide();
        $('#txtIdEst').val(); // para pruebas
        $('#txtIdPro1').val(""); // para pruebas
        $('#txtIdPro2').val(""); // para pruebas
        $("#comboFdia").val("01");
        $("#comboFmes").val("01");
        $("#comboFano").val("2014");
        $("#btnN").show();
        $("#comboFdiaF").val("31");
        $("#comboFmesF").val("12");
        $("#comboFanoF").val("2015");


        $("#txtIdEst").val("");
        $("#txtIdEstN").val("");
        $("#txtIdProfe").val("");
        $("#txtIdProfeN").val("");
        $("#txtNomEst").val("");
        $("#txtApEst").val("");
        $("#txtNomProfe").val("");
        $("#txtApProfe").val("");
        $("#txtIdEst").removeAttr('disabled');
        $("#txtIdEstN").removeAttr('disabled');
        $("#txtIdProfe").removeAttr('disabled');
        $("#txtIdProfeN").removeAttr('disabled');

        pos = 0;
    }
    //grilla para  llistar
    function titleGrilla() {
        $("#grilla").val("")
        $("#Ltotal").text("");;
        var newtitle = "<tr>";
        newtitle += '<th class="col-sm-1">Ref</th>';
        newtitle += '<th class="col-sm-1">IdEst </th>';
        newtitle += '<th class="col-sm-1">IdAsig</th>';
        newtitle += '<th class="col-sm-1">IdGrupo</th>';
        newtitle += '<th class="col-sm-1">IdPeriodo</th>';
        newtitle += '<th class="col-sm-1">IdProfe</th>';
        newtitle += '<th class="col-sm-2">Descripción</th>';
        newtitle += '<th class="col-sm-1">Fecha</th>';
        newtitle += '<th class="col-sm-1">Tipo</th>';
        newtitle += '<th class="col-sm-1">Notificación</th>';
        newtitle += '<th class="col-sm-1">Estado</th>';
        newtitle += "</tr>";
        $("#grilla").append(newtitle);
    };
    var AddItemGrilla = function (item) { // CONTENIDO DE LA GRILLA
        conta++;
        array.push(item);
        var nuevaCol = "<tr>";
        nuevaCol += "<td>" + item.referencia + "</td>";
        nuevaCol += "<td>" + item.id_estudiante + "</td>";
        nuevaCol += "<td>" + item.id_asignatura + "</td>";
        nuevaCol += "<td>" + item.id_grupo + "</td>";
        nuevaCol += "<td>" + item.id_periodo + "</td>";
        nuevaCol += "<td>" + item.id_profesor + "</td>";
        nuevaCol += "<td>" + item.observacion + "</td>";
        nuevaCol += "<td>" + item.fecha + "</td>";
        nuevaCol += "<td>" + item.tipo + "</td>";
        nuevaCol += "<td>" + item.notificacion + "</td>";
        nuevaCol += "<td>" + item.acceso + "</td>";
        nuevaCol += "</tr>";
        $("#Ltotal").text("Total:" + conta);
        $("#grilla").append(nuevaCol);
    };
    //--------------------------------------------------------------------------------------------------

//});
