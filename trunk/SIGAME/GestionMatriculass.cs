using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
using DAL;

namespace BLL
{
    public class GestionMatriculass
    {
        public RepoMatricula1 r1 = new RepoMatricula1();

        public List<matriculas1DTO.materiasProfesorDTO> c_asignaturasProfe(string codProfe)
        {
            return r1.c_asignaturasProfe(codProfe);
        }
        //-----------------------------------------------------------------------------------
        public List<matriculas1DTO.gradosProfesorDTO> c_gradosProfesor(string codProfe)
        {
            return r1.c_gradosProfesor(codProfe);
        }
        //================================ MATRICULAS PROFESORES ==================================
        //-----------------------------------------------------------------------------------
        public string r_matriculaProfe(matriculas1DTO.matriculaDTO m)
        {
            return r1.r_matriculaProfe(m);
        }
        //-----------------------------------------------------------------------------------
        public string e_matriculaProfe(matriculas1DTO.matriculaDTO identificador)
        {
            return r1.e_matriculaProfe(identificador);

        }

        //=================================== metodos para filtrar las matriculas de profesores ================
        public List<dtoGMatricula1> c_mProfesXIdGrupoXSexo(string grupo, string sexo)
        {
            List<dtoGMatricula1> m = r1.c_mProfesXIdGrupoXSexo(grupo, sexo);
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        public List<dtoGMatricula1> c_mProfesXIdGrupo(string grupo)
        {
            List<dtoGMatricula1> m = r1.c_mProfesXIdGrupo(grupo);
            return m;
        }
        //--------------------------------------------------------------------------------------------------
    
        public List<dtoG> c_gruposDelProfe(dtoG dto)
        {
            List<dtoG> m = r1.c_gruposDelProfesor(dto);
            return m;
        }

        //--------------------------------------------------------------------------------------------------
        public List<dtoG> c_asignaturasDelProfe(dtoG dto)
        {
            List<dtoG> m = r1.c_asignaturasDelProfe(dto);
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        public List<dtoG> c_gradosDelProfe(dtoG dto)
        {
            List<dtoG> m = r1.c_gradosDelProfe(dto);
            return m;
        }
        
        //--------------------------------------------------------------------------------------------------
        public List<dtoGMatricula1> c_mProfesXIdAsig(string idAsig)
        {
            List<dtoGMatricula1> m = r1.c_mProfesXIdAsig(idAsig);
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        public List<dtoGMatricula1> c_mProfesXIdXGrupoXAsig(string idProfe, string idGrupo, string IdAsig)
        {
            List<dtoGMatricula1> m = r1.c_mProfesXIdXGrupoXAsig(idProfe,idGrupo,IdAsig);
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        public List<dtoGMatricula1> c_mProfesXGrupoXAsig(string idGrupo, string IdAsig)
        {
            List<dtoGMatricula1> m = r1.c_mProfesXGrupoXAsig(idGrupo,IdAsig);
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        public List<dtoGMatricula1> c_mProfesXId(string idprofe)
        {
            List<dtoGMatricula1> m = r1.c_mProfesXId(idprofe);
            return m;
        }
           //--------------------------------------------------------------------------------------------------
        public List<dtoGMatriculaProfe> c_mProfesXIdForHorario(string idprofe)
        {
            List<dtoGMatriculaProfe> m = r1.c_mProfesXIdForHorario(idprofe);
            return m;
        }
        //--------------------------------------------------------------------------------------------------
     
        public List<dtoGMatricula1> c_matriculasProfes()
        {
            List<dtoGMatricula1> m = r1.c_matriculasProfes();
            return m;
        }
        

        //=================================== Fin de metodos para filtrar las matriculas de profesores ================

        //================================ MATRICULAS ESTUDIANTES ==================================
        public RepoMatricula2 r2 = new RepoMatricula2();
        public string r_matriculaEstudiante(matriculas2DTO.matricula2s m)
        {
           return r2.r_matricula(m);
        }
         //-----------------------------------------------------------------------------------
        public string e_matriculaEstudiante(matriculas2DTO.matriculaDTO identificador)
        {
            return r2.e_matriculaEstudiante(identificador);

        }
        //-----------------------------------------------------------------------------------
        public List<personasDTO.personass> c_estudiantesXGrupo(string codGrupo)
        {
            return r2.c_estudiantesXGrupo(codGrupo);
        }
         

        
        //-----------------------------------------------------------------------------------
        public matriculas2DTO.matricula2s c_matriculaXidEstudianteXidGrupo(string idEstudiante, string idGrupo)
        {
            return r2.c_matriculaXidEstudianteXidGrupo(idEstudiante, idEstudiante);
        }
        //-----------------------------------------------------------------------------------
        public List<personasDTO.personasDTOLogros> c_estudiantesXgrupoXlogro(notasDTO.notasXCursoDTO m)
        {
           List<personasDTO.personasDTOLogros> mm=r2.c_estudiantesXgrupoXlogro(m);
           return mm;
        }

        ////-----------------------------------------------------------------------------------
        //public List<personasDTO.personasDTOLogros> c_notasFinalXGrupoXAsig(notasDTO.notasXCursoDTO m)
        //{
        //    List<personasDTO.personasDTOLogros> mm = r2.c_notasFinalXGrupoXAsig(m);
        //    return mm;
        //}
      //-----------------------------------------------------------------------------------
        //public List<personasDTO.personass> c_estudiantesXAcudiente(string codAcudiente)
        //{
        //    return r2.c_estudiantesXAcudiente(codAcudiente);
        //}
        //-----------------------------------------------------------------------------------
        public List<asignaturasDTO> c_asignaturasDeEstudianteXgrupo(string codEst)
        {
            return r2.c_asignaturasDeEstudianteXgrupo(codEst);
        }
        //-----------------------------------------------------------------------------------
        //=================================== metodos para filtrar las matriculas de estudiantes ================
        public List<dtoGMatricula2> c_matriculaXIdGrupoXSexo(string grupo, string sexo)
        {
            List<dtoGMatricula2> m = r2.c_matriculaXIdGrupoXSexo(grupo, sexo);
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        public List<dtoGMatricula2> c_matriculaXIdGrupo(string grupo)
        {
            List<dtoGMatricula2> m = r2.c_matriculaXIdGrupo(grupo);
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        public List<dtoGMatricula2> c_matriculaXIdAcu(string id)
        {
            List<dtoGMatricula2> m = r2.c_matriculaXIdAcu(id);
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        public List<dtoGMatricula2> c_matriculaXIdEst(string id)
        {
            List<dtoGMatricula2> m = r2.c_matriculaXIdEst(id);
            return m;
        }
        //=================================== Fin de metodos para filtrar las matriculas de estudiantes ================
        public List<dtoGMatricula2> c_matriculasEst()
        {
            List<dtoGMatricula2> m = r2.c_matriculasEst();
            return m;
        }

        // ------------------  ASIGNACIONES DE DOCENTES A DE GRUPO  DIRECTOR
        //--------------------------------------------------------------------------------------------------
        public string r_matriculaDirector(matriculas1DTO.directorG_DTO dto)  //OK)
        {
            string m = r2.r_matriculaDirector(dto);
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        public string e_matriculaDirector(matriculas1DTO.directorG_DTO dto)  //OK)
        {
            string m = r2.e_matriculaDirector(dto);
            return m;
        }
        public List<dtoG> c_matriculaDirector(matriculas1DTO.directorG_DTO dto)  //OK)
        {
            List<dtoG> m = r2.c_matriculaDirector(dto);
            return m;
        }

        public List<dtoDirectoresG> c_directoresG()
        {
            List<dtoDirectoresG> m = r2.c_directoresG();
            return m;
        }
    }
}
