
//$(document).ready(function () {
    WinMove();
    var idOld;
    var conta;
    var Pos;
    var P = {};
   
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
            cargarTodos();
            $("#formPPAL").show();
            $("#imgload").hide();
        });
    }

    var array = new Array(); 

    function cargarTodos() {
        jsonData = "{'dtob':" + JSON.stringify(getBitacora("NOTAS", "LISTAR TODOS ", "NINGUNO")) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/notas.asmx/c_notass",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                $("#f-grilla").show();
                $('#grilla').html("");
                conta = 0;
                if (result.d == null) {
                    Modal("No existen notas en el sistema", " Notas vacias");
                    $("#f-grilla").hide();
                }
                else {
                    Alerta("Filtro de todas las notas registradas en el sistema.", "success");
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

    $('#btnN').click(function () { // Botón actualizar
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            cargarTodos();
            btn.button('reset')
        });
      
    });
    //grilla para  llistar
    function titleGrilla() {
        $("#grilla").val("");
        $("#Ltotal").text("");
        var newtitle = "<tr>";
        newtitle += '<th class="col-sm-1">IdGrupo</th>';
        newtitle += '<th class="col-sm-1">IdPeriodo</th>';
        newtitle += '<th class="col-sm-1">IdEst </th>';
        newtitle += '<th class="col-sm-2">Apellidos</th>';
        newtitle += '<th class="col-sm-2">Nombres</th>';
        newtitle += '<th class="col-sm-1">IdLogro</th>';
        newtitle += '<th class="col-sm-2">Asignatura</th>';
        newtitle += '<th class="col-sm-1">Nota</th>';
        newtitle += '<th class="col-sm-1">Equivale</th>';
        newtitle += "</tr>";
        $("#grilla").append(newtitle);
    };
    var AddItemGrilla = function (item) { // CONTENIDO DE LA GRILLA
        conta++;
        array.push(item);
        var nuevaCol = "<tr>";
        nuevaCol += "<td>" + item.id_grupo + "</td>";
        nuevaCol += "<td>" + item.id_periodo + "</td>";
        nuevaCol += "<td>" + item.id_estudiante + "</td>";
        nuevaCol += "<td>" + item.apellidos + "</td>";
        nuevaCol += "<td>" + item.nombres + "</td>";
        nuevaCol += "<td>" + item.id_logro + "</td>";
        nuevaCol += "<td>" + item.nom_asig + "</td>";
        nuevaCol += "<td>" + item.nota + "</td>";
        nuevaCol += "<td>" + item.equivalencia + "</td>";
        nuevaCol += "</tr>";
        $("#Ltotal").text("Total:" + conta);
        $("#grilla").append(nuevaCol);
    };
        //--------------------------------------------------------------------------------------------------
//});
