using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
using AutoMapper;

namespace DAL
{
    public class RepoUsuarios
    {
        bdsigameEntities bd = new bdsigameEntities();       
        public string  m_usuario(usuariosDTO nuevosDatos)
        {
            try
            {
                    usuarios n = bd.usuarios.Where(t => t.id == nuevosDatos.id).FirstOrDefault();
                    n.password = nuevosDatos.password;
                    n.acceso = nuevosDatos.acceso;
                    n.niu_mobil = nuevosDatos.niu_mobil;

                    bd.SaveChanges();
                    return "Usuario actualizado exitosamente";               
            }
            catch { return null; }
     
        }
        //--------------------------------------------------------------------------------------------------
        public string c_cambiar(dtoCambiar dto)
        {
            try
            {
            usuarios n = bd.usuarios.Where(t => t.id == dto.id).FirstOrDefault();
            n.password = dto.pass;
            bd.SaveChanges();
            return "Usuario actualizado exitosamente";   
              }
            catch
            {
                return null;
            }
        }
        //--------------------------------------------------------------------------------------------------
        public string c_verificar(dtoCambiar dto)
        {
            try
            {
                usuarios n = bd.usuarios.Where(t => t.id == dto.id && t.password == dto.pass).FirstOrDefault();
                if (n!=null)
                {
                    return "Verificado";
                }
                return null;
            }
            catch
            {
                return null;
            }
        }
        //-----------------------------------------------------------------------------------
        public personasDTO.UsuariosDTOs c_usuario(string  userid, string passR)
        {
            try
            {
                bdsigameEntities bd = new bdsigameEntities();
                usuarios u = new usuarios();
                personasDTO.UsuariosDTOs p = new personasDTO.UsuariosDTOs();
                u = bd.usuarios.Where(t => t.id == userid).FirstOrDefault();
                if (u != null)
                {

                    if (u.acceso.Equals("TRUE")) //denegamos el acceso al sistema
                    {
                        if (u.password.Equals(passR)) //validamos el password
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
        //-----------------------------------------------------------------------------------

                public string c_usuarioPrueba(string  userid, string passR){
                    try
                    {
                        areas f = bd.areas.FirstOrDefault();
                        return "Yes luis";
                    }
                    catch (Exception ex )
                    {
                        return ex.Message.ToString();
                    }
                }
        public usuariosDTO c_usuario(usuariosDTO uu)
        {
            try
            {
                bdsigameEntities bd = new bdsigameEntities();
                usuariosDTO ur = new usuariosDTO();
                usuarios u = bd.usuarios.Where(t => t.id == uu.id).FirstOrDefault();
                if ((uu != null))
                {
                    ur.id = u.id;
                    ur.password = u.password;
                    ur.acceso = u.acceso;
                    ur.niu_mobil = u.niu_mobil;
                    return ur;
                }
                else
                {
                    return null;
                }
            }
            catch 
            {
                return null;
            }
        }
        //-----------------------------------------------------------------------------------
        public List<personasDTO.UsuariosDTOs> c_datosUsuariosSistema()
        {
            try
            {
                 
                bdsigameEntities bd = new bdsigameEntities();
                usuariosDTO no = new usuariosDTO();

                List<personasDTO.UsuariosDTOs> destino = new List<personasDTO.UsuariosDTOs>();
                List<usuarios> n = bd.usuarios.OrderBy(t=> t.id).ToList();
                if (n.Count != 0)
                {
                    foreach (usuarios item in n)
                    {
                        personasDTO.UsuariosDTOs p = new personasDTO.UsuariosDTOs();
                        p.nombres = item.personas.nombres.ToString();
                        p.apellidos = item.personas.apellidos.ToString();
                        p.id = item.personas.id.ToString();
                        p.id_tipo = item.personas.id_tipo.ToString();
                        if (item.personas.jornada !=null)
                        {
                            p.jornada = item.personas.jornada.ToString();
                        }
                        if (item.personas.rol != null)
                        {
                            p.rol = item.personas.rol.ToString();
                        }
                       
                        if ( item.personas.cel != null)
                        {
                            p.cel = item.personas.cel.ToString();
                        }
                        if ( item.personas.edad  != null)
                        {
                           p.edad = item.personas.edad.ToString();
                        }
                        
                        p.password = item.password.ToString();
                        p.acceso = item.acceso.ToString();

                        destino.Add(p);
                    }
                    destino = destino.OrderBy(t => t.rol).ToList();
                    return destino;
                }
                else
                {
                    return null;
                }
            }
            catch 
            {
                return null;
            }
        }
        //-----------------------------------------------------------------------------------
        public List<usuariosDTOExport> c_usuariosProfes()
        {
            try
            {

                List<personas> n = null;
                bdsigameEntities bd = new bdsigameEntities();
                personasDTO.personass no = new personasDTO.personass();
                n = bd.personas.Where(t => t.rol == "PROFESOR").ToList();
                List<usuariosDTOExport> destino = new List<usuariosDTOExport>();
                if (n.Count != 0)
                {
                    foreach (personas item in n)
                    {
                        usuariosDTOExport p = new usuariosDTOExport();
                        p.firstname = item.nombres.ToString();
                        p.lastname = item.apellidos.ToString();
                        p.id = item.id.ToString();
                        p.password = "comprilet#R1234";
                        p.username = item.id.ToString();
                        p.institution = "COMPRILET";
                        if (item.email.ToString() =="")
                        {
                            p.email = "comprilet@gmail.com";   
                        }
                        else
                        {
                            p.email = item.email.ToString();
                        }
                        destino.Add(p);
                    }
                    destino = destino.OrderBy(t => t.lastname).ToList();
                    return destino;
                }
                else
                {
                    return null;
                }
            }
            catch
            {
                return null;
            }
        }
        public string c_dirTel(personasDTO.personass dto)
        {
            try
            {
                    personas n = bd.personas.Where(t => t.id == dto.id).FirstOrDefault();
                    n.telefono2 = dto.telefono2;
                    n.direccion2 = dto.direccion2.ToUpper();
                    bd.SaveChanges();
                    return "¡Se modificaron sus datos correctamente.!";
            }
            catch (Exception){ return null; }
        }
        //--------------------------------------------------------------------------------------------------
        public List<usuariosDTOExport> c_usuariosGrupo(dtoG dto)
        {
            try
            {
                List<matricula2> n = null;
                bdsigameEntities bd = new bdsigameEntities();
                personasDTO.personass no = new personasDTO.personass();
                n = bd.matricula2.Where(t => t.id_grupo == dto.id).ToList();
                n = n.OrderBy(t => t.personas1.apellidos).ToList();
                List<usuariosDTOExport> d = new List<usuariosDTOExport>();
                int i = 1;
                foreach (matricula2 item in n)  
                {
                        usuariosDTOExport p = new usuariosDTOExport();
                        p.firstname = item.personas1.nombres.ToString();
                        p.lastname = item.personas1.apellidos.ToString();
                        p.id = item.personas1.id.ToString();
                        p.password = "comprilet#R1234";
                        p.username = item.personas1.id.ToString();
                        p.institution = "COMPRILET";
                        if (item.personas.email.ToString() == "")
                        {
                            p.email = "comprilet" + item.id_grupo.ToString() + "_"+i+"@comprilet.edu.co";
                        }
                        else
                        {
                            p.email = item.personas.email.ToString();
                        }
                        i++;
                      d.Add(p);
                }
                if (d.Count != 0)
                {
                    d = d.OrderBy(t => t.lastname).ToList();
                    return d;
                }
                else
                {
                    return null;
                }
            }
            catch 
            {
                return null;
            }
        }         
    }
}
