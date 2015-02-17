using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using ENTIDADES;
using BLL;
using System.Web.Script.Services;
namespace PPLWEB.WS
{
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class reportes : System.Web.Services.WebService
    {
        GestionReportes BLL = new GestionReportes();
        GestionBitacoras BLLB = new GestionBitacoras();
        ////--------------------------------------------------------------------------------------------------
        [WebMethod(EnableSession = true)] // ENABLE SECCION FUNCIONA PARA HABILITAR SECCIONES EN EL SERVICIO
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)] // cg  i,e : consula para generar boletines inidividual
        public List<reportesDTO.reporteDTOPeriodo> cg_boletinXestudiante(reportesDTO.reportess dto, bitacorasDTO dtob)
        {
            try
            {
            List<reportesDTO.reporteDTOPeriodo> m = BLL.cg_boletinXestudiante(dto.id_estudiante, dto.id_periodo, dto.id_grupo,dto.observacion);
            string b = null;
            foreach (reportesDTO.reporteDTOPeriodo item in m)
            {
                b = item.resultado;
            }
            if (b != null)
            {
                if (b != "El reporte que esta solicitando no esta habilitado por el colegio. Contactese con la administración de la institución.")
                    {
                        if (b != "c_no")
                        {
                            if (b != "Este reporte que solicita no ha sido generado por la administración.")
                            {
                                    BLLB.r_bitacora(dtob);
                                    Session["id_estudiante"] = dto.id_estudiante;
                                    Session["id_grupo"] = dto.id_grupo;
                                    Session["id_periodo"] = dto.id_periodo;
                                    Session["observacion"] = dto.observacion;
                            }
                        }
                    }
            }
            return m;
            }
            catch (Exception)
            {
                return null;
            }
        }

        


        //--------------------------------------------------------------------------------------------------
        [WebMethod(EnableSession = true)] // ENABLE SECCION FUNCIONA PARA HABILITAR SECCIONES EN EL SERVICIO
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)] // cg  i,e : consula para generar boletines inidividual
        public List<reportesDTO.reporteDTOFin> cg_boletinXestudianteFinal(reportesDTO.reportess dto, bitacorasDTO dtob)
        {
           try 
	{	        
		
            List<reportesDTO.reporteDTOFin> m = BLL.cg_boletinXestudianteFinal(dto.id_estudiante, dto.id_periodo, dto.id_grupo, dto.observacion);
            string b = null;
            foreach (reportesDTO.reporteDTOFin item in m)
            {
                b = item.resultado;
            }
            if (b != null)
            {
                if (b != "El reporte que esta solicitando no esta habilitado por el colegio. Contactese con la administración de la institución.")
                {
                    if (b != "c_no")
                    {
                        if (b != "Este reporte que solicita no ha sido generado por la administración.")
                        {
                            BLLB.r_bitacora(dtob);
                            Session["id_estudiante"] = dto.id_estudiante;
                            Session["id_grupo"] = dto.id_grupo;
                            Session["id_periodo"] = dto.id_periodo;
                            Session["observacion"] = dto.observacion;
                        }
                    }
                }
            }
            return m;
             }
            catch (Exception)
            {
                return null;
            }
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod(EnableSession = true)] // ENABLE SECCION FUNCIONA PARA HABILITAR SECCIONES EN EL SERVICIO
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)] // cg  i,e : consula para generar boletines inidividual
        public List<observacionesDTO.observatoriosDTOReport> c_observacionesEst(dtoGEst dto, bitacorasDTO dtob)
        {
            try
            {

                List<observacionesDTO.observatoriosDTOReport> m = BLL.c_observacionesEst(dto);
                string b = null;
                foreach (observacionesDTO.observatoriosDTOReport item in m)
                {
                    b = item.resultado;
                }
                if (b != null)
                {
                    if (b != "c_no")
                    {
                        Session["id"] = dto.id;
                        Session["id_grupo"] = dto.id_grupo;
                        BLLB.r_bitacora(dtob);
                    }
                }
                return m;
            }
            catch (Exception)
            {
                return null;

            }
        }

        //--------------------------------------------------------------------------------------------------
        [WebMethod(EnableSession = true)] // ENABLE SECCION FUNCIONA PARA HABILITAR SECCIONES EN EL SERVICIO
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)] // cg  i,e : consula para generar boletines inidividual
        public string cg_boletinXgrupo(reportesDTO.reportesGrupal dto, bitacorasDTO dtob)
        {
            try
            {
                Session["id_grupo"] = dto.id_grupo;
                Session["id_periodo"] = dto.id_periodo;
                Session["observacion"] = "NA";
                BLLB.r_bitacora(dtob);
                return "c_yes";
            }
            catch (Exception)
            {
                return null;
            }
        }

         //--------------------------------------------------------------------------------------------------
        [WebMethod(EnableSession = true)] // ENABLE SECCION FUNCIONA PARA HABILITAR SECCIONES EN EL SERVICIO
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)] // cg  i,e : consula para generar boletines inidividual
        public string c_consolidado(dtoG dto, bitacorasDTO dtob)
        {
            try
            {
                Session["id_grupoC"] = dto.id;
                BLLB.r_bitacora(dtob);
                return "c_yes";
            }
            catch (Exception)
            {
                return null;
            }
        }


        


        [WebMethod(EnableSession= true)] // ENABLE SECCION FUNCIONA PARA HABILITAR SECCIONES EN EL SERVICIO
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)] // cg  i,e : consula para generar constancias de estudio
        public reportesDTO.reporteDTOConsta cg_constanciaXestud(reportesDTO.reportess dto, bitacorasDTO dtob)
        {
            try{
            reportesDTO.reporteDTOConsta m = BLL.cg_constanciaXestud(dto.id_estudiante, dto.id_grupo);
            
            if (m != null)
            {
                Session["id_estudiante"] = dto.id_estudiante;
                Session["id_grupo"] = dto.id_grupo;
                BLLB.r_bitacora(dtob);
            }
            return m;
             }
            catch (Exception)
            {
                return null;

            }
        }

        [WebMethod(EnableSession = true)] // ENABLE SECCION FUNCIONA PARA HABILITAR SECCIONES EN EL SERVICIO
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)] // cg  i,e : consula para generar constancias de estudio
        public reportesDTO.reporteDTOConstaF cg_constanciaXfamily(reportesDTO.reporteConstaFamily dto, bitacorasDTO dtob)
        {
            try{
            reportesDTO.reporteDTOConstaF m = BLL.cg_constanciaXfamily(dto.id_estudiante, dto.id_grupo, dto.mes1, dto.mes2);
            if (m != null)
            {
                Session["id_estudiante"] = dto.id_estudiante;
                Session["id_grupo"] = dto.id_grupo;
                Session["mes1"] = dto.mes1;
                Session["mes2"] = dto.mes2;
                BLLB.r_bitacora(dtob);
            }
            return m;
             }
            catch (Exception)
            {
                return null;

            }
        }
        [WebMethod(EnableSession = true)] // ENABLE SECCION FUNCIONA PARA HABILITAR SECCIONES EN EL SERVICIO
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)] // cg  i,e : consula para generar los listados por grupo
        public List<reportesDTO.reporteDTOListado> cg_listadoXGrupo(dtoListado dto, bitacorasDTO dtob)
        {
            try{
            List<reportesDTO.reporteDTOListado> m = BLL.cg_listadoXGrupo(dto.id_grupo, dto.id_periodo);
            string b = null;
            foreach (reportesDTO.reporteDTOListado item in m)
            {
                b = item.resultado;
            }
            if (b != null)
            {
               if (b != "c_no")
               {
                   Session["id_grupo"] = dto.id_grupo;
                   Session["id_periodo"] = dto.id_periodo;
                   BLLB.r_bitacora(dtob);
               }
           }
           return m;
             }
            catch (Exception)
            {
                return null;

            }

        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)] // cg  i,e : consula para generar boletines en grupo
        public List<reportesDTO.reportesG> cg_reporteGrupo(dtoGReport dto)
        {
            try{
            reportesDTO.reportesDTOG dty = new reportesDTO.reportesDTOG();
            dty.id_grupo = dto.id_grupo;
            dty.id_periodo = dto.id_periodo;
            List<reportesDTO.reportesG> m = BLL.cg_reporteGrupo(dty);
            return m;
            }
            catch (Exception)
            {
                return null;

            }
        }

        //----------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)] // rg  i,e : registro para generar boletines 
        public string rg_reporteGrupo(reportesDTO.reportesDTOG dto, bitacorasDTO dtob)
        {
            try{
            string m = BLL.rg_reporteGrupo(dto);
            if (m != null)
            {
                if (m != "Lo sentimos. Tuvimos problemas para procesar este grupo. Al parecer no envió los datos correctos. Revise y reintente. ")
                {
                    if (m != "Datos enviados, pero al parecer existe en estudiante en este grupo al cual ya se le ha generado el reporte. Para este grupo y periodo.")
                    {
                        BLLB.r_bitacora(dtob);
                    }   
                }
            }
            return m;
             }
            catch (Exception)
            {
                return null;

            }
        }
           //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)] // mg  i,e : modificación para generar boletines
        public string mg_reporteGrupo(reportesDTO.reportesDTOG dto, bitacorasDTO dtob)
        {
            try{
            string m = BLL.mg_reporteGrupo(dto);
            if (m != null)
            {
                if (m != "Lo sentimos. Tuvimos problemas para procesar este grupo. Al parecer no envió los datos correctos. Revise y reintente. ")
                {
                        BLLB.r_bitacora(dtob);
                }
            }
            return m;
             }
            catch (Exception)
            {
                return null;

            }
        }
      
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)] // eg  i,e : eliminacion de registros de boletines generados
        public string eg_reporteGrupo(reportesDTO.reportesDTOG dto, bitacorasDTO dtob)
        {
            try{
            string m = BLL.eg_reporteGrupo(dto);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
             }
            catch (Exception)
            {
                return null;

            }
        }
     
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)] // eg  i,e : eliminacion de registros de boletines generados
        public string v_reporteGrados(bitacorasDTO dtob)
        {
            try{
            string m = BLL.v_reporteGrados();
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
             }
            catch (Exception)
            {
                return null;

            }
        }

        //-------------------------------------------HOJAS DE VIDAS -----------------------------------------------
        [WebMethod(EnableSession = true)] // ENABLE SECCION FUNCIONA PARA HABILITAR SECCIONES EN EL SERVICIO
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)] // cg  i,e : consula para generar los listados por grupo
        public string cg_hvidas(dtoHvidas dto, bitacorasDTO dtob)
        {try{
            Session["rolS"] = dto.rol;
            Session["idS"] = dto.id;
            BLLB.r_bitacora(dtob);
            return "c_yes";
             }
            catch (Exception)
            {
                return null;

            }
        }
    }
}
