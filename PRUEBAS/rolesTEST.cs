using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ENTIDADES;
using BLL;
using System.Collections.Generic;


namespace PRUEBAS
{
    [TestClass]
    public class rolesTEST
    {

        rolesDTO ob = new rolesDTO();
        GestionRoles r = new GestionRoles();
        List<rolesDTO> lista = new List<rolesDTO>();
        [TestMethod]
        public void r_rol()
        {
            string m;
            ob.id = "SECRETARIA";
            m = r.r_rol(ob);
            Assert.AreEqual("¡Se agregó el rol exitosamente!", m);
        }
        [TestMethod]
        public void c_rol()
        {
            // Esta prueba de lista solo se ve al depurar y en la variable ob2
            ob = r.c_rol("SECRETARIA");
            Assert.IsNotNull(ob);
        }
        [TestMethod]
        public void c_roles()
        {
            // Esta prueba de lista solo se ve al depurar y en la variable lista
            lista = r.c_roles();
            Assert.IsNotNull(lista);
        }
        [TestMethod]
        public void e_rol()
        {
            string m;
            m = r.e_rol("SECRETARIA");
            Assert.AreEqual("¡Eliminación exitosa", m);
        }
    }
}
