using ENTIDADES;
using BLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
namespace PPLWEB.WS
{
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class bitacoras : System.Web.Services.WebService
    {
        GestionBitacoras BLLB = new GestionBitacoras();
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<bitacorasDTO> c_bitacora()
        {
            List<bitacorasDTO> m= BLLB.c_bitacora();       
            return m;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string v_bitacora(bitacorasDTO dtob)
        {
            string m = BLLB.vaciarBitacora();
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<bitacorasDTO> c_bitacoraAccion (dtoGBitacora dto)
        {
            return BLLB.c_bitacoraAccion(dto.accion);
        }
        //--------------------------------------------------------------------------------------------------

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<bitacorasDTO> c_bitacoraCodUsuario(dtoGBitacora dto)
        {
            return BLLB.c_bitacoraCodUsuario(dto.id_usuario);
        }
        //--------------------------------------------------------------------------------------------------

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<bitacorasDTO> c_bitacoraFecha(dtoGBitacora dto)
        {
            List<bitacorasDTO> m= BLLB.c_bitacoraFecha(dto.fecha_ini, dto.fecha_fin);
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<bitacorasDTO> c_bitacoraSeccion(dtoGBitacora dto)
        {
            return BLLB.c_bitacoraSeccion(dto.seccion);
        }
        //--------------------------------------------------------------------------------------------------
    }
}
