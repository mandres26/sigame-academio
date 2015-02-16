WinMove();
var conta = 0;
var conta2 = 0;
var CodAsig, TotalEst, NombreAsig, Busqueda, CodGrado, CodGrupo, CodProfe, Periodo;
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
        fhoyy: FHoy + "-" + "GODDADDY",
        //fhoyy: FHoy + "-" + "LOCALHOST",
        finicia: $("#txtRangoI").val(),
        ffin: $("#txtRangoF").val()
    };  // c_fechasPerPer
    var URI = Dominio + "periodos/stringp";
    $.ajax({
        type: "GET",
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
   
    var URI = Dominio + "matriculas/"+ CodProfe;

    $.ajax({
        type: "GET",
        url: URI,
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
                if (b == 0) {
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
    var dtoP = {
        id: $("#comboPeriodos").val()
    };
    var URI = Dominio + "periodos";
    $.ajax({
        type: "POST",
        url: URI,
        data: JSON.stringify(dtoP),
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
    if ($("#comboPeriodos").val() == (ano + "-" + "V")) {
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
        type: "GET",
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
            //alert(JSON.stringify(result));
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
                    $(document.body).animate({ scrollTop: 100 }, 300);
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
    var theme = prepareSimulator("grillaNotas");
    //var data = generatedata(50);
    this.editrow = -1;

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
        width: 420,
        source: dataAdapter,
        pageable: true,
        autoheight: true,
        sortable: true,
        altrows: true,
        enabletooltips: true,
        theme: theme,
        editable: true,
        selectionmode: 'multiplecellsadvanced',
        columns: [
          { text: 'Nombres', columntype: 'textbox ', datafield: 'nombres', width: 150, editable: false },
          {
              text: '(%)', datafield: 'nota', width: 45, cellsalign: 'right', columntype: 'numberinput', editable: true,
              validation: function (cell, value) {
                  if (value < 0 || value > 100) {
                      return { result: false, message: "Rango de 1-100" };
                  }
                  return true;
              },
              createeditor: function (row, cellvalue, editor) {
                  editor.jqxNumberInput({ decimalDigits: 0, digits: 3 });
              }
          },
          {
              text: 'Val', datafield: 'equivalencia', width: 30, cellsalign: 'right', columntype: 'textbox ', editable: false,
              cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                  if ((rowdata.nota >= 0) && (rowdata.nota < 60)) {
                      return "<div style='margin: 4px ; color: #ff0000;' class='jqx-right-align'>" + "B" + "</div>";
                  }
                  if ((rowdata.nota >= 60) && (rowdata.nota < 80)) {
                      return "<div style='margin: 4px ; color: #DB1DCE;' class='jqx-right-align'>" + "DB" + "</div>";
                  }
                  if ((rowdata.nota >= 80) && (rowdata.nota < 90)) {
                      return "<div style='margin: 4px ; color: #000080; ' class='jqx-right-align'>" + "DA" + "</div>";
                  }
                  if ((rowdata.nota >= 90) && (rowdata.nota <= 100)) {
                      return "<div style='margin: 4px ; color: #008000;' class='jqx-right-align'>" + "DS" + "</div>";
                  }
              }
          },
          {
              text: 'Logro/ Descripción', datafield: 'logro', width: 200, cellsalign: 'left', columntype: 'combobox', displayfield: 'logro', editable: true,
              createeditor: function (row, value, editor) {
                  editor.jqxComboBox({ source: LogrosAdapter, displayMember: 'id_logro', width: '400', height: '22', valueMember: 'id_logro' });
                  editor.jqxNumberInput({ digits: 5 });
              }
          }
        ]
    });
    initSimulator("grillaNotas");
};
$('#btnOtro').click(function () { // Botón NuevoLogrosAdapter
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
                        $(document.body).animate({ scrollTop: 150 }, 300);

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


$("#btnE").click(function () { // Botón aceptar del mdal pregunta
    var btn = $(this)
    btn.button('loading')
    $.ajax("...").always(function () {
        ModalPregunta2("¿Esta seguro de eliminar? ", "Confirmar");
        btn.button('reset')
    });
});

$(document).on('click', '.clsAceptar', function () {
    var btn = $(this)
    btn.button('loading')
    $.ajax(".....").always(function () {

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
                        $(document.body).animate({ scrollTop: 150 }, 300);
                    }

                }
            },
            error: function (result) {
                alert(JSON.stringify(result));
                Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
            }
        });
       
        });
        btn.button('reset')
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
                              observacion: "MODIFICACON DE FORMA GRUPAL EN LA APP"
                          };
        var URI = Dominio + "notas/2";
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
                        $(document.body).animate({ scrollTop: 150 }, 300);
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





  
    function prepareSimulator(id, structure) {
        var touchDevice = $.jqx.mobile.isTouchDevice();
        var hasFullScreenParam = window.location.toString().indexOf('fullscreen') >= 0;
        if (!touchDevice) {
            var theme = "mobile";
            var device = "mobile";
            var hasParam = window.location.toString().indexOf('?');
            if (hasParam != -1) {
                var start = window.location.toString().indexOf('(');
                var end = window.location.toString().indexOf(')');
                var device = window.location.toString().substring(start + 1, end);
                if (device === "") device = "mobile";
                var className = "device-" + device;

                if (device !== "android" && device !== "blackberry" && device !== "win8" && device !== "mobile") {
                    device = "mobile";
                    var className = "device-" + device;
                }

                if (device == "android") theme = "android";
                if (device == "blackberry") theme = "blackberry";
                if (device == "win8") theme = "windowsphone";
            }
        }

        if (touchDevice || hasFullScreenParam) {
            $("#container").removeClass();
            $("#container").addClass('mobile-container');
            if (id === "window" && !hasFullScreenParam) {
                $("#container").css('min-height', 700);
            }

            var toolbar = $('<div id="demoToolbar" style="border-bottom: 1px solid #555; z-index: 9999999999; position: absolute; top:0; width: 100%; height: 40px;"><div id="demoToolbarButton" style="float: left; margin: 5px; margin-left: 10px; padding: 3px 10px;"><div style="float: left;"></div><span style="float: left;">Back</span><div style="clear:both;"></div></div></div>');
            if (!hasFullScreenParam) {
                $("#container").prepend(toolbar);
            }
            else {
                $("#container").css('padding-top', '0px');
                $("#container").css('padding-bottom', '0px');
                if (theme == "windowsphone") {
                    $(document.body).css('background', "#000");
                    $(document.body).css('color', "#fff");
                }
                else if (theme == "android") {
                    $(document.body).css('background', "#000");
                    $(document.body).css('color', "#fff");
                }
                else if (theme === "mobile") {
                    $(document.body).css('background', "fff");
                    $(document.body).css('color', "#000");
                }
            }

            var html = $("#container").parent().html();
            $("#demoContainer").remove();
            $(document.body).html(html);
            var match = null;
            var version = "";
            var userAgent = navigator.userAgent;
            var os = "Other";
            var osTypes = {
                ios: { name: 'iOS', regex: new RegExp('(?:' + 'i(?:Pad|Phone|Pod)(?:.*)CPU(?: iPhone)? OS ' + ')([^\\s;]+)') },
                android: { name: 'Android', regex: new RegExp('(?:' + '(Android |HTC_|Silk/)' + ')([^\\s;]+)') },
                webos: { name: 'webOS', regex: new RegExp('(?:' + '(?:webOS|hpwOS)\/' + ')([^\\s;]+)') },
                blackberry: { name: 'BlackBerry', regex: new RegExp('(?:' + 'BlackBerry(?:.*)Version\/' + ')([^\\s;]+)') },
                bb10: { name: 'BlackBerry', regex: new RegExp('(?:' + 'BB10(?:.*))([^\\s;]+)') },
                rimTablet: { name: 'RIMTablet', regex: new RegExp('(?:' + 'RIM Tablet OS ' + ')([^\\s;]+)') },
                chrome: { name: 'Chrome OS', regex: new RegExp('CrOS') },
                mac: { name: 'MacOS', regex: new RegExp('mac') },
                win: { name: 'Windows', regex: new RegExp('win') },
                linux: { name: 'Linux', regex: new RegExp('linux') },
                bada: { name: 'Bada', regex: new RegExp('(?:' + 'Bada\/' + ')([^\\s;]+)') },
                other: { name: 'Other' }
            }

            $.each(osTypes, function (index, value) {
                match = userAgent.match(this.regex) || userAgent.toLowerCase().match(this.regex);

                if (match) {
                    if (!this.name.match(/Windows|Linux|MaxOS/)) {
                        if (match[1] && (match[1] == "HTC_" || match[1] == "Silk/")) {
                            version = "2.3";
                        } else {
                            version = match[match.length - 1];
                        }
                    }

                    os = { name: this.name, version: version, platform: navigator.platform };
                    return false;
                }
            });
            if (!hasFullScreenParam) {
                var theme = "windowsphone";
                if (os.name === "Android" || os.name === "Bada" || os.name === "Chrome OS" || os.name === "webOS") {
                    theme = "android";
                }
                if (os.name === "iOS" || os.name === "MacOS") {
                    theme = "mobile";
                }
                if (os.name === "Windows") {
                    theme = "windowsphone";
                }
                if (os.name === "BlackBerry" || os.name === "RIMTablet") {
                    theme = "blackberry";
                }


                $("#demoToolbar").addClass('jqx-widget-header jqx-widget-header-' + theme);
                $("#demoToolbar").addClass('jqx-listmenu-header jqx-listmenu-header-' + theme);
                $("#demoToolbar").css('padding', '0px');
                $("#demoToolbar").css('padding-top', '5px');

                if (theme == "windowsphone") {
                    $("#demoToolbar").css('background', "#2A2A2B");
                    $("#demoToolbar").css('border-bottom-color', "#000");
                    $(document.body).css('background', "#000");
                    $(document.body).css('color', "#fff");
                }
                else if (theme == "android") {
                    $("#demoToolbar").css('background', "#000");
                    $("#demoToolbar").css('border-bottom-color', "#333");
                    $(document.body).css('background', "#000");
                    $(document.body).css('color', "#fff");
                }
                else if (theme === "mobile") {
                    $("#demoToolbar").css('background', "#f8f8f8");
                    $("#demoToolbar").css('border-bottom-color', "#b2b2b2");
                    $(document.body).css('background', "fff");
                    $(document.body).css('color', "#000");
                }

                $("#demoToolbarButton").jqxButton({ theme: theme });
                $("#demoToolbarButton").css('border-radius', '10px');
                $("#demoToolbarButton").find('div:first').addClass('jqx-listmenu-backbutton-arrow' + ' jqx-listmenu-backbutton-arrow-' + theme);

                $("#demoToolbarButton").click(function () {
                    window.open('../index.htm', '_self');
                });
            }
            $(document.body).css('visibility', 'visible');
            return theme;
        }
        if (hasParam != -1) {
            switch (id) {
                case "grid":
                case "gauge":
                case "chart":
                case "menu":
                case "treemap":
                case "tabs":
                case "editor":
                case "panel":
                case "window":
                case "photoGallery":
                case "splitter":
                case "draw":
                case "rangeSelector":
                    className += "-tablet";
                    break;
            }
            if ($("#demoContainer").length > 0) {
                $("#demoContainer")[0].className = className;
                $("#container")[0].className = className + "-container";
            }
        }
        $(document.body).css('visibility', 'visible');
        return theme;
    }

    function initSimulator(id) {
        if ($.jqx.mobile.isTouchDevice()) {
            return;
        }

        switch (id) {
            case "calendar":
                if ($("#fromCalendar").length > 0) {
                    $("#fromCalendar").jqxCalendar({ enableHover: false, keyboardNavigation: false });
                    $("#toCalendar").jqxCalendar({ enableHover: false, keyboardNavigation: false });
                }
                break;
            case "listbox":
                $("#listbox").jqxListBox({ touchMode: true, keyboardNavigation: false, enableMouseWheel: false });
                break;
            case "splitter":
                $("#splitter").jqxSplitter({ touchMode: true });
                if ($("#listbox").length > 0) {
                    $("#listbox").jqxListBox({ touchMode: true, keyboardNavigation: false, enableMouseWheel: false });
                    $("#ContentPanel").jqxPanel({ touchMode: true });
                }
                else {
                    $('#rightSplitter').jqxSplitter({ touchMode: true });
                }
                break;
            case "menu":
                $("#menu").jqxMenu({ enableHover: false, clickToOpen: true, touchMode: true });
                break;
            case "tree":
                $("#tree").jqxTree({ touchMode: true, keyboardNavigation: false });
                break;
            case "dropdownlist":
                $("#dropdownlist").jqxDropDownList('listBox').host.jqxListBox({ touchMode: true, keyboardNavigation: false });
                break;
            case "adapter":
                $("#jqxDropDownList").jqxDropDownList('listBox').host.jqxListBox({ touchMode: true, keyboardNavigation: false });
                break;
            case "combobox":
                $("#combobox").jqxComboBox({ touchMode: true });
                break;
            case "dropDownButton":
                $("#tree").jqxTree({ touchMode: true, keyboardNavigation: false });
                break;
            case "numberInput":
                $("#numericInput").jqxNumberInput({ touchMode: true });
                $("#percentageInput").jqxNumberInput({ touchMode: true });
                $("#currencyInput").jqxNumberInput({ touchMode: true });
                break;
            case "tabs":
                $("#tabs").jqxTabs({ touchMode: true, keyboardNavigation: false });
                $("#jqxGrid").jqxGrid({ touchmode: true, keyboardnavigation: false, enablemousewheel: false });
                break;
            case "grid":
                $("#grid").jqxGrid({ touchmode: true, keyboardnavigation: false, enablemousewheel: false });
                break;
            case "treeGrid":
                $("#treeGrid").jqxTreeGrid({ touchMode: true, enableHover: false });
                break;
            case "dataTable":
                $("#dataTable").jqxDataTable({ touchMode: true, enableHover: false });
                break;
            case "panel":
                $("#panel").jqxPanel({ touchMode: true });
                break;
            case "editor":
                $("#editor").jqxEditor({ touchMode: true });
                break;
        }
    }

