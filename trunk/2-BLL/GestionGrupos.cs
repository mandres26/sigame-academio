using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
using DAL;
namespace BLL
{
    public class GestionGrupos
    {
        RepoGrupos r = new RepoGrupos();
        //-----------------------------------------------------------------------------------
        public string r_grupo(gruposDTO ob){
            return r.r_grupo(ob);
        }
        //-----------------------------------------------------------------------------------
        public string m_grupo(string viejoCodGru, gruposDTO nuevosDatos)
        {
            return r.m_grupo(viejoCodGru, nuevosDatos);
        }
        //-----------------------------------------------------------------------------------
        public string e_grupo(string CodGru)
        {
            return r.e_grupo(CodGru);
        }
        //-----------------------------------------------------------------------------------
        public gruposDTO c_grupo(string codGrupo)
        {
            return r.c_grupo(codGrupo);
        }
        //-----------------------------------------------------------------------------------
        public List<gruposDTO> c_grupos()
        {
            return r.c_grupos();
        }
        //-----------------------------------------------------------------------------------
    }
}
