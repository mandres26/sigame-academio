using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
using DAL;
namespace BLL
{
     public class GestionAsignaturas
    {
         RepoAsignatura r = new RepoAsignatura();
        //-----------------------------------------------------------------------------------
        public string r_asignatura(asignaturasDTO ob)
        {
            return r.r_asignatura(ob);   
        }
        //-----------------------------------------------------------------------------------
        public string m_asignatura(string viejoCodAsig, asignaturasDTO nuevosDatos)
        {
            return r.m_asignatura(viejoCodAsig, nuevosDatos);
        }
        //-----------------------------------------------------------------------------------
        public string e_asignatura(string CodAsi)
        {
            return r.e_asignatura(CodAsi);
            
        }
        //-----------------------------------------------------------------------------------
        public asignaturasDTO c_asignatura(string codAsignatura)
        {
            return r.c_asignatura(codAsignatura);
        }
        //-----------------------------------------------------------------------------------
        public List<asignaturasDTO> c_asignaturas()
        {
            return r.c_asignaturas();
        }
        //-----------------------------------------------------------------------------------
    }
}
