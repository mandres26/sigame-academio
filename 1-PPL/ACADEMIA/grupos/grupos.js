
//$(document).ready(function () {
    WinMove();
    var conta;
    var jsonData;
    var P = {};
    //---------------------------------- validamos que este logueado el usuario ----------------------------------------------
    validar_pagina();
    vigencia();
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
        $("#imgload").show();
        $.ajax("...").always(function () {
            cargarCombos();
            nuevo();
            $("#formPPAL").show();
            $("#imgload").hide();
        });
    }

    var array = new Array(); // variable para las grillas en los formularios
   
    function cargarCombos() {
       $.ajax({ // Carga de grados
           type: "POST",
           url: "/WS/grados.asmx/c_grados",
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           async: true,
           success: function (result) {
               if (result.d == null) {
                   Modal("Error de congruenciá: No existen grados asignados. ");
                   redireccionar();
               }
               else {
                   P = result.d
                   $("#comboGrado").html("");
                   $("#comboGrado").val("");
                   $.each(P, function (i, item) {
                       $("#comboGrado").append("<option value=" + item.id_grado + ">" + item.id_grado + "</option>");
                   })
               }
           },
           error: function (result) {
               Modal("Error de congruenciá: No existen grados asignados. ","Servidor no disponible");
               redireccionar();
           }
       });
     
   }

   var getDatos = function () {
        var dto = {};
        dto.id_grupo = $("#txtId").val();
        dto.id_grado = $("#comboGrado").val();
        dto.id_aula = $("#txtAula").val();
        dto.año = $("#txtAno").val();
        return dto;
    };
   $('#txtAno').keypress(function () {
       if ($('#txtAno').val() < 1 || $('#txtAno').val() > 1) {
           return false;
       }
   });
   $('#btnI').click(function () { // Botón Nuevo
       var btn = $(this)
       btn.button('loading')
       $.ajax(".....").always(function () {
           Modal("La seccion que redirecciona este botón aun no esta en total funcionamiento. Estamos trabajando en ella.", "Sección en construción.");
           btn.button('reset')
       });
   });
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

        $("#txtId").val($("#txtAno").val()+"-"+$("#comboGrado").val()+$("#txtAula").val());

        if ($('#txtAno').val() == '') {
            Alerta("Error: Escoja un año lectivo.", "danger");
            $('#txtAno').focus();
            $('#formulario').hide();
        } else if ($('#txtAula').val() == '') {
            Alerta("Error: Escoja un aula de clases.", "danger");
            $('#txtAula').focus();
            $('#formulario').hide();
        }
        else if ($('#txtId').val() == '') {
            Alerta("Error: Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
            $('#txtId').focus();
            $('#formulario').hide();
        } else {
            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
            $('#formulario').show();
            $('#txtAula').focus();
            jsonData = "{'dto':" + JSON.stringify(getDatosG()) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/grupos.asmx/c_grupo",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {


                    $("#comboGrado").attr('disabled', 'disabled');
                    $("#txtAno").attr('disabled', 'disabled');
                    $("#txtAula").attr('disabled', 'disabled');
                    $("#txtId").attr('disabled', 'disabled');

                    $("#botones").show();
                    if (result.d == null) {
                        $('#btnR').show();
                        $('#btnM').hide();
                        $('#btnE').hide();
                        $("#txtId").attr('disabled', 'disabled');
                    }
                    else {
                        P = result.d; //OCULTAMOS LOS BOTONES RESPECTIVOS
                        $('#btnR').hide();
                        $('#btnM').show();
                        $('#btnE').show();
                        // Cargo los datos
                        $("#comboGrado").val(P.id_grado);
//                        $("#txtAula").val(P.id_aula);
                        $("#txtAno").val(P.año);

                    }
                },
                error: function (result) {
                    
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
      
        $("#txtAula").val("A");
        $("#txtAno").val("2015");
      
        $('#btnR').show();
        $('#btnM').show();
        $('#btnE').show();
        $('#btnL').show();
        $('#formulario1').hide();
        $('#formulario').hide();
        $('#grilla').hide();
        $("#botones").hide();


        $("#comboGrado").removeAttr('disabled');
        $("#txtAno").removeAttr('disabled');
        $("#txtAula").removeAttr('disabled');
        $("#txtId").removeAttr('disabled');
        $('#txtId').focus();
        Alerta("Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "info");
    }

    $('#btnR').click(function () { // Botón Registrar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
          
        jsonData = "{'dto':" + JSON.stringify(getDatos()) + ",'dtob':" + JSON.stringify(getBitacora("GRUPOS", "REGISTRAR", "NINGUNA")) + "}"; //Registro de bitacora
        $.ajax({
            type: "POST",
            url: "/WS/grupos.asmx/r_grupo",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Error al intentar realizar esta acción.", "  Existe un problema de consistencia con la base de datos del sistema. Contactese con el administrador.");
                }
                else {
                    Modal(JSON.stringify(result.d), "Registro de grupos.");
                    nuevo();
                }
            },
            error: function (result) {
                Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error con el servidor");
            }
        });
        btn.button('reset')
        });

    });

    $('#btnM').click(function () { // Botón Modificar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
        
        jsonData = "{'dtonew':" + JSON.stringify(getDatos()) + ",'dto':" + JSON.stringify(getDatosG()) + ",'dtob':" + JSON.stringify(getBitacora("GRUPOS", "MODIFICAR", "NINGUNA")) + "}"; //Registro de bitacora
        $.ajax({
            type: "POST",
            url: "/WS/grupos.asmx/m_grupo",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                if (result.d == null) {
                   Modal("Error al intentar realizar esta acción.", "Verifique que la información que esta enviando sea la correcta o puede ser que el grupo no se encuentre registrado en el sistema. ");
                }
                else {
                    Modal(JSON.stringify(result.d), "Modificación del grupo.");
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

    $('#btnE').click(function () { // Botón Eliminar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            jsonData = "{'dto':" + JSON.stringify(getDatosG()) + ",'dtob':" + JSON.stringify(getBitacora("GRUPOS", "ELIMINAR", "NINGUNA")) + "}"; //Registro de bitacora
        $.ajax({
            type: "POST",
            url: "/WS/grupos.asmx/e_grupo",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Error al intentar realizar esta acción.", "Verifique que la información que esta enviando sea la correcto o puede ser que el grupo no se encuentre registrado en el sistema. ");
                }
                else {
                    Modal(JSON.stringify(result.d), "Eliminación del grupo.");
                    nuevo();
                }
            },
            error: function (result) {
                Modal("Upss en el servidor: Error al intentar realizar esta acción." , "Error de servidor");
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
           jsonData = "{'dtob':" + JSON.stringify(getBitacora("GRUPOS", "LISTAR TODOS", "NINGUNA")) + "}"; //Registro de bitacora
        $.ajax({
            type: "POST",
            url: "/WS/grupos.asmx/c_gruposs",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                $('#grillaG').html("");
                $("#grillaG").val("");
                if (result.d == null) {
                    $('#formulario1').hide();
                    Modal("Error al intentar realizar esta acción.", "  Existe un problema de consistencia con la base de datos del sistema. Contactese con el administrador.");
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
                Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error de servidor");
            }
        });
        btn.button('reset')
        });

    });
    //--------------------------------------------------------------------------------------------------
    function titleGrilla() { // TITULO DE LA GRILLA
        $("#grillaG").val("");
        var newtitle = "<tr class='text-center'>";
        newtitle += '<th class="col-sm-1">#</th>';
        newtitle += '<th class="col-sm-2">Identificación</th>';
        newtitle += '<th class="col-sm-2">Grado</th>';
        newtitle += '<th class="col-sm-2">Aula</th>';
        newtitle += '<th class="col-sm-2">Año lectivo</th>';
      
        newtitle += "</tr>";
        $("#grillaG").append(newtitle);
    };
    var AddItemGrilla = function (item) { // CONTENIDO DE LA GRILLA
        conta++;
        array.push(item);
        var nuevaCol = "<tr>";
        nuevaCol += "<td>" + conta + "</td>";
        nuevaCol += "<td>" + item.id_grupo + "</td>";
        nuevaCol += "<td>" + item.id_grado + "</td>";
        nuevaCol += "<td>" + item.id_aula + "</td>";
        nuevaCol += "<td>" + item.año + "</td>";
      
        nuevaCol += "</tr>";
        $("#grillaG").append(nuevaCol);
    };
    //--------------------------------------------------------------------------------------------------
//});
