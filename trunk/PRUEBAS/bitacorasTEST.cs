using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BLL;
using ENTIDADES;
using System.Collections.Generic;
namespace PRUEBAS
{
    [TestClass]
    public class bitacorasTEST
    {
        bitacorasDTO ob = new bitacorasDTO();
        GestionBitacoras r = new GestionBitacoras();
        List<bitacorasDTO> lista = new List<bitacorasDTO>();
        [TestMethod]
        public void r_bitacora()
        {
            string m;
            ob.accion = "REGISTRAR";
            ob.id_bitacora = "";
            ob.seccion = "PRUEBAS";
            ob.usuario = "LUIS SILVA";
            ob.id_usuario = "12345";
            ob.fecha = "12/08/2016";
            ob.observacion = "NINGUNA";
            m = r.r_bitacora(ob);
            Assert.AreEqual("S", m);
        }
        [TestMethod]
        public void v_bitacora()
        {
            string m;
            m = r.vaciarBitacora();
            Assert.AreEqual("S", m);
        }
        [TestMethod]
        public void c_bitacoras()
        {
            // Esta prueba de lista solo se ve al depurar y en la variable lista
            lista = r.c_bitacora();
            Assert.IsNotNull(lista);
        }
        [TestMethod]
        public void c_bitacoraAccion()
        {
            // Esta prueba de lista solo se ve al depurar y en la variable lista
            lista = r.c_bitacoraAccion("REGISTRAR");
            Assert.IsNotNull(lista);
        }
        [TestMethod]
        public void c_bitacoraSeccion()
        {
            // Esta prueba de lista solo se ve al depurar y en la variable lista
            lista = r.c_bitacoraSeccion("PRUEBAS");
            Assert.IsNotNull(lista);
        }
        [TestMethod]
        public void c_bitacoraCodUsuario()
        {
            // Esta prueba de lista solo se ve al depurar y en la variable lista
            lista = r.c_bitacoraCodUsuario("12345"); // consulta por id del usuario
            Assert.IsNotNull(lista);
        }
        [TestMethod]
        public void c_bitacorasFecha()
        {
            // Esta prueba de lista solo se ve al depurar y en la variable lista
           // string fecha = "12/08/2016";
          //  lista = r.c_bitacoraFecha(fecha);
            Assert.IsNotNull(lista);
        }
    }
}
