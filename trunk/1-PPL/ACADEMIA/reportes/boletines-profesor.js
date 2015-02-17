
    WinMove();
    var idOld;
    var conta, filtro;
    var P = {};
    var CodEst,CodGrado;
    validar_pagina();
    if (localStorage.getItem('SeccionRol') == "PROFESOR" || localStorage.getItem('SeccionRol') == "ADMINISTRATIVO" || localStorage.getItem('SeccionRol') == "SUPER") {
        conta = 0;
    } else {
        DenegarAccesoToProfe();
    }
    CargarDatosIniciales();
    //---------------------------------- --------------------------------------------------------------------------------------   CargarDatosIniciales();
    function CargarDatosIniciales() {
        $("#formPPAL").hide();
        $("#imgload").show();
        $.ajax("...").always(function () {
            nuevo();
            cargarPeriodos();
            cargarGruposDirector();
            $("#formPPAL").show();
            $("#imgload").hide();
        });
    }
    var array = new Array(); // variable para las grillas en los formularios

    $('#btnG').click(function () { // Botón gestionar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            cargarEstDelGrupo();
            btn.button('reset')
        });
    });

    $('#comboGrupo').click(function () { // Botón gestionar
        $("#grilla1").hide();
    });


    $('#btnN').click(function () { // Botón Nuevo
        nuevo();
    });
    function nuevo() {
        $('#grilla1').hide();
        $('#comboGrupo').focus();
    }

    function cargarEstDelGrupo() {
        
        var dto = {};
        dto.id_grupo = $("#comboGrupo").val();
        dto.sexo = null;

        jsonData = "{'dto':" + JSON.stringify(dto) +
            ",'dtob':" + JSON.stringify(getBitacora("REPORTES", "LISTAR ", "ACCION PARA VER LOS ESTUDIANTES QUE EL DIRECTOR DE GRUPO TIENE EN UNO DETERMINADO")) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/matriculas.asmx/c_matriculaXIdGrupo",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    $('#grilla1').html("");
                    conta = 0;
                    if (result.d == null) {
                        Modal("No existen estudiantes en este grupo", " Grupo vacio");
                        $(document.body).animate({ scrollTop: 0 }, 300);

                        $("#grilla1").hide();
                    }
                    else {
                        //Modal("Listado de estudiantes en este grupo generado de forma exitosa", "Listados del grupo");
                        $("#grilla1").show();
                        P = result.d;
                        titleGrilla();
                        $.each(P, function (i, item) {
                            AddItemGrilla(item);
                        })
                        $(document.body).animate({ scrollTop: 250 }, 300);
                    }
                },
                error: function (result) {
                    //Modal("Server: Error de servidor.", "Error de servidor");
                }
            });

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
                        if (ano == AnoAcademico) {
                            $("#comboPeriodos").append("<option value=" + item.id + ">" + item.id + "</option>");
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
    function cargarGruposDirector() {

        var dto = {};
        dto.id_profesor = localStorage.getItem('SeccionId'); dto.id_grupo = $("#comboGrupo").val();
        jsonData = "{'dto':" + JSON.stringify(dto) + ",'dtob':" + JSON.stringify(getBitacora("REPORTES", "GENERAR", "BOLETIN FINAL INDIVIDUAL")) + "}"; //Registro de bitacora

        $.ajax({
            type: "POST",
            url: "/WS/matriculas.asmx/c_matriculaDirector",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: jsonData,
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Usted no contiene grupos asignados.  ");
                    redireccionar();
                }
                else {
                    P = result.d;
                    conta = 0;
                    $("#comboGrupo").html("");
                    $("#comboGrupo").val("");
                    $.each(P, function (i, item) {
                            var obj = item.id.split('-');
                            var ano = obj[0];
                            if (ano == AnoAcademico) {
                                $("#comboGrupo").append("<option value=" + item.id + ">" + item.id + "</option>");
                            }
                    })


                }
            },
            error: function (result) {
                Modal("Server: No existen grupos asignados.", "");
                redireccionar();
            }
        });
    }

    var getDatos = function () {
        var dto = {};
        dto.id_estudiante = CodEst;
        dto.id_grupo = $("#comboGrupo").val();
        dto.id_periodo = $("#comboPeriodos").val();

        dto.observacion = "NA";
        dto.fecha = null;
        dto.acceso = false;
        dto.notificacion = null;
        return dto;
    };
   
    var AddItemGrilla = function (item) {
        conta++;
        array.push(item);
        var nuevaCol = "<tr>";
        nuevaCol += "<td>" + conta + "</td>";
        nuevaCol += "<td>" + item.id_estudiante + "</td>";
        nuevaCol += "<td>" + item.apellidos + "</td>";
        nuevaCol += "<td>" + item.nombres + "</td>";
        nuevaCol += '<td><input id="btnP" value="Generar boletin" tag=' + array.length + ' class="clsGenerar boton-down btn btn-danger" data-loading-text="Cargando..." type="button" /></td>';
        nuevaCol += "</tr>";
        $("#grilla1").append(nuevaCol);
    };
    function titleGrilla() {
        var newtitle = "<tr>";
        newtitle += '<th class="col-md-1">#</th>';
        newtitle += '<th class="col-md-2">Identificación</th>';
        newtitle += '<th class="col-md-3">Apellidos</th>';
        newtitle += '<th class="col-md-2">Nombres</th>';
        newtitle += '<th class="col-md-2">Acción</th>';
        newtitle += "</tr>";
        $("#grilla1").append(newtitle);
    }; 


    $(document).on('click', '.clsGenerar', function () {
        var fila = $(this).attr("tag");
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
            $(".clsGenerar").attr('disabled', 'disabled');
            CodEst = array[fila - 1].id_estudiante;
            Generar();

            $(".clsGenerar").removeAttr('disabled');
            btn.button('reset')
        });
    });
       

    function Generar() {
        if ($('#comboGrupo').val() == null) {
            Alerta("Error: Debe de escoger un grupo.", "danger");
            $(document.body).animate({ scrollTop: 20 }, 300);
            $('#comboGrupo').focus();
        } else {
            //--------------------EXTRAEMOS EL PERIODO SELECCIONADA ------------*/
            var periodoS = ($("#comboPeriodos").val()).split('-');
            var Ano = periodoS[0];
            var Periodo = periodoS[1];
            /*--------------------------------------------------------------------*/

            CodGrado = $("#comboGrupo").val().substring(5, 6);
            
            if (Periodo == 'V') { // Generarmos el boletin final individual
                
                jsonData = "{'dto':" + JSON.stringify(getDatos()) + ",'dtob':" + JSON.stringify(getBitacora("REPORTES", "GENERAR", "BOLETIN FINAL INDIVIDUAL")) + "}"; //Registro de bitacora
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

                        

                    },
                    error: function (result) {
                        Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error del servidor");
                        
                    }
                });
            } else {
                jsonData = "{'dto':" + JSON.stringify(getDatos()) + ",'dtob':" + JSON.stringify(getBitacora("REPORTES", "GENERAR", "BOLETIN DE PERIODOS INDIVIDUAL")) + "}"; //Registro de bitacora
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
                        

                    },
                    error: function (result) {
                        Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error del servidor");
                        

                    }
                });
            }
        }

    }

