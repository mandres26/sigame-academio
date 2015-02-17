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
    public class grupos : System.Web.Services.WebService
    {

        GestionGrupos BLL = new GestionGrupos();
        GestionBitacoras BLLB = new GestionBitacoras();
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string r_grupo(gruposDTO dto, bitacorasDTO dtob)
        {
            string m= BLL.r_grupo(dto);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        ///--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string m_grupo(gruposDTO dtonew, dtoG dto, bitacorasDTO dtob)
        {
            string m=  BLL.m_grupo(dto.id, dtonew);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;

        }
        //----------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string e_grupo(dtoG dto, bitacorasDTO dtob)
        {
            string m=  BLL.e_grupo(dto.id);
            if (m != null)
            {
                if (m != "Usted no puede eliminar este grupo, ya que se encuentra vinculado con una observación, nota, horario o matriculas de profesores y estudiantes. Revise")
                {
                    BLLB.r_bitacora(dtob);
                }
            }
            return m;
        }
        ////--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public gruposDTO c_grupo(dtoG dto)
        {
            return BLL.c_grupo(dto.id);
        }
        ////--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<gruposDTO> c_gruposs(bitacorasDTO dtob)
        {
             List<gruposDTO> m=  BLL.c_grupos();
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<gruposDTO> c_grupos()
        {
            List<gruposDTO> m = BLL.c_grupos();
            return m;
        }
 }
}
