
//$(document).ready(function () {
WinMove();
    var idOld;
    var conta;
    var Pos;
    var P = {};
    var filtro;
    var NombreB;
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
            nuevo();
            
            CargarPersonas();
            $("#formPPAL").show();
            $("#imgload").hide();
        });
    }
    function CargarPersonas() {
        $.ajax({
            type: "POST",
            url: "/WS/personas.asmx/c_personasXBusque",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {

                var dataPersonas = result.d;
                var PersonasSource =
                     {
                         localdata: dataPersonas,
                         datatype: "json",
                         datafields: [
                             { name: 'persona', type: 'string' }
                         ]
                     };
                var PersonasAdapter = new $.jqx.dataAdapter(PersonasSource, { autoBind: true });
                $("#txtId").jqxComboBox({ selectedIndex: 0, source: PersonasAdapter, promptText: "ESCRIBA O SELECCIONE...", displayMember: "persona", valueMember: "persona", width: 400, height: 21 });
            },
            error: function (result) {
            }

        });
    }

    function FiltrosDisponibles() {
        var A;
        $("#comboFiltros").html("");
        A += '<option value="0">POR X NOMBRES</option>';
        A += '<option value="1">POR X APELLIDOS</option>';
        $("#comboFiltros").append(A);
    }

     $('#txtId').keyup(function (e) {
        if (e.keyCode == 13) {
            var btn = $('#btnL')
            btn.button('loading')
            $.ajax(".....").always(function () {
                var arr = $('#txtId').val().split(' ');
                NombreB = arr[0] + " " + arr[1];
                filtrarXNombres();
                btn.button('reset')
            });

        }
    });

    var array = new Array();
   
    $('#btnL').click(function () { // Botón gestionar el listado
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            var arr = $('#txtId').val().split(' ');
            NombreB = arr[0] + " " + arr[1];
            filtrarXNombres();
            btn.button('reset')
        });
    });
   
    function filtrarXNombres() {
        if (NombreB == '') {
            Alerta("Error: Digite una consulta en el cuadro de texto y luego haga clic en el botón <strong> Listar todos </strong>para continuar.", "danger");
            $('#txtId').focus();
            $('#f-grilla').hide();
        }
        else {
            var dto = {};
            dto.id = NombreB;
            jsonData = "{'dto':" + JSON.stringify(dto) +
                      ",'dtob':" + JSON.stringify(getBitacora("PERSONAS", "LISTAR ", "FILTRO POR NOMBRES")) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/personas.asmx/c_personasXNombres",
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
                        $("#f-grilla").hide();
                    }
                    else {
                        Alerta("Filtro del personas por nombres realizado de forma exitosa", "success");
                        P = result.d;
                        titleGrilla();
                        $.each(P, function (i, item) {
                            AddItemGrilla(item);
                        })
                    }
                },
                error: function (result) {
                    Modal("Server: Error de servidor.", "Servidor no disponible");
                }
            });
        }
    }
  

   $('#btnN').click(function () { // Botón nuevo
        nuevo();
    });
    function nuevo() {
        Alerta("Escoja el tipo de <strong>filtro</strong> que desea aplicar a la consulta del personal registrado en el sistema y luego haga clic en el botón <strong>Listar</strong>.", "info");
        $('#f-personal').hide();
        $('#txtId').val("");
        $('#f-grilla').hide();
        $('#botones').hide();
        pos = 0;
    }
    //grilla para  llistar
    function titleGrilla() {
        $("#grilla").html("");
        $("#Ltotal").text("");
        var newtitle = "<tr>";
        newtitle += '<th class="col-sm-1">Id</th>';
        newtitle += '<th class="col-sm-1 text-primary">Apellidos</th>';
        newtitle += '<th class="col-sm-1 text-primary ">Nombres</th>';
        newtitle += '<th class="col-sm-1">Telefonos</th>';
        newtitle += '<th class="col-sm-1">Celular</th>';
        newtitle += '<th class="col-sm-1">Dirección</th>';
        newtitle += '<th class="col-sm-1">Rol1</th>';
        newtitle += '<th class="col-sm-1">Rol2</th>';
        newtitle += '<th class="col-sm-1">Rol3</th>';
        newtitle += '<th class="col-sm-1">Edad</th>';
        newtitle += '<th class="col-sm-1">F_Naci</th>';
        newtitle += "</tr>";
        $("#grilla").append(newtitle);
    };
    var AddItemGrilla = function (item) { // CONTENIDO DE LA GRILLA
        conta++;
        array.push(item);
        var nuevaCol = "<tr>";
        nuevaCol += "<td>" + item.id + "</td>";
        nuevaCol += "<td class='text-danger'>" + item.apellidos + "</td>";
        nuevaCol += "<td class='text-danger'>" + item.nombres + "</td>";
        nuevaCol += "<td>" + item.telefono + ";AUX: " + item.telefono2 + "</td>";
        nuevaCol += "<td>" + item.cel + "</td>";
        nuevaCol += "<td>" + item.direccion + ";AUX: " + item.direccion2 + "</td>";
        nuevaCol += "<td>" + item.rol + "</td>";
        nuevaCol += "<td>" + item.rol_secundario + "</td>";
        nuevaCol += "<td>" + item.rol_terciario + "</td>";
        nuevaCol += "<td>" + item.edad + "</td>";
        nuevaCol += "<td>" + item.f_naci + "</td>";
        nuevaCol += "</tr>";
        $("#Ltotal").text("Total:" + conta);
        $("#grilla").append(nuevaCol);
    };
    //--------------------------------------------------------------------------------------------------
//});
