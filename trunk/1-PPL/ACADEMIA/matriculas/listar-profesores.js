
//$(document).ready(function () {
    WinMove();
    var conta;
    var Pos, CodProfe;
    var p = {};
    var filtro;
    //---------------------------------- validamos que este logueado el usuario ----------------------------------------------
    validar_pagina();
    //---------------------------------- validamos que el rol del usuario pueda ingresar a esta pagina -----------------------
    if (localStorage.getItem('SeccionRol') == "ADMINISTRATIVO" || localStorage.getItem('SeccionRol') == "SUPER") {
        conta = 0;
    } else {
        DenegarAccesoToAdmin();
    }
    var array = new Array();

    CargarDatosIniciales();
    function CargarDatosIniciales() {
        $("#formPPAL").hide();
        $("#imgload").show();
        $.ajax("...").always(function () {
            nuevo();
            FiltrosDisponibles();
            cargarAsignaturas();
            cargarGrupos();
            cargarSexos();
            $("#formPPAL").show();
            $("#imgload").hide();
        });
    }
    //---------------------------------- --------------------------------------------------------------------------------------
    function FiltrosDisponibles() {
        var A;
        $("#comboFiltros").html("");
        A += '<option value="0">POR X GRUPOS</option>';
        A += '<option value="1">POR X PROFESOR</option>';
        A += '<option value="2">POR X ASIGNATRURAS</option>';
        A += '<option value="3">LISTAR TODAS LA MATRICULAS REGISTRADAS</option>';
        $("#comboFiltros").append(A);
    }
    $('#txtId').click(function () { filtro = 11; });
    $('#txtIdN').click(function () { filtro = 12; });

    $('#txtId').keyup(function (e) {
        if (e.keyCode == 13) {
            $(document.body).animate({ scrollTop: 600 }, 300);
            var btn = $('#btnG')
            btn.button('loading')
            $.ajax(".....").always(function () {
                filtro = 1;
                verificarProfesorId();
                btn.button('reset')
            });
        }
    });
    $('#txtIdN').keyup(function (e) {
        if (e.keyCode == 13) {
            $(document.body).animate({ scrollTop: 600 }, 300);
            var btn = $('#btnG')

            btn.button('loading')
            $.ajax(".....").always(function () {
                filtro = 2;
                verificarProfesorNom();
                btn.button('reset')
            });
        }
    });

    function verificarProfesorId() { // Verificamos que sea un estudiante
        if ($('#txtId').val() == '') {
            Alerta2("Error: Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
            $("#f-grilla").hide();
            $('#txtId').focus();
        } else if (($('#txtId').val()).length < 8) {
            Alerta2("Error: La identificación debe tener <strong> 8 caracteres</strong>como minimo .", "danger");
            $("#f-grilla").hide();
            $('#txtId').focus();
        }
        else {
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
                        $("#txtId").focus();
                        Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no se encuentra registrada </strong> en la base de datos del sistema", "Error al intentar realizar esta acción");
                    }
                    else {
                        P = result.d;
                        if (P.rol != "PROFESOR" ) {
                            $("#f-grilla").hide();
                            $("#txtId").focus();
                            Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no le pertenece a un profesor </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                        } else if (P.rol == "PROFESOR") {
                            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
                            $("#txtId").attr('disabled', 'disabled');
                            $("#txtIdN").attr('disabled', 'disabled');
                            $("#txtAp").val(P.apellidos);
                            $("#txtNom").val(P.nombres);
                            $("#txtId").val(P.id);
                            CodProfe =P.id;
                            filtrarXIdProfe();
                            $("#f-grilla").show();

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
                        $("#f-grilla").hide();
                        $("#txtIdN").focus();
                        Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no se encuentra registrado </strong> en la base de datos del sistema", "Error al intentar realizar esta acción");
                    }
                    else {
                        P = result.d;
                        if (P.rol != "PROFESOR") {
                            $("#f-grilla").hide();
                            $("#txtIdN").focus();
                            Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no le pertenece a un profesor </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                        } else if (P.rol == "PROFESOR") {
                            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
                            $("#txtId").attr('disabled', 'disabled');
                            $("#txtIdN").attr('disabled', 'disabled');
                            $("#txtAp").val(P.apellidos);
                            $("#txtNom").val(P.nombres);
                            $("#txtId").val(P.id);
                            CodProfe = P.id;
                            filtrarXIdProfe();

                            $("#f-grilla").show();
                        }
                    }
                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Error al en el servidor");
                }
            });
        }
    }


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
                    conta = 0;
                    $("#comboIdAsig").html("");
                    $("#comboIdAsigG").html("");
                    $.each(P, function (i, item) {
                        $("#comboIdAsig").append("<option value=" + item.id + ">" + item.id + "</option>");
                        $("#comboIdAsigG").append("<option value=" + item.id + ">" + item.id + "</option>");
                        if (conta == 0) {
                            $("#txtIdNomAsi").val(item.nombre);
                            $("#txtIdHoras").val(item.horas);
                            $("#txtIdNomAsiG").val(item.nombre);
                            $("#txtIdHorasG").val(item.horas);
                        }
                        conta++;
                    })
                }
            },
            error: function (result) {
                Modal("Server: Error al cargar las asignaturas.", "Error de sistema");
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
    $('#btnG').click(function () { // Botón gestionar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            filtro = $("#comboFiltros").val();
            if (filtro == 0) {
                $('#f-profesor').hide();
                $('#f-grupo').show();
                $('#f-asignaturas').hide();
                $('#f-sexo').hide();

                $('#f-profeGrupo').hide();
                $('#f-asignaturasGrupo').hide();

                $('#f-grilla').hide();
                $('#botones').show();
                $('#comboGrupo').focus();
            }
            if (filtro == 1) {
                $('#f-profesor').show();
                $('#f-grupo').hide();
                $('#f-asignaturas').hide();
                $('#f-sexo').hide();

                $('#f-profeGrupo').hide();
                $('#f-asignaturasGrupo').hide();

                $('#f-grilla').hide();
                $('#botones').show();
                $('#txtId').focus();
            }
            if (filtro == 2) {

                $('#f-profesor').hide();
                $('#f-grupo').hide();
                $('#f-asignaturas').show();
                $('#f-sexo').hide();

                $('#f-profeGrupo').hide();
                $('#f-asignaturasGrupo').hide();

                $('#f-grilla').hide();
                $('#botones').show();
                $('#comboIdAsig').focus();
            }
            if (filtro == 3) {
                $('#f-profesor').hide();
                $('#f-grupo').hide();
                $('#f-asignaturas').hide();
                $('#f-sexo').hide();

                $('#f-profeGrupo').hide();
                $('#f-asignaturasGrupo').hide();

                $('#f-grilla').hide();
                $('#botones').show();
              
            }
           
            btn.button('reset')
        });
    });

    $("#comboFiltros").click(function () {
        $("#f-grilla").hide();
        $("#botones").hide();
    });
    $('#btnS').click(function () { // Botón Sexo  c_mProfesXIdGrupoXSexo
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            $('#f-profesor').hide();
            $('#f-grupo').show();
            $('#f-asignaturas').hide();
            $('#f-sexo').show();

            $('#f-profeGrupo').hide();
            $('#f-asignaturasGrupo').hide();

            $('#f-grilla').hide();
            $('#botones').show();
            $('#txtId').focus();
            $('#comboSexo').focus();
            filtro = 4;
            btn.button('reset')
        });
      
    });
    $('#btnAG').click(function () { // Botón Grupo x Asignatura  c_mProfesXGrupoXAsig
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            $('#f-profesor').hide();
            $('#f-grupo').show();
            $('#f-asignaturas').hide();
            $('#f-sexo').hide();

            $('#f-profeGrupo').hide();
            $('#f-asignaturasGrupo').show();

            $('#f-grilla').hide();
            $('#botones').show();
            $('#comboIdAsigG').focus();
            filtro = 5;
            btn.button('reset')
        });
       
    });
    $('#btnPG').click(function () { // Botón Grupo x Asig X Profesor  c_mProfesXIdXGrupoXAsig
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            $('#f-profesor').hide();
            $('#f-grupo').show();
            $('#f-asignaturas').hide();
            $('#f-sexo').hide();

            $('#f-profeGrupo').show();
            $('#f-asignaturasGrupo').show();

            $('#f-grilla').hide();
            $('#botones').show();
            $('#txtIdG').focus();

            filtro = 6;
            btn.button('reset')
        });

        
    });

    var getDatosAsig = function () {
        var dto = {};
        dto.id = $("#comboIdAsig").val();
        return dto;
    };
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

    var getDatosAsigG = function () {
        var dto = {};
        dto.id = $("#comboIdAsigG").val();
        return dto;
    };
    $("#comboIdAsigG").change(function () {
        jsonData = "{'dto':" + JSON.stringify(getDatosAsigG()) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/asignaturas.asmx/c_asignatura",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                P = result.d;
                $("#txtIdNomAsiG").val(P.nombre);
                $("#txtIdHorasG").val(P.horas);
            },
            error: function (result) {
            }
        });
    });

 
    var getDatos = function () {
        var dto = {};
        dto.id_profe = $("#txtId").val();
        dto.id_profeG = $("#txtIdG").val();
        dto.id_asig = $("#comboIdAsig").val();
        dto.id_asigG = $("#comboIdAsigG").val();
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
   
    $('#btnL').click(function () { // Botón gestionar el listado
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            $(document.body).animate({ scrollTop: 350 }, 300);
            if (filtro == 0) {
                filtrarXIdGrupo();
            } else if (filtro == 11) {
                verificarProfesorId();
            }
            else if (filtro == 12) {
                verificarProfesorNom();
            }
            else if (filtro == 2) {
                filtrarXIdAsig();
            }
            else if (filtro == 3) {
                filtrarXAll();
            }
                //------ extras
            else if (filtro == 4) {
                filtrarXIdGrupoXSexo();
            }
            else if (filtro == 5) {
                filtrarXIdGrupoXAsig();
            }
            else if (filtro == 6) {
                filtrarXIdXGrupoXAsig();
            }
            
            btn.button('reset')
        });
    });

    function filtrarXIdGrupo() {
        if ($('#comboGrupo').val() == '') {
            Alerta("Error: Escoja un grupo y luego haga clic en el botón <strong> Listar todos </strong>para continuar.", "danger");
            $('#comboGrupo').focus();
        } else {
            jsonData = "{'dto':" + JSON.stringify(getDatos()) +
                      ",'dtob':" + JSON.stringify(getBitacora("MATRICULAS", "LISTAR TODOS", "FILTRO DE PROFESORES POR GRUPO")) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/matriculas.asmx/c_mProfesXIdGrupo",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    $("#f-grilla").show();
                    $('#grilla').html("");
                    conta = 0;
                    if (result.d == null) {
                        Modal("No existen profesores para filtrar", " Personal vacio");
                        $("#f-grilla").hide();
                    }
                    else {
                        Alerta("Filtro de profesores por grupos realizado de forma exitosa", "success");
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
    function filtrarXIdProfe() {
        var dto = {};
        dto.id = CodProfe;
                
            jsonData = "{'dto':" + JSON.stringify(dto()) +
                      ",'dtob':" + JSON.stringify(getBitacora("MATRICULAS", "LISTAR TODOS", "FILTRO POR IDENTIFICACIÓN DEL PROFESOR")) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/matriculas.asmx/c_mProfesXId",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    $("#f-grilla").show();
                    $('#grilla').html("");
                    conta = 0;
                    if (result.d == null) {
                        Modal("No existen profesores para filtrar", " Personal vacio");
                        $("#f-grilla").hide();
                    }
                    else {
                        Alerta("Filtro de profesores por identificación realizado de forma exitosa", "success");
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
    function filtrarXIdAsig() {
        if ($('#comboIdAsig').val() == '') {
            Alerta("Error: Escoja una asignatura y luego haga clic en el botón <strong> Listar todos </strong>para continuar.", "danger");
            $('#comboIdAsig').focus();
        } else {
            jsonData = "{'dto':" + JSON.stringify(getDatos()) +
                      ",'dtob':" + JSON.stringify(getBitacora("MATRICULAS", "LISTAR TODOS", "FILTRO DE PROFESORES POR ASIGNATURAS")) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/matriculas.asmx/c_mProfesXIdAsig",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    $("#f-grilla").show();
                    $('#grilla').html("");
                    conta = 0;
                    if (result.d == null) {
                        Modal("No existen profesores para filtrar", " Personal vacio");
                        $("#f-grilla").hide();
                    }
                    else {
                        Alerta("Filtro de profesores por asignaturas realizado de forma exitosa", "success");
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
            jsonData = "{'dto':" + JSON.stringify(getDatos()) +
                      ",'dtob':" + JSON.stringify(getBitacora("MATRICULAS", "LISTAR TODOS", "FILTRO POR GRUPO Y SEXO DE PROFESORES")) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/matriculas.asmx/c_mProfesXIdGrupoXSexo",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    $("#f-grilla").show();
                    $('#grilla').html("");
                    conta = 0;
                    if (result.d == null) {
                        Modal("No existen profesores para filtrar", " Personal vacio");
                        $("#f-grilla").hide();
                    }
                    else {
                        Alerta("Filtro de profesores por grupo y sexo realizado de forma exitosa", "success");
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
    function filtrarXIdGrupoXAsig() {
        if ($('#comboIdAsigG').val() == '') {
            Alerta("Error: Escoja una asignatura y luego haga clic en el botón <strong> Listar todos </strong>para continuar.", "danger");
            $('#comboIdAsigG').focus();
        } else {
            jsonData = "{'dto':" + JSON.stringify(getDatos()) +
                      ",'dtob':" + JSON.stringify(getBitacora("MATRICULAS", "LISTAR TODOS", "FILTRO DE PROFESORES GRUPO Y ASIGNATURAS")) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/matriculas.asmx/c_mProfesXGrupoXAsig",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    $("#f-grilla").show();
                    $('#grilla').html("");
                    conta = 0;
                    if (result.d == null) {
                        Modal("No existen profesores para filtrar", " Personal vacio");
                        $("#f-grilla").hide();
                    }
                    else {
                        Alerta("Filtro de profesores por grupo y asignaturas realizado de forma exitosa", "success");
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
    function filtrarXIdXGrupoXAsig() {
        if ($('#txtIdG').val() == '') {
            Alerta("Error: Digite una identificación en el cuadro de texto y luego haga clic en el botón <strong> Listar todos </strong>para continuar.", "danger");
            $('#txtIdG').focus();
        } else {
            jsonData = "{'dto':" + JSON.stringify(getDatos()) +
                      ",'dtob':" + JSON.stringify(getBitacora("MATRICULAS", "LISTAR TODOS", "FILTRO POR GRUPO, ASIGNATURA Y IDENTIFICACIÓN DEL PROFESOR")) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/matriculas.asmx/c_mProfesXIdXGrupoXAsig",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    $("#f-grilla").show();
                    $('#grilla').html("");
                    conta = 0;
                    if (result.d == null) {
                        Modal("No existen profesores para filtrar", " Personal vacio");
                        $("#f-grilla").hide();
                    }
                    else {
                        Alerta("Filtro de profesores por grupo, asignaturas y identificación del profesor realizado de forma exitosa", "success");
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
    $('#btnN').click(function () { // Botón nuevo
        nuevo();

    });

    function filtrarXAll() {
 
        jsonData = "{'dtob':" + JSON.stringify(getBitacora("MATRICULAS", "LISTAR TODOS ", "NINGUNO")) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/matriculas.asmx/c_matriculasProfes",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                $("#f-grilla").show();
                $('#grilla').html("");
                conta = 0;
                if (result.d == null) {
                    Modal("No existen profesores para filtrar", " Personal vacio");
                    $("#f-grilla").hide();
                }
                else {
                    Alerta("Filtro de todas las matriculas de profesores realizado de forma exitosa", "success");
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

    //grilla para  llistar
    function nuevo() {
        Alerta("Escoja el tipo de <strong>filtro</strong> que desea aplicar a la consulta de estudiantes matriculados en el sistema y luego haga clic en el botón <strong>Listar</strong>.", "info");
        $('#f-profeGrupo').hide();
        $('#f-asignaturasGrupo').hide();
        $('#f-grupo').hide();
        $('#f-profesor').hide();

        $('#f-sexo').hide();
        $('#f-asignaturas').hide();
        $('#f-grilla').hide();
        $('#txtId').val("");


        $("#txtIdN").removeAttr('disabled');
        $("#txtId").removeAttr('disabled');
        $("#txtIdN").val("");
        $("#txtId").val("");

        $("#txtNom").val("");
        $("#txtAp").val("");

        pos = 0;
        $('#botones').hide();
    }
    function titleGrilla() {
        $("#grilla").val("");
        $("#Ltotal").text("");
        var newtitle = "<tr>";
        newtitle += '<th class="col-sm-1">IdGrupo</th>';
        newtitle += '<th class="col-sm-1">IdProfe</th>';
        newtitle += '<th class="col-sm-2">Nombres</th>';
        newtitle += '<th class="col-sm-2">Apellidos</th>';
        newtitle += '<th class="col-sm-2">IdAsignatura</th>';
        newtitle += '<th class="col-sm-2">Asignatura</th>';
        newtitle += '<th class="col-sm-1">Horas</th>';
        newtitle += "</tr>";
        $("#grilla").append(newtitle);
    };
    var AddItemGrilla = function (item) { // CONTENIDO DE LA GRILLA
        conta++;
        array.push(item);
        var nuevaCol = "<tr>";
        nuevaCol += "<td>" + item.id_grupo + "</td>";
        nuevaCol += "<td>" + item.id_profesor + "</td>";
        nuevaCol += "<td>" + item.nombres + "</td>";
        nuevaCol += "<td>" + item.apellidos + "</td>";
        nuevaCol += "<td>" + item.id_asignatura + "</td>";
        nuevaCol += "<td>" + item.n_asignatura + "</td>";
        nuevaCol += "<td>" + item.horas + "</td>";
        nuevaCol += "</tr>";
        $("#Ltotal").text("Total:" + conta);
        $("#grilla").append(nuevaCol);
    };
        //--------------------------------------------------------------------------------------------------
//});

