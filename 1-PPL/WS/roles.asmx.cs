using System;
using ENTIDADES;
using BLL;
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
    public class roles : System.Web.Services.WebService
    {

        GestionRoles BLL = new GestionRoles();
        GestionBitacoras BLLB = new GestionBitacoras();
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string r_rol(rolesDTO dto, bitacorasDTO dtob)
        {
            string m= BLL.r_rol(dto);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }

        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string e_rol(dtoG dto, bitacorasDTO dtob)
        {
            string m=  BLL.e_rol(dto.id);
            if (m != null)
            {
                if (m != "Usted no puede eliminar este rol ya que se encuentra vinculado con personas. Revise.")
                {
                    BLLB.r_bitacora(dtob);
                }
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public rolesDTO c_rol(dtoG dto)
        {
            return BLL.c_rol(dto.id);
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<rolesDTO> c_rolss(bitacorasDTO dtob)
        {
            List<rolesDTO>  m = BLL.c_roles();
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<rolesDTO> c_rols()
        {
            List<rolesDTO> m = BLL.c_roles();
            return m;
        }

    }
}
