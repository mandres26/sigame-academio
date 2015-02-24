using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
using DAL;

namespace BLL
{
    public class GestionAreas
    {
        private RepoAreas r = new RepoAreas();
        //---------------------------------------------------------------
        public string r_area(dtoG ob)
        {
            return r.r_area(ob);
        }
        //---------------------------------------------------------------
        public string e_area(string cod)
        {
            return r.e_area(cod);
        }
        //---------------------------------------------------------------
        public dtoG c_area(string cod)
        {
            return r.c_area(cod);
        }
        //---------------------------------------------------------------
        public List<dtoG> c_areass()
        {
            return r.c_areass();
        }
        //---------------------------------------------------------------
    }
}
