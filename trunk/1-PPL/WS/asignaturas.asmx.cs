using ENTIDADES;
using BLL;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

namespace PPLWEB.WS
{
    /// <summary>
    /// Descripción breve de HELLO
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class asignaturas : System.Web.Services.WebService
    {
        GestionBitacoras BLLB2 = new GestionBitacoras();
        GestionAsignaturas BLL = new GestionAsignaturas();
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public asignaturasDTO c_asignatura(dtoG dto)
        {
            return BLL.c_asignatura(dto.id);
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string r_asignatura(asignaturasDTO dto, bitacorasDTO dtob)
        {
            string m = BLL.r_asignatura(dto);
            if (m != null)
            {
                BLLB2.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string m_asignatura(asignaturasDTO dtonew, dtoG dto, bitacorasDTO dtob)
        {
            string m=  BLL.m_asignatura(dto.id, dtonew);
            if (m != null)
            {
                BLLB2.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string e_asignatura(dtoG dto, bitacorasDTO dtob)
        {
            string m = BLL.e_asignatura(dto.id);
            if (m != null)
            {
                if (m != "Usted no puede eliminar esta asignatura, ya que se encuentra vinculado con una observación, nota, logro, horario o matriculas de profesores. Revise")
                {
                    BLLB2.r_bitacora(dtob);
                }
            }
            return m;
            
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<asignaturasDTO> c_asignaturass(bitacorasDTO dtob)
        {
            List<asignaturasDTO> m=  BLL.c_asignaturas();
            if (m != null)
            {
                BLLB2.r_bitacora(dtob);
            }
            return m;
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<asignaturasDTO> c_asignaturas()
        {
            List<asignaturasDTO> m = BLL.c_asignaturas();
            return m;
        }

    }
}
