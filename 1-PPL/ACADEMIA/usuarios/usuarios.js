
 //$(document).ready(function () {
        WinMove();
        var conta;
        var P = {};
        var jsonData;
        cargarBoleano();
        nuevo();
        //---------------------------------- validamos que este logueado el usuario ----------------------------------------------
        validar_pagina();
        //---------------------------------- validamos que el rol del usuario pueda ingresar a esta pagina -----------------------
        DenegarAccesoToSuper();
        //---------------------------------- --------------------------------------------------------------------------------------

        var array = new Array(); // variable para las grillas en los formularios
        var getDatos = function () {
            var dto = {};
            dto.id = $("#txtId").val();
            dto.password = $("#txtPass").val();
            dto.acceso = $("#comboAcceso").val();
            dto.niu_mobil = null;
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
       
        function Gestionar() {
            if ($('#txtId').val() == '') {
                Alerta("Error: Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
                $('#txtId').focus();
                $('#formulario').hide();
            }
            else if (($('#txtId').val()).length < 8) {
                Alerta("Error: La identificación debe tener <strong> 8 caracteres</strong>como minimo .", "danger");
                $('#txtId').focus();
                $('#formulario').hide();
            } else {
                Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
                $('#formulario').show();
                $('#txtPass').focus();

                jsonData = "{'dto':" + JSON.stringify(getDatosG()) + "}";
                $.ajax({
                    type: "POST",
                    url: "/WS/users.asmx/c_usuario",
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    success: function (result) {
                        $("#botones").show();
                        if (result.d == null) {
                            Modal("Error al intentar realizar esta acción. Al parecer esta identificación <strong> no se encuentra registrada </strong> en la base de datos del sistema", "Error al intentar realizar esta acción");
                            $('#formulario').hide();
                            $('#formulario1').hide();
                            $("#btnM").hide();
                            $("#txtId").focus();
                        }
                        else {
                            P = result.d;
                            $("formulario").show();
                            $("#btnM").show();
                            $("#txtPass").val(P.password);
                            $("#comboAcceso").val(P.acceso);
                            $("#txtId").attr('disabled', 'disabled');
                        }
                    },
                    error: function (result) {
                        //Modal("UPSS ERROR DE SISTEMA: " + JSON.stringify(result), "Error de sistema");
                    }
                });
            }
        }
        //---------------------------------- BOTONES DE ACCIONES ----------------------------
        $('#btnN').click(function () { // Botón Nuevo
            nuevo();
        });
        function nuevo() {
            $("#txtId").val("");
            $("#txtPass").val("");
            $("#comboAcceso").val("TRUE");
            $('#btnM').show();
            $('#btnL').show();
            $('#formulario1').hide();
            $('#formulario').hide();
            $('#txtId').focus();
            $("#txtId").removeAttr('disabled');
            $("#botones").hide();
            Alerta("Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "info");
        }
        $('#btnM').click(function () { // Botón Modificar
            var btn = $(this)
            btn.button('loading')
            $.ajax(".....").always(function () {
                jsonData = "{'dtonew':" + JSON.stringify(getDatos()) + ",'dto':" + JSON.stringify(getDatosG()) + ",'dtob':" + JSON.stringify(getBitacora("USUARIOS", "MODIFICAR", "NINGUNA")) + "}"; //Registro de bitacora
                $.ajax({
                    type: "POST",
                    url: "/WS/users.asmx/m_usuario",
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    success: function (result) {
                        if (result.d == null) {
                            Modal("Error al intentar realizar esta acción.", "Servidor no disponible ");
                        }
                        else {
                            Modal(JSON.stringify(result.d), "Modificación de usuarios.");
                            nuevo();
                        }
                    },
                    error: function (result) {
                        Modal("Upss en el sistema: Error al intentar realizar esta acción.", "Servidor no disponible");
                    }
                });
                btn.button('reset')
            });

        });

        $('#btnL').click(function () { // Botón Listar todos
            var btn = $(this)
            btn.button('loading')
            $.ajax(".....").always(function () {
                $(document.body).animate({ scrollTop: 300 }, 300);
                jsonData = "{'dtob':" + JSON.stringify(getBitacora("USUARIOS", "LISTAR TODOS", "NINGUNA")) + "}"; //Registro de bitacora

                $.ajax({
                    type: "POST",
                    url: "/WS/users.asmx/c_usuarioss",
                    data: jsonData,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    success: function (result) {
                        $('#grilla').html("");
                        if (result.d == null) {
                           
                            Modal("Error al intentar realizar esta acción. No existen usuarios en la base de datos o el servidor no se encuentra disponible.", "No hay usuarios registrados");
                        }
                        else {
                            P = result.d; //OCULTAMOS LOS BOTONES RESPECTIVOS
                            conta = 0;
                            titleGrilla();
                            $('#formulario1').show();
                            $.each(P, function (i, item) {
                                AddItemGrilla(item);
                            })
                        }
                    },
                    error: function (result) {
                        Modal("Upss en el sistema: Error al intentar realizar esta acción.", "Servidor no disponible");
                    }

                });
                btn.button('reset')
            });

        });

        function cargarBoleano() {
            var B;
            $("#comboAcceso").html("");
            B += '<option vale="TRUE">TRUE</option>';
            B += '<option value="FALSE">FALSE</option>';
            $("#comboAcceso").append(B);
        }
        function titleGrilla() { // TITULO DE LA GRILLA
            $("#grilla").html("");
            var newtitle = "<tr class='text-center'>";
            newtitle += '<th class="col-sm-1">#</th>';
            newtitle += '<th class="col-sm-1">Id</th>';
            newtitle += '<th class="col-sm-1">Tipo</th>';
            newtitle += '<th class="col-sm-1">Nombres</th>';
            newtitle += '<th class="col-sm-1">Apellidos</th>';
            newtitle += '<th class="col-sm-1">Celular</th>';
            newtitle += '<th class="col-sm-1">Rol</th>';
            newtitle += '<th class="col-sm-1">Edad</th>';
            newtitle += '<th class="col-sm-1">Jornada</th>';
            newtitle += '<th class="col-sm-1 text-danger">Password</th>';
            newtitle += '<th class="col-sm-1">Acceso</th>';
            newtitle += "</tr>";
            $("#grilla").append(newtitle);
        };
        var AddItemGrilla = function (item) { // CONTENIDO DE LA GRILLA
            conta++;
            array.push(item);
            var nuevaCol = "<tr>";
            nuevaCol += "<td>" + conta + "</td>";
            nuevaCol += "<td>" + item.id + "</td>";
            nuevaCol += "<td>" + item.id_tipo + "</td>";
            nuevaCol += "<td   class= 'text-primary'>" + item.nombres + "</td>";
            nuevaCol += "<td>" + item.apellidos + "</td>";
            nuevaCol += "<td>" + item.cel + "</td>";
            nuevaCol += "<td>" + item.rol + "</td>";
            nuevaCol += "<td>" + item.edad + "</td>";
            nuevaCol += "<td>" + item.jornada + "</td>";
            nuevaCol += "<td class= 'text-danger'>" + item.password + "</td>";
            nuevaCol += "<td>" + item.acceso + "</td>";
            nuevaCol += "</tr>";
            $("#grilla").append(nuevaCol);

        };

        //--------------------------------------------------------------------------------------------------
//    });

