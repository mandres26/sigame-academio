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
    public class logros : System.Web.Services.WebService
    {

        GestionLogros BLL = new GestionLogros();
        GestionBitacoras BLLB = new GestionBitacoras();
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string r_logro(logrosDTO dto, bitacorasDTO dtob)
        {
            dto.descripcion = dto.descripcion.ToUpper();
           string m= BLL.r_logro(dto);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string m_logro(logrosDTO dtonew, dtoG dto, bitacorasDTO dtob)
        {
            dtonew.descripcion = dtonew.descripcion.ToUpper();
            string m= BLL.m_logro(dto.id, dtonew);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string e_logro(dtoG dto, bitacorasDTO dtob)
        {
            string m= BLL.e_logro(dto.id);
            if (m != null)
            {
                if (m != "Usted no puede eliminar este logro, ya que se encuentra vinculado con notas académicas. Revise.")
                {
                    BLLB.r_bitacora(dtob);
                }
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public logrosDTO c_logro(dtoG dto)
        {
            return BLL.c_logro(dto.id);
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<logrosDTO> c_logros()
        {
            List<logrosDTO> m = BLL.c_logros();

            return m;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<logrosDTO> c_logrosSystem(bitacorasDTO dtob)
        {
            List<logrosDTO> m = BLL.c_logros();
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }

        [WebMethod(EnableSession = true)] // ENABLE SECCION FUNCIONA PARA HABILITAR SECCIONES EN EL SERVICIO
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string c_logrosXgradoXasigPDF(dtoGLogros dto ,bitacorasDTO dtob)
        {
            Session["codGrado"] = dto.id_grado;
            Session["codAsig"] = dto.id_asignatura;
            BLLB.r_bitacora(dtob);
            return "c_yes";
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<logrosDTO> c_logrosXgradoXasig(dtoGLogros dto)
        {
            string dtoGrado, dtoAasignatura;
            dtoGrado = dto.id_grado;
            dtoAasignatura = dto.id_asignatura;
            List<logrosDTO> var = BLL.c_logrosXgradoXasig(dtoGrado, dtoAasignatura);
            return var;
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<logrosDTO> c_logrosXgradoXasigNota(dtoGLogros dto)
        {
            string dtoGrado, dtoAasignatura;
            dtoGrado = dto.id_grado;
            dtoAasignatura = dto.id_asignatura;
            List<logrosDTO> var = BLL.c_logrosXgradoXasigNota(dtoGrado, dtoAasignatura);
            return var;
        }
        //--------------------------------------------------------------------------------------------------
    }
}
