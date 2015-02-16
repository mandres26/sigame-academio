using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BLL;
using ENTIDADES;
using System.Collections.Generic;
namespace PRUEBAS
{
    [TestClass]
    public class gruposTEST
    {
        gruposDTO ob = new gruposDTO();
        GestionGrupos r = new GestionGrupos();
        gruposDTO prueba = new gruposDTO();
        List<gruposDTO> lista = new List<gruposDTO>();
        //--------------------------------------------------------------
        [TestMethod]
        public void r_grupo()
        {
            string m;
            ob.id_grupo = "5A";
            ob.id_grado = "5";
            ob.id_aula = "A";
            ob.año = "2013";
       //     ob.id_aula = "ESPECIAL";
            m = r.r_grupo(ob);
            Assert.AreEqual("¡Se agregó el grupo exitosamente!", m);
        }
        //--------------------------------------------------------------
      //  [TestMethod]
        //public void m_grupo()
        //{
        //    string m;
        //    ob.id_grado = "5";
        //    ob.id_aula = "B";
        //    ob.año = "2014";
        //    ob.jornada = "ESPECIAL";
        //    m = r.m_grupo("5A", ob);
        //    Assert.AreEqual("¡Se modifico el registro del grupo exitosamente.!", m);
        //}
        [TestMethod]
        public void e_grupo()
        {
            string m;
            m = r.e_grupo("5A");
            Assert.AreEqual("¡Eliminación Exitosa.!", m);
        }
        [TestMethod]

        public void c_grupo()
        {
            // Esta prueba de lista solo se ve al depurar y en la variable ob2
            ob = r.c_grupo("5A");
            Assert.IsNotNull(ob);
        }
        [TestMethod]
        public void c_grupos()
        {
            // Esta prueba de lista solo se ve al depurar y en la variable lista
            lista = r.c_grupos();
            Assert.IsNotNull(lista);
        }
    }
}
