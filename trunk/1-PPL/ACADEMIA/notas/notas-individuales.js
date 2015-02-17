
//$(document).ready(function () {
    WinMove();
    var conta = 0;
    var conta2 = 0;
    var CodAsig, NombreAsig, Busqueda,  CodGrado, CodGrupo, CodProfe;
    var jsonData;
    var Listado;
    var dataLogros, filtro, filtroEst;
    var ba;
    Busqueda = "N";
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
            cargarPeriodos();
            verificarSiEsProfesor();
            $("#formPPAL").show();
            $("#imgload").hide();
        });
    }
    function verificarSiEsProfesor() {
        if (localStorage.getItem('SeccionRol') == "PROFESOR") {
            $("#f-inicial").hide();
            CodProfe = localStorage.getItem('SeccionId');
            verificarProfesorId();
        } else {
            $("#f-inicial").show();
            $("#txtId").val("");
            $("#txtId").focus();
        }
    }
    var array = new Array(); // variable para las grillas en los formularios
    var getDatosLogro = function () {
        var dto = {};
        dto.id = $("#comboLogros").val();
        return dto;
    };

    var getDatosLogrosAsig = function () {
        var dto = {};
        dto.id_grado = CodGrado;
        dto.id_asignatura = CodAsig;
        return dto;
    };

    var getDatosNotas = function () {
        var dto = {};
        dto.id_estudiante = $("#txtIdEst").val();
        dto.id_asignatura = CodAsig;
        dto.id_grupo = CodGrupo
        dto.id_periodo = $("#comboPeriodos").val(); 
        dto.id_profesor = CodProfe;
        dto.id_logro = $("#comboLogros").val();
        dto.nota = $("#txtNota").val();
        dto.equivalencia = $("#txtEqui").val();
        // fata el ajuste de la suiperacion de notas
        return dto;
    };

    $("#comboPeriodos").change(function () {
        if ($("#comboPeriodos").val() == "V") {
            Modal("Tenga en cuenta que para registrar el ultimo periodo. <strong>Usted solo debe de enviar los logros agrademicos alcanzados</strong>. No es necesario ingresar las notas ya que estas se promediaran con los periodes anteriores.", "AVISO. Periodo final  ")
        }
    });
    function verificarProfesorId() { // Verificamos que sea un profesor
        if (CodProfe == '') {
            Alerta("Error: Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
            $('#txtId').focus();
            $('#formulario2').hide();
        } else if (CodProfe.length < 8) {
            Alerta("Error: La identificación debe tener <strong> 8 caracteres</strong>como minimo .", "danger");
            $('#txtId').focus();
            $('#formulario2').hide();
        }
        else {
            var dto = {};
            dto.id = CodProfe;

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
                        $("#formulario2").hide();
                        $("#txtId").focus();
                        Alerta("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no se encuentra en registrada </strong> en la base de datos del sistema", "danger");
                        Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no se encuentra en registrada </strong> en la base de datos del sistema", "Error al intentar realizar esta acción");
                    }
                    else {
                        P = result.d;
                        if (P.rol != "PROFESOR") {
                            $("#formulario2").hide();
                            $("#formulario1").hide();
                            $("#txtId").focus();
                            Alerta("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no le pertenece a un profesor </strong> y no puede gestionar este proceso.", "warning");
                            Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no le pertenece a un profesor </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                        } else if (P.rol == "PROFESOR") {
                            $("#txtId").attr('disabled', 'disabled');
                            $("#txtIdN").attr('disabled', 'disabled');
                            $("#txtAp").val(P.apellidos);
                            $("#txtId").val(P.id);
                            $("#txtNom").val(P.nombres);

                            $("#grilla1").html("");
                            $("#formulario1").show();
                            cargarAsignaturas();
                            $("#comboPeriodos").focus();
                            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
                        }
                    }
                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Error al en el servidor");
                }
            });
        }
    }

    function verificarProfesorNom() { // Verificamos que sea un estudiante
        if ($('#txtIdN').val() == '') {
            Alerta("Error: Digite un nombre en el cuadro de texto y luego haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
            $('#txtIdN').focus();
            $('#formulario2').hide();
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
                        $("#formulario2").hide();
                        $("#txtIdN").focus();
                        Alerta("Error al intentar realizar esta acción. Al parecer este nombre <strong> no se encuentra registrado </strong> en la base de datos del sistema", "danger");
                        Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no se encuentra registrado </strong> en la base de datos del sistema", "Error al intentar realizar esta acción");

                    }
                    else {
                        P = result.d;
                        if (P.rol != "PROFESOR") {
                            $("#formulario2").hide();
                            $("#formulario1").hide();
                            $("#txtId").focus();
                            Alerta("Error al intentar realizar esta acción. Al parecer este nombre <strong> no le pertenece a un profesor </strong> y no puede gestionar este proceso.", "warning");
                            Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no le pertenece a un profesor </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                        } else if (P.rol == "PROFESOR") {
                            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
                            $("#txtId").attr('disabled', 'disabled');
                            $("#txtIdN").attr('disabled', 'disabled');
                         
                            $("#txtAp").val(P.apellidos);
                            $("#txtId").val(P.id);
                            $("#txtNom").val(P.nombres);
                            CodProfe = P.id;
                            $("#grilla1").html("");
                            $("#formulario1").show();
                            cargarAsignaturas();
                            $("#comboPeriodos").focus();
                            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
                        }
                    }
                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Error al en el servidor");
                }
            });
        }
    }

    $('#txtId').keyup(function (e) {
        if (e.keyCode == 13) {
            var btn = $('#btnG')
            btn.button('loading')
            $.ajax(".....").always(function () {
                $(document.body).animate({ scrollTop: 300 }, 300);
                filtro = 1;
                CodProfe = $('#txtId').val();
                verificarProfesorId();
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
                filtro = 2;
                verificarProfesorNom();
                btn.button('reset')
            });
        }
    });

    $('#btnG').click(function () { // Botón gestionar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            if (filtro == 1) {
                verificarProfesorId();
            }
            else if (filtro == 2) {
                verificarProfesorNom();
            }
            btn.button('reset')
        });
    });

    $('#txtIdEst').keyup(function (e) {
        if (e.keyCode == 13) {
            var btn = $('#btnGE')
            btn.button('loading')
            $.ajax(".....").always(function () {
                filtroEst = 1;
                verificarEstId();
                btn.button('reset')
            });
        }
    });
    $('#txtIdEstN').keyup(function (e) {
        if (e.keyCode == 13) {
            var btn = $('#btnGE')
            btn.button('loading')
            $.ajax(".....").always(function () {
                filtroEst = 2;
                verificarEstNom();
                btn.button('reset')
            });
        }
    });

    $('#btnGE').click(function () { // Botón gestionar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            if (filtroEst == 1) {
                verificarEstId();
            }
            else if (filtroEst == 2) {
                verificarEstNom();
            }
            btn.button('reset')
        });
    });

    $('#txtId').click(function () { filtro = 1; });
    $('#txtIdN').click(function () { filtro = 2; });
    $('#txtIdEst').click(function () { filtroEst = 1; });
    $('#txtIdEstN').click(function () { filtroEst = 2; });
    
    function verificarEstId() { // Verificamos que sea un estudiante
        if ($('#txtIdEst').val() == '') {
            Alerta("Error: Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
            $('#txtIdEst').focus();
        } else if (($('#txtIdEst').val()).length < 8) {
            Alerta("Error: La identificación debe tener <strong> 8 caracteres</strong>como minimo .", "danger");
            $('#txtIdEst').focus();
            $('#fnota').hide();
        } else {
            var dto = {};
            dto.id = $("#txtIdEst").val();
            dto.id_grupo = CodGrupo;
            

            jsonData = "{'dto':" + JSON.stringify(dto) + "}";

            $.ajax({
                type: "POST",
                url: "/WS/personas.asmx/c_personaAndGrupo",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        $("#fnota").hide();
                        $("#txtIdEst").focus();
                        Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no se encuentra registrado </strong> en la base de datos del sistema o <strong>no hace parte del grupo </strong> que escogio.", "Error al intentar realizar esta acción");
                    }
                    else {
                        P = result.d;
                        if (P.rol != "ESTUDIANTE") {
                            $("#fnota").hide();
                            $("#txtIdEst").focus();
                            Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no le pertenece a un estudiante </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                        } else if (P.rol == "ESTUDIANTE") {
                            $("#txtIdEst").attr('disabled', 'disabled');
                            $("#txtIdEstN").attr('disabled', 'disabled');
                            $("#txtApEst").val(P.apellidos);
                            $("#txtNomEst").val(P.nombres);
                            verificarNota();
                            $("#fnota").show();
                            $("#txtNota").focus();
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
            Alerta("Error: Digite un nombre en el cuadro de texto y luego haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
            $('#txtIdEstN').focus();
        }
        else {
            var dto = {};
            dto.id = $("#txtIdEstN").val();
            dto.id_grupo = CodGrupo;
            

            jsonData = "{'dto':" + JSON.stringify(dto) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/personas.asmx/c_personaXNombreAndGrupo",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        $("#fnota").hide();
                        $("#txtIdEstN").focus();
                        Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no se encuentra registrado </strong> en la base de datos del sistema o <strong>no hace parte del grupo </strong> que escogio.", "Error al intentar realizar esta acción");
                    }
                    else {
                        P = result.d;
                        if (P.rol != "ESTUDIANTE") {
                            $("#fnota").hide();
                            $("#txtIdEstN").focus();
                            Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no le pertenece a un estudiante </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                        } else if (P.rol == "ESTUDIANTE") {
                            $("#txtIdEst").attr('disabled', 'disabled');
                            $("#txtIdEstN").attr('disabled', 'disabled');
                            $("#txtIdEst").val(P.id);
                            $("#txtApEst").val(P.apellidos);
                            $("#txtNomEst").val(P.nombres);
                            CodProfe = P.id;
                            verificarNota();
                            $("#fnota").show();
                            $("#txtNota").focus();
                            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
                        }
                    }
                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Error al en el servidor");
                }
            });
        }
    }
    function cargarAsignaturas() {  // CARGAMOS LAS ASIGNATURAS DEL DOCENTE CON EL GRUPO.
        var dto = {};
        dto.id = CodProfe;

        jsonData = "{'dto':" + JSON.stringify(dto) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/matriculas.asmx/c_asignaturasProfe",
            data: jsonData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                $('#grilla1').show();
                if (result.d == null) {
                    Modal("Error de congruenciá: Usted no contiene asignaturas matriculadas. ", "No contiene asignaturas matriculadas.");
                    redireccionar();
                }
                else {
                    h = result.d;
                    $("#grilla1").html("");
                    titleGrilla1();
                    conta = 0;
                    $.each(h, function (i, item) {
                        AddItemGrilla1(item);
                    })
                }
            },
            error: function (result) {
                Modal("Error de congruenciá: Usted no contiene asignaturas matriculadas. ", "Servidor no disponible - No hay asignaturas matriculadas");
               redireccionar();
            }
        });
    }
    var getDatosGE = function () {
        var dto = {};
        dto.id = $("#txtIdEst").val();
        return dto;
    };
    //----------------------------------------------------------------------------------------------------
    $('#btnN').click(function () { // Botón Nuevo
        nuevo();
    });
    
    function nuevo() {
        if (localStorage.getItem('SeccionRol') == "PROFESOR") {
            $("#f-inicial").hide();
            //$("#comboPeriodo").val("");
            //$("#comboLogros").val("");
            $("#txtDes").val("");
            $('#grilla1').show();
            $("#fgrilla").hide();
            $("#btnN").hide();
            $('#formulario2').hide();
            $('#formulario1').show();

            $("#txtIdEst").val("");
            $("#txtNomEst").val("");
            $("#txtApEst").val("");
       

            $("#txtDes").val("");
            $("#fnota").hide();
            $("#txtIdEst").removeAttr('disabled');
            $("#txtIdEstN").removeAttr('disabled');
        } else {
            Alerta("Digite una identificación o nombre en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "info");
            $("#txtId").val("");
            $("#txtIdN").val("");
            $("#txtIdEst").val("");
            $("#txtIdEstN").val("");
            $("#txtAp").val("");
            $("#txtNom").val("");
            $("#txtNomEst").val("");
            $("#txtApEst").val("");
            //$("#comboPeriodo").val("");
            //$("#comboLogros").val("");
            $("#txtDes").val("");
            $('#grilla1').hide();
            $("#fnota").hide();
            $("#txtIdEst").removeAttr('disabled');
            $("#txtIdEstN").removeAttr('disabled');
            $("#txtId").removeAttr('disabled');
            $("#txtIdN").removeAttr('disabled');
            $('#formulario2').hide();
            $('#formulario1').hide();
            $('#txtId').focus();
            $("#btnN").show();
        }
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
    //----------------------------------------------------------------------------------------------------
    var AddItemGrilla1 = function (item) {
        conta++;
        array.push(item);
        var nuevaCol = "<tr>";
        nuevaCol += "<td>" + conta + "</td>";
        nuevaCol += "<td>" + item.codAsig + "</td>";
        nuevaCol += "<td>" + item.nombreAsig + "</td>";
        nuevaCol += "<td>" + item.grado + "</td>";
        nuevaCol += "<td>" + item.grupo + "</td>";
        nuevaCol += '<td><input id="btnP" value="Procesar" tag=' + array.length + ' class="clsProcesar boton-down btn btn-danger" data-loading-text="Cargando..." type="button" /></td>';
        nuevaCol += '<td><input id="btnGenerar" value="Listar grupo" tag=' + array.length + ' class="clsGenerar btn btn-primary" data-loading-text="Cargando..." type="button" /></td>';
        nuevaCol += "</tr>";
        $("#grilla1").append(nuevaCol);
    };
    function titleGrilla1() {
        var newtitle = "<tr>";
        newtitle += '<th class="col-md-1">#</th>';
        newtitle += '<th class="col-md-2">Codigo</th>';
        newtitle += '<th class="col-md-3">Nombres</th>';
        newtitle += '<th class="col-md-2">Grado</th>';
        newtitle += '<th class="col-md-2">Id Grupo</th>';
        newtitle += '<th class="col-md-2">Acción</th>';
        newtitle += '<th class="col-md-2">Listado</th>';
        newtitle += "</tr>";
        $("#grilla1").append(newtitle);
    };

    $("#comboLogros").change(function () {
        cambioIdLogro();
    });
    function cambioIdLogro() {
        jsonData = "{'dto':" + JSON.stringify(getDatosLogro()) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/logros.asmx/c_logro",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                P = result.d;
                $("#txtDes").val(P.descripcion);
            },
            error: function (result) {
            }
        });
    }
    $("#txtNota").change(function () {
        var n= $("#txtNota").val()
        if ((n >= 0.0) && (n < 6.0)) {
            $("#txtEqui").val("B");
        }
        if ((n >= 6.0) && (n < 8.0)) {
            $("#txtEqui").val("DB");
        }
        if ((n >= 8.0) && (n <9.0)) {
            $("#txtEqui").val("DA");
        }
        if ((n >= 9.0) && (n <=10.0)) {
            $("#txtEqui").val("DS");
        }

    });
    //----------------------------------------------------------------------------------------------------
    $(document).on('click', '.clsProcesar', function () {
        var fila = $(this).attr("tag");
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {

            $("#txtIdEst").removeAttr('disabled');
            $("#formulario2").show();
            $("#fnota").hide(); 
            CodAsig = array[fila - 1].codAsig;
            NombreAsig = array[fila - 1].nombreAsig;
            CodGrado = array[fila - 1].grado;
            CodGrupo = array[fila - 1].grupo;
            Alerta("Digite una identificación o nombres en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "warning");
            otroEstudiante();
            $("#txtIdEst").focus();
            GetLogrosXasignatura();
            btn.button('reset')

        });
    });
    //----------------------------------------------------------------------------------------------------
    
    function GetLogrosXasignatura() {
            jsonData = "{'dto':" + JSON.stringify(getDatosLogrosAsig()) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/logros.asmx/c_logrosXgradoXasig",
                contentType: "application/json; charset=utf-8",
                data: jsonData,
                dataType: "json",
                async: false,
                success: function (result) {
                    if (result.d == null) {
                        $("#comboLogros").attr('disabled', 'disabled');
                            $("#formulario2").hide();
                            $("#comboLogros").html("");
                            $("#txtDes").val("");
                            Modal("Error de congruenciá:Esta asignatura en este grado no contiene - <strong> logros </strong> matriculados. No puede proceder. Matricule logros academicos a esta asignatura. ");
                            $(document.body).animate({ scrollTop: 300 }, 300);
                    }
                    else {
                        dataLogros = result.d;
                        $("#formulario2").show();
                        $("#comboLogros").removeAttr('disabled');
                        $("#comboLogros").html("");
                        conta = 0;
                        $.each(dataLogros, function (i, item) {
                            $("#comboLogros").append("<option value=" + item.id_logro + ">" + item.id_logro + "</option>");
                            if (conta == 0) {
                                $("#txtDes").val(item.descripcion);
                            }
                            conta++;
                        })
                    }
                },
                error: function (result) {
                    Modal("Servidor no disponible. Error al intentar cargar los logros para esta asignatura. Contactese con el administrador", "Error al cargar los logros la asignatura");
                    $(document.body).animate({ scrollTop: 300 }, 300);
                }
            });
    }
    //    ============================== BTN Enviar los Datos  ==========================================
    function validarNota() {
        var n = $("#txtNota").val();
        if (n < 0.0 || n > 10.0) {
            bandera= 1 ;
        }
        else {
            bandera = 0;
        }
    }
    function verificarNota() {
        jsonData = "{'dto':" + JSON.stringify(getDatosNotas()) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/notas.asmx/c_nota",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    $('#btnR').show();
                    $('#btnM').hide();
                    $('#btnE').hide();
                    $("#txtNota").val("0.0");
                    $("#txtEqui").val("B");
                }
                else {
                    P = result.d;
                    $('#btnR').hide();
                    $('#btnM').show();
                    $('#btnE').show();
                    $("#txtNota").val(P.nota);
                    $("#txtEqui").val(P.equivalencia);
                    $("#comboLogros").val(P.id_logro);

                    cambioIdLogro();

                }
            },
            error: function (result) {
            }
        });
    }
    $('#btnNE').click(function () { // Botón Nuevo
        otroEstudiante();
    });
    function otroEstudiante() {
        $("#txtIdEst").val("");
        $("#txtIdEstN").val("");
        $("#txtNomEst").val("");
        $("#txtApEst").val("");

        $("#txtDes").val("");
        $("#txtEqui").val("");
        $("#txtNota").val("0.0");

        $('#fnota').hide();
        $("#txtIdEst").removeAttr('disabled');
        $("#txtIdEstN").removeAttr('disabled');
        $('#txtIdEst').focus();
    }
    $(document).on('click', '.clsR', function () {
            var btn = $(this)
            btn.button('loading')
            $.ajax("...").always(function () {
                
            validarNota();
            if (bandera == 1) {
                Alerta2("La nota debe de estar en el rango de 1-10", "danger");
                $("#txtNota").focus();
            }
           else if ($('#txtDes').val() == '') {
                Alerta2("Error: Debe asignar un <strong> logro</strong>  alcanzado para continuar.", "danger");
                $('#comboLogros').focus();
            }
            else {
                jsonData = "{'dto':" + JSON.stringify(getDatosNotas()) + ",'dtob':" + JSON.stringify(getBitacora("NOTAS", "REGISTRAR", "REGISTRO DE FORMA INDIVIDUAL")) + "}"; //Registro de bitacora";
              
                $.ajax({
                    type: "POST",
                    url: "/WS/notas.asmx/r_nota",
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    success: function (result) {
                        if (result.d == null) {
                            Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                        }
                        else {
                            Modal(JSON.stringify(result.d), "Registro de notas por de forma individual");
                            if (JSON.stringify(result.d) !=
                                '"¡Error de congruencia de datos. Recuerde que usted no puede asignar notas al mismo estudiante en el mismo periodo, grupo y asignatura <strong>dos veces</strong>. Revise!"'
                                || JSON.stringify(result.d) !=
                                '"Lo sentimos. Reintene nuevamente. Tuvimos  problemas a intentar agregarle un referencia a este registro."'
                            ) {
                                $('#formulario2').hide();
                                $('#comboPeriodos').focus();
                            }

                        }
                    },
                    error: function (result) {
                        Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                    }
                });

           }
            btn.button('reset')
            });

    });
    $(document).on('click', '.clsE', function () {
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
           
            jsonData = "{'dto':" + JSON.stringify(getDatosNotas()) + ",'dtob':" + JSON.stringify(getBitacora("NOTAS", "ELIMINAR", "ELIMINACIÓN DE FORMA INDIVIDUAL")) + "}"; //Registro de bitacora";

            $.ajax({
                type: "POST",
                url: "/WS/notas.asmx/e_nota",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                    }
                    else {
                        Modal(JSON.stringify(result.d), "Eliminación de notas individualmente");
                            $('#formulario2').hide();
                            $('#comboPeriodos').focus();
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
           
        validarNota();
        if (bandera == 1) {
            Alerta2("La nota debe de estar en el rango de 1-10", "danger");
            $("#txtNota").focus();
        }
        else {
            jsonData = "{'dto':" + JSON.stringify(getDatosNotas()) + ",'dtob':" + JSON.stringify(getBitacora("NOTAS", "MODIFICAR", "MODIFICACIÓN DE FORMA INDIVIDUAL")) + "}"; //Registro de bitacora";
       
            $.ajax({
                type: "POST",
                url: "/WS/notas.asmx/m_nota",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                    }
                    else {
                        Modal(JSON.stringify(result.d), "Modificación de notas individualmente");
                        $('#formulario2').hide();
                        $('#comboPeriodos').focus();
                    }
                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                }
            });
        }
        btn.button('reset')
        });
    });
   

    $(document).on('click', '.clsGenerar', function () {
        $("#formulario2").hide();
        $("#comboLogros").html("");
        $("#txtDes").val("");
        var fila = $(this).attr("tag");
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {

            var dto = {};
            dto.id_grupo = array[fila - 1].grupo;
            dto.id_periodo = $('#comboPeriodos').val();

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
                        Modal("Tenemos problemas al cargar este grupo - <strong> Este grupo no contiene estudiantes matriculados</strong>.",
                      "Problemas al cargar el grupo. Grupo vacio");
                        $(document.body).animate({ scrollTop: 300 }, 300);
                    }
                    else {
                        window.open("/ACADEMIA/reportes/reports/listadodesempeno.aspx");
                    }
                },
                error: function (result) {
                    Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error del servidor");
                }
            });
            btn.button('reset')
        });
    });

//});

