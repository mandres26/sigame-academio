    WinMove();
    var conta = 0;
    var conta2 = 0;
    var CodAsig,TotalEst, NombreAsig, Busqueda,  CodGrado, CodGrupo, CodProfe, Periodo;
    var jsonData, filtro;
    var dataEstudiant, Listado;
    var FHoy;
    var dataLogros;
    var LogrosAdapter;
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
   
    var array = new Array(); // variable para las grillas en los formularios

    function verificarSiEsProfesor() {
        if (localStorage.getItem('SeccionRol') == "PROFESOR") {
            $("#f-inicial").hide();
            CodProfe = localStorage.getItem('SeccionId');
            verificarProfesorId();
        }else
        {

            CargarProfes();
            $("#f-inicial").show();
            $("#txtId").val("");
            $("#txtId").focus();
         }
    }
    $('#txtId').click(function () { filtro = 1; });
    $('#txtIdN').click(function () { filtro = 1; });
    $('#txtIdEst').click(function () { filtroEst = 1; });
    $('#txtIdEstN').click(function () { filtroEst = 2; });

    ///============================== METODOS PARA  EL  ROL ADMINISTRATIVO ================================
    ///=============================================== ================== ================================
    var getDatosLogro = function () {
        var dto = {};
        dto.id = $("#comboLogros").val();
        return dto;
    };
    var getDatosGrupo = function () {
        var dto = {};
        dto.id = CodGrupo;
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
        dto.rows = $('#grillaNotas').jqxGrid('getboundrows');
        dto.codasig = CodAsig;
        dto.codgrupo = CodGrupo;
        dto.periodo = $("#comboPeriodos").val();
        dto.codprofe = CodProfe;
        return dto;
    };
   
    

    $('#txtId').keyup(function (e) {
        if (e.keyCode == 13) {
            var btn = $('#btnG')
            btn.button('loading')
            $.ajax(".....").always(function () {
                Cargando1();
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
                Cargando1();
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

    $('#btnG').click(function () { // Botón gestionar

        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            $(document.body).animate({ scrollTop: 400 }, 300);
            //Aca redireccionamos al extraer el id de la persona
            Cargando1();
            var arr = $('#txtIdN').val().split('/');
            CodProfe = arr[1];
            filtro = 1;
            verificarProfesorId();

            btn.button('reset')
        });
    });
 
    function verificarProfesorId() { // Verificamos que sea un profesor
        if (CodProfe == '') {
            Alerta("Error: Digite una identificación en el cuadro de texto y luego presione la tecla <strong> enter</strong> o haga clic en el botón <strong> gestionar </strong>para continuar.", "danger");
            $('#txtId').focus();
            $('#formulario2').hide();
            $(document.body).animate({ scrollTop: 0 }, 300);
        } else if (CodProfe.length < 8) {
            Alerta("Error: La identificación debe tener <strong> 8 caracteres</strong> como minimo .", "danger");
            $('#txtId').focus();
            $('#formulario2').hide();
            $(document.body).animate({ scrollTop: 0 }, 300);
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
                        $(document.body).animate({ scrollTop: 0 }, 300);
                        Cargando2Oculto();
                    }
                    else {
                        P = result.d;
                        if (P.rol != "PROFESOR") {
                            $("#formulario2").hide();
                            $("#formulario1").hide();
                            $("#txtId").focus();
                            Alerta("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no le pertenece a un profesor </strong> y no puede gestionar este proceso.", "warning");
                            Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no le pertenece a un profesor </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                            $(document.body).animate({ scrollTop: 0 }, 300);
                            Cargando2Oculto();
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
                            $(document.body).animate({ scrollTop: 300 }, 300);
                            Cargando2Oculto();
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
            $(document.body).animate({ scrollTop: 0 }, 300);
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
                        $("#formulario2").hide();
                        $("#txtIdN").focus();
                        Alerta("Error al intentar realizar esta acción. Al parecer este nombre <strong> no se encuentra registrado </strong> en la base de datos del sistema", "danger");
                        Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no se encuentra registrado </strong> en la base de datos del sistema", "Error al intentar realizar esta acción");

                        $(document.body).animate({ scrollTop: 0 }, 300);
                    }
                    else {
                        P = result.d;
                        if (P.rol != "PROFESOR") {

                            $("#formulario2").hide();
                            $("#formulario1").hide();
                            $("#txtId").focus();
                            Alerta("Error al intentar realizar esta acción. Al parecer este nombre <strong> no le pertenece a un profesor </strong> y no puede gestionar este proceso.", "warning");
                            Modal("Error al intentar realizar esta acción. Al parecer este nombre <strong> no le pertenece a un profesor </strong> y no puede gestionar este proceso.", "Error al intentar realizar esta acción");
                            $(document.body).animate({ scrollTop: 0 }, 300);
                        } else if (P.rol == "PROFESOR") {
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
                            $(document.body).animate({ scrollTop: 300 }, 300);
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
                    //$("#Label1").text("Asignaturas que tiene el profesor matriculadas");
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
    $('#btnOtro').click(function () { // Botón Nuevo
        $(document.body).animate({ scrollTop: 300 }, 400);
    });
  
    function nuevo() {
            if (localStorage.getItem('SeccionRol') == "PROFESOR") {
                $("#f-inicial").hide();
       
                $("#txtDes").val("");
                $('#grilla1').show();
                $("#fgrilla").hide();
                $("#btnN").hide();
                $('#formulario2').hide();
                $('#formulario1').show();
            } else {
                Alerta("Digite una identificación en el cuadro de texto y luego presione la tecla <strong> enter</strong> o haga clic en el botón <strong> gestionar </strong>para continuar.", "info");
                $("#txtIdN").val("SELECCIONE...");
                $("#txtId").val("");
                $("#txtNom").val("");
                $("#txtAp").val("");
                //$("#comboPeriodo").val("");
                //$("#comboLogros").val("");
                $("#txtDes").val("");
                $('#grilla1').hide();
                $("#fgrilla").hide();
                $("#txtId").removeAttr('disabled');
                $("#txtIdN").removeAttr('disabled');
                $('#formulario2').hide();
                $('#formulario1').hide();
                $('#txtId').focus();
                $("#btnN").show();
            }
    }
   
    function cargarPeriodos() {
        $.ajax({
            type: "POST",
            url: "/WS/periodos.asmx/c_periodos",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Usted no puede proceder. <strong> No existen periodos académicos </strong> asignados. ");
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
                Modal("Server: Error al cargar los periodos.", "Servidor no disponible");
                redireccionar();
            }
        });
    }
    var getDatosPer = function () {
        var dto = {};
        dto.id = $("#comboPeriodos").val();
        return dto;
    };
    $("#comboPeriodos").change(function () {
        jsonData = "{'dto':" + JSON.stringify(getDatosPer()) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/periodos.asmx/c_periodo",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                P = result.d;
                $("#txtRangoI").val(P.rangoI);
                $("#txtRangoF").val(P.rangoF);
            },
            error: function (result) {
            }
        });
    });
   

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

    $("#comboLogros").change(function () {
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
    });
    $("#comboPeriodos").change(function () {
        if ($("#comboPeriodos").val()=="V") {
            //Modal("Tenga en cuenta que para registrar el ultimo periodo. <strong>Usted solo debe de enviar los logros agrademicos alcanzados</strong>. No es necesario ingresar las notas ya que estas se promediaran con los periodes anteriores.", "AVISO. Periodo final  ")
        }
    });
    //----------------------------------------------------------------------------------------------------
    $(document).on('click', '.clsProcesar', function () {
        var fila = $(this).attr("tag");
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {

            $("#formulario2").hide();
            $(".clsProcesar").attr('disabled', 'disabled');
            CodAsig = array[fila - 1].codAsig;
            NombreAsig = array[fila - 1].nombreAsig;
            CodGrado = array[fila - 1].grado;
            CodGrupo = array[fila - 1].grupo;

            GetLogrosXasignatura();
            GetEstudiantesXgrupoForGrilla();
            $(".clsProcesar").removeAttr('disabled');
            btn.button('reset')
        });
       
    });

    function GetEstudiantesXgrupoForGrilla() {
        
        jsonData = "{'dto':" + JSON.stringify(getDatosNotas()) + "}";
       
        $.ajax({
            type: "POST",
            url: "/WS/matriculas.asmx/c_estudiantesXGrupoXLogro",
            data: jsonData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            async: true,
            success: function (result) {

                //---------------------
                $("#LGrado").text(CodGrado);
                $("#LGrupo").text(CodGrupo);
                $("#LPeriodo").text($('#comboPeriodos').val());
                $("#LAsignatura").text(NombreAsig);
                //------------------

                if (result.d == null) {
                    Modal("Tenemos problemas al cargar este grupo - <strong> Este grupo no contiene estudiantes matriculados</strong>.",
                       "Problemas al cargar el grupo. Grupo vacio");
                    $("#formulario2").hide();
                    $(document.body).animate({ scrollTop: 0 }, 300);
                }
                else {
                    dataEstudiant = result.d;

                    if (Busqueda == 'S') {
                        $(document.body).animate({ scrollTop: 800 }, 300);

                        SetGrilla(dataEstudiant);
                        $("#formulario2").show();
                        $("#fgrilla").show();
                        
                        var bandera;
                        TotalEst = 0;
                        $.each(dataEstudiant, function (i, item) {
                            Bandera = item.logro;
                            TotalEst++; // Calculamos el numeor de estudiantes
                        })
                        $("#Ltotal").text("Total:" + TotalEst);
                        if (Bandera == 'Seleccione...') {
                            $("#btnR").show();
                            $("#btnM").hide();
                            $("#btnE").hide();
                            
                        } else {
                            $("#btnR").hide();
                            $("#btnM").show();
                            $("#btnE").show();
                        }
                    } else if (Busqueda == 'N') {
                        $("#formulario2").hide();
                        $("#comboLogros").html("");
                        $("#txtDes").val("");
                        Modal("Error de congruenciá: Esta asignatura en este grado no contiene - <strong> logros </strong> matriculados. No puede proceder. Matricule logros academicos a esta asignatura. ");
                        $(document.body).animate({ scrollTop: 0 }, 300);
                    }
                }
            },
            error: function (result) {
                Modal("Server: Error al cargar estudiantes matriculados...","Problemas al cargar el grupo.");
                $("#formulario2").hide();
            }
        });
    }

    var SetGrilla = function (dataE) {
        
            var source =
            {
                localdata: dataE,
                datatype: "json",
                updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                },
                datafields:
                [
                    { name: 'id', type: 'string' },
                    { name: 'apellidos', type: 'string' },
                    { name: 'nombres', type: 'string' },
                    { name: 'nota', type: 'string' },
                    { name: 'equivalencia', type: 'string' },
                    { name: 'nota_s', type: 'string' },
                    { name: 'equivalencia_s', type: 'string' },
                    { name: 'logro', type: 'string' },
                    
                ]
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
          
            $("#grillaNotas").jqxGrid(
            {

                width: 910,
                source: dataAdapter,
                pageable: true,
                autoheight: true,
                sortable: true,
                altrows: true,
                enabletooltips: true,
                editable: true,
                selectionmode: 'multiplecellsadvanced',
                columns: [
                  { text: 'Id', columntype: 'textbox', datafield: 'id', width: 100, editable: false },
                  { text: 'Apellidos', columntype: 'textbox', datafield: 'apellidos', width: 165, editable: false },
                  { text: 'Nombres', columntype: 'textbox ', datafield: 'nombres', width: 160, editable: false },
                  {
                      text: 'Nota(%)', datafield: 'nota', width: 65, cellsalign: 'right',columntype: 'numberinput', editable: false,
                      validation: function (cell, value) {
                          if (value < 0 || value > 100) {
                              return { result: false, message: "La nota debe de estar en el rango de 1-100" };
                          }
                          return true;
                      },
                      createeditor: function (row, cellvalue, editor) {
                          editor.jqxNumberInput({ decimalDigits: 0, digits: 3 });
                      }
                  },
                  {
                      text: 'Val', datafield: 'equivalencia', width: 40, cellsalign: 'right', columntype: 'textbox ', editable: false,
                      cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                          if ((rowdata.nota >= 0) && (rowdata.nota < 60)) {
                              return "<div class='jqx-right-align'>" + "B" + "</div>";
                          }
                          if ((rowdata.nota >= 60) && (rowdata.nota < 80)) {
                              return "<div class='jqx-right-align'>" + "DB" + "</div>";
                          }
                          if ((rowdata.nota >= 80) && (rowdata.nota < 90)) {
                              return "<div class='jqx-right-align'>" + "DA" + "</div>";
                          }
                          if ((rowdata.nota >= 90) && (rowdata.nota <= 100)) {
                              return "<div class='jqx-right-align'>" + "DS" + "</div>";
                          }
                      }
                  },
                  {
                      text: 'Logro/ Descripción', datafield: 'logro', width: 200,  cellsalign: 'left', columntype: 'combobox', displayfield: 'logro', editable: true,
                      createeditor: function (row, value, editor) {
                          editor.jqxComboBox({ source: LogrosAdapter, displayMember: 'id_logro', width: '200', height: '20', valueMember: 'id_logro' });
                          editor.jqxNumberInput({ digits: 5 });
                      }
                  },
                   {
                       text: 'Superación(%)', datafield: 'nota_s', width: 110, cellsalign: 'right', columntype: 'numberinput', editable: true,
                       validation: function (cell, value) {
                           if (value < 0 || value > 100) {
                               return { result: false, message: "La nota de la superación debe de estar en el rango de 1-100" };
                           }
                           return true;
                       },
                       createeditor: function (row, cellvalue, editor) {
                           editor.jqxNumberInput({ decimalDigits: 0, digits: 3 });
                       }
                   },
                  {
                      text: 'Val S', datafield: 'equivalencia_s', width: 60, cellsalign: 'right', columntype: 'textbox ', editable: false,
                      cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                          if ((rowdata.nota_s >= 0) && (rowdata.nota_s < 60)) {
                              return "<div style='margin: 4px ; color: #ff0000;' class='jqx-right-align'>" + "B" + "</div>";
                          }
                          if ((rowdata.nota_s >= 60) && (rowdata.nota_s < 80)) {
                              return "<div style='margin: 4px ; color: #DB1DCE;' class='jqx-right-align'>" + "DB" + "</div>";
                          }
                          if ((rowdata.nota_s >= 80) && (rowdata.nota_s < 90)) {
                              return "<div style='margin: 4px ; color: #000080; ' class='jqx-right-align'>" + "DA" + "</div>";
                          }
                          if ((rowdata.nota_s >= 90) && (rowdata.nota_s <= 100)) {
                              return "<div style='margin: 4px ; color: #008000;' class='jqx-right-align'>" + "DS" + "</div>";
                          }
                      }
                  },
                  { text: '', columntype: 'textbox ', datafield: '', width: 501, editable: false }
                ]
            });
        };
        //==================================================================================================
    function GetLogrosXasignatura() {

            jsonData = "{'dto':" + JSON.stringify(getDatosLogrosAsig()) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/logros.asmx/c_logrosXgradoXasigNota",
                contentType: "application/json; charset=utf-8",
                data: jsonData,
                dataType: "json",
                async: false,
                success: function (result) {
                    if (result.d == null) {
                        $("#comboLogros").attr('disabled', 'disabled');
                        Busqueda = "N";
                    }
                    else {
                        dataLogros = result.d;
                        Busqueda = "S";
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
                        var LogrosSource =
                       {
                           localdata: dataLogros,
                           datatype: "json",
                           datafields: [
                               { name: 'id_logro', type: 'string' }
                           ]
                       };
                        LogrosAdapter = new $.jqx.dataAdapter(LogrosSource, { autoBind: true });
                    }
                },
                error: function (result) {
                    Modal("Servidor no disponible. Error al intentar cargar los logros para esta asignatura. Contactese con el administrador", "Error al cargar los logros la asignatura");
                }
            });
    }

    //    ============================== BTN Enviar los Datos  ==========================================

    $(document).on('click', '.clsR', function () {
            var btn = $(this)
            btn.button('loading')
            $.ajax("...").always(function () {
              
            jsonData = "{'dto':" + JSON.stringify(getDatosNotas()) + ",'dtob':" + JSON.stringify(getBitacora("NOTAS", "REGISTRAR", "REGISTRO DE FORMA GRUPAL")) + "}"; //Registro de bitacora";
            $.ajax({
                type: "POST",
                url: "/WS/notas.asmx/r_notasGrupo",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                    }
                    else {
                        Modal(JSON.stringify(result.d), "Registro de notas por grupo");
                        if (JSON.stringify(result.d) != '"Lo sentimos. Tuvimos procesar este grupo. Al parecer no envió los datos correctos. Tenga en cuenta que debe enviar la nota de cada estudiante con su respectiva nota, logro alcanzado y periodo academico. Revise y reintente. "' ) {
                            $('#formulario2').hide();
                            $('#comboPeriodos').focus();
                        }

                    }
                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                }
            });
            btn.button('reset')
            });

    });
    $(document).on('click', '.clsE', function () {
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
     
        jsonData = "{'dto':" + JSON.stringify(getDatosNotas()) + ",'dtob':" + JSON.stringify(getBitacora("NOTAS", "ELIMINAR", "ELIMINACIÓN DE FORMA GRUPAL")) + "}"; //Registro de bitacora";
       
        $.ajax({
            type: "POST",
            url: "/WS/notas.asmx/e_notasGrupo",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                }
                else {
                    Modal(JSON.stringify(result.d), "Eliminación de notas por grupo");

                    if (JSON.stringify(result.d) != '"Lo sentimos. Tuvimos procesar este grupo. Al parecer no envió los datos correctos. Tenga en cuenta que debe enviar la nota de cada estudiante con su respectiva nota, logro alcanzado y periodo academico. Revise y reintente. "') {
                        $('#formulario2').hide();
                        $('#comboPeriodos').focus();
                    }

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
         
        jsonData = "{'dto':" + JSON.stringify(getDatosNotas()) + ",'dtob':" + JSON.stringify(getBitacora("NOTAS", "MODIFICAR", "MODIFICACIÓN DE FORMA GRUPAL")) + "}"; //Registro de bitacora";
        $.ajax({
            type: "POST",
            url: "/WS/notas.asmx/m_notasGrupo",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                }
                else {

                    Modal(JSON.stringify(result.d), "Modificación de notas por grupo");
                    if (JSON.stringify(result.d) != '"Lo sentimos. Tuvimos procesar este grupo. Al parecer no envió los datos correctos. Tenga en cuenta que debe enviar la nota de cada estudiante con su respectiva nota, logro alcanzado y periodo academico. Revise y reintente. "') {
                        $('#formulario2').hide();
                        $('#comboPeriodos').focus();
                    }
                }
            },
            error: function (result) {
                Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
            }
        });
        btn.button('reset')
        });

    });

    $(document).on('click', '.clsGenerar', function () {
        $("#formulario2").hide();
        $("#comboLogros").html("");
        var fila = $(this).attr("tag");
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {

            $(".clsGenerar").attr('disabled', 'disabled');

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
                        Modal("Ocurrio un error al intentar conectar al servidor. ", "Servidor no disponible");
                    }
                    else {
                        // Recorremos a ver como esta la badera de resultado.---------
                        P = result.d;
                        var rs;
                        $.each(P, function (i, item) {
                            rs = item.resultado;
                        })
                        if (rs == 'c_no') {
                            Modal("<strong> Este grupo no contiene estudiantes matriculados</strong>.",
                            "Problemas al cargar el grupo. Grupo vacio");
                        }
                        else if (rs == 'c_yes') {
                            Alerta("Listado generado de forma exitosa", "success");
                            window.open("/ACADEMIA/reportes/reports/listadodesempeno.aspx");
                        }
                    }

                },
                error: function (result) {
                    Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error del servidor");
                }
            });
            $(".clsGenerar").removeAttr('disabled');
            btn.button('reset')
        });
    });


