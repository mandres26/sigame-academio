using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
using DAL;

namespace BLL
{
    public class GestionRoles
    {
        private RepoRoles r = new RepoRoles();
        //---------------------------------------------------------------
        public string r_rol(rolesDTO ob)
        {
            return r.r_roles(ob);
        }
        //---------------------------------------------------------------
        public string e_rol(string cod)
        {
            return r.e_roles(cod);
        }
        //---------------------------------------------------------------
        public rolesDTO c_rol(string cod)
        {
            return r.c_roles(cod);
        }
        //---------------------------------------------------------------
        public List<rolesDTO> c_roles()
        {
            return r.c_roles();
        }
        //---------------------------------------------------------------

    }
}
