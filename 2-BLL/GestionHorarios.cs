using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
using DAL;
namespace BLL
{
    public class GestionHorarios
    {
         RepoHorarios r = new RepoHorarios();
        //-----------------------------------------------------------------------------------
        public string r_horario(horariosDTO ob){
            return r.r_horario(ob);
        }
        //-----------------------------------------------------------------------------------
        public string m_horario( horariosDTO h)
        {
            return r.m_horario(h);
        }
        //-----------------------------------------------------------------------------------
        public string e_horario(horariosDTO h)
        {
            return r.e_horario(h);
        }
        //-----------------------------------------------------------------------------------
        public horariosDTO c_horario(horariosDTO h)
        {
            return r.c_horario(h);
        }
          //-----------------------------------------------------------------------------------
        public List<horariosDTO> c_XGrupoXAsigXJornada(horariosDTO h)
        {
            return r.c_XGrupoXAsigXJornada(h);
        }
        //////-----------------------------------------------------------------------------------
        public List<horariosClasesDTO> c_Allhorarios()
        {
            return r.c_Allhorarios();
        }
        //-----------------------------------------------------------------------------------
        public List<horariosClasesDTO> c_XIdGrupo(horariosDTOFiltro h)
        {
            return r.c_XIdGrupo(h);
        }
        //-----------------------------------------------------------------------------------
        public List<horariosClasesDTO> c_XIdEstudianteXINGrupo(horariosDTOFiltro h)
        {
            return r.c_XIdEstudianteINGrupo(h);
        }
        //-----------------------------------------------------------------------------------
        public List<horariosClasesDTO> c_XIdProfeXINGrupo(horariosDTOFiltro h)
        {
            return r.c_XIdProfeXINGrupo(h);
        }
     
        //-----------------------------------------------------------------------------------
        public List<horariosClasesDTO> c_XIdProfe(horariosDTOFiltro h)
        {
            return r.c_XIdProfe(h);
        }
     
        // public horariosClasesDTO c_horariosXIdGrupoXIdAsig(string grupo, string asig)
        // {     return r.c_horariosXIdGrupoXIdAsig(grupo,asig);
        //}
    }
}
