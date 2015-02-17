
//$(document).ready(function () {
WinMove();
var conta;
var Pos;
var P = {};
var filtro;
var CodProfe;
var array = new Array(); // variable para las grillas en los formularios
//---------------------------------- validamos que este logueado el usuario ----------------------------------------------
validar_pagina();
//---------------------------------- validamos que el rol del usuario pueda ingresar a esta pagina -----------------------
//---------------------------------- validamos que el rol del usuario pueda ingresar a esta pagina -----------------------
DenegarAccesoToSuper();
//---------------------------------- --------------------------------------------------------------------------------------
CargarDatosIniciales();
function CargarDatosIniciales() {
    $("#formPPAL").hide();
    $("#imgload").show();
    $.ajax("...").always(function () {
        nuevo();
        FiltrosDisponibles();
        cargarGrupos();

        $("#formPPAL").show();
        $("#imgload").hide();
    });
}

function FiltrosDisponibles() {
    var A;
    $("#comboFiltros").html("");
    A += '<option value="0">GENERAR USUARIOS POR GRUPO</option>';
    A += '<option value="1">GENERAR USUARIOS DE PROFESORES </option>';
    $("#comboFiltros").append(A);
}

$('#btnG').click(function () { // Botón gestionar
    var btn = $(this)
    btn.button('loading')
    $.ajax(".....").always(function () {
        filtro = $("#comboFiltros").val();
        if (filtro == 0) {
            $('#f-grupo').show();
        }
        if (filtro == 1) {
            $('#f-grupo').hide();
            GeneraProfes();
        }
        $('#botones').show();
        btn.button('reset')
    });
});

function cargarGrupos() {
    $.ajax({
        type: "POST",
        url: "/WS/grupos.asmx/c_grupos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (result) {
            if (result.d == null) {
                Modal("Error de congruencia: No existen grupos asignados para gestionar este tipo de reportes en el sistema. ");
                redireccionar();
            }
            else {
                P = result.d;
                $("#comboGrupo").html("");
                    $.each(P, function (i, item) {
                        var obj = item.id_grupo.split('-');
                        var ano = obj[0];
                        if (ano == AnoAcademico) {
                            $("#comboGrupo").append("<option value=" + item.id_grupo + ">" + item.id_grupo + "</option>");
                        }
                })
            }
        },
        error: function (result) {
            Modal("Server: Error al cargar los grupos.", "Error de servidor");
            redireccionar();
        }
    });
}


var getDatosGrupo = function () {
    var dto = {};
    dto.id_grupo = $("#comboGrupo").val();
    return dto;
};
$('#btnGenerar').click(function () { // Botón gestionar el listado
    var btn = $(this)
    btn.button('loading')
    $.ajax(".....").always(function () {
        GeneraGrupo();
        btn.button('reset')
    });
});
$("#comboFiltros").click(function () {
    $("#botones").hide();
    $('#f-grilla').hide();
});
$('#btnN').click(function () { // Botón nuevo
    nuevo();
});
function nuevo() {
    Alerta("Escoja el tipo de <strong>filtro</strong> que desea aplicar para exportar a los usuarios, destinados para la plataforma <strong> Moodle</strong>.", "info");
    $('#f-grupo').hide();
    $('#f-grilla').hide();
    $('#botones').hide(); 
    $('#Exportar').hide();
    pos = 0;
}

