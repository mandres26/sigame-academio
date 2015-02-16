using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BLL;
using ENTIDADES;
namespace PRUEBAS
{
    [TestClass]
    public class horariosTEST
    {
        [TestMethod]
        public void TestMethod1()
        {
            GestionHorarios m = new GestionHorarios();
            
           horariosDTO J = new horariosDTO();
             J.id_asignatura="ART";
             J.horaI="06:00";
             J.horaF="10:59";
             J.id_grupo="2013-0A";
             J.jornada="ESPECIAL";
             J.dia = "LUNES";
             m.r_horario(J);
        }
    }
}
