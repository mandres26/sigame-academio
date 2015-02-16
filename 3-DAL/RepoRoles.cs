using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;

namespace DAL
{
    public class RepoRoles
    {
        bdsigameEntities bd = new bdsigameEntities();
        roles origen = new roles();
        rolesDTO destino = new rolesDTO();
        List<roles> origenl = new List<roles>();
        List<rolesDTO> destinol = new List<rolesDTO>();
        //-------------------------------------------------------------
        public string r_roles(rolesDTO ob)
        {
            try
            {
                ob.id = ob.id;
                roles m = new roles();
                AutoMapper.Mapper.CreateMap<rolesDTO, roles>();
                AutoMapper.Mapper.Map(ob, m);
                bd.roles.Add(m);
                bd.SaveChanges();
                return "¡Se agregó el rol exitosamente!";
            }
            catch (Exception)
            {
                return null;
            }
        }
        //-------------------------------------------------------------
        public string e_roles(string cod)
        {
            try
            {
                cod = cod.ToUpper();
                roles n = bd.roles.Where(t => t.id == cod).FirstOrDefault();
                bd.roles.Remove(n);
                bd.SaveChanges();
                return "¡Eliminación exitosa";
            }
         
            catch (Exception  e)
            {
                string m = e.Message.ToString();
                if (m.StartsWith("Se produjo un error mientras se actualizaban las entradas."))
                { return "Usted no puede eliminar este rol ya que se encuentra vinculado con personas. Revise."; }
                else
                { return null; }
            }
        }
        //-------------------------------------------------------------
        public rolesDTO c_roles(string cod)
        {
            try
            {
                cod = cod.ToUpper();
                origen = bd.roles.Where(t => t.id == cod).FirstOrDefault();
                if (origen != null)
                {
                    AutoMapper.Mapper.CreateMap<roles, rolesDTO>();
                    AutoMapper.Mapper.Map(origen, destino);
                    return destino;
                }
                else { return null; }
            }
            catch (Exception)
            {
                return null;
            }
        }
        //-------------------------------------------------------------
        public List<rolesDTO> c_roles()
        {
            try
            {
                origenl = bd.roles.ToList();
                if (origenl != null)
                {
                    AutoMapper.Mapper.CreateMap<roles, rolesDTO>();
                    AutoMapper.Mapper.Map(origenl, destinol);
                    return destinol;
                }
                else { return null; }
            }
            catch (Exception)
            {
                return null;
            }
        }
        //-------------------------------------------------------------        
    }
}
