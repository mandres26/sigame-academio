using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ENTIDADES;
using DAL;
using System.Collections.Generic;

namespace PRUEBAS
{
    [TestClass]
    public class reportesTEST
    {
        RepoReport r = new RepoReport();
        //------------------------------t--------------------------------------
        [TestMethod]
        public void OrganizarPuestosBloetinFinal()
        {
            string idGrupo = "2015-5A";
            List<puestosDef> u = new List<puestosDef>();
            u = r.OrganizarPuestosBoletinFinal(idGrupo);
        }

        //------------------------------t--------------------------------------
        [TestMethod]
        public void c_reporteFinal()
        {
            string idGrupo = "2015-5A";
            string idEst  ="1";
           string u = r.c_reporteFinal(idEst,idGrupo );
        }

        [TestMethod]
        public void AjustarN()
        {
            string nota = "9.75";
            float u = r.AjustarN(nota);
        }


    }
}
