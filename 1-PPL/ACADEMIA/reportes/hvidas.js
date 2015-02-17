
//$(document).ready(function () {
WinMove();
var idOld;
var conta, Rold;
var Pos;
var P = {};
var filtro;
var CodProfe;
Rold = 0;
//---------------------------------- validamos que este logueado el usuario ----------------------------------------------
validar_pagina();
//---------------------------------- --------------------------------------------------------------------------------------
if (localStorage.getItem('SeccionRol') == "ADMINISTRATIVO" || localStorage.getItem('SeccionRol') == "SUPER") {
    conta = 0;
} else {
    DenegarAccesoToAdmin();
} CargarDatosIniciales();
function CargarDatosIniciales() {
    $("#formPPAL").hide();
    $("#imgload").show();

    $.ajax("...").always(function () {
        nuevo();
        FiltrosDisponibles();
        $("#formPPAL").show();
        $("#imgload").hide();
    });
}

function nuevo() {
    $("#comboFiltros").val("ESTUDIANTE");
    $("#txtId").val("");
}
function FiltrosDisponibles() {
    var A;
    $("#comboFiltros").html("");
    A += '<option value="ESTUDIANTE">ESTUDIANTE</option>';
    A += '<option value="PROFESOR">PROFESOR </option>';
    $("#comboFiltros").append(A);
}

$('#btnG').click(function () { // Botón consultar y generar
    var btn = $(this)
    btn.button('loading')
    $.ajax("....").always(function () {
        c_persona();
        if (Rold =! 0) {
            var dto = {};
            dto.rol = $("#comboFiltros").val();
            dto.id = $("#txtId").val();

            jsonData = "{'dto':" + JSON.stringify(dto) + ",'dtob':" + JSON.stringify(getBitacora("REPORTES", "GENERAR", "GENERAR HOJAS DE VIDAS")) + "}"; //Registro de bitacora
            $.ajax({
                type: "POST",
                url: "/WS/reportes.asmx/cg_hvidas",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (Rold == "PROFESOR") {
                        window.open("/ACADEMIA/reportes/reports/hvidaprofe.aspx");
                    }
                    else if (Rold == 'ESTUDIANTE') {
                        window.open("/ACADEMIA/reportes/reports/hvidaest.aspx");
                    }

                },
                error: function (result) {
                    Modal("Upss en el servidor: Error al intentar realizar esta acción.", "Error del servidor");
                }
            });
        }
        btn.button('reset')
        })
});
$('#txtId').keyup(function (e) {
    if (e.keyCode == 13) {
        var btn = $('#btnG')
        btn.button('loading')
        $.ajax(".....").always(function () {
            c_persona();
            if (Rold =! 0) {
                generar_Hvida();
            }
            btn.button('reset')
        });
    }
});

function c_persona() {
    jsonData = "{'dto':" + JSON.stringify(getDatosG()) + "}";
    $.ajax({
        type: "POST",
        url: "/WS/personas.asmx/c_persona",
        data: jsonData,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: true,
        success: function (result) {
            if (result.d == null) {
                Modal("Esta identificación no se encuentra registrada en la base de datos del sistema ", "Identificacion no encontrada");
                Rold = 0;
                $("#txtId").focus();
            }
            else {
                P = result.d;
                if (P.rol == $("#comboFiltros").val()) {
                    Rold = P.rol;
                } else {
                    Modal("Error. El rol que ha seleccionado para esta identificacion genera inconsistencia. Verifique", "Inconsistencia.");
                    Rold = 0;
                }
            }
        },
        error: function (result) {
            Modal("Error al intentar realizar esta acción.", "Servidor no disponible");
        }
    });

}


function generar_Hvida() {
   
}
    

