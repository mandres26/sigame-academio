
//$(document).ready(function () {
    WinMove();
    var idOld;
    var conta;
    var P = {};
    var array = new Array(); // variable para las grillas en los formularios
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
            cargarDesempeños();
            $("#formPPAL").show();
            $("#imgload").hide();
        });
    }
    function cargarDesempeños() {
        var A;
        $("#combodesempeno").html("");
        A += '<option value="B">DESEMPEÑO BAJO</option>';
        A += '<option value="DB">DESEMPEÑO BASICO</option>';
        A += '<option value="DA">DESEMPEÑO ALTO</option>';
        A += '<option value="DS">DESEMPEÑO SUPERIOR</option>';
        $("#combodesempeno").append(A);

        var J;
        $("#comboNo").html("");
        J += '<option value="01">01</option>';
        J += '<option value="02">02</option>';
        J += '<option value="03">03</option>';
        J += '<option value="04">04</option>';
        J += '<option value="05">05</option>';
        J += '<option value="06">06</option>';
        J += '<option value="07">07</option>';
        J += '<option value="08">08</option>';
        J += '<option value="09">09</option>';
        J += '<option value="10">10</option>';
        $("#comboNo").append(J);
    }
   
    function verificarSiEsProfesor() {
        if (localStorage.getItem('SeccionRol') == "PROFESOR") {
            CodProfe = localStorage.getItem('SeccionId');
            cargarGradosDelProfe();
            cargarAsigDelProfe();
        } else {
            cargarAsignaturas();
            cargarGrados();
        }
    }

    function cargarAsigDelProfe() {
        var dto = {};
        dto.id = CodProfe;
        //------------------- primero cargamos la grilla con los datos del estudiante------------------------------
        jsonData = "{'dto':" + JSON.stringify(dto) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/matriculas.asmx/c_asignaturasDelProfe",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Usted no contiene ninguna matricula academica. ", " No se encuentra matriculado a ningún grupo.");
                    redireccionar();
                }
                else {
                    P = result.d;
                    $("#comboIdAsig").html("");
                    $("#comboIdAsig").val("");
                    P = result.d;
                    conta = 0;
                    $.each(P, function (i, item) {
                        $("#comboIdAsig").append("<option value=" + item.id + ">" + item.id + "</option>");
                                            })
                }
            },
            error: function (result) {
                Modal("Server: Error de servidor.", "Error de servidor");
            }
        });
    }
    function cargarGradosDelProfe() {
        var dto = {};
        dto.id = CodProfe;
        //------------------- primero cargamos la grilla con los datos del estudiante------------------------------
        jsonData = "{'dto':" + JSON.stringify(dto) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/matriculas.asmx/c_gradosDelProfe",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Usted no contiene ninguna matricula academica. ", " No se encuentra matriculado a ningún grupo.");
                    redireccionar();
                }
                else {
                  
                    $("#comboIdgrado").html("");
                    $("#comboIdgrado").val("");
                    P = result.d;
                    conta = 0;
                    $.each(P, function (i, item) {
                        $("#comboIdgrado").append("<option value=" + item.id + ">" + item.id + "</option>");
                       
                    })
                }
            },
            error: function (result) {
                Modal("Server: Error de servidor.", "Error de servidor");
            }
        });
    }

    function cargarGrados() {
        $.ajax({ // Carga de grados
            type: "POST",
            url: "/WS/grados.asmx/c_grados",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    P = result.d;
                    Modal("Error de congruenciá: No existen grados asignados. ");
                    redireccionar();
                }
                else {
                    $("#comboIdgrado").html("");
                    $("#comboIdgrado").val("");
                    P = result.d;
                    conta = 0;
                    $.each(P, function (i, item) {
                        $("#comboIdgrado").append("<option value=" + item.id_grado + ">" + item.id_grado + "</option>");
                        if (conta == 0) {
                            $("#txtIdNom").val(item.nom_grado);
                        }
                        conta++;
                    })
                }
            },
            error: function (result) {
                Modal("Server.", "Error de disponible");
                redireccionar();
            }
        });
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
;                }
                else {
                    P = result.d;
                    conta = 0;
                    $("#comboIdAsig").html("");
                    $("#comboIdAsig").val("");
                    $.each(P, function (i, item) {
                        $("#comboIdAsig").append("<option value=" + item.id + ">" + item.id + "</option>");
                        if (conta == 0) {
                            $("#txtIdNomAsi").val(item.nombre);
                            $("#txtIdHoras").val(item.horas);
                        }
                        conta++;
                    })
                }
            },
            error: function (result) {
                Modal("Server: Error al cargar las asignaturas.", "Servidor no disponible");
                redireccionar();
            }
        });
    }

    var getDatos = function () {
        var dto = {};
        dto.id_logro = $("#txtId").val();
        dto.descripcion = $("#txtDes").val();
        dto.id_grado = $("#comboIdgrado").val();
        dto.id_asignatura = $("#comboIdAsig").val();

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

    var getDatosAsig = function () {
        var dto = {};
        dto.id = $("#comboIdAsig").val();
        return dto;
    };


    $("#comboIdgrado").change(function () {
        jsonData = "{'dto':" + JSON.stringify(getDatosGrado()) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/grados.asmx/c_grado",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                P = result.d;
                $("#txtIdNom").val(P.nom_grado);
            },
            error: function (result) {
            }
        });
    });

    var getDatosGrado = function () {
        var dto = {};
        dto.id = $("#comboIdgrado").val();
        return dto;
    };

    $('#txtId').keyup(function (e) {
        if (e.keyCode == 13) {
            $(document.body).animate({ scrollTop: 350 }, 300);
            var btn = $('#btnG')
            btn.button('loading')
           
            Gestionar();
            $.ajax(".....").always(function () {
                btn.button('reset')
            });

        }
    });

    $('#btnG').click(function () { // Botón gestionar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            Gestionar();
            btn.button('reset')
        });

    });

    function Gestionar() {
        
        $("#txtId").val($("#combodesempeno").val() + "-" + $("#comboIdAsig").val() + $("#comboIdgrado").val() +"-" + $("#comboNo").val()  );

        if ($('#comboIdgrado').val() == '') {
            Alerta("Error: Escoja un grado.", "danger");
            $('#comboIdgrado').focus();
            $('#f-logros').hide();
        } else if ($('#comboIdAsig').val() == '') {
            Alerta("Error: Escoja una asignatura.", "danger");
            $('#comboIdAsig').focus();
            $('#f-logros').hide();
        }
        else {
            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
            $('#f-logros').show();
            $('#txtDes').focus();
            jsonData = "{'dto':" + JSON.stringify(getDatosG()) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/logros.asmx/c_logro",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    $("#botones").show();
                    if (result.d == null) {
                        $('#btnR').show();
                        $('#btnM').hide();
                        $('#btnE').hide();
                        $("#txtId").attr('disabled', 'disabled');
                    }
                    else {
                        P = result.d; 
                        $('#btnR').hide();
                        $('#btnM').show();
                        $('#btnE').show();
                        $('#txtDes').focus();
                        // Cargo los datos
                        $("#comboIdgrado").val(P.id_grado);
                        $("#comboIdAsig").val(P.id_asignatura);
                        $("#txtDes").val(P.descripcion);
                        $("#txtId").attr('disabled', 'disabled');

                        $("#comboIdgrado").attr('disabled', 'disabled');
                        $("#comboIdAsig").attr('disabled', 'disabled');
                        $("#combodesempeno").attr('disabled', 'disabled');
                        $("#comboNo").attr('disabled', 'disabled');

                    }
                },
                error: function (result) {

                }
            });
        }
    }
    $('#btnI').click(function () { // Botón Nuevo
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            Modal("La seccion que redirecciona este botón aun no esta en total funcionamiento. Estamos trabajando en ella.", "Sección en construción.");
            btn.button('reset')
        });
    });
    //---------------------------------- BOTONES DE ACCIONES ----------------------------
    $('#btnN').click(function () { // Botón Nuevo
        nuevo();
    });
    function nuevo() {
        $("#txtId").val("");
        $("#txtDes").val("");
        $('#btnR').show();
        $('#btnM').show();
        $('#f-grilla').hide();
        $('#btnE').show();
        $('#btnL').show();
        $('#f-logros').hide();
        $('#grilla').hide();
        $("#botones").hide();


        $("#comboIdgrado").removeAttr('disabled');
        $("#comboIdAsig").removeAttr('disabled');
        $("#combodesempeno").removeAttr('disabled');
        $("#comboNo").removeAttr('disabled');

        $('#txtId').focus();
        Alerta("Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "info");
    }

    $('#btnR').click(function () { // Botón Registrar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
       
        if ($('#txtDes').val() == '') {
            Alerta("Error: Escriba la <strong> descripción</strong> del logro académico para continuar.", "danger");
            $('#txtDes').focus();
        } else {
            jsonData = "{'dto':" + JSON.stringify(getDatos()) + ",'dtob':" + JSON.stringify(getBitacora("LOGROS", "REGISTRAR", "NINGUNA")) + "}"; //Registro de bitacora
            $.ajax({
                type: "POST",
                url: "/WS/logros.asmx/r_logro",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        Modal("Error al intentar realizar esta acción.", "  Existe un problema de consistencia con la base de datos del sistema. Contactese con el administrador.");
                    }
                    else {
                        Modal(JSON.stringify(result.d), "Registro de logros académicos.");
                        nuevo();
                    }
                },
                error: function (result) {
                    Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error con el servidor");
                }
            });
        }
        btn.button('reset')
        });

        });

    $('#btnM').click(function () { // Botón Modificar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
         
        if ($('#txtDes').val() == '') {
            Alerta("Error: Escriba la <strong> descripción</strong> del logro académico para continuar.", "danger");
            $('#txtDes').focus();
        } else {

            jsonData = "{'dtonew':" + JSON.stringify(getDatos()) + ",'dto':" + JSON.stringify(getDatosG()) + ",'dtob':" + JSON.stringify(getBitacora("LOGROS", "MODIFICAR", "NINGUNA")) + "}"; //Registro de bitacora
            $.ajax({
                type: "POST",
                url: "/WS/logros.asmx/m_logro",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        Modal("Error al intentar realizar esta acción.", "Verifique que la información que esta enviando sea la correcta o puede ser que el logro no se encuentre registrado en el sistema. ");
                    }
                    else {
                        Modal(JSON.stringify(result.d), "Modificación del logros académicos.");
                        nuevo();
                    }
                },
                error: function (result) {
                    Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error de servidor");
                }
            });
        }
        btn.button('reset')
        });

    });

    $('#btnE').click(function () { // Botón Eliminar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            
        jsonData = "{'dto':" + JSON.stringify(getDatosG()) + ",'dtob':" + JSON.stringify(getBitacora("LOGROS", "ELIMINAR", "NINGUNA")) + "}"; //Registro de bitacora
        $.ajax({
            type: "POST",
            url: "/WS/logros.asmx/e_logro",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Error al intentar realizar esta acción.", "Verifique que la información que esta enviando sea la correcto o puede ser que el logro no se encuentre registrado en el sistema. ");
                }
                else {
                    Modal(JSON.stringify(result.d), "Eliminación de logros académicos.");
                    nuevo();
                }
            },
            error: function (result) {
                Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error de servidor");
            }
        });
        btn.button('reset')
        });
    });

    $('#btnL').click(function () { // Botón Listar todos
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
          jsonData = "{'dtob':" + JSON.stringify(getBitacora("LOGROS", "LISTAR TODOS", "NINGUNA")) + "}"; //Registro de bitacora
        $.ajax({
            type: "POST",
            url: "/WS/logros.asmx/c_logross",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                $('#grilla').html("");
                if (result.d == null) {
                    $('#f-grilla').hide();
                    Modal("Error al intentar realizar esta acción.", "  No hay logros registrados en el sistema");
                }
                else {
                    P = result.d;
                    conta = 0;
                    titleGrilla();
                    $('#f-grilla').show();
                    $.each(P, function (i, item) {
                        AddItemGrilla(item);
                    })
                }
            },
            error: function (result) {
                Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error de servidor");
            }
        });
        btn.button('reset')
        });

    });
    //--------------------------------------------------------------------------------------------------
    function titleGrilla() { // TITULO DE LA GRILLA
        $("#grilla").val("");
        var newtitle = "<tr>";
        newtitle += '<th class="col-sm-1">Logros</th>';
        newtitle += '<th class="col-sm-1">IdGrado</th>';
        newtitle += '<th class="col-sm-1">IdAsignatura</th>';
        newtitle += '<th class="col-sm-9">Descripción</th>';
        newtitle += "</tr>";
        $("#grilla").append(newtitle);
    };
    var AddItemGrilla = function (item) { // CONTENIDO DE LA GRILLA
        conta++;
        array.push(item);
        var nuevaCol = "<tr>";
        nuevaCol += "<td>" + item.id_logro + "</td>";
        nuevaCol += "<td>" + item.id_grado + "</td>";
        nuevaCol += "<td>" + item.id_asignatura + "</td>";
        nuevaCol += "<td>" + item.descripcion + "</td>";
        nuevaCol += "</tr>";
        $("#Ltotal").text("Total:" + conta);
        $("#grilla").append(nuevaCol);
    };

    //--------------------------------------------------------------------------------------------------
//});
