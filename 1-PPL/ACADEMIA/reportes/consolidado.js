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
            cargarGrupos();
            nuevo();
            $("#formPPAL").show();
            $("#imgload").hide();
        });
    }
 
    //----------------------------------------------------------------------------------------------------
    $('#btnN').click(function () { // Botón Nuevo
        nuevo();
    });

    function nuevo() {
        $('#formulario').hide();
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

        $('#btnGenerar').click(function () { // Botón Nuevo
            var btn = $(this)
            btn.button('loading')
            $.ajax(".....").always(function () {
            
                $("#btnGenerar").attr('disabled', 'disabled');
                var dto = {};
                dto.id = $("#comboIdgrupo").val();
                jsonData = "{'dto':" + JSON.stringify(dto) + ",'dtob':" + JSON.stringify(getBitacora("REPORTES", "GENERAR", "CONSOLIDADO GRUPAL")) + "}"; //Registro de bitacora
                $.ajax({
                    type: "POST",
                    url: "/WS/reportes.asmx/c_consolidado",
                    contentType: "application/json; charset=utf-8",
                    data: jsonData,
                    dataType: "json",
                    async: true,
                    success: function (result) {
                        if (result.d == null) {
                            Modal("Ocurrio un error al intentar conectar al servidor. ", "Servidor no disponible");
                        }
                        var rs = result.d;
                        if (rs == 'c_yes') {
                            Alerta("Reporte generado de forma exitosa", "success");
                            window.open("/ACADEMIA/reportes/boletines/rpt-consolidado.aspx"); // Logros de la asiganturas y logros
                        }
                        $("#btnGenerar").removeAttr('disabled');
                    },
                    error: function (result) {
                        Modal("Server: Error al generar este reporte.", "Error de sistema");
                        $("#btnGenerar").removeAttr('disabled');
                    }
                });
                btn.button('reset')
            });
        });


           
    }
   

