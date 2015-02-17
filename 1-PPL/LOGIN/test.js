/// <reference path="test.js" />
$(document).ready(function () {
    var P = {};
    var S;
    var ROLPrincipal, jsonData;
    var ROLSecundario;

    // validamos que ya hayan seciones 
    ///------------------------------------------------
    if (localStorage.getItem('SeccionRol') == "ACUDIENTE") {
        setTimeout("window.location.href = 'acudiente.html'", 0); //tiempo expresado en milisegundos
    }
    else if (localStorage.getItem('SeccionRol') == "PROFESOR") {
        setTimeout("window.location.href = 'profesor.html'", 0); //tiempo expresado en milisegundos
    }
    else if (localStorage.getItem('SeccionRol') == "ADMINISTRATIVO") {
        setTimeout("window.location.href = 'admin.html'", 0); //tiempo expresado en milisegundos
    }
    else if (localStorage.getItem('SeccionRol') == "SUPER") {
        setTimeout("window.location.href = 'super.html'", 0); //tiempo expresado en milisegundos
    } 
    ///------------------------------------------------

    $('#Urlplantel').click(function () {
        document.location.href = urlplantel;
    });
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

    var getDatos = function () {
        var u = {};
        u.id = $("#iduser").val();
        u.password = $("#pass").val();
        u.acceso = "true";
        return u;
    };

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

    $('#BtnSeccion').click(function () { // Botón gestionar
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
            Modal("Sr(a). Ingrese su identificación", "");
            $("#iduser").removeAttr('disabled');
            $("#pass").removeAttr('disabled');
            $("#imgload").hide();
            $("#Exito").hide();
            document.getElementById("iduser").focus();
            return false;
        } else if (valor1 == null || valor1.length == 0 || /^\s+$/.test(valor1)) {
            Modal("Sr(a). Ingrese su contraseña", "");
            $("#iduser").removeAttr('disabled');
            $("#pass").removeAttr('disabled');
            $("#imgload").hide();
            $("#Exito").hide();
            document.getElementById("pass").focus();
            return false;
        }
    };
    var redirecciones = {
        redireccionAdmin: function () {
            document.location.href = '/admin.html';
        },

        redireccionProfesor: function () {
            document.location.href = '/profesor.html';
        },
        redireccionAcudiente: function () {
            document.location.href = '/acudiente.html';
        },
        redireccionSuper: function () {
            document.location.href = '/acudiente.html';
        }
    };

    function Gestionar() {
        $("#Exito").show();
        if (chekform() != false) {
            $('#BtnSeccion').hide();
            jsonData = "{'dto':" + JSON.stringify(getDatos()) + "}";
            $.ajax({
                type: "POST",
                url: "/WS/users.asmx/c_iniciar",
                data: jsonData,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                success: function (result) {
                    
                    if (result.d == null) {
                        Modal("Error al iniciar sección. Señor(a) verifique que su identificación de seccion y contraseña sean correctos o el servidor no se encuentra disponible ahora mismo. Reintente por favor.", "Problemas al iniciar");
                        nuevo();
                    }
                    else {
                        P = result.d;
                        //PRIMERO VERIFICO QUE NO LA HAYAN BLOQUEADO
                        
                        if (P.acceso == 'FALSE') {
                            Modal("Uppss!. Señor(a) usted se encuentra bloqueado en el sistema. No puede iniciar sección. Contactese con la administración del colegio.", " Usuario bloqueado.");
                            nuevo();
                        } else {

                            localStorage.setItem('SeccionAnoAcademico', P.ano);

                            localStorage.setItem('SeccionId', P.id);
                            localStorage.setItem('SeccionNombres', P.nombres);
                            localStorage.setItem('SeccionApellidos', P.apellidos);
                            localStorage.setItem('SeccionSexo', P.sexo);

                            localStorage.setItem('SeccionRolPrimario', P.rol);
                            localStorage.setItem('SeccionRolSecundario', P.rol_secundario);
                            localStorage.setItem('SeccionRolTerciario', P.rol_terciario);
                            ROLPrincipal = P.rol;
                            ROLSecundario = P.rol_secundario;

                            if (localStorage.getItem('SeccionRolSecundario') == "ACUDIENTE") {
                                $("#ModalRol").modal("show");
                            }
                            else {
                                localStorage.setItem('SeccionRol', P.rol);
                                var Rol = localStorage.getItem('SeccionRol');
                                Iniciar(Rol);
                            }
                        }
                    }
                },
                error: function (result) {

                    Modal("Imposible la conexión a la base de datos del sistema", "Error al conectar");
                    nuevo();
                }
            });
        }
    }
   
    $('#btnSI').click(function () {
        localStorage.setItem('SeccionRol', ROLSecundario);
        var Rol = localStorage.getItem('SeccionRol');
        alert("Rol secundario seleccionado. Clic en aceptar para redireccionarlo.");
        Iniciar(Rol);

    });
    $('#btnNO').click(function () {
        localStorage.setItem('SeccionRol', ROLPrincipal);
        var Rol = localStorage.getItem('SeccionRol');
        Iniciar(Rol);
    });

    function Iniciar(rol) {
        // LUEGO ENVIAMOS A LA BITACORA


        cargarVigencia();
        CargarFechaSeccion();

        jsonData = "{'dtob':" + JSON.stringify(getBitacora("LOGIN", "INICIAR", "NINGUNA")) + "}"; //Registro de bitacora
        $.ajax({
            type: "POST",
            url: "/WS/users.asmx/b_iniciar",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                if (result.d == 'S') {
                  
                    // Y FINALMENTE REDIRECCIONAMOS
                    if (rol == "ADMINISTRATIVO") {
                        setTimeout("window.location.href = 'cargando.html'", 200); //tiempo expresado en milisegundos
                    } else if (rol == "SUPER") {
                        setTimeout("window.location.href = 'cargando.html'", 200); //tiempo expresado en milisegundos
                    } else if (rol == "PROFESOR") {
                        setTimeout("window.location.href = 'cargando.html'", 200); //tiempo expresado en milisegundos
                    } else if (rol == "ACUDIENTE") {
                        
                        setTimeout("window.location.href = 'cargando.html'", 200); //tiempo expresado en milisegundos
                    } else {
                        Modal("Error de congruencia: Este usuario contiene un rol que <strong> NO </strong> tiene un formulario principal habilitado.  ", "El formulario para este usuario no esta disponible");
                        $("#imgload").hide();
                        nuevo();
                    }
                   
                }else
                {
                    //Modal("Servidor no disponible. Intente otra vez.  ", "Servidor no disponible");
                    nuevo();
                    $("#imgload").hide();
                }
            },
            error: function (result) {
               
                //Modal("Servidor no disponible. Intente otra vez.  ", "Servidor no disponible");
                $('#BtnSeccion').show();
            }
        });
    }
    function cargarVigencia() {
        $.ajax({
            type: "POST",
            url: "/WS/users.asmx/vigencia",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (resultad) {
                localStorage.setItem('SeccionVigencia', resultad.d);
            },
            error: function (resultad) {
            }
        });
    }
    function CargarFechaSeccion() {
        $.ajax({
            type: "POST",
            url: "/WS/users.asmx/seccion",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (resultad) {
                localStorage.setItem('SeccionFechaS', resultad.d);
            },
            error: function (resultad) {
            }
        });
    }
    $('#Btn1').click(function () { // ADMI (KEYLA BLANCO)
        $("#iduser").val("97022221497");
        $("#pass").val("comprilet#R1234");
    });

    $('#Btn21').click(function () { // ACUDIENTE (COMPRILET DEFAULT)
        $("#iduser").val("11110001");
        $("#pass").val("comprilet#R1234");
    });
    $('#Btn22').click(function () { // ACUDIENTE SINDRY RUEDA
        $("#iduser").val("1064111848");
        $("#pass").val("comprilet#R1234");
    });

    $('#Btn31').click(function () { // PROFESOR Y ACUDIENTE (LUIS SILVA)
        $("#iduser").val("1124034673");
        $("#pass").val("112403467#R");
    });
    $('#Btn32').click(function () { // PROFESOR Y DIRECTOR DEL GRADO 5 (JULIO ORTIZ)
        $("#iduser").val("77014997");
        $("#pass").val("isabella");
    });
    $('#Btn33').click(function () { // PROFESOR (MICHAEL NAY)
        $("#iduser").val("1065603315");
        $("#pass").val("comprilet#R1234");
    });
    $('#Btn4').click(function () { // SUPER
        $("#iduser").val("SUPERADMIN");
        $("#pass").val("superadmin#R1234");
    });

    function Bitacora() {
        // LUEGO ENVIAMOS A LA BITACORA
        jsonData = "{'dtob':" + JSON.stringify(getBitacora("LOGIN", "INICIAR", "NINGUNA")) + "}"; //Registro de bitacora
        $.ajax({
            type: "POST",
            url: "/WS/users.asmx/b_iniciar",
            data: jsonData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: true,
            success: function (result) {
                if (result.d == 'S') {
                        Modal("Felicidades. Se guardó en la bitacora.","Avanza...");
                        $("#imgload").hide();
                        nuevo();
                } else {
                    Modal("Intenta otra vez.  Animo. ", "Error en el servicio");
                    nuevo();
                    $("#imgload").hide();
                }
            },
            
            error: function (result) {

                //alert("ALERTA 1:" + JSON.stringify(result));
                //Modal("Servidor no disponible. Intente otra vez.  ", "Servidor no disponible");
                $('#BtnSeccion').show();
            }
        });
    }
 
   
    

});
