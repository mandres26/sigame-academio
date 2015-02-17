
//$(document).ready(function () {
    WinMove();
    var conta;
    var Pos;
    var filtro;
    var CodEst, Ref, CodPer, Observacion, CodGrupo, Notificacion;
    var P = {};
    var array = new Array();
    var array2 = new Array();
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
        $("#f-grilla2").hide();
        $("#f-des").hide();
        $("#imgload").show();
        $.ajax("...").always(function () {
            cargarEstudiantes();
            $("#formPPAL").show();
            $("#imgload").hide();
        });
    }

    function GenerarPdf() {
        var dto = {};
        dto.id = CodEst;
        dto.id_grupo = CodGrupo;

        jsonData = "{'dto':" + JSON.stringify(dto) +
                    ",'dtob':" + JSON.stringify(getBitacora("OBSERVACIONES", "GENERAR", "GENERAR UN ARCHIVO CON LAS OBSERVACIONES DE UN ESTUDIANTE  ")) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/reportes.asmx/c_observacionesEst",
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
                     if (rs == 'c_no') {
                        Modal("El estudiante no contiene ninguna observacion asignada", "Estudiante sin observaciones.");
                        Alerta("El estudiante no contiene ninguna observacion asignada", "warning");
                        $(document.body).animate({ scrollTop: 0 }, 300);
                    }
                    else if (rs == 'c_yes') {
                        
                            window.open("/ACADEMIA/reportes/reports/observacionesEst.aspx");
                        $(document.body).animate({ scrollTop: 0 }, 300);
                    }
                }

            },
            error: function (result) {
//                alert(JSON.stringify(result));
                //Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Servidor no disponible");
            }
        });
    }

    function cargarEstudiantes() {
        var dto = {};
        dto.id = localStorage.getItem('SeccionId');

        jsonData = "{'dto':" + JSON.stringify(dto) +
                     ",'dtob':" + JSON.stringify(getBitacora("OBSERVACIONES", "LISTAR ", "ACCION REALIZADA POR EL ACUDIENTE")) + "}";
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
                    setTimeout("window.location.href = 'acudiente.html'", 5000); //tiempo expresado en milisegundos
                    $("#f-grilla1").hide();
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
    function cargarObservaciones() {
        jsonData = "{'dto':" + JSON.stringify(getDatosObservacion()) +
                     ",'dtob':" + JSON.stringify(getBitacora("OBSERVACIONES", "LISTAR ", "ACCION REALIZADA POR EL ACUDIENTE")) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/observaciones.asmx/c_obserXIdEstXGrupo",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                conta = 0;
                //alert("ss");
                if (result.d == null) {
                    Modal("El estudiante, en este grupo, no contiene ninguna observación registrada. ", " Sin observaciónes");
                    $("#f-grilla2").hide();
                    $(document.body).animate({ scrollTop: 0 }, 300);
                }
                else {
                    $(document.body).animate({ scrollTop: 300 }, 500);
                    $("#f-grilla2").show();
                    $('#grilla2').html("");
                    P = result.d;
                    titleGrilla2();
                    $.each(P, function (i, item) {
                        if (item.acceso != "ARCHIVADO") {
                            AddItemGrilla2(item);
                        }
                    })
                    
                }
            },
            error: function (result) {
                //Modal("Server: Error de servidor.", "Error de servidor");
            }
        });
    }
    //----------------------------------------------------------------------------------------------------
    $(document).on('click', '.clsOK', function () {
        var fila = $(this).attr("tag");
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
            $("#f-grilla2").hide();
            $("#f-des").hide();
            CodEst = array[fila - 1].id_estudiante;
            CodGrupo = array[fila - 1].id_grupo;
            cargarObservaciones();
            btn.button('reset')
        });
    });
   
    //----------------------------------------------------------------------------------------------------
    $(document).on('click', '.clsVer', function () {
        var fila = $(this).attr("tag");
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
            $("#f-des").hide();
            Ref = array2[fila - 1].referencia;
            Observacion = array2[fila - 1].observacion;
           // aca despliego la descripcion y envio la modificacion de vista
            Notificacion = "VISTA";
            jsonData = "{'dto':" + JSON.stringify(getDatosObservacion()) +
                          ",'dtob':" + JSON.stringify(getBitacora("OBSERVACIONES", "LISTAR ", "ACCION REALIZADA POR EL ACUDIENTE")) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/observaciones.asmx/m_observacionNoti",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        Modal("Error al intentar solitar esta petición. El servidor no esta disponible. <strong>Intente más tarde. </strong> ", " Servidor no disponible");
                        $("#f-des").hide();
                    }
                    else if (JSON.stringify(result.d) == '"¡Se modificó la observación exitosamente!"') {
                        $("#f-des").show();
                        $("#txtDes").focus();
                        $("#txtDes").val(Observacion);
                        $(document.body).animate({ scrollTop: 10000 }, 300);
                    }
                },
                error: function (result) {
                    Modal("Server: Error al intentar solitar esta petición. El servidor no esta disponible. Intente mas tarde ", " Servidor no disponible");
                }
            });


            btn.button('reset')
        });
    });
    $("#btnI").click(function () {
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            GenerarPdf();
            btn.button('reset')
        });
    });

    //----------------------------------------------------------------------------------------------------
    function cargarDescripcion() {
       
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
        nuevaCol += '<td><input id="btnOK" value="OK" tag=' + array.length + ' class="clsOK boton-down btn btn-primary" data-loading-text="Cargando..." type="button" /></td>';
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

    var AddItemGrilla2 = function (item) {
        conta++;
        array2.push(item);
        var nuevaCol = "<tr>";
        nuevaCol += "<td>" + item.id_asignatura + "</td>";
        nuevaCol += "<td>" + item.fecha + "</td>";

        if (item.tipo=="NEGATIVA") {
            nuevaCol += "<td class='text-danger '> <strong>" + item.tipo + " </strong> </td>";
        } else {
            nuevaCol += "<td class='text-success '> <strong>" + item.tipo + " </strong> </td>";
        }
        
        if (item.notificacion == "VISTA") {
            nuevaCol += "<td class='text-info '> <strong>" + item.notificacion + " </strong> </td>";
        } else {
            nuevaCol += "<td>" + item.notificacion + "</td>";
        }

        
        
        nuevaCol += '<td><input id="btnVer" value="Ver" tag=' + array2.length + ' class="clsVer btn btn-danger" data-loading-text="Cargando..." type="button" /></td>';
        nuevaCol += "</tr>";
        $("#grilla2").append(nuevaCol);
    };
    function titleGrilla2() {
        var newtitle = "<tr>";
        newtitle += '<th class="col-md-1">Asignatura</th>';
        newtitle += '<th class="col-md-1">Fecha </th>';
        newtitle += '<th class="col-md-1">Tipo</th>'
        newtitle += '<th class="col-md-1">Notificación</th>';
        newtitle += '<th class="col-md-1">Acción</th>';
        newtitle += "</tr>";
        $("#grilla2").append(newtitle);
    };


    //--------------------------------------------------------------------------------------------------

//});
