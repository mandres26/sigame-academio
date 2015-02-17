using BLL;
using ENTIDADES;
using DAL;
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
    public class users : System.Web.Services.WebService
    {
        GestionBitacoras BLLB = new GestionBitacoras();
        GestionUsuarios BLL = new GestionUsuarios();
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public personasDTO.UsuariosDTOs c_iniciar(usuariosDTO dto)// inicio de la seccion
        {
            personasDTO.UsuariosDTOs m=  BLL.c_usuario(dto.id,dto.password);
            if (m!=null)
            {
                int ano = DateTime.Now.Year;
                m.ano = ano.ToString(); 
            }
            return m;
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string c_iniciarPrueba(usuariosDTO dto)// inicio de la seccion
        {
            return BLL.c_usuarioPrueba(dto.id, dto.password);
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string c_iniciarPruebaHere(usuariosDTO dto)// inicio de la seccion
        {
            try
            {
                bdsigameEntities bd = new bdsigameEntities();
                asignatura f = bd.asignatura.FirstOrDefault();
                return "Yes luis";
            }
            catch (Exception ex)
            {
                return ex.Message.ToString();
            }

        }

      

       
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string  b_salir(bitacorasDTO dtob) // registro a la bitacora al salir de la seccion
        {
                return BLLB.r_bitacora(dtob);
        }
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string b_iniciar(bitacorasDTO dtob)// registro a la bitacora al iniciar la seccion
        {
            string  m= BLLB.r_bitacora(dtob);
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<personasDTO.UsuariosDTOs> c_usuarioss(bitacorasDTO dtob)
        {
           List<personasDTO.UsuariosDTOs> m= BLL.c_datosUsuariosSistema();
          if (m != null)
           {
                BLLB.r_bitacora(dtob);
           }
           return m;
        
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string c_cambiar(dtoCambiar dto,bitacorasDTO dtob)
        {
          string m = BLL.c_cambiar(dto);
          if (m != null)
           {
                BLLB.r_bitacora(dtob);
           }
           return m;
        
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string c_verificar(dtoCambiar dto, bitacorasDTO dtob)
        {
            string m = BLL.c_verificar(dto);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }

        
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string m_usuario(usuariosDTO dtonew, dtoG dto, bitacorasDTO dtob)
        {
            string m = BLL.m_usuario(dtonew);
            if (m != null)
           {
                BLLB.r_bitacora(dtob);
           }
           return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public usuariosDTO c_usuario(dtoG dto)
        {
            usuariosDTO u = new usuariosDTO();
            u.id= dto.id;
            return BLL.c_usuario(u);
        }
        //--------------------------------------------------------------------------------------------------

         //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<usuariosDTOExport> c_usuariosProfes(bitacorasDTO dtob)
        {
            List<usuariosDTOExport> m = BLL.c_usuariosProfes();
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<usuariosDTOExport> c_usuariosGrupo(dtoG dto, bitacorasDTO dtob)
        {
            List<usuariosDTOExport> m = BLL.c_usuariosGrupo(dto);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
                //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string c_dirTel(personasDTO.personass dto, bitacorasDTO dtob)
        {
            string m = BLL.c_dirTel(dto);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string exp_moddle(bitacorasDTO dtob)
        {
            return BLLB.r_bitacora(dtob);
        }
        //------------------------------para cargar la fecha y hora de la seccion----------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string seccion()
        {
            DateTime seccion;
            seccion = DateTime.Now;
            string[] sg = seccion.ToString().Split(' ');
            string[] sgg= sg[1].Split(':');
            int h = int.Parse(sgg[0]);
            h = h + 2;

            string g = sg[0] + " " + h + ":" + sgg[1] + ":" + sgg[2] + " " + sg[2];
            return g;
        }

        //------------------------------------para capturar el año de vigencia---------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string vigencia()
        {
            return "2015";
        }
    }
}
