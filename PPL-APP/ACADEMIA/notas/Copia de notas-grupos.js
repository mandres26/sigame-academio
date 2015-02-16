    WinMove();
    var conta = 0;
    var conta2 = 0;
    var CodAsig,TotalEst, NombreAsig, Busqueda,  CodGrado, CodGrupo, CodProfe, Periodo;
    var jsonData, filtro;
    var dataEstudiant, Listado, dataPersonas, PersonasAdapter;
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
    fechadeHoy();
//----------------------------------FUNCION PARA CALCUALR LA FECHA DE HOY------------------------------------------------------------------
    function fechadeHoy() {
        var df = {
            id: "NADA"
        };
        var URI = Dominio + "periodos/1";
        $.ajax({
            type: "GET",
            url: URI,
            data: JSON.stringify(df),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                // ------ para la confugiracione godaddy --------
                //FHoy = result;
                //var arr = FHoy.split('/');
                //var mes = arr[0];
                //var dia = arr[1];
                //var ano = arr[2];
                //FHoy = mes + "/" + dia + "/" + ano;
                 //------ para la confugiracione en mi equipo local --------
                FHoy = result;
            },
            error: function (result) {
            }
        });
    }
    function FechasPeriodosPermisos() {
        var dto = {
            //fhoyy: FHoy + "-" + "GODDADDY",
            fhoyy: FHoy + "-" + "LOCALHOST",
            finicia: $("#txtRangoI").val(),
            ffin: $("#txtRangoF").val()
        };
        var URI = Dominio + "periodos";
        $.ajax({
            type: "PUT",
            url: URI,
            data: JSON.stringify(dto),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                var m = result;
                if (m == "PERMITIDO") {
                    $("#btnR").removeAttr('disabled');
                    $("#btnM").removeAttr('disabled');
                    $("#btnE").removeAttr('disabled');
                    $("#jqxWidget").show();
                }
                else if (m == "NO PERMITIDO") {
                    Modal("Este periodo no esta permitido todavia para calificar", "Periodo no permitido")
                    $("#btnR").attr('disabled', 'disabled');
                    $("#btnM").attr('disabled', 'disabled');
                    $("#btnE").attr('disabled', 'disabled');
                    $("#jqxWidget").hide();
                }
                else if (m == "CERRADO") {
                    Modal("Este periodo ya esta cerrado. Solo prodrá visualizar las notas para este grupo. Para realizar algun ajuste debe de ir a la sección <strong> Superar notas </strong> para calificar.", "Periodo cerrado")
                    $("#btnR").attr('disabled', 'disabled');
                    $("#btnM").attr('disabled', 'disabled');
                    $("#btnE").attr('disabled', 'disabled');
                    $("#formulario2").attr('disabled', 'disabled');
                    $("#jqxWidget").show();
                }
            },
            error: function (result) {
            }
        });
    }

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
            CodProfe = localStorage.getItem('SeccionId');
            cargarAsignaturas();
            $(document.body).animate({ scrollTop: 150 }, 300);
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
   
    function cargarAsignaturas() {  // CARGAMOS LAS ASIGNATURAS DEL DOCENTE CON EL GRUPO.
        var dto = {
            id : CodProfe
        };
        var URI = Dominio + "matriculas";

        $.ajax({
            type: "POST",
            url: URI,
            data: JSON.stringify(dto),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                $('#grilla1').show();
                if (result == null) {
                    Modal("Error de congruenciá: Usted no contiene asignaturas matriculadas. ", "No contiene asignaturas matriculadas.");
                    //redireccionar();
                }
                else {
                    h = result;
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
                    if (b==0) {
                        Modal("Usted no contiene asignaturas matriculadas en este año academico. ", "No contiene asignaturas matriculadas.");
                        //redireccionar();
                    }
                }
            },
            error: function (result) {
                alert(JSON.stringify(result));
                Modal("Error de congruenciá: Usted no contiene asignaturas matriculadas. ", "Servidor no disponible - No hay asignaturas matriculadas");
                //redireccionar();
            }
        });
    }
   
    //----------------------------------------------------------------------------------------------------
    $('#btnN').click(function () { // Botón Nuevo
        nuevo();
    });
  
    function nuevo() {
            if (localStorage.getItem('SeccionRol') == "PROFESOR") {
                $("#f-inicial").hide();
                $("#txtDes").val("");
                $('#grilla1').show();
                $("#fgrilla").hide();
                $("#btnN").hide();
                $('#formulario2').hide();
            } 
    }
    function cargarPeriodos() {
        var URI = Dominio + "periodos";
        $.ajax({
            type: "GET",
            url: URI,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                if (result == null) {
                    Modal("Usted no puede proceder. <strong> No existen periodos académicos </strong> asignados. ");
                    //redireccionar();
                }
                else {
                    P = result;
                    conta = 0;
                    $("#comboPeriodos").html("");
                    $("#comboPeriodos").val("");
                    $.each(P, function (i, item) {
                        var obj = item.id.split('-');
                        var ano = obj[0];
                        if (ano == AnoAcademico) {
                            $("#comboPeriodos").append("<option value=" + item.id + ">" + item.id + "</option>");
                            if (conta == 0) {
                                $("#txtRangoI").val(item.rangoI);
                                $("#txtRangoF").val(item.rangoF);
                                conta++;
                            }
                        }
                    })
                }
            },
            error: function (result) {
                alert(JSON.stringify(result));
                Modal("Server: Error al cargar los periodos.", "Servidor no disponible");
                //redireccionar();
            }
        });
    }
    var getDatosPer = function () {
        var dto = {};
        dto.id = $("#comboPeriodos").val();
        return dto;
    };
    $("#comboPeriodos").change(function () {
        var dto = {
            id: $("#comboPeriodos").val()
        };
        var URI = Dominio + "periodos";
        $.ajax({
            type: "POST",
            url: URI,
            data: JSON.stringify(dto),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                P = result;
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
        nuevaCol += "<td class='text-primary' > <strong>" + item.nombreAsig + " </strong></td>";
        nuevaCol += "<td class='text-danger'> <strong>" + item.grupo + "</strong> </td>";
        nuevaCol += '<td><input id="btnP" value="OK" tag=' + array.length + ' class="clsProcesar btn-primary btn-block btn-lg text-center" data-loading-text="Cargando..." type="button" /></td>';
        nuevaCol += "</tr>";
        $("#grilla1").append(nuevaCol);
    };
    function titleGrilla1() {
        var newtitle = "<tr>";
        newtitle += '<th class="col-md-3 text-center">ASIGNATURA</th>';
        newtitle += '<th class="col-md-2">GRUPO</th>';
        newtitle += '<th class="col-md-2">ACCIÓN</th>';
        newtitle += "</tr>";
        $("#grilla1").append(newtitle);
    }; 
    $("#comboPeriodos").change(function () {
        var obj = ($("#comboPeriodos").val()).id.split('-');
        var ano = obj[0];
        if ($("#comboPeriodos").val()== (ano+"-"+"V")) {
            Modal("Tenga en cuenta que para registrar el ultimo periodo. <strong>Usted solo debe de enviar los logros agrademicos alcanzados</strong>. No es necesario ingresar las notas ya que estas se promediaran con los periodes anteriores.", "AVISO. Periodo final  ")
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
            FechasPeriodosPermisos();
            //$(document.body).animate({ scrollTop: 100 }, 300);
            btn.button('reset')
        });

    });

    function GetEstudiantesXgrupoForGrilla() {
        var dtoEST = {
            rows: $('#grillaNotas').jqxGrid('getboundrows'),
            codasig: CodAsig,
            codgrupo: CodGrupo,
            periodo: $("#comboPeriodos").val(),
            codprofe: CodProfe
        };
        var URI = Dominio + "matriculas";
        $.ajax({
            type: "PUT",
            url: URI,
            data: JSON.stringify(dtoEST),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                $("#LGrado").text(CodGrado);
                $("#LGrupo").text(CodGrupo);
                $("#LPeriodo").text($('#comboPeriodos').val());
                $("#LAsignatura").text(NombreAsig);
                //------------------

                if (result == null) {
                    Modal("Tenemos problemas al cargar este grupo - <strong> Este grupo no contiene estudiantes matriculados</strong>.",
                       "Problemas al cargar el grupo. Grupo vacio");
                    $("#formulario2").hide();
                    $(document.body).animate({ scrollTop: 0 }, 300);
                }
                else {
                    dataEstudiant = result;
                    if (Busqueda == 'S') {
                        $(document.body).animate({ scrollTop: 810 }, 300);
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
                        Modal("Error de congruenciá:Esta asignatura en este grado no contiene - <strong> logros </strong> matriculados. No puede proceder. Matricule logros academicos a esta asignatura. ");
                        $(document.body).animate({ scrollTop: 0 }, 300);
                    }
                }
            },
            error: function (result) {
                alert(JSON.stringify(result));
                Modal("Server: Error al cargar estudiantes matriculados...", "Problemas al cargar el grupo.");
                $("#formulario2").hide();
            }
        });
    }

// ACA DEBES CAMBIAR LA JQXGRID
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
                  { text: 'Apellidos', columntype: 'textbox', datafield: 'apellidos', width: 180, editable: false },
                  { text: 'Nombres', columntype: 'textbox ', datafield: 'nombres', width: 180, editable: false },
                  {
                      text: 'Nota(%)', datafield: 'nota', width: 70, cellsalign: 'right',columntype: 'numberinput', editable: true,
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
                              return "<div style='margin: 4px ; color: #ff0000;' class='jqx-right-align'>" + "B" + "</div>";
                          }
                          if ((rowdata.nota >= 60) && (rowdata.nota < 80)) {
                              return "<div style='margin: 4px ; color: #DB1DCE;' class='jqx-right-align'>" + "DB" + "</div>";
                          }
                          if ((rowdata.nota >= 80) && (rowdata.nota <90)) {
                              return "<div style='margin: 4px ; color: #000080; ' class='jqx-right-align'>" + "DA" + "</div>";
                          }
                          if ((rowdata.nota >= 90) && (rowdata.nota <=100)) {
                              return "<div style='margin: 4px ; color: #008000;' class='jqx-right-align'>" + "DS" + "</div>";
                          }
                      }
                  },
                  {
                      text: 'Logro/ Descripción', datafield: 'logro', width: 230,  cellsalign: 'left', columntype: 'combobox', displayfield: 'logro', editable: true,
                      createeditor: function (row, value, editor) {
                          editor.jqxComboBox({ source: LogrosAdapter, displayMember: 'id_logro', width: '200', height: '20', valueMember: 'id_logro' });
                          editor.jqxNumberInput({ digits: 5 });
                      }
                  },
                   {
                       text: 'Superación(%)', datafield: 'nota_s', width: 110, cellsalign: 'right', columntype: 'numberinput', editable: false,
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
                              return "<div class='jqx-right-align'>" + "B" + "</div>";
                          }
                          if ((rowdata.nota_s >= 60) && (rowdata.nota_s < 80)) {
                              return "<div class='jqx-right-align'>" + "DB" + "</div>";
                          }
                          if ((rowdata.nota_s >= 80) && (rowdata.nota_s < 90)) {
                              return "<div class='jqx-right-align'>" + "DA" + "</div>";
                          }
                          if ((rowdata.nota_s >= 90) && (rowdata.nota_s <= 100)) {
                              return "<div class='jqx-right-align'>" + "DS" + "</div>";
                          }
                      }
                  },
                  { text: '', columntype: 'textbox ', datafield: '', width: 501, editable: false }
                ]
            });
    };
    $('#btnOtro').click(function () { // Botón Nuevo
        $(document.body).animate({ scrollTop: 300 }, 400);
    });

        //==================================================================================================
    function GetLogrosXasignatura() {
        var dto = {
            id_grado: CodGrado,
            id_asignatura: CodAsig
        };
        var URI = Dominio + "logros";
        $.ajax({
            type: "POST",
            url: URI,
            data: JSON.stringify(dto),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                if (result == null) {
                    $("#comboLogros").attr('disabled', 'disabled');
                    Busqueda = "N";
                }
                else {
                    dataLogros = result;
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
                alert(JSON.stringify(result));
                Modal("Servidor no disponible. Error al intentar cargar los logros para esta asignatura. Contactese con el administrador", "Error al cargar los logros la asignatura");
            }
        });
    }
    $(document).on('click', '.clsR', function () {
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
            var dtoR =

                    {
                        /* para las notas del grupo*/
                        rows: $('#grillaNotas').jqxGrid('getboundrows'),
                        codasig: CodAsig,
                        codprofe: CodProfe,
                        codgrupo: CodGrupo,
                        periodo: $("#comboPeriodos").val(),
                        /* para la bitacora*/
                        id_bitacora: null,
                        seccion: "NOTAS",
                        accion: "REGISTRAR",
                        usuario: localStorage.getItem('SeccionNombres') + " " + localStorage.getItem('SeccionApellidos'),
                        id_usuario: localStorage.getItem('SeccionId'),
                        fecha: null,
                        observacion: "REGISTRO DE FORMA GRUPAL EN LA APP"
                    };
            var URI = Dominio + "notas";
            $.ajax({
                type: "POST",
                url: URI,
                data: JSON.stringify(dtoR),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result == null) {
                        Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                    }
                    else {
                        Modal(JSON.stringify(result), "Registro de notas por grupo");
                        if (JSON.stringify(result) != '"Lo sentimos. Tuvimos procesar este grupo. Al parecer no envió los datos correctos. Tenga en cuenta que debe enviar la nota de cada estudiante con su respectiva nota, logro alcanzado y periodo academico. Revise y reintente. "') {
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
            var dtoE =
                          {
                              /* para las notas del grupo*/
                              rows: $('#grillaNotas').jqxGrid('getboundrows'),
                              codasig: CodAsig,
                              codprofe: CodProfe,
                              codgrupo: CodGrupo,
                              periodo: $("#comboPeriodos").val(),
                              /* para la bitacora*/
                              id_bitacora: null,
                              seccion: "NOTAS",
                              accion: "ELIMINAR",
                              usuario: localStorage.getItem('SeccionNombres') + " " + localStorage.getItem('SeccionApellidos'),
                              id_usuario: localStorage.getItem('SeccionId'),
                              fecha: null,
                              observacion: "ELIMINACION DE FORMA GRUPAL EN LA APP"
                          };
            var URI = Dominio + "notas/1";
            $.ajax({
                type: "DELETE",
                url: URI,
                data: JSON.stringify(dtoE),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result == null) {
                        Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                    }
                    else {
                        Modal(JSON.stringify(result), "Eliminación de notas por grupo");
                        if (JSON.stringify(result) != '"Lo sentimos. Tuvimos procesar este grupo. Al parecer no envió los datos correctos. Tenga en cuenta que debe enviar la nota de cada estudiante con su respectiva nota, logro alcanzado y periodo academico. Revise y reintente. "') {
                            $('#formulario2').hide();
                            $('#comboPeriodos').focus();
                        }

                    }
                },
                error: function (result) {
                    alert(JSON.stringify(result));
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
            var dtoM =
                              {
                                  /* para las notas del grupo*/
                                  rows: $('#grillaNotas').jqxGrid('getboundrows'),
                                  codasig: CodAsig,
                                  codprofe: CodProfe,
                                  codgrupo: CodGrupo,
                                  periodo: $("#comboPeriodos").val(),
                                  /* para la bitacora*/
                                  id_bitacora: null,
                                  seccion: "NOTAS",
                                  accion: "MODIFICAR",
                                  usuario: localStorage.getItem('SeccionNombres') + " " + localStorage.getItem('SeccionApellidos'),
                                  id_usuario: localStorage.getItem('SeccionId'),
                                  fecha: null,
                                  observacion: "MODIFIACON DE FORMA GRUPAL EN LA APP"
                              };
            var URI = Dominio + "notas";
            $.ajax({
                type: "PUT",
                url: URI,
                data: JSON.stringify(dtoM),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result == null) {
                    Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                }
                else {
                    Modal(JSON.stringify(result), "Modificación de notas por grupo");
                    if (JSON.stringify(result) != '"Lo sentimos. Tuvimos procesar este grupo. Al parecer no envió los datos correctos. Tenga en cuenta que debe enviar la nota de cada estudiante con su respectiva nota, logro alcanzado y periodo academico. Revise y reintente. "') {
                        $('#formulario2').hide();
                        $('#comboPeriodos').focus();
                    }
                }
            },
                error: function (result) {
                    alert(JSON.stringify(result));
                Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
            }
        });
        btn.button('reset')
        });

    });

  


