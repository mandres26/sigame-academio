
//$(document).ready(function () {
    WinMove();
    var idOld;
    var conta,CodEst,CodAcu;
    var Pos;
    var P = {};
    var filtro;
  
    //---------------------------------- validamos que este logueado el usuario ----------------------------------------------
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
            nuevo();
            FiltrosDisponibles();
            cargarGrupos();
            cargarSexos();
            $("#formPPAL").show();
            $("#imgload").hide();
        });
    }

    function FiltrosDisponibles() {
        var A;
        $("#comboFiltros").html("");
        A += '<option value="0">POR X GRUPOS</option>';
        A += '<option value="1">POR X ESTUDIANTES</option>';
        A += '<option value="9">POR X ACUDIENTES</option>';
        A += '<option value="3">LISTAR TODAS LA MATRICULAS REGISTRADAS</option>';
        $("#comboFiltros").append(A);
    }

    $('#btnG').click(function () { // Botón gestionar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            filtro = $("#comboFiltros").val();
            if (filtro == 0) {
                $('#f-grupo').show();
                $('#f-estudiante').hide();
                $('#f-acudiente').hide();
                $('#f-sexo').hide();
                $('#botones').show();
                $('#comboGrupo').focus();
            }
            if (filtro == 1) {
                $('#f-grupo').hide();
                $('#f-estudiante').show();
                $('#f-acudiente').hide();
                $('#f-sexo').hide();
                $('#botones').show();
                $('#txtIdEst').focus();
            }
            if (filtro == 9) {
                $('#f-grupo').hide();
                $('#f-estudiante').hide();
                $('#f-acudiente').show();
                $('#f-sexo').hide();
                $('#botones').show();
                $('#txtIdEst').focus();
            }
            if (filtro == 3) {
                $("#f-jornada").show();
                $("#botones").show();
                $("#f-sexo").hide();
            }
            btn.button('reset')
        });
    });

    var array = new Array(); 
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
                    P = result.d;
                    $("#comboGrupo").html("");
                    $.each(P, function (i, item) {
                        $("#comboGrupo").append("<option value=" + item.id_grupo + ">" + item.id_grupo + "</option>");
                    })
                }
            },
            error: function (result) {
                Modal("Server: Error al cargar los grupos.", "Error de servidor");
                redireccionar();
            }
        });
    }

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

    $('#btnS').click(function () { // Botón Sexo
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            $('#f-grupo').show();
            $('#f-estudiante').hide();
            $('#f-acudiente').hide();
            $('#f-sexo').show();
            $('#botones').show();
            $('#comboSexo').focus();
            filtro = 4;
            btn.button('reset')
        });
    });
    var getDatosA = function () {
        var dto = {};
        dto.id = $("#txtIdAcu").val();
        return dto;
    };
    var getDatosGrupo = function () {
        var dto = {};
        dto.id_grupo = $("#comboGrupo").val();
        dto.sexo = $("#comboSexo").val();
        return dto;
    };

    function cargarSexos() {
        var A;
        $("#comboSexo").html("");
        A += '<option value="MASCULINO">MASCULINO</option>';
        A += '<option value="FEMENINO">FEMENINO</option>';
        $("#comboSexo").append(A);
    }
//----------------------------------------------------
    $('#txtIdEst').keyup(function (e) {
        if (e.keyCode == 13) {
            $(document.body).animate({ scrollTop: 600 }, 300);
            var btn = $('#btnL')
            btn.button('loading')
            $.ajax(".....").always(function () {
                filtro = 1;
                verificarEstId();
                btn.button('reset')
            });
        }
    });
    $('#txtIdEstN').keyup(function (e) {
        if (e.keyCode == 13) {
            $(document.body).animate({ scrollTop: 600 }, 300);
            var btn = $('#btnL')
            btn.button('loading')
            $.ajax(".....").always(function () {
                filtro = 2;
                verificarEstNom();
                btn.button('reset')
            });
        }
    });
    $('#txtIdAcu').keyup(function (e) {
        if (e.keyCode == 13) {
            $(document.body).animate({ scrollTop: 600 }, 300);
            var btn = $('#btnL')
            btn.button('loading')
            $.ajax(".....").always(function () {
                filtro = 3;
                verificarAcuId();
                btn.button('reset')
            });
        }
    });
    $('#txtIdAcuN').keyup(function (e) {
        if (e.keyCode == 13) {
            $(document.body).animate({ scrollTop: 600 }, 300);
            var btn = $('#btnL')
            btn.button('loading')
            $.ajax(".....").always(function () {
                filtro = 4;
                verificarAcuNom();
                btn.button('reset')
            });
        }
    });
    $('#txtIdEst').click(function () { filtro = 11; });
    $('#txtIdEstN').click(function () { filtro = 12; });
    $('#txtIdAcu').click(function () { filtro = 21;});
    $('#txtIdAcuN').click(function () { filtro = 22; });

