using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ENTIDADES;
using BLL;
using System.Collections.Generic;

namespace PRUEBAS
{
    [TestClass]
    public class matriculasTEST
    {
        List<matriculas1DTO.gradosProfesorDTO> lis = new List<matriculas1DTO.gradosProfesorDTO>();
        List<matriculas1DTO.materiasProfesorDTO> li = new List<matriculas1DTO.materiasProfesorDTO>();
        GestionMatriculass r = new GestionMatriculass();
        //----------------------------------------------------------------------------------------------------
        [TestMethod]
        public void c_asignaturasProfe()
        {
            li = r.c_asignaturasProfe("134556");
            Assert.IsNotNull(lis);
        }
        //---------------------------------------------------------------------------------------------------
        [TestMethod]
        public void c_gradosProfesor()
        {
            lis = r.c_gradosProfesor("134556");
            Assert.IsNotNull(lis);
        }        
        //-----------------------------------------------------------------------------------------------------
        [TestMethod]
        public void r_matricula()
        {
            //matriculas1DTO.matricula1s ob = new matriculas1DTO.matricula1s();
            //matriculas1DTO.matricula1s pr = new matriculas1DTO.matricula1s();
            //ob.id_asignatura = "ESP";
            //ob.id_grupo = "16";
            //ob.id_profesor = "19";
            //string m = r.r_matriculaProfe(ob);
            //Assert.IsNotNull(m);
        }
        //-----------------------------------------------------------------------------------------------------
         [TestMethod]
        public void e_matricula()
        {
            matriculas1DTO.matriculaDTO ob = new matriculas1DTO.matriculaDTO();
             ob.id_asignatura="ESP";
             ob.id_grupo="1";
             ob.id_profesor = "134556";
             string m = r.e_matriculaProfe(ob);
             Assert.IsNotNull(ob);
        }
        //===========================MATRICULA 2 (ESTUDIANTES)=================================================
        matriculas2DTO.matricula2s ob2 = new matriculas2DTO.matricula2s();
        matriculas2DTO.matricula2s ob = new matriculas2DTO.matricula2s();
        [TestMethod]
        public void r_matriculaEstudiante()
        {
            ob2.id_acudiente = "1345322";
            ob2.id_estudiante = "1657556";
            ob2.id_grupo = "13";
            string m = r.r_matriculaEstudiante(ob2);
            Assert.IsNotNull(m);
        }
        //----------------------------------------------------------------------------------
        [TestMethod]
        public void e_matriculaEstudiante()
        {
            matriculas2DTO.matriculaDTO ob = new matriculas2DTO.matriculaDTO();
            ob.id_acudiente = "1345322";
            ob.id_estudiante = "1657556";
            ob.id_grupo = "13";
            string m = r.e_matriculaEstudiante(ob);
            Assert.IsNotNull(m);
        }
    }
}
