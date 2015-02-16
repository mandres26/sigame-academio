using System;
using ENTIDADES;
using BLL;
//using DAL;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PRUEBAS
{
    [TestClass]
    public class gradosTEST
    {
        gradosDTO ob = new gradosDTO();
        gradosDTO ob2 = new gradosDTO();
        List<gradosDTO> lista = new List<gradosDTO>();
        GestionGrados r = new GestionGrados();

        [TestMethod]
        public void r_grado()
        {
            string m;
            ob.id_grado = "88";
            ob.nom_grado = "OCTAVOdd";
            m = r.r_grado(ob);
            Assert.AreEqual("¡Se agregó el grado exitosamente!", m);
        }
        [TestMethod]
        public void c_grado()
        {
            // Esta prueba de lista solo se ve al depurar y en la variable ob2
            ob2 = r.c_grado("8");
            Assert.IsNotNull(ob2);
        }
        [TestMethod]
        public void c_grados()
        {
            // Esta prueba de lista solo se ve al depurar y en la variable lista
            lista = r.c_grados();
            Assert.IsNotNull(lista);
        }

        [TestMethod]
        public void e_grado()
        {
            string m;
            m = r.e_grado("8");
            Assert.AreEqual("¡Eliminación Exitosa.!", m);
        }
    }
}
