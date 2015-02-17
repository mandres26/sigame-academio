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
    /// <summary>
    /// Descripción breve de horarios
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class horarios : System.Web.Services.WebService
    {

        GestionHorarios BLL = new GestionHorarios();
        GestionBitacoras BLLB = new GestionBitacoras();
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string r_horario(horariosDTO dto, bitacorasDTO dtob)
            {
            string m = BLL.r_horario(dto);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        ///--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string m_horario(horariosDTO dto,  bitacorasDTO dtob)
        {
            string m = BLL.m_horario(dto);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;

        }
        //----------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string e_horario(horariosDTO dto, bitacorasDTO dtob)
        {
            string m = BLL.e_horario(dto);
            if (m != null)
            {
                    BLLB.r_bitacora(dtob);
            }
            return m;
        }
        ////--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<horariosDTO> c_XGrupoXAsigXJornada(horariosDTO dto)
        {
            List<horariosDTO> m = BLL.c_XGrupoXAsigXJornada(dto);
            return m;
        }
        ////--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<horariosClasesDTO> c_Allhorarios(bitacorasDTO dtob)
        {
            List<horariosClasesDTO> m = BLL.c_Allhorarios();
            return m;
        }
        ////--------------------------------------------------------------------------------------------------

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<horariosClasesDTO> c_XIdGrupo(horariosDTOFiltro dto, bitacorasDTO dtob)
        {
            List<horariosClasesDTO> m = BLL.c_XIdGrupo(dto);
            return m;
        }
        //-----------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<horariosClasesDTO> c_XIdEstudianteXINGrupo(horariosDTOFiltro dto, bitacorasDTO dtob)
        {
            List<horariosClasesDTO> m = BLL.c_XIdEstudianteXINGrupo(dto);
            return m;
        }
        //-----------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<horariosClasesDTO> c_XIdProfeXINGrupo(horariosDTOFiltro dto, bitacorasDTO dtob)
        {
            List<horariosClasesDTO> m = BLL.c_XIdProfeXINGrupo(dto);
            return m;
        }
      
        //-----------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<horariosClasesDTO> c_XIdProfe(horariosDTOFiltro dto, bitacorasDTO dtob)
        {
            List<horariosClasesDTO> m = BLL.c_XIdProfe(dto);
            return m;
        }
         ////--------------------------------------------------------------------------------------------------

    }
}
