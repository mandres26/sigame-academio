using ENTIDADES;
using BLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace PPLWEB.WS
{
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class matriculas : System.Web.Services.WebService
    {
        GestionMatriculass BLL = new GestionMatriculass();
        GestionBitacoras BLLB = new GestionBitacoras();
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<matriculas1DTO.materiasProfesorDTO> c_asignaturasProfe(dtoG dto) // OK  LO UTILIZO EN NOTAS
        {
            return BLL.c_asignaturasProfe(dto.id);
        }

        //---------------------------------- MATRICULAS DE PROFESORES-----------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string r_matriculaProfes(matriculas1DTO.matriculaDTO dto, bitacorasDTO dtob)  //OK
        {
            string m = BLL.r_matriculaProfe(dto);
            if (m != null)
            {
                if (m != "¡Esta matricula ya se encuentra asignada. Recuerde que usted no puede matricular el profesor en el mismo grupo con la misma asignatura dos veces!")
                {
                    if (m != "Se produjo un error en el servidor al intentar validar que no sea una matricula duplicada")
                    {
                        BLLB.r_bitacora(dtob);
                    }
                }
            }

            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string e_matriculaProfes(matriculas1DTO.matriculaDTO dto, bitacorasDTO dtob)  //OK)
        {
            string m = BLL.e_matriculaProfe(dto);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string r_matriculaDirector(matriculas1DTO.directorG_DTO dto, bitacorasDTO dtob)  //OK)
        {
            string m = BLL.r_matriculaDirector(dto);
            if (m != null)
            {
                if (m != "¡Esta asignación ya se encuentra registrada. Recuerde que usted no puede asignar el mismo grupo y profesor dos veces!")
                {
                    if (m != "Se produjo un error en el servidor al intentar validar que no sea una matricula duplicada")
                    {
                        BLLB.r_bitacora(dtob);
                    }
                }
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string e_matriculaDirector(matriculas1DTO.directorG_DTO dto, bitacorasDTO dtob)  //OK)
        {
            string m = BLL.e_matriculaDirector(dto);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoG> c_matriculaDirector(matriculas1DTO.directorG_DTO dto)  //OK)
        {
            List<dtoG> m = BLL.c_matriculaDirector(dto);
            return m;
        }

        //=================================== metodos para filtrar las matriculas de profesores ================
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoGMatricula1> c_mProfesXIdGrupoXSexo(dtoGM1 dto, bitacorasDTO dtob)
        {
            List<dtoGMatricula1> m = BLL.c_mProfesXIdGrupoXSexo(dto.id_grupo, dto.sexo);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoGMatricula1> c_mProfesXIdGrupo(dtoGM1 dto, bitacorasDTO dtob)
        {
            List<dtoGMatricula1> m = BLL.c_mProfesXIdGrupo(dto.id_grupo);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }

         //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoG> c_gruposDelProfe(dtoG dto)
        {
            List<dtoG> m = BLL.c_gruposDelProfe(dto);
            return m;
        }


        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoG> c_asignaturasDelProfe(dtoG dto)
        {
            List<dtoG> m = BLL.c_asignaturasDelProfe(dto);
            return m;
        }
           //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoG> c_gradosDelProfe(dtoG dto)
        {
            List<dtoG> m = BLL.c_gradosDelProfe(dto);
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoGMatricula1> c_mProfesXIdAsig(dtoGM1 dto, bitacorasDTO dtob)
        {
            List<dtoGMatricula1> m = BLL.c_mProfesXIdAsig(dto.id_asig);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }

        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoGMatricula1> c_mProfesXIdXGrupoXAsig(dtoGM1 dto, bitacorasDTO dtob)
        {
            List<dtoGMatricula1> m = BLL.c_mProfesXIdXGrupoXAsig(dto.id_profeG,dto.id_grupo,dto.id_asigG);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoGMatricula1> c_mProfesXGrupoXAsig(dtoGM1 dto, bitacorasDTO dtob)
        {
            List<dtoGMatricula1> m = BLL.c_mProfesXGrupoXAsig(dto.id_grupo,dto.id_asigG);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoGMatricula1> c_mProfesXId(dtoGM1 dto, bitacorasDTO dtob)
        {
            List<dtoGMatricula1> m = BLL.c_mProfesXId(dto.id_profe);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoGMatriculaProfe> c_mProfesXIdForHorario(dtoG dto, bitacorasDTO dtob)
        {
            List<dtoGMatriculaProfe> m = BLL.c_mProfesXIdForHorario(dto.id);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
         //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoGMatricula1> c_matriculasProfes(bitacorasDTO dtob)
        {
            List<dtoGMatricula1> m = BLL.c_matriculasProfes();
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        

        //=================================== Fin de metodos para filtrar las matriculas de profesores ================
        //---------------------------------- FIN DE MATRICULAS DE PROFESORES-----------------------------------

        //-------------------     ACA ESTA LAS 2 FORMAS QUE UTILIZO   ---------------------------
        //LA PRIMERA ES CUANDO HAGO LAS GRILLA A PULSO Y LA OTRA ES CUANDO UTILIZO E JQWIGUEST GRID---
        //----------------------------------MATRICULAS DE ESTUDIANTES-----------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<personasDTO.personass> c_estudiantesXGrupo(dtoG dto)// ok
        {
            return BLL.c_estudiantesXGrupo(dto.id);
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<personasDTO.personasDTOLogros> c_estudiantesXGrupoXLogro(notasDTO.notasXCursoDTO dto)// ok
        {
            return BLL.c_estudiantesXgrupoXlogro(dto);
        }
        //[WebMethod]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //public List<personasDTO.personasDTOLogros> c_notasFinalXGrupoXAsig(notasDTO.notasXCursoDTO dto)// ok
        //{
        //    return BLL.c_notasFinalXGrupoXAsig(dto);
        //}
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string r_matriculaEstudiante(matriculas2DTO.matricula2s dto, bitacorasDTO dtob)  //OK
        {
           string m=  BLL.r_matriculaEstudiante(dto);
           if (m != null)
           {
               if (m != "¡Esta matricula ya se encuentra asignada. Recuerde que usted no puede matricular el estudiante en el mismo grupo dos veces!")
               {
                   if (m != "Se produjo un error en el servidor al intentar validar que no sea una matricula duplicada")
                   {
                       BLLB.r_bitacora(dtob);
                   }
               }
           }
           return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string e_matriculaEstudiante(matriculas2DTO.matriculaDTO dto, bitacorasDTO dtob)  //OK)
        {
           string m= BLL.e_matriculaEstudiante(dto);
           if (m != null)
           {
               BLLB.r_bitacora(dtob);
           }
           return m;  
        }
       
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<asignaturasDTO> c_asignaturasDeEstudianteXgrupo(dtoG dto)
        {
            return BLL.c_asignaturasDeEstudianteXgrupo(dto.id);
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public matriculas2DTO.matricula2s c_matriculaXidEstudianteXidGrupo(dtoG dto, string dtoGupo, bitacorasDTO dtob)
        {
            matriculas2DTO.matricula2s m = BLL.c_matriculaXidEstudianteXidGrupo(dto.id, dtoGupo);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //=================================== metodos para filtrar las matriculas de estudiantes ================
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoGMatricula2> c_matriculaXIdGrupoXSexo(dtoGM2 dto, bitacorasDTO dtob)
        {
            List<dtoGMatricula2> m = BLL.c_matriculaXIdGrupoXSexo(dto.id_grupo, dto.sexo);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoGMatricula2> c_matriculaXIdGrupo(dtoGM2 dto, bitacorasDTO dtob)
        {
            List<dtoGMatricula2> m = BLL.c_matriculaXIdGrupo(dto.id_grupo);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoGMatricula2> c_matriculaXIdAcu(dtoG dto, bitacorasDTO dtob)
        {
            List<dtoGMatricula2> m = BLL.c_matriculaXIdAcu(dto.id);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoGMatricula2> c_matriculaXIdEst(dtoG dto, bitacorasDTO dtob)
        {
            List<dtoGMatricula2> m = BLL.c_matriculaXIdEst(dto.id);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        
        //---------------------------------- FIN DE MATRICULAS DE ESTUDIANTES-----------------------------------
        //=================================== Fin de metodos para filtrar las matriculas de estudiantes ================
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoGMatricula2> c_matriculasEst(bitacorasDTO dtob)
        {
            List<dtoGMatricula2> m = BLL.c_matriculasEst();
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoDirectoresG> c_directoresG(bitacorasDTO dtob)
        {
            List<dtoDirectoresG> m = BLL.c_directoresG();
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
    }
}
