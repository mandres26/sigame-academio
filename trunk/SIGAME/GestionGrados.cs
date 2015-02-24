using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
using DAL;
namespace BLL
{
    public class GestionGrados
    {
        RepoGrados r = new RepoGrados();
        //-----------------------------------------------------------------------------------
        public string r_grado(gradosDTO ob)
        {
            return r.r_grado(ob);
        }
        //-----------------------------------------------------------------------------------
        public string m_grado(string viejoCodGra, gradosDTO nuevosDatos)
        {
            return r.m_grado(viejoCodGra, nuevosDatos);
        }
        //-----------------------------------------------------------------------------------
        public string e_grado(string CodGra)
        {
            return r.e_grado(CodGra);
        }
        //-----------------------------------------------------------------------------------
        public gradosDTO c_grado(string codgrado)
        {
            return r.c_grado(codgrado);
        }
        //-----------------------------------------------------------------------------------
        public List<gradosDTO> c_grados()
        {
            return r.c_grado();
        }
        //-----------------------------------------------------------------------------------
    }
}
