
//$(document).ready(function () {
    WinMove();
    var conta, Ref, HoraF, HoraI;
    var e = 0;
    var jsonData;
    var P = {};
    var bandera = 0;
    var pos = 0;
    var array = new Array(); // variable para las grillas en los formularios
    $("#formPPAL").hide();
    nuevosOcultar();
    validar_pagina();
    vigencia();
    var AnoAcademico = localStorage.getItem('SeccionAnoAcademico');
    //---------------------------------- validamos que el rol del usuario pueda ingresar a esta pagina -----------------------
    if (localStorage.getItem('SeccionRol') == "ADMINISTRATIVO" || localStorage.getItem('SeccionRol') == "SUPER") {
        conta = 0;
    } else {
        DenegarAccesoToAdmin();
   } 
    //---------------------------------- --------------------------------------------------------------------------------------
    CargarDatosIniciales();
    function CargarDatosIniciales() {
        $("#imgload").show();
        $.ajax("...").always(function () {
            cargarDias();
            cargarGrupos();
            cargarJornadas();
            cargarAsignaturas();
            $("#formPPAL").show();
            $("#imgload").hide();
            nuevosDatos();
        });
    }
     var array = new Array();
    var getDatosAsig = function () {
        var dto = {};
        dto.id = $("#comboIdAsig").val();
        return dto;
    };
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
                }
                else {
                    P = result.d;
                    $("#comboIdgrupo").html("");
                    $.each(P, function (i, item) {
                        /*-- filtro por el año academico seleccionado ----- voy preguntando y añadiendo los que si y excluendo los que no*/
                        var obj = item.id_grupo.split('-');
                        var ano = obj[0];
                        if (ano == AnoAcademico) {
                            $("#comboIdgrupo").append("<option value=" + item.id_grupo + ">" + item.id_grupo + "</option>");
                        }
                    })
                }
            },
            error: function (result) {
                Modal("Server: Error al cargar los grupos.", "Error de servidor");
            }
        });
    }
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
    var getDatosJornada = function () {
        var dto = {};
        dto.id = $("#comboJornada").val();
        dto.horaI = $("#txtHoraIJ").val();
        dto.horaF = $("#txtHoraFJ").val();
        return dto;
    };
    $("#comboJornada").change(function () {
        jsonData = "{'dto':" + JSON.stringify(getDatosJornada()) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/jornadas.asmx/c_jornada",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                P = result.d;
                $("#txtHoraIJ").val(P.horaI);
                $("#txtHoraFJ").val(P.horaF);
            },
            error: function (result) {
            }
        });
    });

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
                    $("#comboIdAsig").html("");
                    $.each(P, function (i, item) {
                        $("#comboIdAsig").append("<option value=" + item.id + ">" + item.id + "</option>");
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
    var getDatos = function () {
        var dto = {};
        dto.referencia = Ref;
        dto.id_grupo = $("#comboIdgrupo").val();
        dto.id_asignatura = $("#comboIdAsig").val();
        dto.dia = $("#comboDia").val();
        dto.horaI = $("#txtHoraI").val();
        dto.horaF = $("#txtHoraF").val();
        dto.jornada = $("#comboJornada").val();
        return dto;
    };
    function cargarJornadas() {
        $.ajax({ // Carga de jornadas
            type: "POST",
            url: "/WS/jornadas.asmx/c_jornadas",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Error de congruenciá: No existen jornadas asignados en el sistema. ");
                }
                else {
                    P = result.d;
                    
                    $("#comboJornada").html("");
                    conta = 0;
                    $.each(P, function (i, item) {
                        $("#comboJornada").append("<option value=" + item.id + ">" + item.id + "</option>");
                        if (conta == 0) {
                            $("#txtHoraIJ").val(item.horaI);
                            $("#txtHoraFJ").val(item.horaF);
                        }
                        conta++;
                    })
                }
            },
            error: function (result) {
                Modal("Server: Error al cargar las jornadas.", "")
            }
        });
    }
    function cargarDias() {
        var A;
        $("#comboDia").html("");
        A += '<option value="LUNES">LUNES</option>';
        A += '<option value="MARTES">MARTES</option>';
        A += '<option value="MIERCOLES">MIERCOLES</option>';
        A += '<option value="JUEVES">JUEVES</option>';
        A += '<option value="VIERNES">VIERNES</option>';
        A += '<option value="SABADO">SABADO</option>';
        A += '<option value="DOMINGO">DOMINGO</option>';
        $("#comboDia").append(A);
    }
   
    $('#btnGR').click(function () { // Botón gestionar registro
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            $(document.body).animate({ scrollTop: 300 }, 300);
            pos = 1;
            Gestionar();
            btn.button('reset')
        });
    });
    $('#btnGM').click(function () { // Botón gestionar modificacion
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            $(document.body).animate({ scrollTop: 300 }, 300);
            pos = 2;
            Gestionar();
            btn.button('reset')
        });
    });
    //---------------------------------- BOTONES DE ACCIONES ----------------------------
    $('#btnN').click(function () { // Botón Nuevo
        nuevosDatos();
        nuevosOcultar();
    });
    function nuevosOcultar() {
        $('#btnR').show();
        $("#f-grilla").hide();
        $('#btnM').show();
        $('#btnE').show();
        $('#btnL').show();
        $('#f-horas').hide();
        $('#grilla').hide();
        $("#botones").hide();
        $("#f2").hide();
    }
    function nuevosDatos() {
        $("#comboDia").val('LUNES');
        $("#txtHoraI").val("");
        $("#txtHoraF").val("");
        $("#comboIdgrupo").removeAttr('disabled');
        $("#comboIdAsig").removeAttr('disabled');
        $("#comboJornada").removeAttr('disabled');
        $('#comboIdgrupo').focus();
        Alerta("Para procesar un horario escoja el grupo, la jornada, la asignatura y luego  clic en el botón <strong> Gestionar </strong>para continuar.", "info");
        $('#txtHoraI').val($('#txtHoraIJ').val());
        $('#txtHoraF').val($('#txtHoraFJ').val()); // PRUEBAS
    }
    function nuevosHorario() {
        $("#f-horas").hide();
        $("#comboDia").val("LUNES");
        $("#txtHoraI").val("");
        $("#txtHoraF").val("");
        $("#f-horas").hide();
        $("#btnGR").focus();
        $("#botones").hide();
    }

  
    ///=================================== QUEDE   MODIFICANDO ACA==========================================================
    $(document).on('click', '.clsEliminar', function () {
        var fila = $(this).attr("tag");
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
            $("#f-horas").hide();
            Ref = array[fila - 1].referencia;
            //PREUBA SI CON LA SIGUIENTE LINEA SE PUEDE ELIMINAR LA FILA de la tabla- animacion
            jsonData = "{'dto':" + JSON.stringify(getDatos()) + ",'dtob':" + JSON.stringify(getBitacora("HORARIOS", "ELIMINAR", "NINGUNA")) + "}"; //Registro de bitacora";
            $.ajax({
                type: "POST",
                url: "/WS/horarios.asmx/e_horario",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    Modal(JSON.stringify(result.d), "Eliminación de horarios.");
                    if (result.d != null) { // comprobamos que haya sido eliminado
                        var objCuerpo = $('.clsEliminar').parents().get(2);
                        var objFila = $('.clsEliminar').parents().get(1);
                        $(objFila).remove();
                    }
                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                }
            });
            btn.button('reset')
        });
    });
    //----------------------------------------------------------------------------------------------------
    function ValidarHoras() {
        var HI = new Array();
        var HF = new Array();
        var HIJ = new Array();
        var HFJ = new Array();
        HI = $('#txtHoraI').val().split(":");
        HF = $('#txtHoraF').val().split(":");
        HIJ = $('#txtHoraIJ').val().split(":");
        HFJ = $('#txtHoraFJ').val().split(":");

        var HORA_HI = (parseInt(HI[1]) + parseInt((HI[0] * 60)));
        var HORA_HF = (parseInt(HF[1]) + parseInt((HF[0] * 60)));
        var HORA_HIJ = (parseInt(HIJ[1]) + parseInt((HIJ[0] * 60)));
        var HORA_HFJ = (parseInt(HFJ[1]) + parseInt((HFJ[0] * 60)));

        if (HI != '' && HF != '') {
            if (HORA_HI >= HORA_HIJ && HORA_HI <= HORA_HFJ) {  // VALIDACION DE LA HORA INICIAL
                if (HORA_HF >= HORA_HIJ && HORA_HF <= HORA_HFJ) { // VALIDACION DE LA HORA FINAL
                    if (HORA_HF > HORA_HI) {  // VALIDACION ENTRE HORAS
                        bandera = 1;
                    }
                    else { bandera = 0; $('#txtHoraF').focus(); Alerta2("Error: La hora final debe ser mayor que la inicial. Ajuste por favor.", "danger"); }
                }
                else { bandera = 0; $('#txtHoraF').focus(); Alerta2("Error: La hora final que esta ingresando debe estar en el rango de las horas de la jornada. Ajuste por favor.", "danger"); }
            }
            else { bandera = 0; $('#txtHoraI').focus(); Alerta2("Error: La hora inicial que esta ingresando debe estar en el rango de las horas de la jornada. Ajuste por favor.", "danger"); }
        }
        else { bandera = 0; $('#txtHoraI').focus(); Alerta2("Error: las horas que esta ingresando no son correctas.", "danger"); }
    }


    $(document).on('click', '.clsModificar', function () {
        var fila = $(this).attr("tag");
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
           $("#f-horas").show();
           Ref = array[fila - 1].referencia;
           Dia = array[fila - 1].dia;
           HoraI = array[fila - 1].horaI;
           HoraF = array[fila - 1].horaF; // aca ocultamos la fila
        Modificar();
        btn.button('reset')
        });
    });

    $(document).on('click', '.clsR', function () {
        var btn = $(this)
        btn.button('loading')
     
        $.ajax("...").always(function () {
            ValidarHoras();
            if (bandera == 1) {
                jsonData = "{'dto':" + JSON.stringify(getDatos()) + ",'dtob':" + JSON.stringify(getBitacora("HORARIOS", "REGISTRAR", "NINGUNA")) + "}"; //Registro de bitacora";
                $.ajax({
                    type: "POST",
                    url: "/WS/horarios.asmx/r_horario",
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    success: function (result) {
                        if (result.d == null) {
                            Modal("Error al ingresar un horario.", "Registro de horarios");
                        } else {
                            Modal(JSON.stringify(result.d), "Registro de horarios");
                            Alerta("Registro de horario realizado de forma exitosa", "success");
                            nuevosHorario();
                            $("#f2").hide();
                        }

                    },
                    error: function (result) {
                        Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                    }
                });
            }
           btn.button('reset')
        });

    });
    $(document).on('click', '.clsM', function () {
        var btn = $(this)
        btn.button('loading')
        $.ajax("...").always(function () {
            ValidarHoras();
            if (bandera == 1) {
                jsonData = "{'dto':" + JSON.stringify(getDatos()) + ",'dtob':" + JSON.stringify(getBitacora("HORARIOS", "MODIFICAR", "NINGUNA")) + "}"; //Registro de bitacora";
                $.ajax({
                type: "POST",
                url: "/WS/horarios.asmx/m_horario",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    Modal(JSON.stringify(result.d), "Modificación de horarios");
                    Update();
                },
                error: function (result) {
                    Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
                }
            });
        }
        btn.button('reset')
        });

    });

    function Modificar() {
        $('#txtHoraI').val(HoraI);
        $('#txtHoraF').val(HoraF);
        $('#comboDia').val(Dia);
        $('#f-horas').show();
        $("#btnR").hide();
        $("#btnM").show();
        $("#botones").show();
        $('#comboDia').focus();
    }
   ///=====================================================================================================
    function Gestionar() {
        $('#f2').show();
        Alerta2("Gestión realizada de forma exitosa.", "success")
        $("#botones").hide();
        if (pos == 1) { // Gestionamos el registro
            $("#f-grilla").hide();
            $("#f-horas").show();
            $("#comboDia").val('LUNES');
            $("#txtHoraI").show();
            $("#txtHoraF").show();
            $("#botones").show();
            $("#btnM").hide();
            $("#btnR").show();
            $("#comboDia").focus();

            $("#comboIdgrupo").attr('disabled', 'disabled');
            $("#comboIdAsig").attr('disabled', 'disabled');
            $("#comboJornada").attr('disabled', 'disabled');
        }
        else if (pos == 2) { // Gestionamos las modificaciones y eliminaciones
            Update();
        }
    }
    function Update() {
        $("#f-grilla").show();
        $("#f-horas").hide();
        jsonData = "{'dto':" + JSON.stringify(getDatos()) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/horarios.asmx/c_XGrupoXAsigXJornada",
            data: jsonData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Error de congruenciá: Este no existen horarios registrados. ", "No hay horarios");
                    $("#f2").hide();
                    $('#f-grilla').hide();
                    $("#comboIdgrupo").removeAttr('disabled');
                    $("#comboIdAsig").removeAttr('disabled');
                    $("#comboJornada").removeAttr('disabled');
                    $('#btnGR').focus();
                }
                else {
                    $("#f2").show();
                    $("#comboIdgrupo").attr('disabled', 'disabled');
                    $("#comboIdAsig").attr('disabled', 'disabled');
                    $("#comboJornada").attr('disabled', 'disabled');
                    $('#f-grilla').show();
                    $('#grilla').show();
                    $("#grilla").html("");
                    titleGrilla();
                    h = result.d;
                    conta = 0;
                    $.each(h, function (i, item) {
                        AddItemGrilla(item);
                    })
                }
            },
            error: function (result) {
                Modal("Servidor no disponible. ", "Servidor no disponible");
                $('#f-grilla').hide();
            }
        });
    }
    ////--------------------------------------------------------------------------------------------------
    function titleGrilla() { // TITULO DE LA GRILLA
        $("#grilla").val("");
        var newtitle = "<tr class='text-center'>";
        //newtitle += '<th class="col-sm-1">Ref</th>';
        newtitle += '<th class="col-sm-1 text-danger">IdGrupo</th>';
        newtitle += '<th class="col-sm-1 text-danger">IdAsig</th>';
        newtitle += '<th class="col-sm-1 text-danger">Jornada</th>';
        newtitle += '<th class="col-sm-1">Dia</th>';
        newtitle += '<th class="col-sm-1">Hora inicial</th>';
        newtitle += '<th class="col-sm-1">Hora final</th>';
        newtitle += '<th class="col-sm-1">Acción</th>';
        newtitle += "</tr>";
        $("#grilla").append(newtitle);
    };
    var AddItemGrilla = function (item) { // CONTENIDO DE LA GRILLA
        conta++;
        array.push(item);
        var nuevaCol = "<tr>";
        //nuevaCol += "<td>" + item.referencia + "</td>";
        nuevaCol += "<td>" + item.id_grupo + "</td>";
        nuevaCol += "<td>" + item.id_asignatura + "</td>";
        nuevaCol += "<td>" + item.jornada + "</td>";
        nuevaCol += "<td>" + item.dia + "</td>";
        nuevaCol += "<td>" + item.horaI + "</td>";
        nuevaCol += "<td>" + item.horaF + "</td>";
        nuevaCol += '<td><input id="btnMGrilla" value="Modificar" tag=' + array.length + ' class="clsModificar btn btn-warning" data-loading-text="Cargando..." type="button" />';
        nuevaCol += '<input id="btnEGrilla" value=".:Eliminar:." tag=' + array.length + ' class="clsEliminar btn btn-danger" data-loading-text="Cargando..." type="button" /></td>';
        nuevaCol += "</tr>";
        $("#grilla").append(nuevaCol);
    };
    //--------------------------------------------------------------------------------------------------
//});
