using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BLL;
using ENTIDADES;
using System.Collections.Generic;
namespace PRUEBAS
{
    [TestClass]
    public class personasTEST
    {
        personasDTO.personass ob = new personasDTO.personass();
        GestionPersonas r = new GestionPersonas();
        List<personasDTO.personass> lista = new List<personasDTO.personass>();
        //--------------------------------------------------------------
        [TestMethod]
        public void r_persona()
        {
            string m;
            ob.id = "888";
            ob.id_tipo = "CC";
            ob.nombres = "LUIS RAFAEL";
            ob.apellidos = "SILVA MORENO";
            ob.cel = ""; 
            ob.telefono = "";
            ob.rol = "PROFESOR"; // NO PUEDE FALTAR   
            ob.rol_secundario = "PROFESOR"; // NO PUEDE FALTAR
            ob.email = "";
            ob.f_naci = "";// NO PUEDE FALTAR
            ob.edad = "21";
            ob.direccion = "CLL34 #43 CASIMIRO";
            ob.jornada = "ESPECIAL"; // NO PUEDE FALTAR
            ob.sexo = "M";
            m = r.r_persona(ob);
            Assert.AreEqual("¡Se agregó la persona correctamente", m);
        }
        //--------------------------------------------------------------
        [TestMethod]
        public void m_persona()
        {
            string m;
            ob.id_tipo = "CC";
            ob.nombres = "LUIS CAMILO";
            ob.apellidos = "SILVA MORENO";
            ob.cel = "3001232123";
            ob.telefono = "5789878";
            ob.rol = "PROFESOR";// NO PUEDE FALTAR
            ob.email = "LUISSIVAL@COMPRILET.EDU.CO";
            ob.f_naci = "12/08/1990"; // NO PUEDE FALTAR
            ob.edad = "21";
            ob.direccion = "CLL34 #43 CASIMIRO";
            ob.jornada = "MAÑANA"; // NO PUEDE FALTAR
            ob.sexo = "M";
            m = r.m_persona("88888888", ob);
            Assert.AreEqual("¡Se modifico el usuario correctamente.!", m);
        }
        [TestMethod]
        public void e_persona()
        {
            string m;
            ob.id = "88888888";
            m = r.e_persona(ob);
            Assert.AreEqual("¡Eliminacion exitosa!", m);
        }
        [TestMethod]

        public void c_persona()
        {
            // Esta prueba de lista solo se ve al depurar y en la variable ob2
            ob = r.c_persona("88888888");
            Assert.IsNotNull(ob);
        }
        [TestMethod]
        public void c_personasXidRol() // aca tengo problemas. ARREGLAR LUEGO
        {
            // Esta prueba de lista solo se ve al depurar y en la variable lista
            lista = r.c_personasXRol("ESTUDIANTE");
            Assert.IsNotNull(lista);
        }
       
    }
}
