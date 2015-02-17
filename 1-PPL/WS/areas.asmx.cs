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
    public class areas : System.Web.Services.WebService
    {

        GestionAreas BLL = new GestionAreas();
        GestionBitacoras BLLB = new GestionBitacoras();
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string r_area(dtoG dto, bitacorasDTO dtob)
        {
            string m = BLL.r_area(dto);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }

        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string e_area(dtoG dto, bitacorasDTO dtob)
        {
            string m = BLL.e_area(dto.id);
            if (m != null)
            {
                if (m != "Usted no puede eliminar esta area ya que se encuentra vinculado con asignaturas. Revise.")
                {
                    BLLB.r_bitacora(dtob);
                }
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public dtoG c_area(dtoG dto)
        {
            return BLL.c_area(dto.id);
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoG> c_areass(bitacorasDTO dtob)
        {
            List<dtoG> m = BLL.c_areass();
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoG> c_areas()
        {
            List<dtoG> m = BLL.c_areass();
            return m;
        }
    }
}
