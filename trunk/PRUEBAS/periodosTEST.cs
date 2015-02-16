using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BLL;
using ENTIDADES;
using System.Collections.Generic;

namespace PRUEBAS
{
    [TestClass]
    public class periodosTEST
    {
        periodosDTO ob = new periodosDTO();
        GestionPeriodo r = new GestionPeriodo();
        List<periodosDTO> lista = new List<periodosDTO>();
        [TestMethod]
        public void r_periodo()
        {
            string m;
            ob.id = "I";
            m = r.r_periodo(ob);
            Assert.AreEqual("¡Se agregó el periodo correctamente", m);
        }
        [TestMethod]
        public void c_periodo()
        {
            // Esta prueba de lista solo se ve al depurar y en la variable ob2
            ob = r.c_periodo("I");
            Assert.IsNotNull(ob);
        }
        [TestMethod]
        public void c_periodos()
        {
            // Esta prueba de lista solo se ve al depurar y en la variable lista
            lista = r.c_periodos();
            Assert.IsNotNull(lista);
        }
        [TestMethod]
        public void e_periodo()
        {
            string m;
            ob.id = "I";
            m = r.e_periodo(ob);
            Assert.AreEqual("¡Eliminacion exitosa!", m);
        }
    }
}
