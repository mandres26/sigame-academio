using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
using AutoMapper;
namespace DAL
{
    public class RepoPersonas
    {
        bdsigameEntities bd = new bdsigameEntities();
        personas origen = new personas();
        personasDTO.personass  destino = new personasDTO.personass ();
        List<personas> origenl = new List<personas>();
        List<personasDTO.personass> destinol = new List<personasDTO.personass>();

        //------------------------------------------------------------------------------------
        public personasDTO.personass c_persona(string idPersona)
        {
            try
            {
                origen = bd.personas.Where(t => t.id == idPersona).FirstOrDefault();
                if (origen != null)
                {
                    AutoMapper.Mapper.CreateMap<personas, personasDTO.personass>();
                    AutoMapper.Mapper.Map(origen, destino);
                    destino.f_naci = Convert.ToString(destino.f_naci).Substring(0, 10);
                    return destino;
                }
                else { return null; }
            }
            catch (Exception)
            {                
                return null;
            }          

        }
        //------------------------------------------------------------------------------------
        public List<personasDTO.personass> c_personasXidRol(string idRol)
        {
            try
            {
                idRol = idRol.ToUpper();
                List<personas> Persona = new List<personas>();
                Persona = bd.personas.ToList();

                origenl = bd.personas.Where(t => t.rol == idRol || t.rol_secundario == idRol).ToList();
                List<personasDTO.personass> nl = new List<personasDTO.personass>();
                foreach (var item in origenl)
                {
                    personasDTO.personass n = new personasDTO.personass();
                    n.id = item.id;
                    n.id_tipo = item.id_tipo;
                    n.nombres = item.nombres;
                    n.apellidos = item.apellidos;
                    n.telefono = item.telefono;
                    n.cel = item.cel;
                    n.email = item.email;
                    n.direccion = item.direccion;
                    n.sexo = item.sexo;
                    n.rol = item.rol;
                    n.edad = item.edad;
                    n.jornada = item.jornada;
                    n.estado = item.estado;
                    n.observacion = item.observacion;
                    n.f_naci = Convert.ToString(item.f_naci).Substring(0, 10);
                    nl.Add(n);
                }
                return nl;
            }
            catch (Exception)
            {

                return null;
            }
        }
            //------------------------------------------------------------------------------------

        public List<personasDTO.personass> c_personasXRolXSexo(string Rol, string Sexo)
        {
            try
            {
                //REUTILIZAMOS LA FUNCION DE BUSCAR POR Rol  Y LUEGO FILTRAMOS
                 List<personasDTO.personass> n= c_personasXidRol(Rol);
                 n= n.Where(t => t.rol == Rol && t.sexo == Sexo).ToList();
               
                return n;
            }
            catch (Exception)
            {
                return null;
            }
        }
        //------------------------------------------------------------------------------------
        public List<personasDTO.personass> c_personasXRolXJornada(string Rol, string jornada)
        {
            try
            {
                //REUTILIZAMOS LA FUNCION DE BUSCAR POR Rol  Y LUEGO FILTRAMOS
                 List<personasDTO.personass> n= c_personasXidRol(Rol);
                 n= n.Where(t => t.rol == Rol && t.jornada == jornada).ToList();
               
                return n;
            }
            catch (Exception)
            {
                return null;
            }
        }
        //------------------------------------------------------------------------------------
      
