using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ENTIDADES;
using BLL;
using System.Collections.Generic;

namespace PRUEBAS
{
    [TestClass]
    public class usuariosTEST
    {
        usuariosDTO ob = new usuariosDTO();
        GestionUsuarios r = new GestionUsuarios();
        List<personasDTO.UsuariosDTOs> lista = new List<personasDTO.UsuariosDTOs>();
        //--------------------------------------------------------------
       
        //--------------------------------------------------------------
        [TestMethod]
        public void m_password()
        {
            string m;
            ob.id = "88888888";
            ob.password = "0000"; // // la nueva contraseña
            m = r.m_usuario(ob);
            Assert.AreEqual("Password actualizada existosamente", m);
        }
         [TestMethod]
        public void c_usuariosSistema()
        {
            // Esta prueba de lista solo se ve al depurar y en la variable ob2
            lista = r.c_datosUsuariosSistema(); // TENGO PROBLEMAS ACA. REVISAR LUEGO
            Assert.IsNotNull(lista);
        }
    }
}
