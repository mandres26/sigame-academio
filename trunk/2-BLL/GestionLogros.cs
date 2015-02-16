using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using ENTIDADES;

namespace BLL
{
     public class GestionLogros
    {
        private RepoLogros r = new RepoLogros();
        //----------------------------------------------------------------
        public string r_logro(logrosDTO cod)
        {
            return r.r_logros(cod);
        }
        //----------------------------------------------------------------
        public string m_logro(string codViejo, logrosDTO ob)
        {
            return r.m_logros(codViejo, ob);
        }
        //----------------------------------------------------------------
        public string e_logro(string cod)
        {
            return r.e_logros(cod);
        }
        //----------------------------------------------------------------
        public logrosDTO c_logro(string cod)
        {
            return r.c_logros(cod);
        }
        //----------------------------------------------------------------
        public List<logrosDTO> c_logros()
        {
            return r.c_logros();
        }
        //----------------------------------------------------------------
        public List<logrosDTO> c_logrosXgradoXasig(string codGrado, string codAsig) 
        {
            return r.c_logrosXgradoXasig(codGrado, codAsig);
        }
          //----------------------------------------------------------------
        public List<logrosDTO> c_logrosXgradoXasigNota(string codGrado, string codAsig) 
        {
            return r.c_logrosXgradoXasigNota(codGrado, codAsig);
        }
         
        //----------------------------------------------------------------
    }
}
