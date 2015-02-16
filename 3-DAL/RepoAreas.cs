using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
namespace DAL
{
    public class RepoAreas
    {
        bdsigameEntities bd = new bdsigameEntities();
        areas origen = new areas();
        dtoG destino = new dtoG();
        List<areas> origenl = new List<areas>();
        List<dtoG> destinol = new List<dtoG>();
        //-------------------------------------------------------------
        public string r_area(dtoG ob)
        {
            try
            {
                ob.id = ob.id;
                areas m = new areas();
                AutoMapper.Mapper.CreateMap<dtoG, areas>();
                AutoMapper.Mapper.Map(ob, m);
                bd.areas.Add(m);
                bd.SaveChanges();
                return "¡Se agregó el area exitosamente!";
            }
            catch (Exception)
            {
                return null;
            }
        }
        //-------------------------------------------------------------
        public string e_area(string cod)
        {
            try
            {
                cod = cod.ToUpper();
                areas n = bd.areas.Where(t => t.id == cod).FirstOrDefault();
                bd.areas.Remove(n);
                bd.SaveChanges();
                return "¡Eliminación exitosa";
            }
         
            catch (Exception  e)
            {
                string m = e.Message.ToString();
                if (m.StartsWith("Se produjo un error mientras se actualizaban las entradas."))
                { return "Usted no puede eliminar esta area ya que se encuentra vinculado con asignaturas. Revise."; }
                else
                { return null; }
            }
        }
        //-------------------------------------------------------------
        public dtoG c_area(string cod)
        {
            try
            {
                cod = cod.ToUpper();
                origen = bd.areas.Where(t => t.id == cod).FirstOrDefault();
                if (origen != null)
                {
                    AutoMapper.Mapper.CreateMap<areas, dtoG>();
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
        public List<dtoG> c_areass()
        {
            try
            {
                origenl = bd.areas.ToList();
                if (origenl != null)
                {
                    AutoMapper.Mapper.CreateMap<areas, dtoG>();
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