function GeneraGrupo() {
    $(document.body).animate({ scrollTop: 1501 },300 );
    var dto = {};
    dto.id = $("#comboGrupo").val();
    jsonData = "{'dto':" + JSON.stringify(dto) + ",'dtob':" + JSON.stringify(getBitacora("USUARIOS", "LISTAR GRUPO", "LISTAR PARA EXPORTAR A MOODLE")) + "}"; //Registro de bitacora

    $.ajax({
        type: "POST",
        url: "/WS/users.asmx/c_usuariosGrupo",
        data: jsonData,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: true,
        success: function (result) {
            $('#grilla').html("");
            if (result.d == null) {
                $('#f-grilla').hide();
                Modal("No existen estudiantes registrados en este grupo.", "Error al generar los usuarios");
            }
            else {
                P = result.d; //OCULTAMOS LOS BOTONES RESPECTIVOS
                conta = 0;
                titleGrilla();
                $('#f-grilla').show();
                $.each(P, function (i, item) {
                    AddItemGrilla(item);
                });
                $('#btnExport').focus();
            }
        },
        error: function (result) {
            Modal("Upss en el sistema: Error al intentar realizar esta acción.", "Servidor no disponible");
        }
    });
}
function GeneraProfes() {
    $(document.body).animate({ scrollTop: 1501 }, 300);
    jsonData = "{'dtob':" + JSON.stringify(getBitacora("USUARIOS", "LISTAR PROFESORES", "LISTAR PARA EXPORTAR A MOODLE")) + "}"; //Registro de bitacora
    $.ajax({
        type: "POST",
        url: "/WS/users.asmx/c_usuariosProfes",
        data: jsonData,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: true,
        success: function (result) {
            $('#grilla').html("");
            if (result.d == null) {
                $('#f-grilla').hide();

                Modal("No existen profesores registrados en la base de datos del sistema.", "Error al generar los usuarios");
            }
            else {
                P = result.d; //OCULTAMOS LOS BOTONES RESPECTIVOS
                conta = 0;
                titleGrilla();
                $('#f-grilla').show();
                $.each(P, function (i, item) {
                    AddItemGrilla(item);
                });
                $('#btnExport').focus();
            }
        },
        error: function (result) {
            Modal("Upss en el sistema: Error al intentar realizar esta acción.", "Servidor no disponible");
        }
    });
}
function titleGrilla() {
    $("#grilla").val("");
    $("#Ltotal").text("");
    var newtitle = "<tr>";
    newtitle += '<th class="col-sm-1">username</th>';
    newtitle += '<th class="col-sm-1">password</th>';
    newtitle += '<th class="col-sm-2">firstname</th>';
    newtitle += '<th class="col-sm-2">lastname</th>';
    newtitle += '<th class="col-sm-2">email</th>';
    newtitle += '<th class="col-sm-1">institution</th>';
    newtitle += '<th class="col-sm-1">id</th>';
    newtitle += "</tr>";
    $('#Exportar').show();
    $("#grilla").append(newtitle);
};
var AddItemGrilla = function (item) { // CONTENIDO DE LA GRILLA
    conta++;
    array.push(item);
    var nuevaCol = "<tr>";
    nuevaCol += "<td>" + item.username + "</td>";
    nuevaCol += "<td>" + item.password + "</td>";
    nuevaCol += "<td>" + item.firstname + "</td>";
    nuevaCol += "<td>" + item.lastname + "</td>";
    nuevaCol += "<td>" + item.email + "</td>";
    nuevaCol += "<td>" + item.institution + "</td>";
    nuevaCol += "<td>" + item.id + "</td>";
    nuevaCol += "</tr>";
    $("#Ltotal").text("Total:" + conta);
    $("#grilla").append(nuevaCol);
};
$('#btnExport').click(function () { // Botón nuevo
    //opcion 3.1

    jsonData = "{'dtob':" + JSON.stringify(getBitacora("USUARIOS", "EXPORTAR", "ARCHIVO DESCARGADO PARA EXPORTAR A MOODLE")) + "}"; //Registro de bitacora
    $.ajax({
        type: "POST",
        url: "/WS/users.asmx/exp_moddle",
        data: jsonData,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: true,
        success: function (result) {
            if (result.d != null) {
                var g = $('#grilla').table2CSV({
                    separator: ',',
                    delivery: 'value',
                    header: ['username', 'password', 'firstname', 'lastname', 'email', 'institution', 'id']
                });
                generar(g.split("\n"));
                $('#grilla').table2CSV();
                Modal("Descarga exitosa. ", "Usuaios para Moodle - COMPRILET VIRTUAL");
            }
        },
        error: function (result) {
            Modal("Upss en el sistema: Error al intentar realizar esta acción.", "Servidor no disponible");
        }
    });
});
//000000000000000000000000000000000000000000000
function generar(Contenido) {
    var datos = Contenido;
    descargarArchivo(generarTexto(datos), 'USUARIOS.csv')
}
function descargarArchivo(contenidoEnBlob, nombreArchivo) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = nombreArchivo || 'archivo.dat';
        var clicEvent = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contenidoEnBlob);
};

function generarTexto(datos) {
    //El contructor de Blob requiere un Array en el primer parámetro
    //así que no es necesario usar toString. el segundo parámetro
    //es el tipo MIME del archivo
    var texto = [];
    for (i = 0; i < datos.length; i++) {
        texto.push(datos[i]);
        texto.push('\n');
    }
    return new Blob(texto, {
        type: 'text/plain'
    });
};


