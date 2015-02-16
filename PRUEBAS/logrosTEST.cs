using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BLL;
using ENTIDADES;
using System.Collections.Generic;

namespace PRUEBAS
{
    [TestClass]
    public class logrosTEST
    {
        logrosDTO ob = new logrosDTO();
        GestionLogros r = new GestionLogros();
        logrosDTO prueba = new logrosDTO();
        List<logrosDTO> lista = new List<logrosDTO>();
        //--------------------------------------------------------------
        [TestMethod]
        public void r_logro()
        {
            string m;
            ob.id_logro = "9I8";
            ob.descripcion = "BAJO RENDIMIENTO EN LECTURA y ESCRITURA";
            ob.id_grado = "3";
            ob.id_asignatura = "ING2";
            m = r.r_logro(ob);
            Assert.AreEqual("¡Se agregó el logro exitosamente!", m);
        }
        //--------------------------------------------------------------
         [TestMethod]
        public void m_logro()
        {
            string m;
            ob.id_logro = "I";
            ob.descripcion = "ESTA ES UNA MODIFICACIÓN AL LOGRO : I POR GRADO:4";
            ob.id_grado = "3";
            ob.id_asignatura = "ING";
            m = r.m_logro("I", ob);
            Assert.AreEqual("Logro modificado exitosamente", m);
        }
        [TestMethod]
        public void e_logro()
        {
            string m;
            m = r.e_logro("I");
            Assert.AreEqual("¡Eliminacion Exitosa!", m);
        }
        [TestMethod]

        public void c_logro()
        {
            // Esta prueba de lista solo se ve al depurar y en la variable ob2
            ob = r.c_logro("I");
            Assert.IsNotNull(ob);
        }
        [TestMethod]
        public void c_logros()
        {
            // Esta prueba de lista solo se ve al depurar y en la variable lista
            lista = r.c_logros();
            Assert.IsNotNull(lista);
        }
         [TestMethod]
        public void c_logrosXasignatura()
        {
            // Esta prueba de lista solo se ve al depurar y en la variable lista
            lista = r.c_logrosXgradoXasig("3","ING");
            Assert.IsNotNull(lista);
        }

    }
}
