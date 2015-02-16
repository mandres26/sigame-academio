using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ENTIDADES;

namespace PPL_APP.Controllers
{
    public class periodosController : ApiController
    {
        RepoPeriodo BLL = new RepoPeriodo();
        public string Get(int id, [FromBody]dtoG df)//  c_fechaHoy
        {
            DateTime dptFechaHoy;
            dptFechaHoy = DateTime.Now;
            string m = dptFechaHoy.ToShortDateString();
            return m;
        }
        public string Get(string id, [FromBody]dtoPer dto)  // c_fechasPerPer
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
            else if (FHoy > FFin)
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

        public periodosDTO Post(dtoGApp dtoP) // c_periodo
        {
            return BLL.c_periodo(dtoP.id);
        }
        public List<periodosDTO> Get() //c_periodos
        {
            List<periodosDTO> m = BLL.c_periodo();
            return m;
        }
        //Ok
    }
}
