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
    public class observaciones : System.Web.Services.WebService
    {
        GestionBitacoras BLLB = new GestionBitacoras();
        GestionObservacioness BLL = new GestionObservacioness();
        //---------------------------  -----------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string r_observacion(observacionesDTO.observatorioss dto, bitacorasDTO dtob)  //OK)
        {
           string m= BLL.r_observacion(dto);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //---------------------------  -----------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoGObservaciones> c_observaciones(observacionesDTO.observatorioss dto)
        {
            return BLL.c_observaciones(dto);
        }

        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string e_observacion(observacionesDTO.observatorioss dto, bitacorasDTO dtob)  //OK
        {
            string m= BLL.e_observacion(dto);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string a_observacion(observacionesDTO.observatorioss dto, bitacorasDTO dtob)  //OK //PARA ARCHIVAR LA OBSERVACION , SOLOC AMBIAR EL ATRIBUTO ACCESO.
        {
            string m = BLL.a_observacion(dto);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string m_observacion(observacionesDTO.observatorioss dto, bitacorasDTO dtob)  //OK
        {
            string m = BLL.m_observacion(dto);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string m_observacionNoti(observacionesDTO.observatorioss dto, bitacorasDTO dtob)  //OK
        {
            string m = BLL.m_observacionNoti(dto);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------

        //----------------------------------- METODOS PARA GESTIONAR LOS FILTROS EN LAS OBSERVACIONES ---------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<observacionesDTO.observatorioss> c_listaObservaciones(bitacorasDTO dtob)
        {
         List<observacionesDTO.observatorioss>  m =  BLL.c_listaObservaciones();
         if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<observacionesDTO.observatorioss> c_obserXIdAsig(dtoGObservacionesF dto, bitacorasDTO dtob)
        {
            List<observacionesDTO.observatorioss> m= BLL.c_porAsigatura(dto.id_asignatura);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
               //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<observacionesDTO.observatorioss> c_obserXIdGY(dtoGObservacionesF dto, bitacorasDTO dtob)
        {
            List<observacionesDTO.observatorioss> m= BLL.c_porGrupo(dto.id_grupo);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }

        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<observacionesDTO.observatorioss> c_obserXIdEst(dtoGObservacionesF dto, bitacorasDTO dtob)
        {
            List<observacionesDTO.observatorioss> m = BLL.c_porEstudiante(dto.id_estudiante);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }

        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<observacionesDTO.observatorioss> c_obserXIdEstXGrupo(observacionesDTO.observatorioss dto, bitacorasDTO dtob)
        {
            List<observacionesDTO.observatorioss> m = BLL.c_obserXIdEstXGrupo(dto);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<observacionesDTO.observatorioss> c_obserXIdP(dtoGObservacionesF dto, bitacorasDTO dtob)
        {
             List<observacionesDTO.observatorioss> m= BLL.c_porPeriodo(dto.id_periodo2);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
         //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<observacionesDTO.observatorioss> c_obserxIdGXPerXProfe(dtoGObservacionesF dto, bitacorasDTO dtob)
        {
             List<observacionesDTO.observatorioss> m= BLL.c_obserxIdGXPerXProfe(dto.id_grupo,dto.id_periodo1,dto.id_profe1);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<observacionesDTO.observatorioss> c_obserXIdProfe(dtoGObservacionesF dto, bitacorasDTO dtob)
        {
               List<observacionesDTO.observatorioss> m= BLL.c_porProfesor(dto.id_profe2);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<observacionesDTO.observatorioss> c_obserXFecha(dtoGObservacionesF dto, bitacorasDTO dtob)
        {
             List<observacionesDTO.observatorioss> m= BLL.c_porFecha(dto.fecha_ini, dto.fecha_fin);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
           //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<observacionesDTO.observatorioss> c_obserXArchivo(dtoGObservacionesF dto, bitacorasDTO dtob)
        {
             List<observacionesDTO.observatorioss> m= BLL.c_obserXArchivo(dto.id_archivo);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
           //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<observacionesDTO.observatorioss> c_obserXNotificacion(dtoGObservacionesF dto, bitacorasDTO dtob)
        {
            List<observacionesDTO.observatorioss> m = BLL.c_obserXNotificacion(dto.id_notificacion);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
    }
}
