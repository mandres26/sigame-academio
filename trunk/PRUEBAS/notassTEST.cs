using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ENTIDADES;
using BLL;
using System.Collections.Generic;
namespace PRUEBAS
{
    [TestClass]
    public class notassTEST
    {
        //GestionNotass r = new GestionNotass();
        GestionNotass rr = new GestionNotass();
        notasDTO.notass no = new notasDTO.notass();
        List<notasDTO.notass> li = new List<notasDTO.notass>();
        //---------------------------------------------------------------------------
        [TestMethod]
        public void r_nota()
        {
            //no.referencia = "dd";
            no.id_estudiante = "134534";
            no.id_asignatura = "ING2";
            no.id_grupo = "5";
            no.id_periodo = "3";
            no.id_profesor = "1085322";
            no.id_logro = "IDA";
            no.nota = "4";
            no.equivalencia = "kkkkkkk";
            string mes = rr.r_nota(no);
            Assert.IsNotNull(mes);
        }
        //--------------------------------------------------------------
        [TestMethod]
        public void c_notasXgrupoXperiodo()
        {
            no.id_grupo = "1";
            no.id_periodo = "1";
            no.id_profesor = "134556";
            //li = rr.c_notasXgrupoXperiodo(no);
            //Assert.IsNotNull(li);
        }
        //--------------------------------------------------------------
        [TestMethod]
        public void e_notas()
        {
            no.id_grupo = "5";
            no.id_periodo = "3";
            no.id_profesor = "1085322";
            string mess = rr.e_nota(no);
            Assert.IsNotNull(mess);
        }
        //--------------------------------------------------------------
    }
}
