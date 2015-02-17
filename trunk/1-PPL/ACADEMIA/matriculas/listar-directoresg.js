
//$(document).ready(function () {
    WinMove();
    var conta;
    var Pos, CodProfe;
    var p = {};
    var filtro;
    //---------------------------------- validamos que este logueado el usuario ----------------------------------------------
    validar_pagina();
    //---------------------------------- validamos que el rol del usuario pueda ingresar a esta pagina -----------------------
    if (localStorage.getItem('SeccionRol') == "ADMINISTRATIVO" || localStorage.getItem('SeccionRol') == "SUPER") {
        conta = 0;
    } else {
        DenegarAccesoToAdmin();
    }
    var array = new Array();

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
    
    function cargarTodos() {
        jsonData = "{'dtob':" + JSON.stringify(getBitacora("DIRECTOR_G", "LISTAR TODOS ", "NINGUNA")) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/matriculas.asmx/c_directoresG",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                $("#f-grilla").show();
                $('#grilla').html("");
                conta = 0;
                if (result.d == null) {
                    Modal("No existen directores de grupo asignados", " Personal vacio");
                    $("#f-grilla").hide();
                }
                else {
                    Alerta("Listado de todos los directores de grupo", "success");
                    P = result.d;
              
                    titleGrilla();
                    var b = 0;
                    $.each(P, function (i, item) {
                        /*-- filtro por el año academico seleccionado ----- voy preguntando y añadiendo los que si y excluendo los que no*/
                        var obj = item.id_grupo.split('-');
                        var ano = obj[0];
                        if (ano == AnoAcademico) {
                            AddItemGrilla(item);
                            b = 1;
                        }
                    })
                    if (b == 0) {
                        Modal("No existen directores de grupo en este año academico. ", "");
                        setTimeout("window.location.href = 'index.html'", 5000); //tiempo expresado en milisegundos
                    }

                }
            },
            error: function (result) {
                //Modal("Server: Error de servidor.", "Error de servidor");
            }
        });
     
        }
    function titleGrilla() {
        $("#grilla").val("");
        $("#Ltotal").text("");
        var newtitle = "<tr>";
        newtitle += '<th class="col-sm-1 text-danger">IdGrupo</th>';
        newtitle += '<th class="col-sm-1">IdProfe</th>';
        newtitle += '<th class="col-sm-2">Nombres</th>';
        newtitle += '<th class="col-sm-2">Apellidos</th>';
        newtitle += "</tr>";
        $("#grilla").append(newtitle);
    };
    var AddItemGrilla = function (item) { // CONTENIDO DE LA GRILLA
        conta++;
        array.push(item);
        var nuevaCol = "<tr>";
        nuevaCol += '<td class="text-danger">' + item.id_grupo + '</td>';
        nuevaCol += "<td>" + item.id_profesor + "</td>";
        nuevaCol += "<td>" + item.nombres + "</td>";
        nuevaCol += "<td>" + item.apellidos + "</td>";
        nuevaCol += "</tr>";
        $("#Ltotal").text("Total:" + conta);
        $("#grilla").append(nuevaCol);
    };
        //--------------------------------------------------------------------------------------------------
//});

