/// <reference path="test.js" />
$(document).ready(function () {
    var P = {};
    var S;
    var ROLPrincipal, jsonData;
    var ROLSecundario;
    ///-----  valiamos que ya hayan secciones  -------
    if (localStorage.getItem('SeccionRol') == "PROFESOR") {
        setTimeout("window.location.href = 'profesor.html'", 0); //tiempo expresado en milisegundos
    }
    ///------------------------------------------------
    nuevo();
    $('#BtnSeccion').show();
    function nuevo() {
        $('#BtnSeccion').show();
        $("#imgload").hide();
        $("#Exito").hide();

        $("#iduser").val("");
       
        $("#pass").val("");
        $("#iduser").removeAttr('disabled');
        $("#pass").removeAttr('disabled');
        $("#iduser").focus();
    }
    $('#iduser').keyup(function (e) {
        if (e.keyCode == 13) {
            $("#imgload").show();
            $("#iduser").attr('disabled', 'disabled');
            $("#pass").attr('disabled', 'disabled');
            var btn = $('#BtnSeccion')
            btn.button('loading')
            $.ajax(".....").always(function () {
                Gestionar();

                btn.button('reset')
            });
        }
    });
    $('#pass').keyup(function (e) {
        if (e.keyCode == 13) {
            $("#imgload").show();
            $("#iduser").attr('disabled', 'disabled');
            $("#pass").attr('disabled', 'disabled');
            var btn = $('#BtnSeccion')
            btn.button('loading')
            $.ajax(".....").always(function () {
                Gestionar();
                $("#imgload").hide();
                btn.button('reset')
            });
        }
    });
    $('#BtnSeccion').click(function () { // Bot�n gestionar
        $("#imgload").show();
        $("#iduser").attr('disabled', 'disabled');
        $("#pass").attr('disabled', 'disabled');
        var btn = $(this)
        btn.button('loading')
        $.ajax(".....").always(function () {
            Gestionar();
            $("#imgload").hide();
            btn.button('reset')
        });
    });

    function chekform() {
        var valor = document.getElementById("iduser").value;
        var valor1 = document.getElementById("pass").value;
        if (valor == null || valor.length == 0 || /^\s+$/.test(valor)) {
            Modal("Sr(a). Ingrese su identificaci�n", "");
            $("#iduser").removeAttr('disabled');
            $("#pass").removeAttr('disabled');
            $("#imgload").hide();
            $("#Exito").hide();
            document.getElementById("iduser").focus();
            return false;
        } else if (valor1 == null || valor1.length == 0 || /^\s+$/.test(valor1)) {
            Modal("Sr(a). Ingrese su contrase�a", "");
            $("#iduser").removeAttr('disabled');
            $("#pass").removeAttr('disabled');
            $("#imgload").hide();
            $("#Exito").hide();
            document.getElementById("pass").focus();
            return false;
        }
    };

    function Gestionar() {
        $("#Exito").show();
        if (chekform() != false) {
            $('#BtnSeccion').hide();

            var dto = {
                id: $("#iduser").val(),
                password: $("#pass").val(),
                acceso: "",
                niu_mobil: ""
            };
            var URI = Dominio + "users";
            //alert(URI);
            $.ajax({
                type: "POST",
                url: URI,
                data: JSON.stringify(dto),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    if (result == null) {
                        Modal("Error al iniciar sesi�n. Se�or(a) verifique que su identificaci�n de seccion y contrase�a sean correctos o el servidor no se encuentra disponible ahora mismo. Reintente por favor.", "Problemas al iniciar");
                        nuevo();
                    }
                    else {
                        P = result;
                        if (P.acceso == 'FALSE') {
                            Modal("Uppss!. Se�or(a) usted se encuentra bloqueado en el sistema. No puede iniciar sesi�n. Contactese con la administraci�n del colegio.", " Usuario bloqueado.");
                            nuevo();
                        } else {
                            localStorage.setItem('SeccionRolPrimario', P.rol);
                            localStorage.setItem('SeccionRol', P.rol);
                            if (localStorage.getItem('SeccionRolPrimario') != "PROFESOR") {
                                Modal("Esta identificaci�n no pertenece a un profesor. Verifique que su identificaci�n de seccion y contrase�a sean correctos o el servidor no se encuentra disponible ahora mismo. Reintente por favor.", "Laidentificaci�n no es la correcta");
                                nuevo();
                            } else {
                                localStorage.setItem('SeccionAnoAcademico', P.ano);
                                localStorage.setItem('SeccionId', P.id);
                                localStorage.setItem('SeccionNombres', P.nombres);
                                localStorage.setItem('SeccionApellidos', P.apellidos);
                                localStorage.setItem('SeccionSexo', P.sexo);
                                localStorage.setItem('SeccionRolSecundario', P.rol_secundario);
                                localStorage.setItem('SeccionRolTerciario', P.rol_terciario);
                                var Rol = localStorage.getItem('SeccionRolPrimario');

                                //alert(JSON.stringify(localStorage.getItem('SeccionId')));
                                //Modal("Buien. cargao", "");
                                Iniciar(Rol);
                            }
                        }
                    }
                },
                error: function (result) {
                    Modal("Imposible la conexi�n a la base de datos del sistema", "Error al conectar");
                    alert(JSON.stringify(result));

                }
            });
        }
    }
    function Iniciar(rol) {
        // LUEGO ENVIAMOS A LA BITACORA
        cargarVigencia(); 
        CargarFechaSeccion();  
        var dtob = {
            seccion:"LOGIN",
            accion:  "INICIAR",
            usuario: localStorage.getItem('SeccionNombres') + " " + localStorage.getItem('SeccionApellidos'),
            id_usuario: localStorage.getItem('SeccionId'),
            observacion: "INICIADO POR LA APP DE NOTAS"
        };
        var URI = Dominio + "users";
        $.ajax({
            type: "PUT",
            url: URI,
            data: JSON.stringify(dtob),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                if (result == 'S') {
                    // Y FINALMENTE REDIRECCIONAMOS
                        setTimeout("window.location.href = 'cargando.html'", 200); //tiempo expresado en milisegundos
                        $("#imgload").hide();
                        nuevo();
                } else {
                    nuevo();
                    $("#imgload").hide();
                }
            },
            error: function (result) {
                $('#BtnSeccion').show();
            }
        });
    }
    function cargarVigencia() {
        var vigencia = {
            id: "VIGENCIA"
        };
        var URI = Dominio + "users";
        $.ajax({
            type: "DELETE",
            url: URI,
            data: JSON.stringify(vigencia),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                localStorage.setItem('SeccionVigencia', resultad);
            },
            error: function (result) {
            }
        });
    }
    function CargarFechaSeccion() {
        var URI = Dominio + "users";
        $.ajax({
            type: "GET",
            url: URI,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                localStorage.setItem('SeccionFechaS', resultad);
            },
            error: function (result) {
            }
        });
    }
    $('#Btn32').click(function () { // PROFESOR Y DIRECTOR DEL GRADO 5 (JULIO ORTIZ)
        $("#iduser").val("77014997");
        $("#pass").val("isabella");
    });
});

		


