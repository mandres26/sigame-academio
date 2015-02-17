

        //$(document).ready(function () {
            WinMove();
            var conta;
            var P = {};
            var jsonData;
            validar_pagina();
            CargarDatos();

            $('#txtOld').focus();
            $('#txtOld').show();
            $('#txtNew').hide();
            $('#txtVer').hide();
            $('#btnM').hide();
            $('#btnV').show();

            $('#txtOld').keyup(function (e) {
                if (e.keyCode == 13) {
                    var btn = $('#btnV')
                    btn.button('loading')
                    $.ajax(".....").always(function () {
                        Gestionar();
                        btn.button('reset')
                    });

                }
            });
            $('#btnV').click(function () { // Botón gestionar
                var btn = $(this)
                btn.button('loading')
                $.ajax(".....").always(function () {
                    Gestionar();
                    btn.button('reset')
                });
            });
            function Gestionar() {
                if ($('#txtOld').val() == '') {
                    Alerta("Digite su contraseña actual", "danger");
                    $('#txtOld').focus();
                } else {
                  
                    var dto = {};
                    dto.id = localStorage.getItem('SeccionId');
                    dto.pass = $("#txtOld").val();

                    jsonData = "{'dto':" + JSON.stringify(dto) +",'dtob':" + JSON.stringify(getBitacora("USUARIOS", "VERIFICAR", "VERIFICAR CONTRASEÑA")) + "}"; //Registro de bitacora
                    $.ajax({
                        type: "POST",
                        url: "/WS/users.asmx/c_verificar",
                        data: jsonData,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        async: true,
                        success: function (result) {

                            if (result.d == null) {
                                Alerta("¡La contraseña ingresada <strong>no es la correcta </strong>. Intente otra vez !", "danger");
                                $('#txtOld').focus();
                                $('#txtOld').show();
                                $('#txtNew').hide();
                                $('#txtVer').hide();
                                $('#btnM').hide();
                                $('#btnV').show();
                                $("#txtOld").removeAttr('disabled');
                            }
                            else {
                                
                               Alerta("¡Contraseña verificada de <strong> forma exitosa</strong>!", "success");

                               $('#txtNew').focus();
                               $("#txtOld").attr('disabled', 'disabled');
                               $('#txtNew').show();
                               $('#txtVer').show();
                               $('#btnM').show();
                               $('#btnV').hide();

                                P = result.d; //OCULTAMOS LOS BOTONES RESPECTIVOS
                                $('#btnR').hide();
                                $('#btnE').show();
                                $("#txtId").attr('disabled', 'disabled');
                            }
                        },
                        error: function (result) {
                        }
                    });
                }
            }



            $('#btnM').click(function () { // Botón Modificar
                var btn = $(this)
                btn.button('loading')
                $.ajax(".....").always(function () {
                    var con = $('#txtNew').val();
                    var ver = $('#txtVer').val();
                    if (con.length < 4) {
                        Alerta("La nueva contraseña debe tener 4 caracteres como minimo.", "danger");
                        $('#txtNew').focus();
                    }
                    else if ($('#txtNew').val() == "") {
                        Alerta("Ingrese la nueva contraseña", "danger");
                        $('#txtNew').focus();
                    }
                    else if ($('#txtVer').val() == "") {
                        Alerta("Ingrese la verificación de la nueva contraseña", "danger");
                        $('#txtVer').focus();
                    }

                    else if (con != ver) {
                        Alerta("Las contraseñas no coinciden.", "danger");
                        $('#txtVer').focus();
                    }
                    else {

                        var dto = {};
                        dto.id = localStorage.getItem('SeccionId');
                        dto.pass = $("#txtNew").val();

                        jsonData = "{'dto':" + JSON.stringify(dto) + ",'dtob':" + JSON.stringify(getBitacora("USUARIOS", "MODIFICAR-C", "CAMBIO DE CONTRASEÑA EN LA SECCION")) + "}"; //Registro de bitacora
                        $.ajax({
                            type: "POST",
                            url: "/WS/users.asmx/c_cambiar",
                            data: jsonData,
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            async: true,
                            success: function (result) {
                                $("#botones").show();
                                if (result.d != null) {
                                    Modal("Contraseña de sección cambiada de forma exitosa.", "Contraseña cambiada");
                                    redireccionar();
                                } else {
                                    Modal("Servidor no disponible. Intente más tarde.","Servidor no disponible")
                                }
                            },
                            error: function (result) {
                            }
                        });
                    }
                    btn.button('reset')
                });

            });
            var getDatos = function () {
                var dto = {};
                dto.id = localStorage.getItem('SeccionId');
                dto.id_tipo = "";
                dto.nombres = "";
                dto.apellidos = "";
                dto.telefono = "";
                dto.telefono2 = $("#txtFijo2").val();
                dto.cel = "";
                dto.email = "";
                dto.direccion = "";
                dto.direccion2 = $("#txtDir2").val();
                dto.sexo = "";
                dto.rol = "";
                dto.rol_secundario = "";
                dto.rol_terciario = "";
                dto.edad = "";
                dto.jornada = "";
                dto.f_naci ="";
                dto.estado = "";
                dto.observacion = "";
                return dto;
            };

            $('#btnMP').click(function () { // Botón Modificar
                var btn = $(this)
                btn.button('loading')
                $.ajax(".....").always(function () {
                    if ($('#txtDir2').val() == "") {
                        Alerta("Ingrese una dirección auxiliar", "danger");
                        $('#txtDir2').focus();
                    }
                    else if ($('#txtTel2').val() == "") {
                        Alerta("Ingrese un telefono de contacto auxiliar", "danger");
                        $('#txtTel2').focus();
                    }
                    else {
                        var dto = {};
                        jsonData = "{'dto':" + JSON.stringify(getDatos()) + ",'dtob':" + JSON.stringify(getBitacora("USUARIOS", "MODIFICAR-C", "CAMBIO DE CONTRASEÑA EN LA SECCION")) + "}"; //Registro de bitacora
                        $.ajax({
                            type: "POST",
                            url: "/WS/users.asmx/c_dirTel",
                            data: jsonData,
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            async: true,
                            success: function (result) {
                                $("#botones").show();
                                if (result.d != null) {
                                    Modal("Datos personales cambiados de forma exitosa.", "Datos cambiados");
                                    redireccionar();
                                } else {
                                    Modal("Servidor no disponible. Intente más tarde.", "Servidor no disponible")
                                }
                            },
                            error: function (result) {
                            }
                        });
                    }
                    btn.button('reset')
                });

            });
            function CargarDatos() {
                var dto = {};
                dto.id = localStorage.getItem('SeccionId');
                jsonData = "{'dto':" + JSON.stringify(dto) + "}";
                $.ajax({
                    type: "POST",
                    url: "/WS/personas.asmx/c_persona",
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    success: function (result) {
                        P= result.d;
                        $("#txtId").val(P.id);
                        $("#txtTipo").val(P.id_tipo)
                        $("#txtNombres").val(P.nombres);
                        $("#txtApellidos").val(P.apellidos);
                        $("#txtFijo").val(P.telefono);
                        $("#txtFijo2").val(P.telefono2);
                        $("#txtTel").val(P.cel);
                        $("#txtDir").val(P.direccion);
                        $("#txtDir2").val(P.direccion2);
                    },
                    error: function (result) {
                    }
                });
            }
            //--------------------------------------------------------------------------------------------------


