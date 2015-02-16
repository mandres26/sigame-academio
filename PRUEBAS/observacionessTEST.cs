using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BLL;
using ENTIDADES;
using System.Collections.Generic;

namespace PRUEBAS
{
    [TestClass]
    public class observacionessTEST
    {
        GestionObservacioness r = new GestionObservacioness();
        List<observacionesDTO.observatorioss> li = new List<observacionesDTO.observatorioss>();
        observacionesDTO.observatorioss ob = new observacionesDTO.observatorioss();
        //-------------------------------------------------------------------
        [TestMethod]
        public void c_observacion()
        {
            //string idGrupo = "3";
            //string idPeriodo = "1";
            //string idProfesor = "1345560";
            //li = r.c_observacionXgrupoXperido(idGrupo, idPeriodo, idProfesor);
            //Assert.IsNotNull(li);
        }
        //-------------------------------------------------------------------
        [TestMethod]
        public void EliminarObservacion()
        {
            observacionesDTO.observatorioss obj = new observacionesDTO.observatorioss();
            obj.id_estudiante = "1656556";
            obj.id_asignatura = "MAT";
            obj.id_grupo = "4";
            obj.id_periodo = "2";
            obj.id_profesor = "1345560";
            obj.observacion = "Peleo coperiquitan";
            obj.fecha = "2014-10-09 02:10:21";
            string m = r.e_observacion(obj);
            Assert.AreEqual("¡Eliminación exitosa!", m);
        }
        //-------------------------------------------------------------------
        [TestMethod]
        public void r_oservacion()
        {
            ob.id_estudiante = "1656556";
            ob.id_asignatura = "MAT";
            ob.id_grupo = "4";
            ob.id_periodo = "2";
            ob.id_profesor = "1345560";
            ob.observacion = "Peleo coperiquitan";
            ob.fecha ="2014-10-09 02:10:21";
            string mess = r.r_observacion(ob);
            Assert.IsNotNull(mess);
        }
        //-------------------------------------------------------------------    

        [TestMethod]
        public void BuscarPorEstudiante()
        {
            //li = r.b_porEstudiante("1657556");
            Assert.IsNotNull(li);
        }
        //--------------------------------------------------------------------
        [TestMethod]
        public void GuardarObservacion()
        {
            string m;
            ob.id_asignatura = "10";
            ob.id_estudiante = "101756";
            ob.id_grupo = "4";
            ob.id_periodo = "1";
            ob.id_profesor = "1345560";
            ob.observacion = "aaa";
            ob.fecha = Convert.ToString(System.DateTime.Now);
            m = r.r_observacion(ob);
            Assert.AreEqual("¡Se agrego la observación exitosamente.!", m);
        }
        //-------------------------------------------------------------------
        [TestMethod]
        public void ModificarObservacion()
        {
            string m = null;
            ob.id_asignatura = "10";
            ob.id_estudiante = "101756";
            ob.id_grupo = "4";
            ob.id_periodo = "1";
            ob.id_profesor = "1345560";
            ob.observacion = "HHH";
            ob.fecha = Convert.ToString(System.DateTime.Now);
            Assert.AreEqual("¡Se modifico la observación correctamente.!", m);
        }
        //---------------------------------------------------------------------       
    }
}
