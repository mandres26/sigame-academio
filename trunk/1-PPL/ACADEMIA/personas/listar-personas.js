//$(document).ready(function () {
    WinMove();
    var conta;
    var P = {};

    var filtro;
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
        $("#imgload").show();
        $.ajax("...").always(function () {
            cargarRoles();
            cargarSexo();
            cargarJornadas();
            FiltrosDisponibles();
            nuevo();
            $("#formPPAL").show();
            $("#imgload").hide();
        });
    }


    $("#comboFiltros").click(function () {
        $("#botones").hide();
    });
    var array = new Array(); // variable para las grillas en los formularios
    function cargarJornadas() {
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
    }
    $('#comboRol').keyup(function (e) {
        if (e.keyCode == 13) {
            var btn = $('#btnG')
            btn.button('loading')
            $.ajax(".....").always(function () {
                $("#botones").show();
                btn.button('reset')
            });
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
                    $.each(P, function (i, item) {
                        //@segregamos, ya que el administrativo debe gestionar estos roles
                        $("#comboRol").html("");
                        if (localStorage.getItem('SeccionRol') == "ADMINISTRATIVO") {
                            if (item.id == "SUPER" || item.id == "ADMINISTRATIVO") {
                               conta = 0;
                            }
                            else {
                                $("#comboRol").append("<option value=" + item.id + ">" + item.id + "</option>");
                            }
                        }
                        else {
                            $("#comboRol").append("<option value=" + item.id + ">" + item.id + "</option>");
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

    $('#btnG').click(function () { // Botón gestionar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            filtro = $("#comboFiltros").val();
            if (filtro == 0) {
                $("#botones").show();
                $("#f-jornada").hide();
                $("#f-sexo").hide();
            }
            if (filtro == 1) {
                $("#f-sexo").show();
                $("#botones").show();
                $("#f-jornada").hide();
            }
            if (filtro == 2) {
                $("#f-jornada").show();
                $("#botones").show();
                $("#f-sexo").hide();
            }
            btn.button('reset')
        });
    });

    function cargarSexo() {
        // Carga del sexo
        var A;
        $("#comboSexo").html("");
        A += '<option value="MASCULINO">MASCULINO</option>';
        A += '<option value="FEMENINO">FEMENINO</option>';
        $("#comboSexo").append(A);
    }
    function FiltrosDisponibles() {
        var A;
        $("#comboFiltros").html("");
        A += '<option value="0">POR X ROL</option>';
        A += '<option value="1">POR X ROL/GÉNERO</option>';
        A += '<option value="2">POR X ROL/JORNADA</option>';
        $("#comboFiltros").append(A);
    }

    $('#btnL').click(function () { // Botón gestionar el listado
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            $(document.body).animate({ scrollTop: 400 }, 300);
            Gestionar();
            btn.button('reset')
        });

    });
    var getDatos = function () {
        var dto = {};
        dto.rol = $("#comboRol").val();
        dto.sexo = $("#comboSexo").val();
        dto.jornada = $("#comboJornada").val();
        return dto;
    };

    function Gestionar() {
        if (filtro == 0) {//Filtramos por rol de forma general
            FiltrarXRol();
        } else if (filtro == 1) {  //Filtramos por rol y sexo 
            FiltrarXRolXSexo();
        }
        else if (filtro == 2) {  //Filtramos por rol y jornada 
            FiltrarXRolXJornada();
        }
    }
    //---------------------- funciones para los filtros---------------------------------
    function FiltrarXRol() {
        jsonData = "{'dto':" + JSON.stringify(getDatos()) +
                   ",'dtob':" + JSON.stringify(getBitacora("PERSONAS", "LISTAR TODOS", "FILTRO GENERAL POR ROL")) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/personas.asmx/c_personasXRol",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                $("#f-grilla").show();
                $('#grilla').html("");
                conta = 0;
                if (result.d == null) {
                    Modal("No existe personal para filtrar", " Personal vacio");
                }
                else {
                    Alerta("Filtro del personal por rol realizado de forma exitosa", "success");
                    P = result.d;
                  
                    titleGrilla();
                    $.each(P, function (i, item) {
                        AddItemGrilla(item);
                    })
                }
            },
            error: function (result) {
                Modal("Server: Error de servidor.", "Error de servidor");
            }
        });
    }
    function FiltrarXRolXSexo() {
       
        jsonData = "{'dto':" + JSON.stringify(getDatos()) +
                   ",'dtob':" + JSON.stringify(getBitacora("PERSONAS", "LISTAR TODOS", "FILTRO POR ROL Y SEXO")) + "}";
       $.ajax({
             type: "POST",
             url: "/WS/personas.asmx/c_personasXRolXSexo",
             data: jsonData,
             dataType: "json",
             contentType: "application/json; charset=utf-8",
             async: true,
             success: function (result) {
                 $("#f-grilla").show();
                 $('#grilla').html("");
                 conta = 0;
                 if (result.d == null) {
                     Modal("No existe personal para filtrar", " Personal vacio");
                 }
                 else {
                     Alerta("Filtro del personal por rol y sexo realizado de forma exitosa", "success");
                     P = result.d;
                     titleGrilla();
                     $.each(P, function (i, item) {
                         AddItemGrilla(item);
                     })
                     }
             },
             error: function (result) {
                 Modal("Server: Error de servidor.", "Error de servidor");
             }
         });
    }
  
    function FiltrarXRolXJornada() {

        jsonData = "{'dto':" + JSON.stringify(getDatos()) +
                   ",'dtob':" + JSON.stringify(getBitacora("PERSONAS", "LISTAR TODOS", "FILTRO POR ROL Y JORNADA")) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/personas.asmx/c_personasXRolXJornada",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                $("#f-grilla").show();
                $('#grilla').html("");
                conta = 0;
                if (result.d == null) {
                    Modal("No existe personal para filtrar", " Personal vacio");
                }
                else {
                    Alerta("Filtro del personal por rol y jornada realizado de forma exitosa", "success");
                    P = result.d;
                    titleGrilla();
                    $.each(P, function (i, item) {
                        AddItemGrilla(item);
                    })
                }
            },
            error: function (result) {
                Modal("Server: Error de servidor.", "Error de servidor");
            }
        });
    }

    // //-----------------------------Fin de las funciones para filtrar------------------------------------
    $('#btnN').click(function () { // Botón nuevo
        nuevo();
    });
    function nuevo() {
        $("#botones").hide();
        $('#comboRol').focus();
        $('#f-sexo').hide();
        $('#f-grilla').hide();
        $('#f-jornada').hide();
        $("#txtId").focus();
        filtro = 0;
        Alerta("<strong>Seleccione</strong> el tipo de personal que desea procesar, escoja el tipo de filtro que desea aplicar y haga clic en <strong>Listar todos.</strong> ", "info");
    }


    //grilla para  llistar
     function titleGrilla() {
         $("#grilla").html("");
         $("#Ltotal").text("");
         var newtitle = "<tr>";
         newtitle += '<th class="col-sm-1">Tipo</th>';
         newtitle += '<th class="col-sm-1">Identificación</th>';
         newtitle += '<th class="col-sm-1">Nombres</th>';
         newtitle += '<th class="col-sm-1">Apelllidos</th>';
         newtitle += '<th class="col-sm-1">Telefono</th>';
         newtitle += '<th class="col-sm-1">Direccion</th>';
         newtitle += '<th class="col-sm-1">Fijo</th>';
         newtitle += '<th class="col-sm-1">Email</th>';
         newtitle += '<th class="col-sm-1">Edad</th>';
         newtitle += '<th class="col-sm-1">Jornada</th>';
         newtitle += "</tr>";
         $("#grilla").append(newtitle);
     };
     var AddItemGrilla = function (item) { // CONTENIDO DE LA GRILLA
         conta++;
         array.push(item);
         var nuevaCol = "<tr>";
         nuevaCol += "<td>" + item.id_tipo + "</td>";
         nuevaCol += "<td>" + item.id + "</td>";
         nuevaCol += "<td>" + item.nombres + "</td>";
         nuevaCol += "<td>" + item.apellidos + "</td>";
         nuevaCol += "<td>" + item.cel + "</td>";
         nuevaCol += "<td>" + item.direccion + "</td>";
         nuevaCol += "<td>" + item.telefono + "</td>";
         nuevaCol += "<td>" + item.email + "</td>";
         nuevaCol += "<td>" + item.edad + "</td>";
         nuevaCol += "<td>" + item.jornada + "</td>";
         nuevaCol += "</tr>";
         $("#Ltotal").text("Total:" + conta);
         $("#grilla").append(nuevaCol);
     };
//});

