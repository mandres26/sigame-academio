//$(document).ready(function () {
WinMove();
var conta = 0;
var conta2 = 0;
var CodAsig, TotalEst, NombreAsig, Busqueda, CodGrado, CodGrupo, CodProfe, Periodo;
var jsonData;
var dataEstudiant;
var AnoAcademico = localStorage.getItem('SeccionAnoAcademico');
validar_pagina();
//---------------------------------- --------------------------------------------------------------------------------------
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
        cargarPeriodos();
        cargarGrupos();
        nuevo();
        $("#formPPAL").show();
        $("#imgload").hide();
    });
}

var getDatos = function () {
    var dto = {};
    dto.id_grupo = $("#comboIdgrupo").val();
    dto.id_periodo = $("#comboPeriodos").val();
    return dto;
};
//----------------------------------------------------------------------------------------------------
$('#btnN').click(function () { // Botón Nuevo
    nuevo();
});

function nuevo() {
    $('#formulario').hide();
}
function cargarPeriodos() {
    $.ajax({ // Carga de periodos
        type: "POST",
        url: "/WS/periodos.asmx/c_periodos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (result) {
            if (result.d == null) {
                $("#comboPeriodos").attr('disabled', 'disabled');
                Modal("Error de congruenciá: No existen periodos asignados. ");
                redireccionar();

            }
            else {
                $("#comboPeriodos").removeAttr('disabled');
                P = result.d;
                $("#comboPeriodos").html("");
                $.each(P, function (i, item) {

                    var obj = item.id.split('-');
                    var ano = obj[0];
                    if (ano == AnoAcademico) {
                        $("#comboPeriodos").append("<option value=" + item.id + ">" + item.id + "</option>");
                    }

                    
                })
            }
        },
        error: function (result) {
            Modal(("Servidor no disponible", "E1:2 al cargarPeriodos"));
            redireccionar();
        }
    });
}

function cargarGrupos() {
    $.ajax({ // Carga de grupos
        type: "POST",
        url: "/WS/grupos.asmx/c_grupos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (result) {
            if (result.d == null) {
                Modal("Error de congruenciá: No existen grupos asignados. ");
            }
            else {
                P = result.d;
                $("#comboIdgrupo").html("");
                $.each(P, function (i, item) {
                    var obj = item.id_grupo.split('-');
                    var ano = obj[0];
                    if (ano == AnoAcademico) {
                        $("#comboIdgrupo").append("<option value=" + item.id_grupo + ">" + item.id_grupo + "</option>");
                    }
                })
            }
        },
        error: function (result) {
            Modal("Server: Error al cargar los grupos.", "Error de sistema");
            redireccionar();
        }
    });
}

    $('#btnGenerar').click(function () { // Botón generar boletines de forma grupal
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {

            if ($('#comboIdgrupo').val() == null) {
                Alerta("Error: Debe de escoger un grupo.", "danger");
                $(document.body).animate({ scrollTop: 20 }, 300);
                $('#comboIdgrupo').focus();
            } else {
                $("#btnGenerar").attr('disabled', 'disabled');
                
                //--------------------EXTRAEMOS EL PERIODO SELECCIONADA ------------*/
                var p = $("#comboPeriodos").val();
                var periodoS = p.split('-');
                var Ano = periodoS[0];
                var Periodo = periodoS[1];
                /*--------------------------------------------------------------------*/

                CodGrado = $("#comboIdgrupo").val().substring(5, 6);
                if (Periodo == 'V') { // Generarmos el boletin final grupal

                    jsonData = "{'dto':" + JSON.stringify(getDatos()) + ",'dtob':" + JSON.stringify(getBitacora("REPORTES", "GENERAR", "BOLETINES FINALES DE UN GRUPO GENERADO")) + "}"; //Registro de bitacora
                    $.ajax({
                        type: "POST",
                        url: "/WS/reportes.asmx/cg_boletinXgrupo",
                        data: jsonData,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        async: true,
                        success: function (result) {
                            if (result.d == null) {
                                Modal("Ocurrio un error al intentar conectar al servidor. ", "Servidor no disponible");
                            }
                            var rs = result.d;
                            if (rs == 'c_yes') {
                                Alerta("Reporte generado de forma exitosa", "success");
                                // BOLETIN PARA EL PERIODO tradicional y PARA PREESCOLAR
                                if (CodGrado == "J" || CodGrado == "P" || CodGrado == "T") {
                                    window.open("/ACADEMIA/reportes/boletines/preescolar/boletinGF.aspx"); // boletin de pre-escolar grupal
                                } else if (CodGrado == "1" || CodGrado == "2" || CodGrado == "3" || CodGrado == "4" || CodGrado == "5") {
                                    window.open("/ACADEMIA/reportes/boletines/primaria/boletinGF.aspx"); // boletin de primaria grupal
                                }
                                else if (CodGrado == "6" || CodGrado == "7" || CodGrado == "8" || CodGrado == "9" || CodGrado == "10" || CodGrado == "11") {
                                    window.open("/ACADEMIA/reportes/boletines/bachillerato/boletinGF.aspx"); // boletinb = boletin de bachilletato grupal
                                }
                                $(document.body).animate({ scrollTop: 0 }, 300);
                            }
                            $("#btnGenerar").removeAttr('disabled');
                        },
                        error: function (result) {
                            Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error del servidor");
                            $("#btnGenerar").removeAttr('disabled');
                        }
                    });
                } else {
                    jsonData = "{'dto':" + JSON.stringify(getDatos()) + ",'dtob':" + JSON.stringify(getBitacora("REPORTES", "GENERAR", "BOLETINES PERIODICOS DE UN GRUPO GENERADO")) + "}"; //Registro de bitacora
                    $.ajax({
                        type: "POST",
                        url: "/WS/reportes.asmx/cg_boletinXgrupo",
                        data: jsonData,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        async: true,
                        success: function (result) {
                            if (result.d == null) {
                                Modal("Ocurrio un error al intentar conectar al servidor. ", "Servidor no disponible");
                            }
                            var rs = result.d;
                            if (rs == 'c_yes') {
                                Alerta("Reporte generado de forma exitosa", "success");
                                // BOLETIN PARA EL PERIODO tradicional y PARA PREESCOLAR
                                if (CodGrado == "J" || CodGrado == "P" || CodGrado == "T") {
                                    window.open("/ACADEMIA/reportes/boletines/preescolar/boletinG.aspx"); // boletin de pre-escolar grupal
                                } else if (CodGrado == "1" || CodGrado == "2" || CodGrado == "3" || CodGrado == "4" || CodGrado == "5") {
                                    window.open("/ACADEMIA/reportes/boletines/primaria/boletinG.aspx"); // boletin de primaria grupal
                                }
                                else if (CodGrado == "6" || CodGrado == "7" || CodGrado == "8" || CodGrado == "9" || CodGrado == "10" || CodGrado == "11") {
                                    window.open("/ACADEMIA/reportes/boletines/bachillerato/boletinG.aspx"); // boletinb = boletin de bachilletato grupal
                                }
                                $(document.body).animate({ scrollTop: 0 }, 300);
                            }
                            $("#btnGenerar").removeAttr('disabled');

                        },
                        error: function (result) {
                            Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error del servidor");
                            $("#btnGenerar").removeAttr('disabled');

                        }
                    });
                }
            }

            btn.button('reset')
        });
    });





