
//$(document).ready(function () {
    WinMove();
    var jsonData;
    var conta;
    var P = {};
    nuevo();
    //---------------------------------- validamos que este logueado el usuario ----------------------------------------------
    validar_pagina();
    vigencia();
    //---------------------------------- validamos que el rol del usuario pueda ingresar a esta pagina -----------------------
    if ( localStorage.getItem('SeccionRol') == "ADMINISTRATIVO" || localStorage.getItem('SeccionRol') == "SUPER") {
        conta = 0;
    } else {
        DenegarAccesoToAdmin();
    }
    //---------------------------------- --------------------------------------------------------------------------------------

    cargarfechaInicio();
    cargarfechaFin();
    cargarPeriodosBasicos();
    function cargarfechaInicio() {
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
        $("#comboFmess").html("");
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
        $("#comboFmess").append(B);
        var C;
        $("#comboFano").html("");
        for (var i = 2016; i >= 2014; i--) {
            C += '<option value=' + i + '>' + i + ' </option>';
        }
        $("#comboFano").append(C);
    }
    function cargarfechaFin() {
        var A;
        $("#comboFdiaF").html("");
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
        $("#comboFdiaF").append(A);
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
        $("#comboFmesF").append(B);
        var C;
        $("#comboFanoF").html("");
        for (var i = 2016; i >= 2014; i--) {
            C += '<option value=' + i + '>' + i + ' </option>';
        }
        $("#comboFanoF").append(C);
    }

    function cargarPeriodosBasicos() {
        var A;
        $("#txtPeriodos").html("");
        A += '<option value="I">I</option>';
        A += '<option value="II">II</option>';
        A += '<option value="III">III</option>';
        A += '<option value="IV">IV</option>';
        A += '<option value="V">V</option>';
        $("#txtPeriodos").append(A);
    }

    var array = new Array(); // variable para las grillas en los formularios

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
            $('#txtId').val($('#txtAno').val() +"-"+ $('#txtPeriodos').val());
            Gestionar();
            btn.button('reset')
        });
    });
    function Gestionar() {
        if ($('#txtId').val() == '') {
            Alerta("Error: Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "danger");
            $('#txtId').focus();
        } else {
            Alerta("¡Gestión realizada de <strong> forma exitosa</strong>!", "success");
            jsonData = "{'dto':" + JSON.stringify(getDatosG()) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/periodos.asmx/c_periodo",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    $("#botones").show();
                    if (result.d == null) {
                        $('#btnR').show();
                        $('#btnE').hide();
                        $('#btnM').hide();
                        $("#txtId").attr('disabled', 'disabled');
                    }
                    else if (result.d != null) {
                        P = result.d; //OCULTAMOS LOS BOTONES RESPECTIVOS
                        $('#btnR').hide();
                        $('#btnE').show();
                        $('#btnM').show();
                        $("#txtId").attr('disabled', 'disabled');
                        /*--verion para el localhost */
                        //var arr = P.rangoI.split('/');
                        //$("#comboFdia").val(arr[0]);
                        //$("#comboFmess").val(arr[1]);
                        //$("#comboFano").val(arr[2]);

                        //var arrF = P.rangoF.split('/');
                        //$("#comboFdiaF").val(arrF[0]);
                        //$("#comboFmesF").val(arrF[1]);
                        //$("#comboFanoF").val(arrF[2]);

                        /*--verion parag godaddy */
                        var arr = P.rangoI.split('/');
                        $("#comboFdia").val(arr[1]);
                        $("#comboFmess").val(arr[0]);
                        $("#comboFano").val(arr[2]);

                        var arrF = P.rangoF.split('/');
                        $("#comboFdiaF").val(arrF[1]);
                        $("#comboFmesF").val(arrF[0]);
                        $("#comboFanoF").val(arrF[2]);
                    }
                },
                error: function (result) {
                    //Modal("UPSS ERROR DE servidor: " + JSON.stringify(result), "Error de servidor");
                }
            });
        }
    }
    //---------------------------------- BOTONES DE ACCIONES ----------------------------
    $('#btnN').click(function () { // Botón Nuevo
        nuevo();
    });

    function nuevo() {
        $("#txtId").val("ID GENERADA...");
        $("#txtAno").val("2015");
        $("#txtId").attr('disabled', 'disabled');

        $("#comboFdia").val("1");
        $("#comboFmess").val("1");
        $("#comboFano").val("2015");

        $("#comboFdia").val("31");
        $("#comboFmess").val("12");
        $("#comboFano").val("2015");

        $('#formulario').hide();
        $('#txtAno').focus(); 
        $("#botones").hide();
        $('#btnR').show();
        $('#btnE').show();
        $('#btnL').show();
        Alerta("Digite una identificación en el cuadro de texto y luego presione la tecla <strong> Enter</strong> o haga clic en el botón <strong> Gestionar </strong>para continuar.", "info");
    }

    var getDatosPeriodo = function () {
        var dto = {};
        dto.id = $("#txtId").val();
        //La sigtes lineas son para el tratamiento en localhost de las fechas
        //dto.rangoI = $("#comboFdia").val() + "/" + $("#comboFmess").val() + "/" + $("#comboFano").val();
        //dto.rangoF = $("#comboFdiaF").val() + "/" + $("#comboFmesF").val() + "/" + $("#comboFanoF").val();

        //La sigtes lineas son para el tratamiento en godday de las fechas
        dto.rangoI =  $("#comboFmess").val() +"/"+ $("#comboFdia").val() +"/" + $("#comboFano").val();
        dto.rangoF = $("#comboFmesF").val() + "/" + $("#comboFdiaF").val() + "/" + $("#comboFanoF").val();

        return dto;
    };

    $('#btnR').click(function () { // Botón Registrar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
          jsonData = "{'dto':" + JSON.stringify(getDatosPeriodo()) + ",'dtob':" + JSON.stringify(getBitacora("PERIODOS", "REGISTRAR", "NINGUNA")) + "}"; //Registro de bitacora
        $.ajax({
            type: "POST",
            url: "/WS/periodos.asmx/r_periodo",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Error al intentar realizar esta acción.", "  Existe un problema de consistencia con la base de datos del sistema. Contactese con el administrador.");
                }
                else {

                    Modal(JSON.stringify(result.d), "Registro de periodos");
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
            jsonData = "{'dto':" + JSON.stringify(getDatosG()) + ",'dtob':" + JSON.stringify(getBitacora("PERIODOS", "ELIMINAR", "NINGUNA")) + "}"; //Registro de bitacora
        $.ajax({
            type: "POST",
            url: "/WS/periodos.asmx/e_periodo",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                if (result.d == null) {
                    Modal("Ocurrio un erro en el servidor.", "Intentelo nuevamente...");
                }
                else {
                    Modal(JSON.stringify(result.d), "Eliminación de periodos academicos.");
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

    $('#btnM').click(function () { // Botón Modificar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            jsonData = "{'dto':" + JSON.stringify(getDatosPeriodo()) + ",'dtob':" + JSON.stringify(getBitacora("PERIODOS", "MODIFICAR", "NINGUNA")) + "}"; //Registro de bitacora
            $.ajax({
                type: "POST",
                url: "/WS/periodos.asmx/m_periodo",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result.d == null) {
                        Modal("Ocurrio un erro en el servidor.", "Intentelo nuevamente...");
                    }
                    else {
                        Modal(JSON.stringify(result.d), "Modificación de periodos academicos.");
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
            $(document.body).animate({ scrollTop: 200 }, 300);
           jsonData = "{'dtob':" + JSON.stringify(getBitacora("PERIODOS", "LISTAR TODOS", "NINGUNA")) + "}"; //Registro de bitacora
        $.ajax({
            type: "POST",
            url: "/WS/periodos.asmx/c_periodoss",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                $('#grilla').html("");
                if (result.d == null) {
                    $('#formulario').hide();
                    Modal("Error al intentar realizar esta acción.", " Existe un problema de consistencia con la base de datos del sistema. Contactese con el administrador.");
                }
                else {
                    P = result.d; //OCULTAMOS LOS BOTONES RESPECTIVOS
                    conta = 0;
                    titleGrilla();
                    $('#formulario').show();
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
        newtitle += '<th class="col-sm-1  text-center">Identifiación</th>';
        newtitle += '<th class="col-sm-1  text-center">Rango en el tiempo</th>';
        newtitle += "</tr>";
        $("#grilla").append(newtitle);
    };
    var AddItemGrilla = function (item) { // CONTENIDO DE LA GRILLA
        conta++;
        array.push(item);
        var nuevaCol = "<tr>";
        nuevaCol += "<td>" + item.id + "</td>";
        nuevaCol += "<td>" + item.rangoI + ' - '+ item.rangoF +"</td>";
        nuevaCol += "</tr>";
        $("#grilla").append(nuevaCol);
    };
    //--------------------------------------------------------------------------------------------------
//});
