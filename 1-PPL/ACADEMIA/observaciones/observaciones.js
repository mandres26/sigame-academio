
//$(document).ready(function () {
    WinMove();
    var conta = 0;
    var conta2 = 0;
    var pos = 0;
    var CodAsig,Ref, NombreAsig, e, a, Notificacion,Acceso, Descripcion, Tipo, Busqueda, CodGrado, CodGrupo, CodProfe;
    var jsonData, filtro, filtroEst;
    Busqueda = "N";

    validar_pagina();
    vigencia();
    //---------------------------------- validamos que el rol del usuario pueda ingresar a esta pagina -----------------------
    if (localStorage.getItem('SeccionRol') == "PROFESOR" || localStorage.getItem('SeccionRol') == "ADMINISTRATIVO" || localStorage.getItem('SeccionRol') == "SUPER") {
        conta = 0;
    } else {
        DenegarAccesoToProfe();
    }

    function vigenciaAno() {

    }
    CargarDatosIniciales();
    function CargarDatosIniciales() {
        $("#formPPAL").hide();
        $("#imgload").show();
        $.ajax("...").always(function () {
            nuevo();
            cargarPeriodos();
            cargarTipos();
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
            CargarProfes();
            $("#f-inicial").show();
            $("#txtId").val("");
            $("#txtId").focus();
        }
    }
    var array = new Array(); // variable para las grillas en los formularios
    var array2 = new Array(); // variable para las grillas en los formularios

    var getDatosObservacion= function () {
        var dto = {};
        dto.referencia = Ref;
        dto.id_estudiante = $("#txtIdEst").val();
        dto.id_asignatura = CodAsig;
        dto.id_grupo = CodGrupo
        dto.id_periodo = $("#comboPeriodos").val();
        dto.id_profesor = CodProfe;
        dto.observacion = $("#txtDes").val();
        dto.fecha = "";
        dto.tipo = $("#comboTipo").val();
        dto.notificacion = Notificacion;
        dto.acceso = Acceso;
        return dto;
    };
    //---------------------------------
    $('#txtId').keyup(function (e) {
        if (e.keyCode == 13) {
            var btn = $('#btnG')
            btn.button('loading')
            $.ajax(".....").always(function () {
                $(document.body).animate({ scrollTop: 400 }, 300);
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
                $(document.body).animate({ scrollTop: 400 }, 300);
                //Aca redireccionamos al extraer el id de la persona
                var arr = $('#txtIdN').val().split('/');
                CodProfe = arr[1];
                filtro = 1;
                verificarProfesorId();
                btn.button('reset')
            });
        }
    });
    function CargarProfes() {
        $.ajax({
            type: "POST",
            url: "/WS/personas.asmx/c_profesoresXBusque",
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
    function CargarEstudiantesXGrupo(CodGrupo) {
        var dto = {};
        dto.id = CodGrupo;

        jsonData = "{'dto':" + JSON.stringify(dto) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/personas.asmx/c_estXGrupoXBusque",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
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
                $("#txtIdEstN").jqxComboBox({ selectedIndex: 0, source: PersonasAdapter, promptText: "ESCRIBA O SELECCIONE...", displayMember: "persona", valueMember: "persona", width: 370, height: 21 });
            },
            error: function (result) {
            }

        });
    }
    $('#btnG').click(function () { // Botón gestionar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            $(document.body).animate({ scrollTop: 400 }, 300);
            //Aca redireccionamos al extraer el id de la persona
            var arr = $('#txtIdN').val().split('/');
            CodProfe = arr[1];
            filtro = 1;
            verificarProfesorId();
            btn.button('reset')
        });
    });

    function verificarProfesorId() { // Verificamos que sea un profesor
        if (CodProfe == '') {
            Alerta("Error: Digite una identificación o nombre en el cuadro de texto y luego presione la tecla <strong> enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
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
                        Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no se encuentra registrada </strong> en la base de datos del sistema o <strong>no hace parte del grupo </strong> que escogio.", "Error al intentar realizar esta acción");
                        Alerta2("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no se encuentra registrada </strong> en la base de datos del sistema o <strong>no hace parte del grupo </strong> que escogio.", "Error al intentar realizar esta acción","danger");
                    }
                    else {
                        P = result.d;
                        if (P.rol != "PROFESOR") {
                            $("#formulario2").hide();
                            $("#formulario1").hide();
                            $("#txtId").focus();
                            Alerta2("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no le pertenece a un profesor </strong> y no puede gestionar este proceso.", "warning");
                            Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no le pertenece a un profesor </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                        } else if (P.rol == "PROFESOR") {
                            $("#txtId").attr('disabled', 'disabled');
                            $("#txtIdN").attr('disabled', 'disabled');
                            $("#txtAp").val(P.apellidos);
                            $("#txtId").val(P.id);
                            $("#txtNom").val(P.nombres);

                            $("#grilla1").html("");
                            $("#grilla2").html("");
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
                        Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no se encuentra registrado </strong> en la base de datos del sistema o <strong>no hace parte del grupo </strong> que escogio.", "Error al intentar realizar esta acción");
                        Alerta2("Error al intentar realizar esta acción. Al parecer este nombre <strong> no se encuentra registrado </strong> en la base de datos del sistema o <strong>no hace parte del grupo </strong> que escogio.", "Error al intentar realizar esta acción", "danger");
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
                            $("#grilla2").html("");
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

    $('#txtIdEst').keyup(function (e) {
        if (e.keyCode == 13) {
            var btn = $('#btnGER')
            btn.button('loading')
            $.ajax(".....").always(function () {
                pos = 1;
                verificarEstId();
                btn.button('reset')
            });
        }
    });

    $('#txtIdEstN').keyup(function (e) {
        if (e.keyCode == 13) {
            var btn = $('#btnGER')
            btn.button('loading')
            $.ajax(".....").always(function () {
                //$(document.body).animate({ scrollTop: 300 }, 300);
                //Aca redireccionamos al extraer el id de la persona
                pos = 1;
                var arr = $('#txtIdEstN').val().split('/');
                $('#txtIdEst').val(arr[1]);
                filtro = 1;
                verificarEstId();
                btn.button('reset')
            });
        }
    });

    //------------------

    $('#txtId').click(function () { filtro = 1;  });
    $('#txtIdN').click(function () { filtro = 1;  });
    $('#txtIdEst').click(function () { filtroEst = 1;  });
    $('#txtIdEstN').click(function () { filtroEst = 1; });


    
    function verificarEstId() { // Verificamos que sea un estudiante
        if ($('#txtIdEst').val() == '') {
            Alerta1("Error: Digite una identificación o nombre en el cuadro de texto y luego presione la tecla <strong> enter</strong> o haga clic en el botón <strong> gestionar </strong>para continuar.", "danger");
            $("#f-observacion").hide();
            $("#txtIdEst").focus();
        //} else if (($('#txtIdEst').val()).length < 8) {
        //    Alerta2("Error: La identificación debe tener <strong> 8 caracteres</strong>como minimo .", "danger");
        //    $("#f-observacion").hide();
        //    $("#txtIdEst").focus();
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
                async: false,
                success: function (resulta) {
                    if (resulta.d == null) {
                        $("#f-observacion").hide();
                        $("#txtIdEst").focus();
                        Modal("Al parecer este nombre <strong> no se encuentra registrado </strong> en la base de datos del sistema o <strong>no hace parte del grupo </strong> que escogio.", "Identificación no encontrada");
                    }
                    else {
                        P = resulta.d;
                        //alert(JSON.stringify(P));
                        if (P.rol != "ESTUDIANTE") {
                            $("#f-observacion").hide();
                            $("#txtIdEst").focus();
                            Modal("Al parecer esta identicación <strong> no le pertenece a un estudiante </strong> y no puede gestionar este proceso.", "Persona no permitida");
                        } else if (P.rol == "ESTUDIANTE") {
                            $("#txtIdEst").attr('disabled', 'disabled');
                            $("#txtIdEstN").attr('disabled', 'disabled');
                            $("#txtIdEst").val(P.id);
                            $("#txtApEst").val(P.apellidos);
                            $("#txtNomEst").val(P.nombres);

                            $("#f-observacion").show();
                            $("#btnR").hide();
                            $("#btnM").hide();
                            GestionarObservacion();
                            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
                        }
                    }
                },
                error: function (resulta) {
                    Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                }
            });
        }
    }
    function verificarEstNom() { // Verificamos que sea un estudiante
        if ($('#txtIdEstN').val() == '') {
            Alerta("Error: Digite un nombre en el cuadro de texto y luego haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
            $("#f-observacion").hide();
            $("#txtIdEst").focus();
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
                        $("#f-observacion").hide();
                        $("#txtIdEst").focus();
                        Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no se encuentra registrado </strong> en la base de datos del sistema o <strong>no hace parte del grupo </strong> que escogio.", "Error al intentar realizar esta acción");
                    }
                    else {
                        P = result.d;
                     
                        if (P.rol != "ESTUDIANTE") {
                            $("#f-observacion").hide();
                            $("#txtIdEst").focus();
                            Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no le pertenece a un estudiante </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                        } else if (P.rol == "ESTUDIANTE") {
                            $("#txtIdEst").attr('disabled', 'disabled');
                            $("#txtIdEstN").attr('disabled', 'disabled');
                            $("#txtIdEst").val(P.id);
                            $("#txtApEst").val(P.apellidos);
                            $("#txtNomEst").val(P.nombres);
                            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
                            $("#f-observacion").hide();
                            $("#btnR").hide();
                            $("#btnM").hide();
                            GestionarObservacion();
                        }
                    }
                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Error al en el servidor");
                }
            });
        }
    }

    //------------------
    $('#btnGER').click(function () { // Botón gestionar registros
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            pos = 1;
            var arr = $('#txtIdEstN').val().split('/');
            $('#txtIdEst').val(arr[1]);
            filtro = 1;
            verificarEstId();
            btn.button('reset')

        });
    });
    $('#btnGEM').click(function () { // Botón gestionar modificaciones
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            pos = 2;
            if (filtroEst == 1) {
                verificarEstId();
            }
            else if (filtroEst == 2) {
                verificarEstNom();
            }
            btn.button('reset')
        });
    });

    function cargarTipos() {
        var A;
        $("#comboTipo").html("");
        A += '<option value="POSITIVA">POSITIVA</option>';
        A += '<option value="NEGATIVA">NEGATIVA</option>';
        $("#comboTipo").append(A);
    }



    var getDatosGE = function () {
        var dto = {};
        dto.id = $("#txtIdEst").val();
        return dto;
    };
  
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
                    Modal("Error de congruenciá: Usted no contiene asignaturas matriculadas. ", "No hay asignaturas matriculadas");
                    redireccionar();
                }
                else {
                    h = result.d;
                    $("#grilla1").html("");
                    titleGrilla1();
                    conta = 0;
                    var b = 0;
                    $.each(h, function (i, item) {
                        /*-- filtro por el año academico seleccionado ----- voy preguntando y añadiendo los que si y excluendo los que no*/
                        var obj = item.grupo.split('-');
                        var ano = obj[0];
                        if (ano == AnoAcademico) {
                            AddItemGrilla1(item);
                            b = 1;
                        }
                    })
                    if (b == 0) {
                        Modal("Usted no contiene asignaturas matriculadas en este año academico. ", "No contiene asignaturas matriculadas.");
                        redireccionar();
                    }
                    $("#btnP").focus();
                }
            },
            error: function (result) {
                Modal("Error de congruenciá: Usted no contiene asignaturas matriculadas. ", "Servidor no disponible - No hay asignaturas matriculadas");
                redireccionar();
            }
        });
    }
    //----------------------------------------------------------------------------------------------------
    $('#btnN').click(function () { // Botón Nuevo
        nuevo();
    });
    $('#btnNE').click(function () { // Botón Nuevo
        nuevaObservacion();
    });
      
    function nuevo() {
        if (localStorage.getItem('SeccionRol') == "PROFESOR") {
            $("#f-inicial").hide();
            //$("#comboPeriodo").html("");
            //$("#comboLogros").val("");
            $("#txtDes").val("");
            $('#grilla1').show();
            $('#grilla2').hide();
            $("#f-grilla").hide();
            $("#btnN").hide();
            $('#formulario2').hide();
            $('#formulario1').show();

            $("#f-observacion").hide();
            $("#btnR").hide();
            $("#btnM").hide();

            $("#txtIdEst").val("");
            $("#txtIdEstN").val("")
            $("#txtIdEst").val("");;
            $("#txtApEst").val("");
            $("#txtDes").val("");
            $("#txtIdEst").removeAttr('disabled');
            $("#txtIdEstN").removeAttr('disabled');
        } else {
            Alerta("Digite una identificación o nombre en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "info");
            $("#txtId").val("");
            $("#txtIdEst").val("");
            $("#txtIdN").val("");
            $("#txtIdEstN").val("");
            $("#txtNom").val("");
            $("#txtAp").val("");
            $("#txtNomEst").val("");
            $("#txtApEst").val("");
            //$("#comboPeriodo").val("");
            $("#txtDes").val("");
            $('#grilla1').hide();
            $('#grilla2').hide();
            $("#f-observacion").hide();
            $("#f-grilla").hide();
            $("#btnN").show();

            $("#btnR").hide();
            $("#btnM").hide();

            $("#txtId").removeAttr('disabled');
            $("#txtIdEst").removeAttr('disabled');
            $("#txtIdN").removeAttr('disabled');
            $("#txtIdEstN").removeAttr('disabled');
            $('#formulario2').hide();
            $('#formulario1').hide();
            $('#txtId').focus();
            pos = 0;
        }
    }
    function nuevaObservacion() {
        $("#txtNomEst").val("");
        $("#txtIdEst").val("");
        $("#txtIdEstN").val("");
        $("#txtApEst").val("");
        $("#txtDes").val("");
      
        $("#f-grilla").hide();
        $("#grilla2").html("");
        $("#f-observacion").hide();
        $("#txtIdEst").removeAttr('disabled');
        $("#txtIdEstN").removeAttr('disabled');
        $('#txtIdEst').focus();
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
                    P = result.d;
                    conta = 0;
                    $("#comboPeriodos").html("");
                    $("#comboPeriodos").val("");
                    $.each(P, function (i, item) {
                        var obj = item.id.split('-');
                        var ano = obj[0];
                        var per = obj[1];
                        if (ano == AnoAcademico) {
                            if (per != 'V') {
                                $("#comboPeriodos").append("<option value=" + item.id + ">" + item.id + "</option>");
                                if (conta == 0) {
                                    $("#txtRangoI").val(item.rangoI);
                                    $("#txtRangoF").val(item.rangoF);
                                    conta++;
                                }
                            }
                        }
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
        nuevaCol += "<td col-xs-1> <strong>" + item.grupo + "</strong> </td>";
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
    var AddItemGrilla2 = function (item) {
        conta++;
        array2.push(item);
        var nuevaCol = "<tr>";
        //nuevaCol += "<td>" + item.referencia + "</td>";
        nuevaCol += "<td>" + item.nom_asignatura + "</td>";
        nuevaCol += "<td>" + item.tipo + "</td>";
        nuevaCol += "<td>" + item.observacion + "</td>";
        nuevaCol += "<td>" + item.fecha + "</td>";
        nuevaCol += "<td>" + item.notificacion + "</td>";
        nuevaCol += '<td><input id="btnMGrilla" value="Modificar" tag=' + array2.length + ' class="clsModificar btn btn-warning" data-loading-text="Cargando..." type="button" />';
        nuevaCol += '<input id="btnEGrilla" value="Eliminar" tag=' + array2.length + ' class="clsEliminar btn btn-danger" data-loading-text="Cargando..." type="button" />';
        nuevaCol += '<input id="btnAGrilla" value="Archivar" tag=' + array2.length + ' class="clsArchivar btn btn-info" data-loading-text="Cargando..." type="button" /></td>';
        nuevaCol += "</tr>";
        $("#grilla2").append(nuevaCol);
    };
    function titleGrilla2() {
        var newtitle = "<tr>";
        //newtitle += '<th class="col-md-1">Ref</th>';
        newtitle += '<th class="col-md-1">Asignatura</th>';
        newtitle += '<th class="col-md-1">Tipo</th>';
        newtitle += '<th class="col-md-5">Descripcion</th>';
        newtitle += '<th class="col-md-1">Fecha</th>';
        newtitle += '<th class="col-md-1">Estado</th>';
        newtitle += '<th class="col-md-1">Acciónes</th>';
        newtitle += "</tr>";
        $("#grilla2").append(newtitle);
    };
    //----------------------------------------------------------------------------------------------------
    $(document).on('click', '.clsProcesar', function () {
        var fila = $(this).attr("tag");
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
            nuevaObservacion();
            $("#txtIdEst").removeAttr('disabled');
            $("#formulario2").show();
            $("#fobservacion").hide();
            CodAsig = array[fila - 1].codAsig;
            NombreAsig = array[fila - 1].nombreAsig;
            CodGrado = array[fila - 1].grado;
            CodGrupo = array[fila - 1].grupo;

            CargarEstudiantesXGrupo(CodGrupo);
            Alerta1("Digite una identificación o nombre en el cuadro de texto y luego presione la tecla <strong> enter </strong> o haga clic en el botónes <strong> gestionar </strong>para continuar.", "primary");
            $("#txtIdEst").focus();
            btn.button('reset')
        });
    });
    //----------------------------------------------------------------------------------------------------
    $(document).on('click', '.clsEliminar', function () {
        var fila = $(this).attr("tag");
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
        $("#f-observaciones").hide();
        Ref = array2[fila - 1].referencia; 
        jsonData = "{'dto':" + JSON.stringify(getDatosObservacion()) + ",'dtob':" + JSON.stringify(getBitacora("OBSERVACIONES", "ELIMINAR", "ELIMINACIÓN DE FORMA INDIVIDUAL")) + "}"; //Registro de bitacora";
        $.ajax({
            type: "POST",
            url: "/WS/observaciones.asmx/e_observacion",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                if (result.d != null) { // comprobamos que haya sido eliminado
                    Modal(JSON.stringify(result.d), "Eliminación de observaciones disciplinarias");
                    Alerta2(JSON.stringify(result.d), "success");
                    var objCuerpo = $('.clsEliminar').parents().get(2);
                    var objFila = $('.clsEliminar').parents().get(1);
                    $(objFila).remove();
                    $('#txtId').focus();
                } else { Modal("Tuvimos problemas al intentar realizar esta petición. Servidor no disponible", "Eliminación de observaciones disciplinarias"); }
            },
            error: function (result) {
                Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
            }
        });
        btn.button('reset')
        });

    });
    //----------------------------------------------------------------------------------------------------
    $(document).on('click', '.clsModificar', function () {
        var fila = $(this).attr("tag");
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
            $("#f-observaciones").show();
            Descripcion = array2[fila - 1].observacion;
            Tipo = array2[fila - 1].tipo;
            Ref = array2[fila - 1].referencia; // aca ocultamos la fila
            ModificarObservacion();
            btn.button('reset')
        });

    });
    $(document).on('click', '.clsArchivar', function () {
        var fila = $(this).attr("tag");
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
             $("#f-observaciones").hide();
        Ref = array2[fila - 1].referencia; // aca ocultamos la fila
        Acceso = "ARCHIVADO";
        jsonData = "{'dto':" + JSON.stringify(getDatosObservacion()) + ",'dtob':" + JSON.stringify(getBitacora("OBSERVACIONES", "ARCHIVAR", "ARCHIVAR DE FORMA INDIVIDUAL")) + "}"; //Registro de bitacora";

        $.ajax({
            type: "POST",
            url: "/WS/observaciones.asmx/a_observacion",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
               
                if (result.d != null) { // comprobamos que haya sido eliminado
                    Modal(JSON.stringify(result.d), "Archivación de observaciones disciplinarias");
                    Alerta2(JSON.stringify(result.d), "success");
                    var objCuerpo = $('.clsEliminar').parents().get(2);
                    var objFila = $('.clsEliminar').parents().get(1);
                    $(objFila).remove();
                    $("#txtIdEst").removeAttr('disabled');
                } else { Modal("Tuvimos problemas al intentar realizar esta petición. Servidor no disponible", "Archivación de observaciones disciplinarias"); }
            },
            error: function (result) {
                Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
            }
        });
        btn.button('reset')
        });
    });
    $(document).on('click', '.clsR', function () {
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
          
        if ($('#txtDes').val() == '') {
            Alerta2("Error: Digite una descripcion a la observacion para continuar.", "danger");
            $('#txtDes').focus();
        } else {

            Notificacion = "PENDIENTE";
            Acceso = "SIN ARCHIVAR";

            jsonData = "{'dto':" + JSON.stringify(getDatosObservacion()) + ",'dtob':" + JSON.stringify(getBitacora("OBSERVACIONES", "REGISTRAR", "REGISTRO DE FORMA INDIVIDUAL")) + "}"; //Registro de bitacora";
            $.ajax({
                type: "POST",
                url: "/WS/observaciones.asmx/r_observacion",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                     
                    if (result.d != null) {
                        Modal(JSON.stringify(result.d), "Registro de observaciones disciplinarias");
                        Alerta2(JSON.stringify(result.d), "success");
                        nuevaObservacion();
                        $('#txtId').focus();
                    } else {
                        Alerta2(JSON.stringify(result.d), "success");
                        Modal("Tuvimos problemas al intentar realizar esta petición. Servidor no disponible", "Registro de observaciones disciplinarias");
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
    $(document).on('click', '.clsM', function () {
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
           if ($('#txtDes').val() == '') {
            Alerta2("Error: Digite una descripcion a la observacion para continuar.", "danger");
            $('#txtDes').focus();
        } else {
            jsonData = "{'dto':" + JSON.stringify(getDatosObservacion()) + ",'dtob':" + JSON.stringify(getBitacora("OBSERVACIONES", "MODIFICAR", "MODIFICACIÓN  DE FORMA INDIVIDUAL")) + "}"; //Registro de bitacora";
            $.ajax({
                type: "POST",
                url: "/WS/observaciones.asmx/m_observacion",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                     
                    if (result.d != null) {
                        Modal(JSON.stringify(result.d), "Modificación de observaciones disciplinarias");
                       
                        $("#txtIdEst").removeAttr('disabled');
                        UpdateObservaciones();
                    } else { Modal("Tuvimos problemas al intentar realizar esta petición. Servidor no disponible", "Modificación de observaciones disciplinarias"); }
                    },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                }
            });
        }
        btn.button('reset')
        });
    });
    

    function ModificarObservacion() {
        $('#txtDes').val(Descripcion);
        $('#comboTipo').val(Tipo);
        $('#f-observacion').show();
        $("#btnR").hide();
        $("#btnM").show();
        $('#txtDes').focus();
    }

    function GestionarObservacion() {
       
        if (pos == 1) { // Gestionamos el registro
            $("#btnR").show();

            $("#f-grilla").hide();
            $("#f-observacion").show();
            $("#txtDes").val("");
            $("#txtDes").focus();
            $("#btnM").hide();
        }
        else if (pos == 2) { // Gestionamos las modificaciones y eliminaciones
            UpdateObservaciones();
        }
        $(document.body).animate({ scrollTop: 1000 }, 300);
    }
    function UpdateObservaciones() {
       
        // Cargamos las observaciones que el estudiante tiene
        jsonData = "{'dto':" + JSON.stringify(getDatosObservacion()) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/observaciones.asmx/c_observaciones",
            data: jsonData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Error de congruenciá: El estudiante en esta asignatura no contiene observaciones registradas. ", "No hay observaciones en esta asignatura" );
                    Alerta2("Error de congruenciá: El estudiante en esta asignatura no contiene observaciones registradas.", "danger");
                    $("#f-grilla").hide();
                    $("#f-observacion").hide();
                    $('#btnGER').focus();
                }
                else {
                    $("#f-grilla").show();
                    $('#grilla2').show();
                    $("#f-observacion").hide();
                    h = result.d;
                    $("#grilla2").html("");
                    titleGrilla2();
                    conta2 = 0;
                    $.each(h, function (i, item) {
                        AddItemGrilla2(item);
                    })
                }
            },
            error: function (result) {
                Modal("Servidor no disponible. ", "Servidor no disponible");
                $('#f-grilla').hide();
            }
        });
    }
    $(document).on('click', '.clsGenerar', function () {
        $("#formulario2").hide();
        $("#comboLogros").val("");
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
