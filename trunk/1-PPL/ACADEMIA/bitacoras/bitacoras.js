

//$(document).ready(function () {
    WinMove();
    var conta;
    var filtro;
    var Pos;
    var buscarEst, buscarPro1, buscarPro2;
    var P = {};
    cargarfechaFin();
    cargarfechaInicio();
    FiltrosDisponibles();
    //---------------------------------- validamos que este logueado el usuario ----------------------------------------------
    validar_pagina();
    //---------------------------------- validamos que el rol del usuario pueda ingresar a esta pagina -----------------------
    DenegarAccesoToSuper();
    //---------------------------------- --------------------------------------------------------------------------------------
    cargarCombos();
    nuevo();
    function FiltrosDisponibles() {
        var A;
        $("#comboFiltros").html("");
        A += '<option value="0">POR SECCÍON</option>';
        A += '<option value="1">POR ACCÍON</option>';
        A += '<option value="2">POR USUARIO</option>';
        A += '<option value="3">POR FECHA</option>';
        A += '<option value="4">LISTAR TODOS LOS REGISTROS (VACIAR E IMPRIMIR BITACORA)</option>';
        $("#comboFiltros").append(A);
    }
    var array = new Array();
    var jsonData;

    $('#btnG').click(function () { // Botón gestionar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            filtro = $("#comboFiltros").val();
            if (filtro == 0) {
                $('#f-usuario').hide();
                $('#f-accion').hide();
                $('#f-seccion').show();
                $('#f-fechas').hide();
                $('#botones').show();
                $('#comboSeccion').focus();
            }
            if (filtro == 1) {
                $('#f-usuario').hide();
                $('#f-accion').show();
                $('#f-seccion').hide();
                $('#f-fechas').hide();
                $('#botones').show();
                $('#comboAction').focus();
            }
            if (filtro == 2) {
                $('#f-usuario').show();
                $('#f-accion').hide();
                $('#f-seccion').hide();
                $('#f-fechas').hide();
                $('#botones').show();
                $('#txtId').focus();
            }
            if (filtro == 3) {
                $('#f-usuario').hide();
                $('#f-accion').hide();
                $('#f-seccion').hide();
                $('#f-fechas').show();
                $('#botones').show();
                $('#comboFdia').focus();
            }
            if (filtro == 4) {
                $('#f-usuario').hide();
                $('#f-accion').hide();
                $('#f-seccion').hide();
                $('#f-fechas').hide();
                filtrarXAll();
               
            }
            btn.button('reset')
        });
    });
    $('#btnL').click(function () { // Botón gestionar el listado
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            $(document.body).animate({ scrollTop: 350 }, 300);
            if (filtro == 0) {
                filtrarXSeccion();
            } else if (filtro == 1) {
                filtrarXAccion();
            }
            else if (filtro == 2) {
                verificarUsuario();
            }
            else if (filtro == 3) {
                //filtrarXFecha();
                jsonData = "{'dto':" + JSON.stringify(getDatosFiltro()) + "}";
                $.ajax({
                    type: "POST",
                    url: "/WS/bitacoras.asmx/c_bitacoraFecha",
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    success: function (result) {

                        if (result.d == null) {
                            Modal("No hay listado de registros para este tipo de filtro. ", " No hay registros");
                            $("#f-grilla").hide();
                            $('#grilla').html("");
                            $('#grilla').hide();
                        }
                        else {
                            $("#f-grilla").show();
                            $('#grilla').html("");
                            $('#grilla').show();
                            Alerta("Filtro de la bitacora por fecha realizado de forma exitosa", "success");
                            var P = {};
                            P = result.d;
                            titleGrilla();
                            conta = 0;
                            $.each(P, function (i, item) {
                                AddItemGrilla(item);
                            })
                        }
                    },
                    error: function (result) {
                        Modal("Server: Error de servidor.", "Servidor no disponible");
                    }
                });


            }
          
          
            btn.button('reset')
        });
    });

    $("#comboFiltros").click(function () {
        $("#botones").hide();
    });
    function cargarCombos() {
        var A;
        $("#comboSeccion").html("");
        A += '<option value="AREAS">AREAS</option>';
        A += '<option value="ASIGNATURAS">ASIGNATURAS</option>';
        A += '<option value="BITACORAS">BITACORAS</option>';
        A += '<option value="DIRECTOR_G">DIRECTOR_G</option>';
        A += '<option value="GRADOS">GRADOS</option>';
        A += '<option value="GRUPOS">GRUPOS</option>';
        A += '<option value="HORARIOS">HORARIOS</option>';
        A += '<option value="JORNADAS">JORNADAS</option>';
        A += '<option value="LOGIN">LOGIN</option>';
        A += '<option value="LOGOUT">LOGOUT</option>';
        A += '<option value="LOGROS">LOGROS</option>';
        A += '<option value="MATRICULAS">MATRICULAS</option>';
        A += '<option value="NOTAS">NOTAS</option>';
        A += '<option value="OBSERVACIONES">OBSERVACIONES</option>';
        A += '<option value="PERIODOS">PERIODOS</option>';
        A += '<option value="PERSONAS">PERSONAS</option>';
        A += '<option value="ROLES">ROLES</option>';
        A += '<option value="USUARIOS">USUARIOS</option>';
        $("#comboSeccion").append(A);
        var B;
        $("#comboAction").html("");
        B += '<option value="ARCHIVAR">ARCHIVAR (OBSERVACIONES)</option>';
        B += '<option value="ELIMINAR">ELIMINAR</option>';
        B += '<option value="EXPORTAR">EXPORTAR (USUARIOS)</option>';
        B += '<option value="GENERAR">GENERAR (REPORTES)</option>';
        B += '<option value="HABILITAR-E">HABILITAR-E (REPORTES)</option>';
        B += '<option value="HABILITAR-M">HABILITAR-M (REPORTES)</option>';
        B += '<option value="HABILITAR-R">HABILITAR-R (REPORTES)</option>';
        B += '<option value="INICIAR">INICIAR (LOGIN)</option>';
        B += '<option value="LISTAR">LISTAR</option>';
        B += '<option value="LISTAR GRUPO">LISTAR GRUPO (USUARIOS)</option>';
        B += '<option value="LISTAR PROFESORES">LISTAR PROFESORES (USUARIOS)</option>';
        B += '<option value="LISTAR TODOS">LISTAR TODOS</option>';
        B += '<option value="MODIFICAR">MODIFICAR</option>';
        B += '<option value="MODIFICAR-C">MODIFICAR-C (USUARIOS)</option>';
        B += '<option value="REGISTRAR">REGISTRAR</option>';
        B += '<option value="SALIR">SALIR (LOGOUT)</option>';
        B += '<option value="VACIAR">VACIAR (BITACORA)</option>';
        B += '<option value="VERIFICAR"> VERIFICAR (USUARIOS)</option>';

        $("#comboAction").append(B);
    }
  
    $('#btnV').click(function () { // Botón vaciar bitacora
        jsonData = "{'dtob':" + JSON.stringify(getBitacora("BITACORAS", "VACIAR", "VACIADA POR EL SUPER USUARIO")) + "}"; //Registro de bitacora
        $.ajax({
            type: "POST",
            url: "/WS/bitacoras.asmx/v_bitacora",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Error al intentar vaciar la bitacora.", "Error al vaciar");
                }
                else {
                    Modal(JSON.stringify(result.d), "Bitacora vaciada de forma exitosa.");
                    listarToda();
                }
            },
            error: function (result) {
                Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
            }
        });
    });
    function titleGrilla() {
        $("#grilla").val("");
        var newtitle = "<tr>";
        newtitle += '<th class="col-sm-1">#</th>';
        newtitle += '<th class="col-sm-2">Seccion</th>';
        newtitle += '<th class="col-sm-2">Accion</th>';
        newtitle += '<th class="col-sm-2">Usuario</th>';
        newtitle += '<th class="col-sm-2">Id usuario</th>';
        newtitle += '<th class="col-sm-3">Fecha</th>';
        newtitle += '<th class="col-sm-2">Observacion</th>';
        newtitle += "</tr>";
        $("#grilla").append(newtitle);
    };
    var AddItemGrilla = function (item) {
        conta++;
        array.push(item);
        var nuevaCol = "<tr>";
        nuevaCol += "<td>" + conta + "</td>";
        nuevaCol += "<td>" + item.seccion + "</td>";
        nuevaCol += "<td>" + item.accion + "</td>";
        nuevaCol += "<td>" + item.usuario + "</td>";
        nuevaCol += "<td>" + item.id_usuario + "</td>";
        nuevaCol += "<td>" + item.fecha + "</td>";
        nuevaCol += "<td>" + item.observacion + "</td>";
        nuevaCol += "</tr>";
        $("#grilla").append(nuevaCol);
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
    $('#txtId').keyup(function (e) {
        if (e.keyCode == 13) {
            var btn = $('#btnL')
            btn.button('loading')
            $.ajax(".....").always(function () {
                $(document.body).animate({ scrollTop: 350 }, 300);
                btn.button('reset')
            });
            verificarUsuario();
        }
    });
    $('#btnGenerar').click(function () { // Botón imprimir todos
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            window.open("/ACADEMIA/reportes/reports/bitacora-all.aspx");
            btn.button('reset')
        });
    });

    /////////////////////////////////// FIN DEL DINAMISMOS DE LOS FILTROS //////////////////////////////////
    var getDatosFiltro = function () {
        var dto = {};
        dto.seccion = $("#comboSeccion").val();
        dto.accion = $("#comboAction").val();
        dto.id_usuario = $("#txtId").val();
        dto.fecha_ini = $("#comboFdia").val() + "/" + $("#comboFmes").val() + "/" + $("#comboFano").val();
        dto.fecha_fin = $("#comboFdiaF").val() + "/" + $("#comboFmesF").val() + "/" + $("#comboFanoF").val();
        return dto;
    };
    function verificarUsuario() { // Verificamos 
        buscarEst = 0;
        if ($('#txtId').val() == '') {
            Alerta("Error: Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
            $('#txtId').focus();
        } else {
            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
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
                        var P = {};
                        P = result.d;
                        filtrarXUsuario();
                    }
                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                }
            });
        }
    }
    //---------------------------FUNCIONES DE LOS FILTROS ------------------------
    function filtrarXAll() {
        $.ajax({
            type: "POST",
            url: "/WS/bitacoras.asmx/c_bitacora",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                $("#f-grilla").show();
                $('#grilla').html("");
                $('#grilla').show();
                if (result.d == null) {
                    Modal("No hay listado de registros. ", " No hay registros");
                    $("#f-grilla").hide();
                }
                else {
                    $("#f-grilla").show();
                    Modal("Listado de toda la bitacora del sistema. Tenga presente que usted puede <strong>generar un archivo para imprimirla o vaciarla </strong>. ", " Bitacara consultada");
                    var P = {};
                    P = result.d;
                    conta = 0;
                    titleGrilla();
                    $.each(P, function (i, item) {
                        AddItemGrilla(item);
                    })
                    $(document.body).animate({ scrollTop: 10000 }, 300);

                    $('#btnV').show();
                    $('#btnGenerar').show();

                    $('#btnV').focus();
                }
            },
            error: function (result) {
                Modal("Al parecer la cantidad de registro en la bitacora supera la capacidad para visualizarlos en esta pagina. Le recomendamos que haga clic en <strong> generar archivo </strong>para poder verlos todos.", " Capacidad superada");
                $('#btnV').show();
                $("#f-grilla").show();
                $('#btnGenerar').show();
            }
        });
    }
    function filtrarXSeccion() {
        jsonData = "{'dto':" + JSON.stringify(getDatosFiltro()) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/bitacoras.asmx/c_bitacoraSeccion",
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
                    Modal("No hay listado de registros para este tipo de filtro. ", " No hay registros");
                    $("#f-grilla").hide();
                }
                else {
                    Alerta("Filtro de la bitacora por seccion realizado de forma exitosa", "success");
                    var P = {};
                    P = result.d;
                    titleGrilla();
                    $.each(P, function (i, item) {
                        AddItemGrilla(item);
                    })
                    $('#btnV').hide();
                    $('#btnGenerar').hide();

                }
            },
            error: function (result) {
                Modal("Al parecer la cantidad de registro en la bitacora supera la capacidad para visualizarlos en esta pagina. Le recomendamos que haga clic en <strong> generar archivo </strong>para poder verlos todos. Seleccione la opcion LISTAR TODOS LOS REGISTROS en Filtros disponibles para poder visualizarlos todos", " Capacidad superada");
                $("#f-grilla").hide();
            }
        });
    }
    function filtrarXAccion() {
        jsonData = "{'dto':" + JSON.stringify(getDatosFiltro()) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/bitacoras.asmx/c_bitacoraAccion",
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
                    Modal("No hay listado de registros para este tipo de filtro. ", " No hay registros");
                    $("#f-grilla").hide();
                }
                else {
                    Alerta("Filtro de la bitacora por acción realizado de forma exitosa", "success");
                    var P = {};
                    P = result.d;
                    titleGrilla();
                    $.each(P, function (i, item) {
                        AddItemGrilla(item);
                    })
                    $('#btnV').hide();
                    $('#btnGenerar').hide();
                }
            },
            error: function (result) {
                Modal("Al parecer la cantidad de registro en la bitacora supera la capacidad para visualizarlos en esta pagina. Le recomendamos que haga clic en <strong> generar archivo </strong>para poder verlos todos. Seleccione la opcion LISTAR TODOS LOS REGISTROS en Filtros disponibles para poder visualizarlos todos", " Capacidad superada");
                $("#f-grilla").hide();
            }
        });
    }
    function filtrarXUsuario() {
        jsonData = "{'dto':" + JSON.stringify(getDatosFiltro()) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/bitacoras.asmx/c_bitacoraCodUsuario",
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
                    Modal("No hay listado de registros para este tipo de filtro. ", " No hay registros");
                    $("#f-grilla").hide();
                }
                else {
                    Alerta("Filtro de la bitacora por usuario realizado de forma exitosa", "success");
                    var P = {};
                    P = result.d;
                    titleGrilla();
                    $.each(P, function (i, item) {
                        AddItemGrilla(item);
                    })
                    $('#btnV').hide();
                    $('#btnGenerar').hide();
                }
            },
            error: function (result) {
                Modal("Al parecer la cantidad de registro en la bitacora supera la capacidad para visualizarlos en esta pagina. Le recomendamos que haga clic en <strong> generar archivo </strong>para poder verlos todos. Seleccione la opcion LISTAR TODOS LOS REGISTROS en Filtros disponibles para poder visualizarlos todos", " Capacidad superada");
                $("#f-grilla").hide();

            }
        });
    }
    function filtrarXFecha() {
        jsonData = "{'dto':" + JSON.stringify(getDatosFiltro()) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/bitacoras.asmx/c_bitacoraFecha",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                
                if (result.d == null) {
                    Modal("No hay listado de registros para este tipo de filtro. ", " No hay registros");
                    $("#f-grilla").hide();
                    $('#grilla').html("");
                    $('#grilla').hide();
                }
                else {
                    $("#f-grilla").show();
                    $('#grilla').html("");
                    $('#grilla').show();
                    Alerta("Filtro de la bitacora por fecha realizado de forma exitosa", "success");
                    var P = {};
                    P = result.d;
                    titleGrilla();
                    conta = 0;
                    $.each(P, function (i, item) {
                        AddItemGrilla(item);
                    })
                    $('#btnV').hide();
                    $('#btnGenerar').hide();
                }
            },
            error: function (result) {
                Modal("Al parecer la cantidad de registro en la bitacora supera la capacidad para visualizarlos en esta pagina. Le recomendamos que haga clic en <strong> generar archivo </strong>para poder verlos todos. Seleccione la opcion LISTAR TODOS LOS REGISTROS en Filtros disponibles para poder visualizarlos todos", " Capacidad superada");
                $("#f-grilla").hide();
            }
        });

    }
    $('#btnN').click(function () { // Botón nuevo
        nuevo();
    });
    function nuevo() {
        Alerta("Usuario: Escoja el tipo de <strong>filtro</strong> que desea aplicar a la consulta de observaciones registradas en el sistema y luego haga clic en el botón <strong>Listar</strong>.", "info");
        $('#f-grilla').hide();
        $("#comboFdia").val("01");
        $("#comboFmes").val("01");
        $("#comboFano").val("2014");

        $("#comboFdiaF").val("31");
        $("#comboFmesF").val("12");
        $("#comboFanoF").val("2015");

        $('#txtId').val("");
        $('#f-usuario').hide();
        $('#btnGenerar').hide();
        $('#btnV').hide();
        $('#f-accion').hide();
        $('#f-seccion').hide();
        $('#f-fechas').hide();
        $('#botones').hide();
        pos = 0;
    }
    //--------------------------------------------------------------------------------------------------

//});


