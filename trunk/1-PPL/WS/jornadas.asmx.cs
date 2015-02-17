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
    public class jornadas : System.Web.Services.WebService
    {
        GestionJornadas BLL = new GestionJornadas();
        GestionBitacoras BLLB = new GestionBitacoras();
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string r_jornada(jornadasDTO dto, bitacorasDTO dtob)
        {
            string m= BLL.r_jornada(dto);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string m_jornada(jornadasDTO dto, bitacorasDTO dtob)
        {
            string m = BLL.m_jornada(dto);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string e_jornada(jornadasDTO dto, bitacorasDTO dtob)
        {
            string m= BLL.e_jornada(dto.id);
            if (m != null)
            {
                if (m != "Usted no puede eliminar esta jornada, ya que se encuentra vinculada con el personal, horarios o grupos del sistema. Revise")
                {
                    BLLB.r_bitacora(dtob);
                }
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public jornadasDTO c_jornada(jornadasDTO dto)
        {
            return BLL.c_jornada(dto.id);
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<jornadasDTO> c_jornadass(bitacorasDTO dtob)
        {
            List<jornadasDTO> m=  BLL.c_jornadas();
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<jornadasDTO> c_jornadas()
        {
            List<jornadasDTO> m=  BLL.c_jornadas();
            return m;
        }
    }
}
