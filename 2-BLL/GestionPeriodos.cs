using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
using DAL;


namespace BLL
{
   public class GestionPeriodo
    {
        private RepoPeriodo   r = new RepoPeriodo();
        List<periodosDTO> li = new List<periodosDTO>();
        //------------------------------------------------------------------------------------
        public periodosDTO c_periodo(string idPeriodo)
        {
            return r.c_periodo(idPeriodo);
        }
        //------------------------------------------------------------------------------------
        public List<periodosDTO> c_periodos()
        {
            return r.c_periodo();
        }
        //------------------------------------------------------------------------------------
        public string r_periodo(periodosDTO cod)
        {
            return r.r_periodo(cod);
        }
        //------------------------------------------------------------------------------------
        public string m_periodo(periodosDTO cod)
        {
            return r.m_periodo(cod);
        }
        //------------------------------------------------------------------------------------
        public string e_periodo(periodosDTO cod)
        {
            return r.e_periodo(cod);
        }
        //------------------------------------------------------------------------------------
       
    }
}
