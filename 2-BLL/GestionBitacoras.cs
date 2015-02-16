using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
using DAL;
namespace BLL
{
    public class GestionBitacoras
    {
        private RepoBitacora r = new RepoBitacora();
        public string r_bitacora(bitacorasDTO ob)
        {
            return r.r_bitacora(ob);
        }
       
        //-----------------------------------------------------
        public List<bitacorasDTO> c_bitacora()
        {
            return r.c_bitacora();
        }
        //----------------------------------------------------
        public string vaciarBitacora()
        {
            return r.vaciarBitacora();
        }
        //---------------------------------------------------
        public List<bitacorasDTO> c_bitacoraSeccion(string seccion)
        {
            return r.c_bitacoraSeccion(seccion);
        }
        //-----------------------------------------------------
        public List<bitacorasDTO> c_bitacoraAccion(string accion)
        {
            return r.c_bitacoraAccion(accion);
        }
        //----------------------------------------------------
        public List<bitacorasDTO> c_bitacoraUsuario(string usuario)
        {
            return r.c_bitacoraUsuario(usuario);
        }
        //----------------------------------------------------
        public List<bitacorasDTO> c_bitacoraFecha(string fechaIni, string fechaFin )
        {
            return r.c_bitacoraFecha(fechaIni, fechaFin);
        }
        //----------------------------------------------------
        public List<bitacorasDTO> c_bitacoraCodUsuario(string id)
        {
            return r.c_bitacoraCodUsuario(id);
        }        
        //-------------------------------------------------------


    }
}
