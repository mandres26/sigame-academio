
//$(document).ready(function () {
    WinMove();
    var conta;
    var Pos;
    var filtro;
    var CodEst, CodGrado, Ref, CodPer, CodGrupo, Notificacion;
    var P = {};
    var array = new Array();
    var jsonData;

    validar_pagina();

    //---------------------------------- validamos que el rol del usuario pueda ingresar a esta pagina -----------------------
    if (localStorage.getItem('SeccionRol') == "ACUDIENTE" || localStorage.getItem('SeccionRol') == "SUPER") {
        conta = 0;
    } else {
        Modal("No tiene permisos para ingresar a esta url.", "Acceso denegado");
        setTimeout("window.location.href = 'login.html'", 2000); //tiempo expresado en milisegundos
    }
    //---------------------------------- --------------------------------------------------------------------------------------
    CargarDatosIniciales();
    function CargarDatosIniciales() {
        $("#formPPAL").hide();
        $("#f-grilla1").hide();
        $("#imgload").show();
        $.ajax("...").always(function () {
            cargarPeriodos();
            cargarEstudiantes();
            Alerta("Para procesar el reporte, <strong> seleccione el periodo </strong> academico y escoja el <strong>estudiante con su grupo  </strong> y haga clic en  <strong>Generar  </strong>.", "info")
            $("#formPPAL").show();
            $("#comboPeriodos").focus();
            $("#imgload").hide();
        });
    }
    var getDatosPer = function () {
        var dto = {};
        dto.id = $("#comboPeriodos").val();
        return dto;
    };
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
                    $("#formPPAL").hide();
                    redireccionar();
                }
                else {
                    P = result.d;
                    conta = 0;
                    $("#comboPeriodos").html("");
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
                Modal("Server: Error al cargar los periodos.", "Servidor no disponible");
                redireccionar();
            }
        });
    }
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
    function cargarEstudiantes() {
        var dto = {};
        dto.id = localStorage.getItem('SeccionId');

        jsonData = "{'dto':" + JSON.stringify(dto) +
                     ",'dtob':" + JSON.stringify(getBitacora("REPORTES", "LISTAR ", "ACCION REALIZADA POR EL ACUDIENTE")) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/matriculas.asmx/c_matriculaXIdAcu",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
               
                conta = 0;
                if (result.d == null) {
                    Modal("Usted no tiene estudiantes asignados todavia. Contactese con la administración de colegio.", " Si estudiantes matriculados");
                    $("#formPPAL").hide();
                    $("#f-grilla1").hide();
                    setTimeout("window.location.href = 'acudiente.html'", 5000); //tiempo expresado en milisegundos
                }
                else {
                    $("#f-grilla1").show();
                    $('#grilla1').html("");
                    P = result.d;
                    titleGrilla1();
                    var b = 0;
                    $.each(P, function (i, item) {
                        /*-- filtro por el año academico seleccionado ----- voy preguntando y añadiendo los que si y excluendo los que no*/
                        var obj = item.id_grupo.split('-');
                        var ano = obj[0];
                        if (ano == AnoAcademico) {
                            AddItemGrilla1(item);
                            b = 1;
                        }
                    })
                    if (b == 0) {
                        Modal("Usted no contiene estudiantes matriculados en este año academico. ", "No contiene estudiantes matriculados.");
                        setTimeout("window.location.href = 'acudiente.html'", 5000); //tiempo expresado en milisegundos
                    }
                }
            },
            error: function (result) {
                Modal("Server: Error de servidor.", "Servidor no disponible.");
            }
        });
    }
    var getDatosObservacion = function () {
        var dto = {};
        dto.referencia = Ref;
        dto.id_estudiante = CodEst;
        dto.id_asignatura = null;
        dto.id_grupo = CodGrupo
        dto.id_periodo = null;
        dto.id_profesor = null;
        dto.observacion = null;
        dto.fecha = null;
        dto.tipo = null;
        dto.notificacion = Notificacion;
        dto.acceso = null;
        return dto;
    };
    //----------------------------------------------------------------------------------------------------
    $(document).on('click', '.clsOK', function () {
        var fila = $(this).attr("tag");
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
            CodEst = array[fila - 1].id_estudiante;
            CodGrupo = array[fila - 1].id_grupo;
            CodGrado = CodGrupo.substring(5, 6);
            Generar();
            btn.button('reset')
        });
    });
    function Generar() {
            var dto = {};
            dto.id_estudiante = CodEst;
            dto.id_grupo = CodGrupo;
            dto.id_periodo = $("#comboPeriodos").val();
            dto.observacion = "SOLICITADO POR ACUDIENTE";
            dto.fecha = null;
            dto.acceso = false;
            dto.notificacion = null;
            
        //--------------------EXTRAEMOS EL PERIODO SELECCIONADA ------------*/
            var periodoS = ($("#comboPeriodos").val()).split('-');
            var Ano = periodoS[0];
            var Periodo = periodoS[1];
        /*--------------------------------------------------------------------*/

            if (Periodo == 'V') { // Generarmos el boletin final individual
                jsonData = "{'dto':" + JSON.stringify(dto) + ",'dtob':" + JSON.stringify(getBitacora("REPORTES", "GENERAR", "BOLETIN FINAL")) + "}"; //Registro de bitacora
                $.ajax({
                    type: "POST",
                    url: "/WS/reportes.asmx/cg_boletinXestudianteFinal",
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    success: function (result) {
                        if (result.d == null) {
                            Modal("Ocurrio un error al intentar conectar al servidor. ", "Servidor no disponible");
                        } else {
                            // Recorremos a ver como esta la badera de resultado.---------
                            P = result.d;
                            var rs;
                            $.each(P, function (i, item) {
                                rs = item.resultado;
                            })
                            //-------------------------------------------------------------
                            if (rs == 'El reporte que esta solicitando no esta habilitado por el colegio. Contactese con la administración de la institución.') {
                                Modal("El reporte que esta solicitando <strong>no esta habilitado </strong> por el colegio. Contactese con la administración de la institución.", "Reporte no habilitado todavia.");
                            } else if (rs == 'Este reporte que solicita no ha sido generado por la administración.') {
                                Modal("Este reporte que solicita no ha sido generado por la administración.", "Reporte no generado.");
                            }
                            else if (rs == 'c_no') {
                                Modal("El grupo en que esta matriculado el estudiante no contiene asignaturas matriculadas.", "Grupo sin asignaturas.");
                                Alerta("El grupo en que esta matriculado el estudiante no contiene asignaturas matriculadas.", "danger");
                                $(document.body).animate({ scrollTop: 0 }, 300);
                            }
                            else if (rs == 'c_yes') {
                                Alerta("Reporte generado de forma exitosa", "success");
                                // BOLETIN PARA EL PERIODO tradicional y PARA PREESCOLAR
                                if (CodGrado == "J" || CodGrado == "P" || CodGrado == "T") {
                                    window.open("/ACADEMIA/reportes/boletines/preescolar/boletinf.aspx"); // boletin de pre-escolar
                                } else if (CodGrado == "1" || CodGrado == "2" || CodGrado == "3" || CodGrado == "4" || CodGrado == "5") {
                                    window.open("/ACADEMIA/reportes/boletines/primaria/boletinf.aspx"); // boletin de primaria
                                }
                                else if (CodGrado == "6" || CodGrado == "7" || CodGrado == "8" || CodGrado == "9" || CodGrado == "10" || CodGrado == "11") {
                                    window.open("/ACADEMIA/reportes/boletines/bachillerato/boletinf.aspx"); // boletinb = boletin de bachilletato
                                }
                                $(document.body).animate({ scrollTop: 0 }, 300);
                            }
                        }

                        //$('#btnGenerar').show()

                    },
                    error: function (result) {
                        Modal("Upss en el servidor: Error al intentar realizar esta acción. ", "Error del servidor  1");
                        //$('#btnGenerar').show()
                    }
                });
            } else {
                
                //alert("ss");
                jsonData = "{'dto':" + JSON.stringify(dto) +
                    ",'dtob':" + JSON.stringify(getBitacora("REPORTES", "GENERAR", "BOLETIN DE PERIODOS")) + "}"; //Registro de bitacora
                
                $.ajax({
                    type: "POST",
                    url: "/WS/reportes.asmx/cg_boletinXestudiante",
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    success: function (result) {
                        if (result.d == null) {
                            Modal("Ocurrio un error al intentar conectar al servidor. ", "Servidor no disponible");
                        } else {
                            // Recorremos a ver como esta la badera de resultado.---------
                            P = result.d;
                            var rs;
                            $.each(P, function (i, item) {
                                rs = item.resultado;
                            })
                            //-------------------------------------------------------------
                            if (rs == 'El reporte que esta solicitando no esta habilitado por el colegio. Contactese con la administración de la institución.') {
                                Modal("El reporte que esta solicitando <strong>no esta habilitado </strong> por el colegio. Contactese con la administración de la institución.", "Reporte no habilitado todavia.");
                            } else if (rs == 'Este reporte que solicita no ha sido generado por la administración.') {
                                Modal("Este reporte que solicita no ha sido generado por la administración.", "Reporte no generado.");
                            }
                            else if (rs == 'c_no') {
                                Modal("El grupo en que esta matriculado el estudiante no contiene asignaturas matriculadas.", "Grupo sin asignaturas.");
                                Alerta("El grupo en que esta matriculado el estudiante no contiene asignaturas matriculadas.", "danger");
                                $(document.body).animate({ scrollTop: 0 }, 300);
                            }
                            else if (rs == 'c_yes') {
                              

                                Alerta("Reporte generado de forma exitosa", "success");
                                // BOLETIN PARA EL PERIODO tradicional y PARA PREESCOLAR
                                if (CodGrado == "J" || CodGrado == "P" || CodGrado == "T") {
                                    window.open("/ACADEMIA/reportes/boletines/preescolar/boletin.aspx"); // boletin de pre-escolar
                                } else if (CodGrado == "1" || CodGrado == "2" || CodGrado == "3" || CodGrado == "4" || CodGrado == "5") {
                                    window.open("/ACADEMIA/reportes/boletines/primaria/boletin.aspx"); // boletin de primaria
                                }
                                else if (CodGrado == "6" || CodGrado == "7" || CodGrado == "8" || CodGrado == "9" || CodGrado == "10" || CodGrado == "11") {
                                    window.open("/ACADEMIA/reportes/boletines/bachillerato/boletin.aspx"); // boletinb = boletin de bachilletato
                                }


                                $(document.body).animate({ scrollTop: 0 }, 300);
                            }
                        }
                        //$('#btnGenerar').show()

                    },
                    error: function (result) {
                        //alert(JSON.stringify(result));
                        Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error del servidor 2");
                        //$('#btnGenerar').show()

                    }
                });
            }
    }
    var AddItemGrilla1 = function (item) {
        conta++;
        array.push(item);
        var nuevaCol = "<tr>";
        nuevaCol += "<td>" + item.id_estudiante + "</td>";
        nuevaCol += "<td>" + item.apellidos + "</td>";
        nuevaCol += "<td>" + item.nombres + "</td>";
        nuevaCol += "<td>" + item.grado + "</td>";
        nuevaCol += "<td>" + item.id_grupo + "</td>";
        nuevaCol += "<td>" + item.año + "</td>";
        nuevaCol += '<td><input id="btnOK" value="Generar archivo" tag=' + array.length + ' class="clsOK btn btn-danger" data-loading-text="Cargando..." type="button" /></td>';
        nuevaCol += "</tr>";
        $("#grilla1").append(nuevaCol);
    };
    function titleGrilla1() {
        var newtitle = "<tr>";
        newtitle += '<th class="col-md-1">Identificación</th>';
        newtitle += '<th class="col-md-2">Apellidos</th>';
        newtitle += '<th class="col-md-2">Nombres</th>'
        newtitle += '<th class="col-md-1">Grado</th>';
        newtitle += '<th class="col-md-1">Grupo</th>';
        newtitle += '<th class="col-md-1">Año</th>';
        newtitle += '<th class="col-md-1">Acción</th>';
        newtitle += "</tr>";
        $("#grilla1").append(newtitle);
    };
  

//});
