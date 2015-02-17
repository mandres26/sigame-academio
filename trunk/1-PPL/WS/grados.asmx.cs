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
    public class grados : System.Web.Services.WebService
    {
            GestionGrados BLL = new GestionGrados();
            GestionBitacoras BLLB = new GestionBitacoras();
            //--------------------------------------------------------------------------------------------------
            [WebMethod]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public string r_grado(gradosDTO dto, bitacorasDTO dtob) 
            {
                string m = BLL.r_grado(dto);
                if (m != null)
                {
                    BLLB.r_bitacora(dtob);
                }
                return m;
            }

            [WebMethod]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public string e_grado(dtoG dto ,bitacorasDTO dtob)
            {
                string m = BLL.e_grado(dto.id);
                if (m != null)
                {
                    if (m != "Usted no puede eliminar este grado, ya que se encuentra vinculado a un grupo o logro. Revise.")
                    {
                        BLLB.r_bitacora(dtob);
                    }
                }
                return m;
            }
            //--------------------------------------------------------------------------------------------------
            [WebMethod]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public gradosDTO c_grado(dtoG dto)
            {
                return BLL.c_grado(dto.id);
            }
            //--------------------------------------------------------------------------------------------------
            [WebMethod]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public List<gradosDTO> c_gradoss(bitacorasDTO dtob)
            {
                List<gradosDTO> m =  BLL.c_grados();
                if (m != null)
                {
                    BLLB.r_bitacora(dtob);
                }
                return m;
            }
            [WebMethod]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public List<gradosDTO> c_grados()
            {
                List<gradosDTO> m = BLL.c_grados();
                return m;
            }
        }
}
