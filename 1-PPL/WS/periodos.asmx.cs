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

    public class periodos : System.Web.Services.WebService
    {
        GestionPeriodo BLL = new GestionPeriodo();
        GestionBitacoras BLLB = new GestionBitacoras();
        ////--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string r_periodo(periodosDTO dto, bitacorasDTO dtob)
        {
           string m= BLL.r_periodo(dto);
           if (m != null)
           {
               BLLB.r_bitacora(dtob);
           }
           return m;
        }
        ////--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string m_periodo(periodosDTO dto, bitacorasDTO dtob)
        {
            string m = BLL.m_periodo(dto);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }

        ////--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string e_periodo(dtoG dto, bitacorasDTO dtob)
        {
            periodosDTO p = new periodosDTO();
            p.id = dto.id;
           string m= BLL.e_periodo(p);
            if (m != null)
            {
                if (m != "Usted no puede eliminar este periodo, ya que se encuentra vinculado con observaciónes o notas. Revise")
                {
                    BLLB.r_bitacora(dtob);
                }
            }
            return m;
        }
       
        ////--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public periodosDTO c_periodo(dtoG dto)
        {
            return BLL.c_periodo(dto.id);
        }
        ////--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<periodosDTO> c_periodoss(bitacorasDTO dtob)
        {
             List<periodosDTO> m=  BLL.c_periodos();
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<periodosDTO> c_periodos()
        {
            List<periodosDTO> m = BLL.c_periodos();
            return m;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string c_fechaHoy()
        {
            DateTime dptFechaHoy;
            dptFechaHoy = DateTime.Now;
            string m = dptFechaHoy.ToShortDateString();
            return m;
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string c_fechasPerPer(dtoPer dto)
        {
            string[] sg = dto.fhoyy.Split('-');
            if (sg[1] == "LOCALHOST")
            {
                string[] s = sg[0].Split('/');
                string[] sini = dto.finicia.Split('/');
                string[] sfin = dto.ffin.Split('/');
                //ajustamos  a        mes/dia/año
                string shoy = s[0] + "/" + s[1] + "/" + s[2];
                string si = sini[1] + "/" + sini[0] + "/" + sini[2];
                string sf = sfin[1] + "/" + sfin[0] + "/" + sfin[2];
                dto.fhoyy = shoy;
                dto.ffin = sf;
                dto.finicia = si;
            }
            else // ES  GODDDAY
            {
                string[] s = dto.fhoyy.Split('-');
                dto.fhoyy = s[0];
                dto.finicia = dto.finicia;
                dto.ffin = dto.ffin;
            }

            DateTime FIni;
            DateTime FHoy;
            DateTime FFin;

            FIni = Convert.ToDateTime(dto.finicia);
            FHoy = Convert.ToDateTime(dto.fhoyy);
            FFin = Convert.ToDateTime(dto.ffin);
            //OJO CON ESETE JUEGO.. VERIFIAC BIEN YA QUE COMO MI MENTE ESTA CANSADA NO PUEDO PENSAR
            if ((FIni <= FHoy) && (FHoy <= FFin))
            {
                return "PERMITIDO";
            }
            else if (FHoy > FFin )
            {
                return "CERRADO";
            }
            else if (FHoy < FIni)
            {
                return "NO PERMITIDO";
            }
            else
            {
                return "";
            }
        }
      

        
    }
}




