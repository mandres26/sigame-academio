using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ENTIDADES;
namespace PPL_APP.Controllers
{
    public class usersController : ApiController
    {
        RepoBitacora BLLB = new RepoBitacora();
        public personasDTO.UsuariosDTOs Post(usuariosDTO dto)// inicio de la seccion
        {


            try
            {
                bdsigameEntities bd = new bdsigameEntities();
                usuarios u = new usuarios();
                personasDTO.UsuariosDTOs p = new personasDTO.UsuariosDTOs();
                u = bd.usuarios.Where(t => t.id == dto.id).FirstOrDefault();
                if (u != null)
                {

                    if (u.acceso.Equals("TRUE")) //denegamos el acceso al sistema
                    {
                        if (u.password.Equals(dto.password)) //validamos el password
                        {
                            p.nombres = u.personas.nombres.ToString();
                            p.apellidos = u.personas.apellidos.ToString();
                            p.id = u.personas.id.ToString();
                            p.id_tipo = u.personas.id_tipo.ToString();
                            //p.jornada = u.personas.jornada.ToString();
                            // p.cel = u.personas.cel.ToString();
                            // p.direccion = u.personas.direccion.ToString();
                            p.sexo = u.personas.sexo.ToString();
                            p.rol = u.personas.rol.ToString();
                            p.rol_secundario = u.personas.rol_secundario.ToString();
                            p.rol_terciario = u.personas.rol_terciario.ToString();
                            p.email = u.personas.email.ToString();
                            // p.telefono = u.personas.telefono.ToString();
                            p.acceso = u.acceso.ToString();
                            p.password = u.password.ToString();

                            int ano = DateTime.Now.Year;
                            p.ano = ano.ToString();
                            return p;
                        }
                        return null;
                    }
                    else
                    {
                        p.acceso = u.acceso.ToString();
                        return p;
                    }
                }
                return null;
            }
            catch
            {
                return null;
            }
        }
       
        
        public string Delete([FromBody]dtoG vigencia)  // Para la vigencia
        {
            return "2015";
        }

        public string Put([FromBody]bitacorasDTO dtob)// registro a la bitacora al iniciar la seccion
        {
            string m = BLLB.r_bitacora(dtob);
            return m;
        }

        public string Get() //seccion()
        {
            DateTime seccion;
            seccion = DateTime.Now;
            string[] sg = seccion.ToString().Split(' ');
            string[] sgg = sg[1].Split(':');
            int h = int.Parse(sgg[0]);
            h = h + 2;
            string g = sg[0] + " " + h + ":" + sgg[1] + ":" + sgg[2] + " " + sg[2];
            return g;
        }
    }
}
