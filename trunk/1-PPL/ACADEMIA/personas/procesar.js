//$(document).ready(function () {
    WinMove();
    var jsonData;
    var conta;
    var bandera = 0;
    var P = {};
    $('#txtId').focus();
    
    //---------------------------------- validamos que este logueado el usuario ----------------------------------------------
    validar_pagina();
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
        $('#txtId').focus();
        $("#imgload").show();
        $.ajax("...").always(function () {
            cargarRoles();
            cargarfecha();
            cargarCombos();
            nuevo();
            $('#txtId').focus();

            $("#formPPAL").show();
            $("#imgload").hide();
        });
    }
    $('#txtId').focus();
    var array = new Array(); // variable para las grillas en los formularios
  
    function cargarfecha() {
        var A;
        $("#comboFdia").html("");
        A += '<option value="1">1</option>';
        A += '<option value="2">2</option>';
        A += '<option value="3">3</option>';
        A += '<option value="4">4</option>';
        A += '<option value="5">5</option>';
        A += '<option value="6">6</option>';
        A += '<option value="7">7</option>';
        A += '<option value="8">8</option>';
        A += '<option value="9">9</option>';
        A += '<option value="10">10</option>';
        A += '<option value="11">11</option>';
        A += '<option value="12">12</option>';
        A += '<option value="13">13</option>';
        A += '<option value="14">14</option>';
        A += '<option value="15">15</option>';
        A += '<option value="16">16</option>';
        A += '<option value="17">17</option>';
        A += '<option value="18">18</option>';
        A += '<option value="19">19</option>';
        A += '<option value="20">20</option>';
        A += '<option value="21">21</option>';
        A += '<option value="22">22</option>';
        A += '<option value="23">23</option>';
        A += '<option value="24">24</option>';
        A += '<option value="25">25</option>';
        A += '<option value="26">26</option>';
        A += '<option value="27">27</option>';
        A += '<option value="28">28</option>';
        A += '<option value="29">29</option>';
        A += '<option value="30">30</option>';
        A += '<option value="31">31</option>';
        $("#comboFdia").append(A);
        var B;
        $("#comboFmes").html("");
        B += '<option value="1">ENERO</option>';
        B += '<option value="2">FEBRERO</option>';
        B += '<option value="3">MARZO</option>';
        B += '<option value="4">ABRIL</option>';
        B += '<option value="5">MAYO</option>';
        B += '<option value="6">JUNIO</option>';
        B += '<option value="7">JULIO</option>';
        B += '<option value="8">AGOSTO</option>';
        B += '<option value="9">SEPTIEMBRE</option>';
        B += '<option value="10">OCTUBRE</option>';
        B += '<option value="11">NOVIEMBRE</option>';
        B += '<option value="12">DICIEMBRE</option>';
        $("#comboFmes").append(B);
        var C;
        $("#comboFano").html("");
        for (var i = 2013; i >= 1950; i--) {
            C += '<option value=' + i + '>' + i + ' </option>';
        }
        $("#comboFano").append(C);
    }

    $('#txtId').keypress(function () {
        if ($('#txtId').lenght < 6) {
            return false;
        }
    });

    function cargarRoles() {
        $.ajax({ // Carga de roles
            type: "POST",
            url: "/WS/roles.asmx/c_rols",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Error de congruencia: No existen roles asignados  para gestionar las personas en el sistema. ");
                    redireccionar();
                }
                else {
                    P = result.d;
                    $("#comboRol1").val();
                    $.each(P, function (i, item) {
                        if (localStorage.getItem('SeccionRol') == "ADMINISTRATIVO") {
                            if (item.id == "SUPER" || item.id == "ADMINISTRATIVO") {
                                conta = 0;
                            }
                            else {
                                $("#comboRol1").append("<option value=" + item.id + ">" + item.id + "</option>");
                            }
                        }
                        else {
                            $("#comboRol1").append("<option value=" + item.id + ">" + item.id + "</option>");
                        }
                    })
                }
            },
            error: function (result) {
                Modal("Server: Error al cargar los roles.", "Error de servidor");
                redireccionar();
            }
        });
    }
    function cargarCombos() {
        $.ajax({ // Carga de jornadas
            type: "POST",
            url: "/WS/jornadas.asmx/c_jornadas",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Error de congruencia: No existen jornadas asignadas en el sistema. ");
                    redireccionar();
                }
                else {
                    P = result.d;
                    $("#comboJornada").html("");
                    $.each(P, function (i, item) {
                        $("#comboJornada").append("<option value=" + item.id + ">" + item.id + "</option>");
                    })
                }
            },
            error: function (result) {
                Modal("Server: Error al cargar las jornadas.", "Error de servidor")
                redireccionar();
            }
        });
        // Carga del sexo
        var A;
        $("#comboSexo").html("");
        A += '<option value="MASCULINO">MASCULINO</option>';
        A += '<option value="FEMENINO">FEMENINO</option>';
        $("#comboSexo").append(A);
        // Carga del tipo de identificación
        var B;
        $("#comboTipo").html("");
        B += '<option vale="TI">TI</option>';
        B += '<option value="CC">CC</option>';
        B += '<option value="NIU">NIU</option>';
        B += '<option value="RC">NIU</option>';
        B += '<option value="OTRO">OTRO</option>';
        $("#comboTipo").append(B);
        // Carga del rol secundario como acudiente
        var C;
        $("#comboRol2").html("");
        C += '<option value="NINGUNO">NINGUNO</option>';
        C += '<option value="ACUDIENTE">ACUDIENTE</option>';
        $("#comboRol2").append(C);
        var F;
        $("#comboRol3").html("");
        F += '<option value="NINGUNO">NINGUNO</option>';
        F += '<option value="DIRECTOR_GRUPO">DIRECTOR_GRUPO</option>';
        $("#comboRol3").append(F);
        var K;
        $("#comboEstado").html("");
        K += '<option value="ACTIVO">ACTIVO</option>';
        K += '<option value="RETIRADO">RETIRADO</option>';
        $("#comboEstado").append(K);
    }
   
    var getDatos = function () {
        var dto = {};
        dto.id = $("#txtId").val();
        dto.id_tipo = $("#comboTipo").val();
        dto.nombres = $("#txtNombres").val();
        dto.apellidos= $("#txtApellidos").val();
        dto.telefono = $("#txtFijo").val();
        dto.telefono2 = $("#txtFijo2").val();
        dto.cel = $("#txtTel").val();
        dto.email = $("#txtEmail").val();
        dto.direccion = $("#txtDir").val();
        dto.direccion2 = $("#txtDir2").val();
        dto.sexo = $("#comboSexo").val();
        dto.rol = $("#comboRol1").val();
        dto.rol_secundario = $("#comboRol2").val();
        dto.rol_terciario = $("#comboRol3").val();
        dto.edad = "";
        dto.jornada = $("#comboJornada").val();
        //version en godaddy
        dto.f_naci = $("#comboFmes").val() + "/" + $("#comboFdia").val() + "/" + $("#comboFano").val();
        //version en localhost
        //dto.f_naci = $("#comboFdia").val() + "/" + $("#comboFmes").val() + "/" + $("#comboFano").val();

        dto.estado = $("#comboEstado").val();
        dto.observacion = $("#txtDes").val();
        return dto;
    };
  
    $('#txtId').keyup(function (e) {
        if (e.keyCode == 13) {
            var btn = $('#btnG')
            btn.button('loading')
            $.ajax(".....").always(function () {
                Gestionar();
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
    $("#comboRol1").click(function () {
        $("#botones").hide();
        $("#formulario2").hide();
    });

    $('#btnP').click(function () { // Botón procesar
        var btn = $(this)
        btn.button('loading')
      
        $.ajax(".....").always(function () {
            $(document.body).animate({ scrollTop: 330 }, 300);
            var rol = $("#comboRol1").val();
            if (bandera == 0) {
                $('#btnR').show();
                $('#btnM').hide();
                $('#btnE').hide();
            }
            else if (bandera == 1) {
                $('#btnR').hide();
                $('#btnM').show();
                $('#btnE').show();
            }
            if (rol == 'ADMINISTRATIVO' || rol == 'SUPER') {
                $("#comboRol2").show();
                $("#comboRol3").hide();
                $("#txtTel").show();
                $("#txtTel2").show();
                $("#txtFijo").show();
                $("#txtEmail").show();
                $("#comboJornada").show();

                $("#lRol2").show();
                $("#lRol3").hide();
                $("#comboRol3").hide();
                $("#ltel").show();
                $("#lfijo").show();
                $("#lemail").show();
                $("#ljornada").show();
                $('#formulario2').show();
                $('#formRoles').show();
            }
            else if (rol == 'PROFESOR') {
                $("#comboRol2").show();
                $("#comboRol3").show();
                $("#txtTel").show();
                $("#txtFijo").show();
                $("#txtEmail").show();
                $("#comboJornada").show();

                $("#lRol2").show();
                $("#lRol3").show();
                $("#ltel").show();
                $("#lfijo").show();
                $("#lemail").show();
                $("#ljornada").show();
                $('#formulario2').show();
                $('#formRoles').show();
            }
            else if (rol == 'ACUDIENTE' ) {
                $("#comboRol2").hide();
                $("#txtTel").show();
                $("#txtFijo").show();
                $("#txtEmail").show();
                $("#comboJornada").hide();
                $("#lRol3").hide();
                $("#comboRol3").hide();
                $("#lRol2").hide();
                $("#ltel").show();
                $("#lfijo").show();
                $("#lemail").show();
                $("#ljornada").hide();
                $('#formulario2').show();
                $('#formRoles').show();
            }
            else if (rol == 'ESTUDIANTE') {
                $("#formulario2").show();
                $('#formRoles').hide();
            }
            $("#botones").show();
            $("#txtApellidos").focus();
            btn.button('reset')
        });
    });
    function validar() {
        var rol = $("#comboRol1").val();
        if ($("#txtApellidos").val() == "") {
            $(document.body).animate({ scrollTop: 350 }, 300);
            Alerta2("Ingrese los apellidos", "danger");
            $("#txtApellidos").focus();
            return false;
        } else if ($("#txtNombres").val() == "") {
            $(document.body).animate({ scrollTop: 350 }, 300);
                Alerta2("Ingrese los nombres", "danger");
                $("#txtNombres").focus();
                return false;
        }
        else if ($("#txtDir").val() == "") {
            $(document.body).animate({ scrollTop: 350 }, 300);
            Alerta2("Ingrese una dirección de residencia", "danger");
            $("#txtDir").focus();
            return false;
        }
        else if (rol == 'ADMINISTRATIVO' || rol == 'SUPER' || rol == 'PROFESOR' || rol == 'ACUDIENTE') {
            if ($("#txtTel").val() == "" || ($('#txtTel').val()).length < 10) {
                Alerta2("Ingrese un telefono celular de contacto bien. Minimo 10 caracteres", "danger");
                $(document.body).animate({ scrollTop: 350 }, 300);
                $("#txtTel").focus();
                return false;
            } else if ($("#txtFijo").val() == "") {
                $(document.body).animate({ scrollTop: 350 }, 300);
                Alerta2("Ingrese un telefono fijo de contacto", "danger");
                $("#txtFijo").focus();  
                return false;
            }
        }
    }
   

    function Gestionar() {
        $('#btnR').hide();
        $('#btnM').hide();
        $('#btnE').hide();
        if ($('#txtId').val() == '') {
            Alerta("Error: Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
            $('#txtId').focus();
            $('#formulario').hide();
        }
        //else if (($('#txtId').val()).length < 8) {
        //    Alerta("Error: La identificación debe tener <strong> 8 caracteres</strong>como minimo .", "danger");
        //    $('#txtId').focus();
        //    $('#formulario').hide();
        //}
        else {
            $('#comboTipo').focus();
            jsonData = "{'dto':" + JSON.stringify(getDatosG()) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/personas.asmx/c_persona",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    $("#botones").show();
                    if (result.d == null) {
                        $("#txtId").attr('disabled', 'disabled');
                        bandera = 0;
                        $('#formulario').show();
                    }
                    else {
                        P = result.d;
                        bandera = 1;
                        
                        if (localStorage.getItem('SeccionRol') == "ADMINISTRATIVO") {
                            if (P.rol == "SUPER" || P.rol == "ADMINISTRATIVO") {
                                Modal("Usted no puede gestionar esta identificación. Ya que le pertenece a un Administrativo o Súper usuario. Contactese con el súper usuario para gestionarla.","Acceso denegado")
                                $('#btnR').hide();
                                $('#btnM').show();
                                $('#btnE').show();

                                $('#txtId').focus();
                                $('#formulario').hide();
                            }
                            else {
                                Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
                                $(document.body).animate({ scrollTop: 350 }, 300);
                                $('#formulario').show();
                                $("#txtId").val(P.id);
                                $("#comboTipo").val(P.id_tipo)
                                $("#txtNombres").val(P.nombres);
                                $("#txtApellidos").val(P.apellidos);
                                $("#txtFijo").val(P.telefono);
                                $("#txtFijo2").val(P.telefono2);
                                $("#txtTel").val(P.cel);
                                $("#txtEmail").val(P.email);
                                $("#txtDir").val(P.direccion);
                                $("#txtDir2").val(P.direccion2);
                                $("#comboSexo").val(P.sexo);
                                $("#comboRol1").val(P.rol);
                                $("#comboRol2").val(P.rol_secundario);
                                $("#comboRol3").val(P.rol_terciario);
                                $("#comboJornada").val(P.jornada);
                                $("#txtDes").val(P.observacion);
                                var arr = P.f_naci.split('/');
                                var arr2 = arr[2].split(' ');

                                $("#comboFdia").val(arr[1]);
                                $("#comboFmes").val(arr[0]);
                                $("#comboFano").val(arr2[0]);

                                verificarRol(P.rol);
                                $('#btnR').hide();
                                $('#btnM').show();
                                $('#btnE').show();
                                $("#txtId").attr('disabled', 'disabled');
                            }
                        }
                        else {
                            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
                            $(document.body).animate({ scrollTop: 350 }, 300);
                            $('#formulario').show();
                            $('#formulario2').show();
                            $("#txtId").val(P.id);
                            $("#comboTipo").val(P.id_tipo)
                            $("#txtNombres").val(P.nombres);
                            $("#txtApellidos").val(P.apellidos);
                            $("#txtFijo").val(P.telefono);
                            $("#txtFijo2").val(P.telefono2);
                            $("#txtTel").val(P.cel);
                            $("#txtEmail").val(P.email);
                            $("#txtDir").val(P.direccion);
                            $("#txtDir2").val(P.direccion2);
                            $("#comboSexo").val(P.sexo);
                            $("#comboRol1").val(P.rol);
                            $("#comboRol2").val(P.rol_secundario);
                            $("#comboRol3").val(P.rol_terciario);
                            $("#comboJornada").val(P.jornada);
                            $("#txtDes").val(P.observacion);
                            var arr = P.f_naci.split('/');
                            var arr2 = arr[2].split(' ');

                            $("#comboFdia").val(arr[1]);
                            $("#comboFmes").val(arr[0]);
                            $("#comboFano").val(arr2[0]);

                            $('#btnR').hide();
                            $('#btnM').show();
                            $('#btnE').show();
                            verificarRol(P.rol);
                            $("#txtId").attr('disabled', 'disabled');
                        }
                    }
                },
                error: function (result) {
                }
            });
        }
    }
    function verificarRol(rol) {
        if (rol == 'ADMINISTRATIVO' || rol == 'SUPER') {
            $("#comboRol2").show();
            $("#comboRol3").hide();
            $("#txtTel").show();
            $("#txtFijo").show();
            $("#txtEmail").show();
            $("#comboJornada").show();

            $("#lRol2").show();
            $("#lRol3").hide();
            $("#comboRol3").hide();
            $("#ltel").show();
            $("#lfijo").show();
            $("#lemail").show();
            $("#ljornada").show();
            $('#formulario2').show();
            $('#formRoles').show();
        }
        else if (rol == 'PROFESOR') {
            $("#comboRol2").show();
            $("#comboRol3").show();
            $("#txtTel").show();
            $("#txtFijo").show();
            $("#txtEmail").show();
            $("#comboJornada").show();

            $("#lRol2").show();
            $("#lRol3").show();
            $("#ltel").show();
            $("#lfijo").show();
            $("#lemail").show();
            $("#ljornada").show();
            $('#formulario2').show();
            $('#formRoles').show();
        }
        else if (rol == 'ACUDIENTE') {
            $("#comboRol2").hide();
            $("#txtTel").show();
            $("#txtFijo").show();
            $("#txtEmail").show();
            $("#comboJornada").hide();
            $("#lRol3").hide();
            $("#comboRol3").hide();
            $("#lRol2").hide();
            $("#ltel").show();
            $("#lfijo").show();
            $("#lemail").show();
            $("#ljornada").hide();
            $('#formulario2').show();
            $('#formRoles').show();
        }
        else if (rol == 'ESTUDIANTE') {
            $("#formulario2").show();
            $('#formRoles').hide();
        }
    }
    //---------------------------------- BOTONES DE ACCIONES ----------------------------
    $('#btnN').click(function () { // Botón Nuevo
        nuevo();
    });
    function nuevo() {
        $("#txtId").val("");
        $("#botones").hide();
        $("#txtNombres").val("");
        $("#txtApellidos").val("");
        $("#txtFijo").val("");
        $("#txtTel").val("");
        $("#txtEmail").val("");
        $("#txtDir").val("");
       
        $("#fecha").val(""); //ojo con esta fecha
        $("#txtId").removeAttr('disabled');
        $('#formulario2').hide();
        $('#btnR').show();
        $('#btnM').show();
        $('#btnE').show();

        $("#comboFdia").val("1");
        $("#comboFmes").val("1");
        $("#comboFano").val("2000");

        $('#comboEstado').val("ACTIVO");
        $('#comboRol2').val("NINGUNO");
        $('#comboRol3').val("NINGUNO");
        $('#comboTipo').val("TI");
        $('#comboSexo').val("MASCULINO");

        $('#formulario').hide();
        $('#txtId').focus();

    }

    $('#btnR').click(function () { // Botón Registrar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            if (validar() != false) {

                jsonData = "{'dto':" + JSON.stringify(getDatos()) + ",'dtob':" + JSON.stringify(getBitacora("PERSONAS", "REGISTRAR", "NINGUNA")) + "}"; //Registro de bitacora
                $.ajax({
                    type: "POST",
                    url: "/WS/personas.asmx/r_persona",
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    success: function (result) {
                        if (result.d == null) {
                            Modal("Error al intentar realizar esta acción.", "  Existe un problema de consistencia con la base de datos del sistema. Contactese con el administrador.");
                        }
                        else {
                            Modal(JSON.stringify(result.d), "Registro de personal");
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

    $('#btnM').click(function () { // Botón Modificar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            if (validar() != false) {
                jsonData = "{'dtonew':" + JSON.stringify(getDatos()) + ",'dto':" + JSON.stringify(getDatosG()) + ",'dtob':" + JSON.stringify(getBitacora("PERSONAS", "MODIFICAR", "NINGUNA")) + "}"; //Registro de bitacora
                $.ajax({
                    type: "POST",
                    url: "/WS/personas.asmx/m_persona",
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    success: function (result) {
                        if (result.d == null) {
                            Modal("Error al intentar realizar la modificación esta acción.", "");
                        }
                        else {
                            Modal(JSON.stringify(result.d), "Modificación de personal");
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
            
                jsonData = "{'dto':" + JSON.stringify(getDatosG()) + ",'dtob':" + JSON.stringify(getBitacora("PERSONAS", "ELIMINAR", "NINGUNA")) + "}"; //Registro de bitacora
                $.ajax({
                    type: "POST",
                    url: "/WS/personas.asmx/e_persona",
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    success: function (result) {
                        if (result.d == null) {
                            Modal("Error al intentar realizar la eliminación.", "Error de sistema. ");
                        }
                        else {
                            Modal(JSON.stringify(result.d), "Eliminación de personal");
                            nuevo();
                        }
                    },
                    error: function (result) {
                        alert(JSON.stringify);
                        Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error de servidor");
                    }
                });
            
        btn.button('reset')
        });

    });


//});