//----------------------------------------------------
    $('#btnL').click(function () { // Botón gestionar el listado
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            $(document.body).animate({ scrollTop: 600 }, 300);
            if (filtro == 0) {
                filtrarXIdGrupo();
            } else if (filtro == 11) {  
                verificarEstId();
            }
            else if (filtro == 12) {
                verificarEstNom();
            }
            else if (filtro == 21) {
                verificarAcuNom();
            }
            else if (filtro == 22) {
                verificarAcuNom();
            }
            else if (filtro == 3) {  
                filtrarXAll();
            }
            else if (filtro == 4) {  
                filtrarXIdGrupoXSexo();
            }
            btn.button('reset')
        });
    });
//pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp
    function verificarEstId() { // Verificamos que sea un estudiante
        if ($('#txtIdEst').val() == '') {
            Alerta("Error: Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
            $('#f-grilla').hide();
            $('#txtIdEst').focus();
        } else if (($('#txtIdEst').val()).length < 8) {
            Alerta("Error: La identificación debe tener <strong> 8 caracteres</strong>como minimo .", "danger");
            $('#f-grilla').hide();
            $('#txtIdEst').focus();
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
                            filtrarXIdEst();
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
            Alerta("Error: Digite un nombre en el cuadro de texto y luego haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
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
                            $("#txtNomEst").val(P.nombres);
                            filtrarXIdEst();
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
    function verificarAcuId() { // Verificamos que sea un acudiente
        if ($('#txtIdAcu').val() == '') {
            Alerta("Error: Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
            $("#f-grilla").hide();
            $('#txtIdAcu').focus();
        } else if (($('#txtIdAcu').val()).length < 8) {
            Alerta("Error: La identificación debe tener <strong> 8 caracteres</strong>como minimo .", "danger");
            $("#f-grilla").hide();
            $('#txtIdAcu').focus();
        } else {
            var dto = {};
            dto.id = $("#txtIdAcu").val();
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
                        $("#txtIdAcu").focus();
                        Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no se encuentra registrada </strong> en la base de datos del sistema", "Error al intentar realizar esta acción");
                    }
                    else {
                        P = result.d;

                        if (P.rol != "ACUDIENTE" && P.rol_secundario != "ACUDIENTE") {
                            $("#f-grilla").hide();
                            $("#txtIdAcu").focus();
                            Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no le pertenece a un acudiente </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                        } else if (P.rol == "ACUDIENTE" || P.rol_secundario == "ACUDIENTE") {
                            $("#txtIdAcu").attr('disabled', 'disabled');
                            $("#txtIdAcuN").attr('disabled', 'disabled');
                            $("#txtApAcu").val(P.apellidos);
                            $("#txtIdAcu").val(P.id);
                            CodAcu = P.id;
                            $("#txtNomAcu").val(P.nombres);
                            filtrarXIdAcu();
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
    function verificarAcuNom() { // Verificamos que sea un acudiente

        if ($('#txtIdAcuN').val() == '') {
            Alerta("Error: Digite un nombre en el cuadro de texto y luego haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
            $('#txtIdAcuN').focus();
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
                        $("#f-grilla").hide();
                        $("#txtIdAcuN").focus();
                        Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no se encuentra registrado </strong> en la base de datos del sistema", "Error al intentar realizar esta acción");
                    }
                    else {
                        P = result.d;
                        if (P.rol != "ACUDIENTE") {
                            $("#f-grilla").hide();
                            $("#txtIdAcuN").focus();
                            Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no le pertenece a un acudiente </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                        } else if (P.rol == "ACUDIENTE" || P.rol_secundario == "ACUDIENTE") {
                            $("#txtIdAcu").attr('disabled', 'disabled');
                            $("#txtIdAcuN").attr('disabled', 'disabled');
                            $("#txtApAcu").val(P.apellidos);
                            $("#txtIdAcu").val(P.id);
                            CodAcu = P.id;
                            $("#txtNomAcu").val(P.nombres);
                            filtrarXIdAcu();
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
    $("#comboFiltros").click(function () {
        $("#botones").hide();
        $("#f-grilla").hide();
    });
    function filtrarXIdEst() {
        var dto = {};
        dto.id = CodEst;
            jsonData = "{'dto':" + JSON.stringify(dto) +
                      ",'dtob':" + JSON.stringify(getBitacora("MATRICULAS", "LISTAR ", "FILTRO POR ESTUDIANTE")) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/matriculas.asmx/c_matriculaXIdEst",
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
                        Alerta("Filtro del estudiantes por identificación realizado de forma exitosa", "success");
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
    function filtrarXIdAcu() {
        var dto = {};
        dto.id = CodAcu;
            jsonData = "{'dto':" + JSON.stringify(dto) +
                      ",'dtob':" + JSON.stringify(getBitacora("MATRICULAS", "LISTAR ", "FILTRO POR ACUDIENTE")) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/matriculas.asmx/c_matriculaXIdAcu",
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
                        Alerta("Filtro del estudiantes por acudiente realizado de forma exitosa", "success");
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
    function filtrarXIdGrupo() {
        if ($('#comboGrupo').val() == '') {
            Alerta("Error: Escoja una identificación de un grupo y luego haga clic en el botón <strong> Listar todos </strong>para continuar.", "danger");
            $('#comboGrupo').focus();
        } else {
            jsonData = "{'dto':" + JSON.stringify(getDatosGrupo()) +
                      ",'dtob':" + JSON.stringify(getBitacora("MATRICULAS", "LISTAR ", "FILTRO POR GRUPO")) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/matriculas.asmx/c_matriculaXIdGrupo",
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
    function filtrarXIdGrupoXSexo() {
        if ($('#comboSexo').val() == '') {
            Alerta("Error: Escoja un sexo y luego haga clic en el botón <strong> Listar todos </strong>para continuar.", "danger");
            $('#comboSexo').focus();
        } else {
            jsonData = "{'dto':" + JSON.stringify(getDatosGrupo()) +
                      ",'dtob':" + JSON.stringify(getBitacora("MATRICULAS", "LISTAR ", "FILTRO POR GRUPO Y SEXO")) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/matriculas.asmx/c_matriculaXIdGrupoXSexo",
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
                        Alerta("Filtro del estudiantes por grupo y sexo realizado de forma exitosa", "success");
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
    function filtrarXAll(){  
        jsonData = "{'dtob':" + JSON.stringify(getBitacora("MATRICULAS", "LISTAR TODOS ", "NINGUNO")) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/matriculas.asmx/c_matriculasEst",
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
                    Alerta("Filtro de todas las matriculas de estudiantes realizado de forma exitosa", "success");
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
    function nuevo() {
        Alerta("Escoja el tipo de <strong>filtro</strong> que desea aplicar a la consulta de estudiantes matriculados en el sistema y luego haga clic en el botón <strong>Listar</strong>.", "info");
        $('#f-estudiante').hide();
        $('#f-acudiente').hide();
        $("#txtIdEst").val("");
        $("#txtIdEstN").val("");
        $("#txtIdAcu").val("");
        $("#txtIdAcuN").val("");
        $("#txtNomEst").val("");
        $("#txtApEst").val("");
        $("#txtNomAcu").val("");
        $("#txtApAcu").val("");
        $("#txtIdEst").removeAttr('disabled');
        $("#txtIdEstN").removeAttr('disabled');
        $("#txtIdAcu").removeAttr('disabled');
        $("#txtIdAcuN").removeAttr('disabled');

        $('#f-grupo').hide();
        $('#f-sexo').hide();
        $('#f-grilla').hide();
        $('#botones').hide();
        pos = 0;
    }
    //grilla para  llistar
    function titleGrilla() {
        $("#grilla").val("");
        $("#Ltotal").text("");
        var newtitle = "<tr>";
        newtitle += '<th class="col-sm-1">IdGrupo</th>';
        newtitle += '<th class="col-sm-1">Grado</th>';
        newtitle += '<th class="col-sm-2">Año lectivo</th>';
        newtitle += '<th class="col-sm-1">Identificación</th>';
        newtitle += '<th class="col-sm-2">Nombres</th>';
        newtitle += '<th class="col-sm-2">Apellidos</th>';
        newtitle += '<th class="col-sm-1">Edad</th>';
        newtitle += '<th class="col-sm-2">Fecha nacimiento</th>';
        newtitle += "</tr>";
        $("#grilla").append(newtitle);
    };
    var AddItemGrilla = function (item) { // CONTENIDO DE LA GRILLA
        conta++;
        array.push(item);
        var nuevaCol = "<tr>";
        nuevaCol += "<td>" + item.id_grupo + "</td>";
        nuevaCol += "<td>" + item.grado + "</td>";
        nuevaCol += "<td>" + item.año + "</td>";
        nuevaCol += "<td>" + item.id_estudiante + "</td>";
        nuevaCol += "<td>" + item.nombres + "</td>";
        nuevaCol += "<td>" + item.apellidos + "</td>";
        nuevaCol += "<td>" + item.edad + "</td>";
        nuevaCol += "<td>" + item.f_naci + "</td>";
        nuevaCol += "</tr>";
        $("#Ltotal").text("Total:" + conta);
        $("#grilla").append(nuevaCol);
    };
        //--------------------------------------------------------------------------------------------------
//});
