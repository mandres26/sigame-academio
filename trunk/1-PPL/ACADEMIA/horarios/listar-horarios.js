
//$(document).ready(function () {
    WinMove();
    var conta; var Pos;   var jsonData; var filtro;
    var buscarEst, CodGrupo, CodProfe, buscarPro1, buscarPro2;
    var P = {};
    validar_pagina();
    //---------------------------------- validamos que el rol del usuario pueda ingresar a esta pagina -----------------------
    if (localStorage.getItem('SeccionRol') == "ADMINISTRATIVO" || localStorage.getItem('SeccionRol') == "SUPER" || localStorage.getItem('SeccionRol') == "PROFESOR") {
        conta = 0;
    } else {
        DenegarAccesoToAdmin();
    }
    //---------------------------------- --------------------------------------------------------------------------------------
    CargarDatosIniciales();
    function CargarDatosIniciales() {
        $("#imgload").show();
        $("#formPPAL").hide();
        $.ajax("...").always(function () {
            nuevo();
            cargarGrupos();
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
            $("#f-grilla").hide();
            $("#f-grilla2").hide();
            verificarProfe();

        } else {
            $("#f-inicial").show();
            $("#comboFiltros").focus();
        }
    } 
    var array = new Array();
    var array2 = new Array();
    var array3 = new Array();
    function FiltrosDisponibles() {
        var A;
        $("#comboFiltros").html("");
        A += '<option value="0">POR X GRUPOS</option>';
        A += '<option value="1">POR X ESTUDIANTE</option>';
        //A += '<option value="2">POR X PROFESORES</option>';
        A += '<option value="3">POR X PROFESORES/GRUPO</option>';
        A += '<option value="4">LISTAR TODOS LOS HORARIOS REGISTRADOS</option>';
        $("#comboFiltros").append(A);
    }   
    $("#comboFiltros").click(function () {
        $("#botones").hide();
        $("#f-grilla").hide();
        $("#f-grilla2").hide();
    });
    var getDatosPROFE = function () {
        var dto = {};
        dto.id = $("#txtIdPro").val();
        return dto;
    };
    var getDatosEST = function () {
        var dto = {};
        dto.id = $("#txtIdEst").val();
        return dto;
    };
    $('#txtIdEst').keyup(function (e) {
        if (e.keyCode == 13) {
            var btn = $('#btnL')
            btn.button('loading')
            $.ajax(".....").always(function () {
                btn.button('reset')
            });
            verificarEst();
        }
    });
    $('#txtIdPro').keyup(function (e) {
        if (e.keyCode == 13) {
            var btn = $('#btnL')
            btn.button('loading')
            $.ajax(".....").always(function () {
                btn.button('reset')
            });
            verificarProfe();
        }
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
   
    /////////////////////////////////// FIN DEL DINAMISMOS DE LOS FILTROS //////////////////////////////////
    var getDatosFiltro = function () {
        var dto = {};
        dto.id_grupo = CodGrupo;
        dto.id_profe = $("#txtIdPro").val();
        dto.id_estudiante = $("#txtIdEst").val();
        return dto;
    };
    var getDatosGG = function () {
        var dto = {};
        dto.id = $("#txtIdPro").val();
        return dto;
    };
    function verificarEst() { // Verificamos que sea un estudiante
        buscarEst = 0;
        if ($('#txtIdEst').val() == '') {
            Alerta("Error: Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
            $('#f-grilla').hide();
            $('#f-grilla2').hide();
            $('#txtIdEst').focus();
        } else if (($('#txtIdEst').val()).length < 8) {
            Alerta("Error: La identificación debe tener <strong> 8 caracteres</strong>como minimo .", "danger");
            $('#txtIdEst').focus();
            $('#f-grilla').hide();
            $('#f-grilla2').hide();
        } else {
            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
            jsonData = "{'dto':" + JSON.stringify(getDatosEST()) + "}";

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
                        $('#f-grilla2').hide();
                        Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no se encuentra registrada </strong> en la base de datos del sistema", "Error al intentar realizar esta acción");
                        $("#txtId").focus();
                        buscarEst = 0;
                    }
                    else {
                        P = result.d;
                        if (P.rol != "ESTUDIANTE") {
                            $("#f-grilla2").hide();
                            $("#f-grilla").hide();
                            $("#txtId").focus();
                            buscarEst = 0;
                            Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no le pertenece a un estudiante </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                        } else if (P.rol == "ESTUDIANTE") {
                            $("#f-grilla2").show();
                            buscarEst = 1;
                        }
                    }
                    if (buscarEst == 1) {
                        filtrarXEst();
                    }
                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                }
            });
        }
    }
    function verificarProfe() { // Verificamos que sea un profesor
        buscarPro1 = 0;
        if (CodProfe == '') {
            Alerta("Error: Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
            $('#txtIdPro').focus();
            $('#f-grilla').hide();
            $("#f-grilla2").hide();
        } else if (CodProfe.length < 8) {
            Alerta("Error: La identificación debe tener <strong> 8 caracteres</strong>como minimo .", "danger");
            $('#txtIdPro').focus();
            $('#f-grilla').hide();
            $("#f-grilla2").hide();
        } else {
            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
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
                        $("#f-grilla").hide();
                        $("#f-grilla2").hide();
                        Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no se encuentra registrada </strong> en la base de datos del sistema", "Error al intentar realizar esta acción");
                        $("#txtIdPro").focus();
                        buscarPro1 = 0;
                    }
                    else {
                        P = result.d;
                        if (P.rol != "PROFESOR") {
                            $("#f-grilla").hide();
                            $("#f-grilla2").hide();
                            $("#txtIdPro").focus();
                            buscarPro1 = 0;
                            Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no le pertenece a un profesor </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                        } else if (P.rol == "PROFESOR") {
                            $("#f-grilla2").show();
                            buscarPro1 = 1;
                        }
                    }
                    if (buscarPro1 == 1) {
                        filtrarGruposXProfe();
                    }
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

            $(document.body).animate({ scrollTop: 300 }, 300);

            if (filtro == 0) {
                $('#f-grupo').show(); 
                $('#f-estudiantes').hide();
                $('#f-profesores').hide();
                $('#botones').show();
                $('#comboIdgrupo').focus();
            }
            if (filtro == 1) {
                $('#f-grupo').hide(); 
                $('#f-estudiantes').show();
                $('#f-profesores').hide();
                $('#botones').show();
                $('#txtIdEst').focus();
            }
            if (filtro == 2) {
                $('#f-grupo').hide(); 
                $('#f-estudiantes').hide();
                $('#f-profesores').show();
                $('#botones').show();
                $('#txtIdPro').focus();
            }
            if (filtro == 3) {
                $('#f-grupo').hide();
                $('#f-estudiantes').hide();
                $('#f-profesores').show();
                $('#botones').show();
                $('#txtIdPro').focus();
            }
            if (filtro == 4) {
                $('#f-grupo').hide();
                $('#f-estudiantes').hide();
                $('#f-profesores').hide();
                $('#botones').show();
                $('#brnL').focus();
            }
            btn.button('reset')
        });
    });
    $('#btnL').click(function () { // Botón gestionar el listado
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            $(document.body).animate({ scrollTop: 300 }, 300);
            if (filtro == 0) {
                filtrarXGrupo();
            } else if (filtro == 1) {
                verificarEst();
            }
            else if (filtro == 3) {
                CodProfe = $('#txtIdPro').val();
                verificarProfe();
            }
            else if (filtro == 4) {
                filtrarXAll();
            }
            btn.button('reset')
        });
       
      
    });


    //---------------------------FUNCIONES DE LOS FILTROS ------------------------
    function filtrarXGrupo() {
        CodGrupo =  $("#comboIdgrupo").val();
        jsonData = "{'dto':" + JSON.stringify(getDatosFiltro()) +
                      ",'dtob':" + JSON.stringify(getBitacora("HORARIOS", "LISTAR", "FILTRO POR GRUPOS")) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/horarios.asmx/c_XIdGrupo",
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
                    Modal("No hay listado de horarios para este tipo de filtro. ", " No hay horarios");
                    $("#f-grilla").hide();
                }
                else {
                    Alerta("Filtro de horarios por grupos realizado de forma exitosa", "success");
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
    function filtrarXProfe() {
       jsonData = "{'dto':" + JSON.stringify(getDatosFiltro()) +
                  ",'dtob':" + JSON.stringify(getBitacora("HORARIOS", "LISTAR", "FILTRO POR PROFESORES")) + "}";
          $.ajax({
            type: "POST",
            url: "/WS/horarios.asmx/c_XIdProfe",
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
                    Modal("No hay listado de horarios para este profesor. ", " No hay horarios");
                    $("#f-grilla").hide();
                }
                else {
                    Alerta("Horarios de clases del profesor generado de forma exitosa", "success");
                    P = result.d;
                    titleGrilla();
                    var b = 0;
                    $.each(P, function (i, item) {
                        AddItemGrilla(item);
                        b = 1;
                    })
                    if (b==0) {
                        Modal("No hay horarios de clases asignados.","No hay horarios")
                    }
                }
            },
            error: function (result) {
                Modal("Server: Error de servidor.", "Error de servidor  SSS");
              
            }
        });
         
    }
    function filtrarGruposXProfe() {
        //------------------- primero cargamos la grilla con los datos del estudiante------------------------------
        var dto = {};
        dto.id = CodProfe;

        jsonData = "{'dto':" + JSON.stringify(dto) +
                     ",'dtob':" + JSON.stringify(getBitacora("MATRICULAS", "LISTAR ", "FILTRO POR PROFESOR")) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/matriculas.asmx/c_mProfesXIdForHorario",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                $("#f-grilla2").show();
                $("#f-grilla").hide();
                $('#grilla2').html("");
                conta = 0;
                if (result.d == null) {
                    Modal("Este profesor no contiene ninguna matricula", " No se encuentra matriculado.");
                    $("#f-grilla2").hide();
                    $("#f-grilla").hide();
                }
                else {
                    $("#f-grilla2").show();
                    P = result.d;
                    titleGrilla3();
                
                    var b = 0;
                    $.each(P, function (i, item) {
                        /*-- filtro por el año academico seleccionado ----- voy preguntando y añadiendo los que si y excluendo los que no*/
                        var obj = item.id_grupo.split('-');
                        var ano = obj[0];
                        if (ano == AnoAcademico) {
                            AddItemGrilla3(item);
                            b = 1;
                        }
                    })
                    if (b == 0) {
                        Modal("Usted no contiene matriculadas en este año academico. ", "No contiene asignaturas matriculadas.");
                        redireccionar();
                    }
                }
            },
            error: function (result) {
                Modal("Server: Error de servidor.", "Error de servidor");
            }
        });
        //$('#btnI').focus();
    }
    function filtrarXEst() {
        //------------------- primero cargamos la grilla con los datos del estudiante------------------------------
        jsonData = "{'dto':" + JSON.stringify(getDatosEST()) +
                     ",'dtob':" + JSON.stringify(getBitacora("MATRICULAS", "LISTAR ", "FILTRO POR ESTUDIANTE")) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/matriculas.asmx/c_matriculaXIdEst",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                $("#f-grilla2").show();
                $("#f-grilla").hide();
                $('#grilla2').html("");
                conta = 0;
                if (result.d == null) {
                    Modal("Este estudiante no contiene ninguna matricula", " No se encuentra matriculado.");
                    $("#f-grilla2").hide();
                    $("#f-grilla").hide();
                }
                else {
                    $("#f-grilla2").show();
                    P = result.d;
                    titleGrilla2();

                    var b = 0;
                    $.each(P, function (i, item) {
                        /*-- filtro por el año academico seleccionado ----- voy preguntando y añadiendo los que si y excluendo los que no*/
                        var obj = item.id_grupo.split('-');
                        var ano = obj[0];
                        if (ano == AnoAcademico) {
                            AddItemGrilla2(item);
                            b = 1;
                        }
                    })
                    if (b == 0) {
                        Modal("Usted no contiene matriculadas en este año academico. ", "No contiene asignaturas matriculadas.");
                        redireccionar();
                    }

                }
            },
            error: function (result) {
                Modal("Server: Error de servidor.", "Error de servidor");
            }
        });
       
    }

    $(document).on('click', '.clsVerEst', function () {
        var btn = $(this)
        btn.button('loading')
        var fila = $(this).attr("tag");
        CodGrupo = array2[fila - 1].id_grupo;
       
        $.ajax("...").always(function () {
             
            jsonData = "{'dto':" + JSON.stringify(getDatosFiltro()) +
               ",'dtob':" + JSON.stringify(getBitacora("HORARIOS", "LISTAR", "FILTRO POR ESTUDIANTE")) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/horarios.asmx/c_XIdEstudianteXINGrupo",
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
                        Modal("No hay horarios para este estudiante en este grupo. ", " No hay horarios");
                        $("#f-grilla").hide();
                    }
                    else {
                        Alerta("Horario del estudiante generado de forma exitosa", "success");
                        P = result.d;
                        titleGrilla();
                        var b = 0;
                        $.each(P, function (i, item) {
                            AddItemGrilla(item);
                            b = 1;
                        });
                        if (b == 0) {
                            Modal("No hay horarios asignados para esta consulta.", "Sin horarios de clases");
                          
                        }
                    }
                },
                error: function (result) {
                    Modal("Server: Error de servidor.", "Error de servidor");
                }
            });
          
            btn.button('reset')
        });
    });
    $(document).on('click', '.clsVerPro', function () {
        var btn = $(this)
        btn.button('loading')
        var fila = $(this).attr("tag");
        CodGrupo = array3[fila - 1].id_grupo;
        var dto = {};
        dto.id_grupo = CodGrupo;
        dto.id_profe = CodProfe;
        dto.id_estudiante = "";

        $(document.body).animate({ scrollTop: 700 }, 300);
        //alert("");
        $.ajax("...").always(function () {
             jsonData = "{'dto':" + JSON.stringify(dto) +
               ",'dtob':" + JSON.stringify(getBitacora("HORARIOS", "LISTAR", "FILTRO POR PROFESOR")) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/horarios.asmx/c_XIdProfeXINGrupo",
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
                        Modal("No hay horarios para este profesor en este grupo. ", " No hay horarios");
                        $("#f-grilla").hide();
                    }
                    else {
                        Alerta("Horario de clases para este grupo generado de forma exitosa", "success");
                        P = result.d;
                        titleGrilla();
                        var b = 0;
                        $.each(P, function (i, item) {
                            AddItemGrilla(item);
                            b = 1;
                        });
                        if (b == 0) {
                            Modal("No hay horarios asignados en este grupo.", "Sin horarios de clases");
                            redireccionar();
                        }
                    }
                },
                error: function (result) {
                    Modal("Server: Error de servidor.", "Error de servidor");
                }
            });
          
            btn.button('reset')
        });
    });
 
    $('#btnN').click(function () { // Botón nuevo
        nuevo();
    });
    function filtrarXAll() {
        jsonData = "{'dtob':" + JSON.stringify(getBitacora("HORARIOS", "LISTAR TODOS", "NINGUNA")) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/horarios.asmx/c_Allhorarios",
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
                    Modal("No hay horarios para este tipo de filtro. ", " No hay horarios");
                    $("#f-grilla").hide();
                }
                else {
                    Alerta("Listado de todas los horarios registradas en el sistema de forma exitosa", "success");
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
        $('#btnI').focus();
    }
    function nuevo() {
        Alerta("Escoja el tipo de <strong>filtro</strong> que desea aplicar a la consulta de horarios registrados en el sistema y luego haga clic en el botón <strong>Gestionar</strong>.", "info");
        $('#f-grilla').hide();
        $('#f-grilla2').hide();
        $('#f-grupo').hide();
        $('#f-estudiantes').hide();
        $('#f-profesores').hide();
        $('#botones').hide();
        $('#txtIdEst').val("");
        $('#txtIdPro').val(""); 
        pos = 0;
    }
    //grilla para  llistar
    function titleGrilla() {
        $("#grilla").val("")
        $("#Ltotal").text("");;
        var newtitle = "<tr  col-xs-2>";
        newtitle += '<th class="col-md-1 col-xs-1 ">Asignatura</th>';
        newtitle += '<th class="col-xs-1 col-xs-1 text-danger">Lunes</th>';
        newtitle += '<th class="col-xs-1 col-xs-1 text-danger">Martes</th>';
        newtitle += '<th class="col-xs-1 col-xs-1 text-danger">Miercoles</th>';
        newtitle += '<th class="col-xs-1 col-xs-1 text-danger">Jueves</th>';
        newtitle += '<th class="col-xs-1 col-xs-1 text-danger">Viernes</th>';
        newtitle += '<th class="col-xs-1 col-xs-1 ">Sabado</th>';
     
        newtitle += "</tr>";
        $("#grilla").append(newtitle);
    };
    var AddItemGrilla = function (item) { // CONTENIDO DE LA GRILLA
        conta++;
        array.push(item);
        var nuevaCol = "<tr>";
        nuevaCol += "<td col-xs-1> <strong>" + item.id_asignatura + "</strong> </td>";
        nuevaCol += "<td col-xs-1>" + item.lunes + "</td>";
        nuevaCol += "<td col-xs-1>" + item.martes + "</td>";
        nuevaCol += "<td col-xs-1>" + item.miercoles + "</td>";
        nuevaCol += "<td col-xs-1>" + item.jueves + "</td>";
        nuevaCol += "<td col-xs-1>" + item.viernes + "</td>";
        nuevaCol += "<td col-xs-1>" + item.sabado + "</td>";
        
        nuevaCol += "</tr>";
        $("#Ltotal").text("Total:" + conta);
        $("#grilla").append(nuevaCol);
     
    };
    //--------------------------------------------------------------------------------------------------
    function titleGrilla2() {
        $("#grilla2").val("");
        $("#Ltotal2").text("");
        var newtitle = "<tr>";
        newtitle += '<th class="col-sm-1">IdGrupo</th>';
        newtitle += '<th class="col-sm-1">Grado</th>';
        newtitle += '<th class="col-sm-2">Año lectivo</th>';
        newtitle += '<th class="col-sm-1">Identificación</th>';
        newtitle += '<th class="col-sm-2">Apellidos</th>';
        newtitle += '<th class="col-sm-2">Nombres</th>';
        newtitle += '<th class="col-sm-2">Horario de clases</th>';
        newtitle += "</tr>";
        $("#grilla2").append(newtitle);
    };
    var AddItemGrilla2 = function (item) { // CONTENIDO DE LA GRILLA
        conta++;
        array2.push(item);
        var nuevaCol = "<tr>";
        nuevaCol += "<td col-xs-1> <strong>" + item.id_grupo + "</strong> </td>";
        nuevaCol += "<td>" + item.grado + "</td>";
        nuevaCol += "<td>" + item.año + "</td>";
        nuevaCol += "<td>" + item.id_estudiante + "</td>";
        nuevaCol += "<td>" + item.apellidos + "</td>";
        nuevaCol += "<td>" + item.nombres + "</td>";
        nuevaCol += '<td><input id="btnM" value="Ver" tag=' + array2.length + ' class="clsVerEst btn btn-primary" data-loading-text="Cargando..." type="button" />';
        nuevaCol += "</tr>";
        $("#Ltotal2").text("Total:" + conta);
        $("#grilla2").append(nuevaCol);
    };
    //--------------------------------------------------------------------------------------------------
    function titleGrilla3() {
        $("#grilla2").val("");
        $("#Ltotal2").text("");
        var newtitle = "<tr>";
        newtitle += '<th class="col-sm-1">IdGrupo</th>';
        newtitle += '<th class="col-sm-1">Grado</th>';
        newtitle += '<th class="col-sm-2">Año lectivo</th>';
        newtitle += '<th class="col-sm-1">Identificación</th>';
        newtitle += '<th class="col-sm-2">Apellidos</th>';
        newtitle += '<th class="col-sm-2">Nombres</th>';
 
        newtitle += '<th class="col-sm-2">Horario de clases</th>';
        newtitle += "</tr>";
        $("#grilla2").append(newtitle);
    };
    var AddItemGrilla3 = function (item) { // CONTENIDO DE LA GRILLA
        conta++;
        array3.push(item);
        var nuevaCol = "<tr>";
        nuevaCol += "<td col-xs-1> <strong>" + item.id_grupo + "</strong> </td>";
        nuevaCol += "<td>" + item.grado + "</td>";
        nuevaCol += "<td>" + item.año + "</td>";
        nuevaCol += "<td>" + item.id_profesor + "</td>";
        nuevaCol += "<td>" + item.apellidos + "</td>";
        nuevaCol += "<td>" + item.nombres + "</td>";
      
        nuevaCol += '<td><input id="btnMGrilla" value="Ver" tag=' + array3.length + ' class="clsVerPro  btn btn-danger" data-loading-text="Cargando..." type="button" />';
        nuevaCol += "</tr>";
        $("#Ltotal2").text("Total:" + conta);
        $("#grilla2").append(nuevaCol);
    };
   
    //--------------------------------------------------------------------------------------------------

//});