        public string r_persona(personasDTO.personass p)
        {
            try
            {
                //primero registro la persona y se esta tiene el campo de RETIRADO, 
                DateTime dptFecha = Convert.ToDateTime(p.f_naci);
                string edad = Convert.ToString(DateTime.Today.AddTicks(-dptFecha.Ticks).Year - 1); // con estop calculamos la edad
                personas n = new personas();
                n.id = p.id.ToUpper();
                n.id_tipo = p.id_tipo.ToUpper();
                n.nombres = p.nombres.ToUpper();
                n.apellidos = p.apellidos.ToUpper();
                n.telefono = p.telefono.ToUpper();
                n.cel = p.cel.ToUpper();
                n.email = p.email.ToUpper();
                n.direccion = p.direccion.ToUpper();
                n.sexo = p.sexo.ToUpper();
                n.rol = p.rol.ToUpper();
                n.rol_secundario = p.rol_secundario.ToUpper();
                n.rol_terciario = p.rol_terciario.ToUpper();
                n.edad = edad;
                n.jornada = p.jornada.ToUpper();
                n.f_naci = dptFecha;
                n.observacion = p.observacion;
                n.estado = p.estado.ToUpper();
                bd.personas.Add(n);
                bd.SaveChanges();
                // AHORA DISEÑAMOS EL USUARIO DE LA PERSONA EN LA TABLA USUARIO
                usuarios u = new usuarios();
                if (p.rol != "SUPER") { u.password = "comprilet#R1234"; }
                else if (p.rol == "SUPER") { u.password = "superadmin#R1234"; }

                if (p.estado.ToString() == "RETIRADO") { u.acceso = "FALSE"; }
                else { u.acceso = "TRUE"; }

                u.id = p.id.ToUpper();
                u.niu_mobil = "";
                u.acceso = "TRUE";
                bd.usuarios.Add(u);
                bd.SaveChanges();
                return "¡Se agregó la persona correctamente";
            }
            catch { return null; }
        }
        //------------------------------------------------------------------------------------
        public string e_persona(personasDTO.personass p)
        {
            try
            {
                // AHORA ELIMINAMOS DE LA TABLA USUARIOS
                usuarios u = bd.usuarios.Where(t => t.id == p.id).FirstOrDefault();
                if (u != null)
                {
                    personas n = bd.personas.Where(t => t.id == p.id).FirstOrDefault();
                    if (n != null)
                    {
                        bd.usuarios.Remove(u);
                        bd.personas.Remove(n);
                        bd.SaveChanges();
                        return "¡Eliminación exitosa!";
                    }
                    else
                    {
                        return null;
                    }
                }
                else { return null; }
            }
            catch (Exception e)
            {
                string m = e.Message.ToString();
                if (m.StartsWith("Se produjo un error mientras se actualizaban las entradas."))
                { return "Usted no puede eliminar esta persona, ya que se encuentra vinculada con observaciónes, notas o matriculas academicas. Revise"; }
                else
                { return null; }
            }
       }
        //------------------------------------------------------------------------------------
        public string m_persona(string cod, personasDTO.personass p)
        {
            try
            {
                DateTime dptFecha = Convert.ToDateTime(p.f_naci);
                string edad = Convert.ToString(DateTime.Today.AddTicks(-dptFecha.Ticks).Year - 1); // con estop calculamos la edad
                personas n = bd.personas.Where(t => t.id == cod).FirstOrDefault();
                    //n.id = p.id;
                n.nombres = p.nombres.ToUpper();
                n.apellidos = p.apellidos.ToUpper();
                n.id_tipo = p.id_tipo.ToUpper();
                    n.telefono = p.telefono;
                    n.telefono2 = p.telefono2;
                    n.cel = p.cel;
                    n.email = p.email.ToUpper();
                    n.direccion = p.direccion.ToUpper();
                    n.direccion2 = p.direccion2.ToUpper();
                    n.sexo = p.sexo.ToUpper();
                    n.rol = p.rol.ToUpper();
                    n.rol_secundario = p.rol_secundario.ToUpper();
                    n.rol_terciario = p.rol_terciario.ToUpper();
                    n.edad = edad.ToUpper();
                    n.jornada = p.jornada.ToUpper();
                    n.f_naci = dptFecha;
                    n.estado = p.estado.ToUpper();
                    n.observacion = p.observacion;
                    bd.SaveChanges();

                    if (p.estado.ToString() == "RETIRADO")
                    {
                        //entonces.... lo bloqueamos automaticamente
                        usuarios nN = bd.usuarios.Where(t => t.id == n.id).FirstOrDefault();
                        nN.acceso = "FALSE";
                        bd.SaveChanges();

                    }
                   

                    return "¡Se modifico la persona correctamente.!";
            }
            catch (Exception){ return null; }
        }
        ///-------------------------------------------------------------------
        public List<personasDTO.personass> c_personasXApellidos(dtoG dto)
        {
            try
            {
                using (var ctx = new bdsigameEntities())
                {
                    string sql = "SELECT `id` FROM `personas` WHERE `apellidos` LIKE '%" + dto.id + "%'";
                    var m = ctx.Database.SqlQuery<string>(sql).ToList();
                    List<personasDTO.personass> destino = new List<personasDTO.personass>();
                    if (m.Count != 0)
                    {
                        for (int i = 0; i < m.Count; i++)
                        {
                            string id = Convert.ToString(m[i]);
                            personasDTO.personass ll = new personasDTO.personass();
                            personas u = bd.personas.Where(t => t.id == id).FirstOrDefault();
                            AutoMapper.Mapper.CreateMap<personas, personasDTO.personass>();
                            AutoMapper.Mapper.Map(u, ll);
                            if (ll.f_naci != null)
                            {
                                ll.f_naci = Convert.ToString(ll.f_naci).Substring(0, 10);
                            }
                            destino.Add(ll);
                        }
                        destino = destino.OrderBy(t => t.apellidos).ToList();
                        return destino;
                    }
                    else
                    {
                        return null;
                    }
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
        public List<personasDTO.personass> c_personasXNombres(dtoG dto)
        {

            try
            {
                using (var ctx = new bdsigameEntities())
                {
                    string sql = "SELECT `id` FROM `personas` WHERE `nombres` LIKE '%" + dto.id + "%'";
                    var m = ctx.Database.SqlQuery<string>(sql).ToList();
                    List<personasDTO.personass> destino = new List<personasDTO.personass>();
                    if (m.Count != 0)
                    {
                        for (int i = 0; i < m.Count; i++)
                        {
                            string id = Convert.ToString(m[i]);
                            personasDTO.personass ll = new personasDTO.personass();
                            personas u = bd.personas.Where(t => t.id == id).FirstOrDefault();
                            AutoMapper.Mapper.CreateMap<personas, personasDTO.personass>();
                            AutoMapper.Mapper.Map(u, ll);
                            if (ll.f_naci != null)
                            {
                                ll.f_naci = Convert.ToString(ll.f_naci).Substring(0, 10);
                            }
                            destino.Add(ll);
                        }
                        destino = destino.OrderBy(t => t.apellidos).ToList();
                        return destino;
                    }
                    else
                    {
                        return null;
                    }
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        public personasDTO.personass c_personaXNombre(dtoG dto)  // OK
        {
            try
            {
                using (var ctx = new bdsigameEntities())
                {
                    string sql = "SELECT `id` FROM `personas` WHERE `nombres` LIKE '%" + dto.id + "%'";
                    var m = ctx.Database.SqlQuery<string>(sql).ToList();
                    if (m.Count != 0)
                    {
                        personasDTO.personass ll = new personasDTO.personass();
                        for (int i = 0; i < m.Count; i++)
                        {
                            if (i == 0)
                            {
                                string id = Convert.ToString(m[i]);
                                personas u = bd.personas.Where(t => t.id == id).FirstOrDefault();
                                AutoMapper.Mapper.CreateMap<personas, personasDTO.personass>();
                                AutoMapper.Mapper.Map(u, ll);
                                if (ll.f_naci != null)
                                {
                                    ll.f_naci = Convert.ToString(ll.f_naci).Substring(0, 10);
                                }
                            }
                        }
                        return ll;
                    }
                    else
                    {
                        return null;
                    }
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        public personasDTO.personass c_personaAndGrupo(dtoGEst dto)
        {
            try
            {
                origen = bd.personas.Where(t => t.id == dto.id).FirstOrDefault();
                if (origen != null)
                {
                    string id = origen.id.ToString();
                    // ahora verifacamos que este en ese grupo
                    matricula2 pp = bd.matricula2.Where(t => t.id_estudiante == id && t.id_grupo == dto.id_grupo).FirstOrDefault();
                    if (pp != null)
                    {
                        personas u = bd.personas.Where(t => t.id == id).FirstOrDefault();
                        AutoMapper.Mapper.CreateMap<personas, personasDTO.personass>();
                        AutoMapper.Mapper.Map(u, destino);
                        if (destino.f_naci != null)
                        {
                            destino.f_naci = Convert.ToString(destino.f_naci).Substring(0, 10);
                        } return destino;
                    }
                    else { return null; }
                    
                }
                else { return null; }
            }
            catch (Exception)
            {
                return null;
            }     
        }
        public personasDTO.personass c_personaXNombreAndGrupo(dtoGEst dto)
        {
            try
            {
                using (var ctx = new bdsigameEntities())
                {
                    string sql = "SELECT `id` FROM `personas` WHERE `nombres` LIKE '%" + dto.id + "%'";
                    var m = ctx.Database.SqlQuery<string>(sql).ToList();
                    if (m.Count != 0)
                    {
                        personasDTO.personass ll = new personasDTO.personass();
                        for (int i = 0; i < m.Count; i++)
                        {
                            if (i == 0)
                            {
                                string id = Convert.ToString(m[i]);
                                // ahora verifacamos que este en ese grupo
                                matricula2 pp = bd.matricula2.Where(t => t.id_estudiante == id && t.id_grupo == dto.id_grupo).FirstOrDefault();
                                if (pp != null)
                                {
                                    personas u = bd.personas.Where(t => t.id == id).FirstOrDefault();
                                    AutoMapper.Mapper.CreateMap<personas, personasDTO.personass>();
                                    AutoMapper.Mapper.Map(u, ll);
                                    if (ll.f_naci != null)
                                    {
                                        ll.f_naci = Convert.ToString(ll.f_naci).Substring(0, 10);
                                    }
                                    return ll;
                                }
                                else
                                {
                                    return null;
                                }
                            }
                        }
                        {
                            return null;
                        }
                     
                    }
                    else
                    {
                        return null;
                    }
                }
            }
            catch (Exception)
            {
                return null;
            }
        }


        public List<personasDTO.personasBusquedaDTO> c_profesoresXBusque()
        {
            try
            {
                List<personasDTO.personasBusquedaDTO> lista = new List<personasDTO.personasBusquedaDTO>();
                List<personas> n = bd.personas.Where(t => t.rol =="PROFESOR").ToList();
                n = n.OrderBy(t => t.nombres).ToList();
                personasDTO.personasBusquedaDTO pP = new personasDTO.personasBusquedaDTO();
                pP.persona = "";
                pP.uid = "";
                lista.Add(pP);

                if (n.Count !=0)
                {
                    foreach (personas item in n)
                    {
                         personasDTO.personasBusquedaDTO p = new personasDTO.personasBusquedaDTO();
                        p.persona = item.nombres.ToString().ToUpper() +"/"+item.id.ToString();
                        p.uid = "";
                        lista.Add(p);
                    }
                    return lista;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception) { return null; }
        }
        public List<personasDTO.personasBusquedaDTO> c_estudiantesXBusque()
        {
            try
            {
                List<personasDTO.personasBusquedaDTO> lista = new List<personasDTO.personasBusquedaDTO>();
                List<personas> n = bd.personas.Where(t => t.rol == "ESTUDIANTE").ToList();
                n = n.OrderBy(t => t.nombres).ToList();
                personasDTO.personasBusquedaDTO pP = new personasDTO.personasBusquedaDTO();
                pP.persona = "";
                pP.uid = "";
                lista.Add(pP);
                if (n.Count != 0)
                {
                    foreach (personas item in n)
                    {
                        personasDTO.personasBusquedaDTO p = new personasDTO.personasBusquedaDTO();
                        p.persona = item.nombres.ToString().ToUpper()  + "/" + item.id.ToString();
                        p.uid = "";
                        lista.Add(p);
                    }
                    return lista;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception) { return null; }
        }
        public List<personasDTO.personasBusquedaDTO> c_acudientesXBusque()
        {
            try
            {
                List<personasDTO.personasBusquedaDTO> lista = new List<personasDTO.personasBusquedaDTO>();
                List<personas> n = bd.personas.Where(t => t.rol == "ACUDIENTE" || t.rol_secundario == "ACUDIENTE").ToList();
                n = n.OrderBy(t => t.nombres).ToList();
                personasDTO.personasBusquedaDTO pP = new personasDTO.personasBusquedaDTO();
                pP.persona = "";
                pP.uid = "";
                lista.Add(pP);
                if (n.Count != 0)
                {
                    foreach (personas item in n)
                    {
                        personasDTO.personasBusquedaDTO p = new personasDTO.personasBusquedaDTO();
                        p.persona = item.nombres.ToString().ToUpper()+ "/" + item.id.ToString();
                        p.uid = "";
                        lista.Add(p);
                    }
                    return lista;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception) { return null; }
        }

        public List<personasDTO.personasBusquedaDTO> c_estXGrupoXBusque( dtoG dto)
        {
            try
            {
                List<personasDTO.personasBusquedaDTO> lista = new List<personasDTO.personasBusquedaDTO>();
                List<matricula2> n = bd.matricula2.Where(t => t.id_grupo == dto.id).ToList();
                n = n.OrderBy(t => t.personas1.nombres).ToList();

                personasDTO.personasBusquedaDTO pP = new personasDTO.personasBusquedaDTO();
                pP.persona = "";
                pP.uid = "";
                lista.Add(pP);
                if (n.Count != 0)
                {
                    foreach (matricula2 item in n)
                    {
                        personasDTO.personasBusquedaDTO p = new personasDTO.personasBusquedaDTO();
                        p.persona = item.personas1.nombres.ToString().ToUpper() + "/" + item.personas1.id.ToString();
                        p.uid = "";
                        lista.Add(p);
                    }
                    return lista;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception) { return null; }
        }

        public List<personasDTO.personasBusquedaDTO> c_personasXBusque()
        {
            try
            {
                List<personasDTO.personasBusquedaDTO> lista = new List<personasDTO.personasBusquedaDTO>();
                List<personas> n = bd.personas.ToList();
                n = n.OrderBy(t => t.nombres).ToList();
                personasDTO.personasBusquedaDTO pP = new personasDTO.personasBusquedaDTO();
                pP.persona = "";
                pP.uid = "";
                lista.Add(pP);
                if (n.Count != 0)
                {
                    foreach (personas item in n)
                    {
                        personasDTO.personasBusquedaDTO p = new personasDTO.personasBusquedaDTO();
                        p.persona = item.nombres.ToString().ToUpper()+" "+item.apellidos.ToString().ToUpper() + " /" + item.rol.ToString()+" /" + item.id.ToString();
                        p.uid = "";
                        lista.Add(p);
                    }
                    return lista;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception) { return null; }
        }
    }
}
