       function cargar_pagina() {
           var username = localStorage.getItem('SeccionNombres') + " " + localStorage.getItem('SeccionApellidos');
           $("#userName").text(username);
           if (localStorage.getItem('SeccionSexo') == "MASCULINO") {
               $('#imagenUser').attr("src", "/BOOTSTRAP/img/avatar-hombre.png");
           } else if (localStorage.getItem('SeccionSexo') == "FEMENINO") {
               $('#imagenUser').attr("src", "/BOOTSTRAP/img/avatar-mujer.png");
           } else {
               $('#imagenUser').attr("src", "/BOOTSTRAP/img/avatar-sinSexo.png");
           }
       }
