
//$(document).ready(function () {
    WinMove();
    var conta = 0;
    var conta2 = 0;
    var CodAsig, NombreAsig, Busqueda, filtro, CodGrado, CodGrupo, CodProfe;
    var jsonData;
    var dataLogros;
    var ba;
    var P = {};
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

            verificarSiEsProfesor();
            $("#formPPAL").show();
            $("#imgload").hide();
        });
    }
    function verificarSiEsProfesor() {
        if (localStorage.getItem('SeccionRol') == "PROFESOR") {
            $("#f-inicial").hide();
            CodProfe = localStorage.getItem('SeccionId');
            $("#btnPDF1").show();
            $("#btnPDF2").hide();
            verificarProfesorId();
        } else {
            CargarProfes();
            $("#btnPDF1").hide();
            $("#btnPDF2").hide();

            $("#f-inicial").show();
            $("#txtId").val("");
            $("#txtId").focus();
        }
    }
    var array = new Array(); // variable para las grillas en los formularios
    var array2 = new Array(); // variable para las grillas en los formularios
    var getDatosLogrosAsig = function () {
        var dto = {};
        dto.id_grado = CodGrado;
        dto.id_asignatura = CodAsig;
        return dto;
    };

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
                           $("#formulario1").hide();
                           $("#txtId").focus();
                           Alerta("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no se encuentra en registrada </strong> en la base de datos del sistema", "danger");
                           Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no se encuentra en registrada </strong> en la base de datos del sistema", "Error al intentar realizar esta acción");

                       }
                       else {
                           P = result.d;
                           if (P.rol != "PROFESOR") {
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
       $('#txtId').click(function () { filtro = 1; });
       $('#txtIdN').click(function () { filtro = 1; });

       function verificarProfesorNom() { // Verificamos que sea un estudiante
           if ($('#txtIdN').val() == '') {
               Alerta("Error: Digite un nombre en el cuadro de texto y luego haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
               $('#txtIdN').focus();
               $('#formulario2').hide();
           }
           else {
               var dto = {};
               dto.id = $("#txtIdN").val();
               Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");

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
                           $("#formulario1").hide();
                           $("#txtIdN").focus();
                           Alerta("Error al intentar realizar esta acción. Al parecer este nombre <strong> no se encuentra registrado </strong> en la base de datos del sistema", "danger");
                           Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no se encuentra registrado </strong> en la base de datos del sistema", "Error al intentar realizar esta acción");

                       }
                       else {
                           P = result.d;
                           if (P.rol != "PROFESOR") {
                               $("#formulario1").hide();
                               $("#txtId").focus();
                               Alerta("Error al intentar realizar esta acción. Al parecer este nombre <strong> no le pertenece a un profesor </strong> y no puede gestionar este proceso.", "warning");
                               Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no le pertenece a un profesor </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                           } else if (P.rol == "PROFESOR") {
                               $("#txtId").attr('disabled', 'disabled');
                               $("#txtIdN").attr('disabled', 'disabled');
                               $("#txtAp").val(P.apellidos);
                               $("#txtId").val(P.id);
                               $("#txtNom").val(P.nombres);

                               $("#grilla1").html("");
                               $("#formulario1").show();
                               CodProfe = P.id;
                               cargarAsignaturas();
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

                   $(document.body).animate({ scrollTop: 600 }, 300);
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

                   $(document.body).animate({ scrollTop: 600 }, 300);
                   //Aca redireccionamos al extraer el id de la persona
                   var arr = $('#txtIdN').val().split('/');
                   CodProfe = arr[1];
                   filtro = 1;
                   verificarProfesorId();
                   btn.button('reset')
               });
           }
       });

       $('#btnG').click(function () { // Botón gestionar
           var btn = $(this)
           btn.button('loading')
           $.ajax(".....").always(function () {
               $(document.body).animate({ scrollTop: 600 }, 300);
               //Aca redireccionamos al extraer el id de la persona
               var arr = $('#txtIdN').val().split('/');
               CodProfe = arr[1];
               filtro = 1;
               verificarProfesorId();
               btn.button('reset')
           });
       });

      

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
                    //$("#Label1").text("Usted no contiene asignaturas matriculadas");
                    Modal("Error de congruenciá: Usted no contiene asignaturas matriculadas. ", "No contiene asignaturas matriculadas");
                    redireccionar();
                }
                else {
                    P = result.d;
                    $("#grilla1").html("");
                    titleGrilla1();
                    conta = 0;
                    $.each(P, function (i, item) {
                        AddItemGrilla1(item);
                    })
                    $('#btnP').focus();
                }
            },
            error: function (result) {
                Modal("Error de congruenciá: Usted no contiene asignaturas matriculadas. ", "Servidor no disponible");
                redireccionar();
            }
        });
    }
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


    $('#btnPDF2').click(function () { // Botón imprimir todos
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            window.open("/ACADEMIA/reportes/reports/logros-all.aspx");
            btn.button('reset')
        });
    });

    $('#btnPDF1').click(function () { // Botón imprimir los logros de la asiganturas y el grado
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            if (CodGrado == null || CodAsig == null) {
                Modal("Error. Para este reporte, debe primero consultar los logros de un profesor.", "Acceso denegado");
                $('#txtId').focus();
            } else {
                jsonData = "{'dto':" + JSON.stringify(getDatosLogrosAsig()) + ",'dtob':" + JSON.stringify(getBitacora("LOGROS", "GENERAR", "REPORTES CON LOS LOGROS DE UNA ASIGNATURA")) + "}"; //Registro de bitacora
                $.ajax({
                    type: "POST",
                    url: "/WS/logros.asmx/c_logrosXgradoXasigPDF",
                    contentType: "application/json; charset=utf-8",
                    data: jsonData,
                    dataType: "json",
                    async: false,
                    success: function (result) {
                        var rs = result.d;
                        if (rs == 'c_yes') {
                            Alerta("Reporte generado de forma exitosa", "success");
                            window.open("/ACADEMIA/reportes/reports/logros-ag.aspx"); // Logros de la asiganturas y logros
                        }
                    },
                    error: function (result) {
                        Modal("Servidor no disponible. . Contactese con el administrador", "Error Servidor");
                        $(document.body).animate({ scrollTop: 320 }, 300);
                    }
                });
            }
            btn.button('reset')
        });
    });

    //----------------------------------------------------------------------------------------------------
    $('#btnN').click(function () { // Botón Nuevo
        nuevo();
    });
    function nuevo() {

        if (localStorage.getItem('SeccionRol') == "PROFESOR") {
            $("#f-inicial").hide();
          
            $("#txtDes").val("");
            $('#f-grilla').hide();
            $('#grilla1').show();
            $('#grilla2').hide();
            $("#btnN").hide();
            $("#btnAll").hide();
            $('#formulario1').show();
        } else {

            Alerta("Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "info");
            $("#txtId").val("");
            $("#txtIdN").val("");
            $("#txtNom").val("");
            $("#txtAp").val("");
            $('#grilla1').hide();
            $('#grilla2').hide();

            $("#txtId").removeAttr('disabled');
            $("#txtIdN").removeAttr('disabled');
            $('#f-grilla').hide();
            $('#formulario1').hide();
          

            $("#btnN").show();
            $("#btnAll").show();
            $('#txtId').focus();

        }
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
        nuevaCol += '<td><input id="btnP" value=".: Ver :." tag=' + array.length + ' class="clsVer boton-down btn btn-primary" data-loading-text="Cargando..." type="button" /></td>';
        nuevaCol += "</tr>";
        $("#Ltotal").text("Total:" + conta);
        $("#grilla1").append(nuevaCol);
    };
    function titleGrilla1() {
        $("#grilla1").val("");
        $("#Ltotal").text("");
        var newtitle = "<tr class='text-center'>";
        newtitle += '<th class="col-md-1">#</th>';
        newtitle += '<th class="col-md-2">Codigo</th>';
        newtitle += '<th class="col-md-3">Nombres</th>';
        newtitle += '<th class="col-md-2">Grado</th>';
        newtitle += '<th class="col-md-2">Id Grupo</th>';
        newtitle += '<th class="col-md-2">Acción</th>';
        newtitle += "</tr>";
        $("#grilla1").append(newtitle);
    };
    function titleGrilla2() { // TITULO DE LA GRILLA
        $("#grilla2").val("");
        $("#Ltotal").text("");
        var newtitle = "<tr class='text-center'>";
        newtitle += '<th class="col-sm-2">IdLogro</th>';
        newtitle += '<th class="col-sm-1">IdGrado</th>';
        newtitle += '<th class="col-sm-1">IdAsignatura</th>';
        newtitle += '<th class="col-sm-8">Descripción</th>';
        newtitle += "</tr>";
        $("#grilla2").append(newtitle);
    };
    var AddItemGrilla2 = function (item) { // CONTENIDO DE LA GRILLA
        conta++;
        array2.push(item);
        var nuevaCol = "<tr>";
        nuevaCol += "<td>" + item.id_logro + "</td>";
        nuevaCol += "<td>" + item.id_grado + "</td>";
        nuevaCol += "<td>" + item.id_asignatura + "</td>";
        nuevaCol += "<td>" + item.descripcion + "</td>";
        nuevaCol += "</tr>";
        $("#grilla2").append(nuevaCol);
        $("#Ltotal").text("Total:" + conta);
    };
    //----------------------------------------------------------------------------------------------------
    $(document).on('click', '.clsVer', function () {
        var fila = $(this).attr("tag");
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
            $("#f-grilla").show();
   
        CodAsig = array[fila - 1].codAsig;
        NombreAsig = array[fila - 1].nombreAsig;
        CodGrado = array[fila - 1].grado;
        CodGrupo = array[fila - 1].grupo;
        GetLogrosXasignatura();
        btn.button('reset')
        });
    });
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
                    $('#grilla2').show();
                    $('#grilla2').html("");
                    if (result.d == null) {
                        $('#f-grilla').hide();
                        Modal("Esta asignatura no tiene logros asignados. Valla a la sección <strong>logros</strong>, registre y luego proceda a consultar.", "No existen logros.");
                        $(document.body).animate({ scrollTop: 320 }, 300);
                    }
                    else {
                        P = result.d;
                        conta = 0;
                        titleGrilla2();
                        $.each(P, function (i, item) {
                            AddItemGrilla2(item);
                        })
                        $('#btnN').focus();
                    }
                },
                error: function (result) {
                    Modal("Servidor no disponible. Error al intentar cargar los logros para esta asignatura. Contactese con el administrador", "Error al cargar los logros la asignatura");
                    $(document.body).animate({ scrollTop: 320 }, 300);
                }
            });
    }

    $('#btnAll').click(function () { // Botón 
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
            $(document.body).animate({ scrollTop: 370 }, 300);
            jsonData = "{'dtob':" + JSON.stringify(getBitacora("LOGROS", "LISTAR TODOS ", "NINGUNA")) + "}";


        $.ajax({
            type: "POST",
            url: "/WS/logros.asmx/c_logrosSystem",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                    $("#f-grilla").show();
                    $('#grilla2').html("");
                    $('#grilla2').show();
                    conta = 0;
                    if (result.d == null) {
                        Modal("No existen logros para mostrar", " Logros vacio");
                        $("#f-grilla").hide();
                    }
                    else {
                        Alerta("Listado de logros registrados en el sistema", "success");

                        $("#btnPDF1").hide();
                        $("#btnPDF2").show();

                        P = result.d;
                        titleGrilla2();
                        $.each(P, function (i, item) {
                            AddItemGrilla2(item);
                        })
                    }
                },
                error: function (result) {
                    Modal("Server: Error de servidor.", "Error de servidor");
                }
        });
        btn.button('reset')
        });

    });

