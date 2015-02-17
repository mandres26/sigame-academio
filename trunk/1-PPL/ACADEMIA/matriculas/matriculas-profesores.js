
//$(document).ready(function () {
    WinMove();
    var conta, filtro;
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
            cargarAsignaturas();
            CargarProfes();

            $("#formPPAL").show();
            $("#imgload").hide();
        });
    }
    var array = new Array(); 
    $('#txtId').click(function () { filtro = 1; });
    $('#txtIdN').click(function () { filtro = 1; });

    $('#txtId').keyup(function (e) {
        if (e.keyCode == 13) {
            $(document.body).animate({ scrollTop: 400 }, 300);
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
            var btn = $('#btnG')
            btn.button('loading')
            $.ajax(".....").always(function () {
                $(document.body).animate({ scrollTop: 300 }, 300);
                //Aca redireccionamos al extraer el id de la persona
                var arr = $('#txtIdN').val().split('/');
                $('#txtId').val(arr[1]);
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


    $('#btnG').click(function () { // Botón gestionar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            $(document.body).animate({ scrollTop: 300 }, 300);
            //Aca redireccionamos al extraer el id de la persona
            var arr = $('#txtIdN').val().split('/');
            $('#txtId').val(arr[1]);
            filtro = 1;
            verificarProfesorId();
            btn.button('reset')

        });
    });

  
     $('#btnN').click(function () { // Botón Nuevo
        nuevo();
    });
    

    function nuevo() {
        Alerta("Digite una identificación o nombre en el cuadro de texto y luego presione la tecla <strong> enter</strong> o haga clic en el botón <strong> gestionar </strong>para continuar.", "info");
        $("#txtId").val("");
        $("#txtIdN").val("");
        $("#txtNom").val("");
        $("#txtAp").val("");
        $('#formulario').hide();
        $("#txtIdN").removeAttr('disabled');
        $("#txtId").removeAttr('disabled');
        $('#txtId').focus();
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
                    conta=0;
                    $("#comboIdAsig").html("");
                    $.each(P, function (i, item) {
                        $("#comboIdAsig").append("<option value=" + item.id + ">" + item.id + "</option>");
                        if (conta==0) {
                            $("#txtIdNomAsi").val(item.nombre);
                            $("#txtIdHoras").val(item.horas);
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
                    conta = 0;
                    $("#comboIdgrupo").html("");
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
                //Modal("Server: Error al cargar los grupos.", "Error de sistema");
                redireccionar();
            }
        });
    }
   
    var getDatosM = function () {
        var dto = {};
        dto.id_asignatura = $("#comboIdAsig").val();
        dto.id_grupo = $("#comboIdgrupo").val();
        dto.id_profesor = $("#txtId").val();
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

    function verificarProfesorId() { // Verificamos que sea un estudiante
        if ($('#txtId').val() == '') {
            Alerta("Error: Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
            $("#formulario").hide();
            $('#txtId').focus();
            //} else if (($('#txtId').val()).length < 8) {
            //    Alerta("Error: La identificación debe tener <strong> 8 caracteres</strong>como minimo .", "danger");
            //    $("#formulario").hide();
            //    $('#txtId').focus();
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
                        $("#formulario").hide();
                        $("#txtId").focus();
                        Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no se encuentra registrada </strong> en la base de datos del sistema", "Error al intentar realizar esta acción");
                    }
                    else {
                        P = result.d;
                        if (P.rol != "PROFESOR") {
                            $("#formulario").hide();
                            $("#txtId").focus();
                            Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no le pertenece a un profesor </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                        } else if (P.rol == "PROFESOR") {
                            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
                            $("#txtId").attr('disabled', 'disabled');
                            $("#txtIdN").attr('disabled', 'disabled');
                            $("#txtAp").val(P.apellidos);
                            $("#txtNom").val(P.nombres);
                            $("#txtId").val(P.id);
                            $("#formulario").show();
                            $("#comboIdgrupo").focus();
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
                        $("#formulario").hide();
                        $("#txtIdN").focus();
                        Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no se encuentra registrado </strong> en la base de datos del sistema", "Error al intentar realizar esta acción");
                    }
                    else {
                        P = result.d;
                        if (P.rol != "PROFESOR") {
                            $("#formulario").hide();
                            $("#txtIdN").focus();
                            Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no le pertenece a un profesor </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                        } else if (P.rol == "PROFESOR") {
                            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
                            $("#txtId").attr('disabled', 'disabled');
                            $("#txtIdN").attr('disabled', 'disabled');
                            $("#txtAp").val(P.apellidos);
                            $("#txtId").val(P.id);
                            $("#txtNom").val(P.nombres);
                            $("#formulario").show();
                            $("#comboIdgrupo").focus();
                        }
                    }
                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Error al en el servidor");
                }
            });
        }
    }

    $('#btnR').click(function () { // Botón Registrar
            var btn = $(this)
            btn.button('loading')
            $.ajax(".....").always(function () {
               
            jsonData = "{'dto':" + JSON.stringify(getDatosM()) + ",'dtob':" + JSON.stringify(getBitacora("MATRICULAS", "REGISTRAR", "ACCIÓN REALZIADA A UN PROFESOR")) + "}"; //Registro de bitacora
            $.ajax({
                type: "POST",
                url: "/WS/matriculas.asmx/r_matriculaProfes",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        Modal("Error al intentar realizar esta acción.", " Existe un problema de inconsistencia con la base de datos del sistema. Contactese con el administrador.");
                    }
                    else {
                        Modal(JSON.stringify(result.d), "Registro de carga academica de los profesores");
                        //nuevo();
                    }
                },
                error: function (result) {
                    Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error del servidor");
                }
            });
            btn.button('reset')
            });
        });


    $('#btnE').click(function () { // Botón Eliminar
            var btn = $(this)
            btn.button('loading')
            $.ajax(".....").always(function () {
              
            jsonData = "{'dto':" + JSON.stringify(getDatosM()) + ",'dtob':" + JSON.stringify(getBitacora("MATRICULAS", "ELIMINAR", "ACCIÓN REALZIADA A UN PROFESOR")) + "}"; //Registro de bitacora
            $.ajax({
                type: "POST",
                url: "/WS/matriculas.asmx/e_matriculaProfes",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        Modal("Error al intentar realizar esta acción.", " Existe un problema de inconsistencia con la base de datos del sistema. Contactese con el administrador.");
                    }
                    else {
                        Modal(JSON.stringify(result.d), "Eliminación de carga academica de los profesores");
                        nuevo();
                    }
                },
                error: function (result) {
                    Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error del servidor");
                }
            });
            btn.button('reset')
            });
        });
        //--------------------------------------------------------------------------------------------------
//});
