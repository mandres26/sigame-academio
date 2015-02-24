using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using ENTIDADES;

namespace BLL
{
    public class GestionJornadas
    {
        private RepoJornadas r = new RepoJornadas();
        //--------------------------------------------------------------
        public jornadasDTO c_jornada(string idJornada)
        {
            return r.c_jornada(idJornada);
        }
        //-----------------------------------------------------------
        public List<jornadasDTO> c_jornadas()
        {
            return r.c_jornada();
        }
        //-----------------------------------------------------------
        public string r_jornada(jornadasDTO ob)
        {
            return r.r_jornada(ob);
        }
        //-----------------------------------------------------------
        public string e_jornada(string cod)
        {
            return r.e_jornadas(cod);
        }
        //-----------------------------------------------------------
        public string m_jornada(jornadasDTO ob)
        {
            return r.m_jornadas(ob);
        }
        //-----------------------------------------------------------
       

        
    }
}
