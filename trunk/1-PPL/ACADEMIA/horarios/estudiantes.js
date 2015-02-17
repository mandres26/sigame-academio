
//$(document).ready(function () {
    WinMove();
    var conta;
    var Pos;
    var filtro;
    var CodEst, Ref, CodPer, CodGrupo, Notificacion;
    var P = {};
    var array = new Array();
    var array2 = new Array();
    var jsonData;
 

    validar_pagina();
    //---------------------------------- validamos que el rol del usuario pueda ingresar a esta pagina -----------------------
    if (localStorage.getItem('SeccionRol') == "ACUDIENTE" || localStorage.getItem('SeccionRol') == "SUPER") {
        conta = 0;
    } else {
        Modal("No tiene permisos para ingresar a esta url.", "Acceso denegado");
        setTimeout("window.location.href = 'login.html'", 2000); //tiempo expresado en milisegundos
    }
    //---------------------------------- --------------------------------------------------------------------------------------
    CargarDatosIniciales();
    function CargarDatosIniciales() {
        $("#formPPAL").hide();
        $("#f-grilla1").hide();
        $("#f-grilla2").hide();
        $("#imgload").show();
        $.ajax("...").always(function () {
            cargarEstudiantes();
            Alerta("Para procesar el la vista de horarios de clases, escoja el <strong>estudiante con su grupo  </strong> y haga clic en  <strong>Ver</strong>.", "info")
            $("#formPPAL").show();
            $("#imgload").hide();
        });
    }

    function cargarEstudiantes() {
        var dto = {};
        dto.id = localStorage.getItem('SeccionId');

        jsonData = "{'dto':" + JSON.stringify(dto) +
                     ",'dtob':" + JSON.stringify(getBitacora("HORARIOS", "LISTAR ", "ACCION REALIZADA POR EL ACUDIENTE PARA VER LOS HORARIOS DE SU ESTUDIANTE")) + "}";
        $.ajax({
            type: "POST",
            url: "/WS/matriculas.asmx/c_matriculaXIdAcu",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {

                conta = 0;
                if (result.d == null) {
                    Modal("Usted no tiene estudiantes asignados todavia. Contactese con la administración de colegio.", " Si estudiantes matriculados");
                    $("#formPPAL").hide();
                    $("#f-grilla1").hide();
                    setTimeout("window.location.href = 'acudiente.html'", 5000); //tiempo expresado en milisegundos
                }
                else {
                    $("#f-grilla1").show();
                    $('#grilla1').html("");
                    P = result.d;
                    titleGrilla1();
                    var b = 0;
                    $.each(P, function (i, item) {
                        /*-- filtro por el año academico seleccionado ----- voy preguntando y añadiendo los que si y excluendo los que no*/
                        var obj = item.id_grupo.split('-');
                        var ano = obj[0];
                        if (ano == AnoAcademico) {
                            AddItemGrilla1(item);
                            b = 1;
                        }
                    })
                    if (b == 0) {
                        Modal("Usted no contiene estudiantes matriculados en este año academico. ", "No contiene estudiantes matriculados.");
                        setTimeout("window.location.href = 'acudiente.html'", 5000); //tiempo expresado en milisegundos
                    }
                }
            },
            error: function (result) {
                Modal("Server: Error de servidor.", "Servidor no disponible.");
            }
        });
    }
    var getDatosFiltro = function () {
        var dto = {};
        dto.id_grupo = CodGrupo;
        dto.id_profe = $("#txtIdPro").val();
        dto.id_estudiante = $("#txtIdEst").val();
        return dto;
    };
    $(document).on('click', '.clsVerEst', function () {
        var btn = $(this)
        btn.button('loading')
        var fila = $(this).attr("tag");
        CodGrupo = array[fila - 1].id_grupo;
        $(document.body).animate({ scrollTop: 800 }, 300);
        $.ajax("...").always(function () {
             
            jsonData = "{'dto':" + JSON.stringify(getDatosFiltro()) +
               ",'dtob':" + JSON.stringify(getBitacora("HORARIOS", "LISTAR", "FILTRO POR ESTUDIANTE PARA VER LOS QUE TIENE ASIGNADOS")) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/horarios.asmx/c_XIdEstudianteXINGrupo",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    $("#f-grilla2").show();
                    $('#grilla2').html("");
                    $('#grilla2').show();
                    conta = 0;
                    if (result.d == null) {
                        Modal("No hay horarios para este estudiante en este grupo. ", " No hay horarios");
                        $("#f-grilla2").hide();
                    }
                    else {
                        Alerta("Horario del estudiante generado de forma exitosa", "success");
                        P = result.d;
                        titleGrilla2();
                        $.each(P, function (i, item) {
                            AddItemGrilla2(item);
                        });
                       // $('#Ltotal2').focus();
                    }
                },
                error: function (result) {
                    Modal("Server: Error de servidor.", "Error de servidor");
                }
            });
          
            btn.button('reset')
        });
    });

        // aca va el codigo de la consulta
    
    var AddItemGrilla1 = function (item) {
        conta++;
        array.push(item);
        var nuevaCol = "<tr>";
        nuevaCol += "<td>" + item.id_estudiante + "</td>";
        nuevaCol += "<td>" + item.apellidos + "</td>";
        nuevaCol += "<td>" + item.nombres + "</td>";
        nuevaCol += "<td>" + item.grado + "</td>";
        nuevaCol += "<td>" + item.id_grupo + "</td>";
        nuevaCol += "<td>" + item.año + "</td>";
        nuevaCol += '<td><input id="btnOK" value="Ver" tag=' + array.length + ' class="clsVerEst btn btn-danger" data-loading-text="Cargando..." type="button" /></td>';
        nuevaCol += "</tr>";
        $("#grilla1").append(nuevaCol);
    };
    function titleGrilla1() {
        var newtitle = "<tr>";
        newtitle += '<th class="col-md-1">Identificación</th>';
        newtitle += '<th class="col-md-2">Apellidos</th>';
        newtitle += '<th class="col-md-2">Nombres</th>'
        newtitle += '<th class="col-md-1">Grado</th>';
        newtitle += '<th class="col-md-1">Grupo</th>';
        newtitle += '<th class="col-md-1">Año</th>';
        newtitle += '<th class="col-md-1">Horario</th>';
        newtitle += "</tr>";
        $("#grilla1").append(newtitle);
    };

    //grilla para  llistar
    function titleGrilla2() {
        $("#grilla2").val("")
        $("#Ltotal2").text("");;
        var newtitle = "<tr  col-xs-2>";
        newtitle += '<th class="col-md-1 col-xs-1 ">Asignatura</th>';
        newtitle += '<th class="col-xs-1 col-xs-1 text-danger">Lunes</th>';
        newtitle += '<th class="col-xs-1 col-xs-1 text-danger">Martes</th>';
        newtitle += '<th class="col-xs-1 col-xs-1 text-danger">Miercoles</th>';
        newtitle += '<th class="col-xs-1 col-xs-1 text-danger">Jueves</th>';
        newtitle += '<th class="col-xs-1 col-xs-1 text-danger">Viernes</th>';
        //newtitle += '<th class="col-xs-1 col-xs-1 ">Sabado</th>';

        newtitle += "</tr>";
        $("#grilla2").append(newtitle);
    };
    var AddItemGrilla2 = function (item) { // CONTENIDO DE LA GRILLA
        conta++;
        array2.push(item);
        var nuevaCol = "<tr>";

        nuevaCol += "<td col-xs-1> <strong>" + item.id_asignatura + "</strong> </td>";
        nuevaCol += "<td col-xs-1>" + item.lunes + "</td>";
        nuevaCol += "<td col-xs-1>" + item.martes + "</td>";
        nuevaCol += "<td col-xs-1>" + item.miercoles + "</td>";
        nuevaCol += "<td col-xs-1>" + item.jueves + "</td>";
        nuevaCol += "<td col-xs-1>" + item.viernes + "</td>";

        nuevaCol += "</tr>";
        $("#grilla2").append(nuevaCol);

    };
   
