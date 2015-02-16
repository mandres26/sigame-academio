using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ENTIDADES;
using BLL;
using System.Collections.Generic;

namespace PRUEBAS
{
    [TestClass]
    public class asignaturasTEST
    {
        asignaturasDTO ob = new asignaturasDTO();
        GestionAsignaturas r = new GestionAsignaturas();
        List<asignaturasDTO> lista = new List<asignaturasDTO>();
        [TestMethod]
        public void r_asignatura()
        {
            string m;
            ob.id="ING4";
            ob.nombre = "INGLES";
            ob.horas = "2";
            m = r.r_asignatura(ob);
            Assert.AreEqual("¡Se agregó la asignatura exitosamente!", m);
        }
        [TestMethod]
        public void m_asignatura()
        {
            string m;
            ob.id = "ING";
            ob.nombre = "INGLA";
            ob.horas = "2";
            m = r.m_asignatura("ING",ob);
            Assert.AreEqual("¡Se modifico el registro de la asignatura exitosamente.!", m);
        }
        [TestMethod]
        public void e_asignatura()
        {
            string m;
            m = r.e_asignatura("ING3");
            Assert.AreEqual("¡Eliminación Exitosa.!", m);
        }
        [TestMethod]

        public void c_asignatura()
        {
            // Esta prueba de lista solo se ve al depurar y en la variable ob2
            ob = r.c_asignatura("ING");
            Assert.IsNotNull(ob);
        }
        [TestMethod]
        public void c_asignaturas()
        {
            // Esta prueba de lista solo se ve al depurar y en la variable lista
            lista = r.c_asignaturas();
            Assert.IsNotNull(lista);
        }
    }
}
