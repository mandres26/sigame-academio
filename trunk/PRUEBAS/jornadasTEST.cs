using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ENTIDADES;
using BLL;
using System.Collections.Generic;

namespace PRUEBAS
{
    [TestClass]
    public class jornadasTEST
    {
        jornadasDTO ob = new jornadasDTO();
        GestionJornadas r = new GestionJornadas();
        List<jornadasDTO> lista = new List<jornadasDTO>();
        [TestMethod]
        public void r_jornada()
        {
            string m;
            ob.id = "SABATINA";
            m = r.r_jornada(ob);
            Assert.AreEqual("¡Se agregó la jornada correctamente!", m);
        }
        [TestMethod]
        public void c_jornada()
        {
            // Esta prueba de lista solo se ve al depurar y en la variable ob2
            ob = r.c_jornada("SABATINA");
            Assert.IsNotNull(ob);
        }
        [TestMethod]
        public void c_jornadas()
        {
            // Esta prueba de lista solo se ve al depurar y en la variable lista
            lista = r.c_jornadas();
            Assert.IsNotNull(lista);
        }
        [TestMethod]
        public void e_jornada()
        {
            string m;
            m = r.e_jornada("SABATINA");
            Assert.AreEqual("¡Eliminacion exitosa!", m);
        }
    }
}
