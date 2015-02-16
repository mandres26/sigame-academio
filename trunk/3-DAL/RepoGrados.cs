using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
using AutoMapper;
namespace DAL
{
    public class RepoGrados
    {
        bdsigameEntities bd = new bdsigameEntities();
        grados origen = new grados();
        gradosDTO destino = new gradosDTO();
        List<grados> origenl = new List<grados>();
        List<gradosDTO> destinol = new List<gradosDTO>();
        //-----------------------------------------------------------------------------------
        public string r_grado(gradosDTO ob)
        {
            try
            {
               ob.nom_grado= ob.nom_grado.ToUpper();

                grados m = new grados();
                AutoMapper.Mapper.CreateMap<gradosDTO, grados>();
                AutoMapper.Mapper.Map(ob, m);
                bd.grados.Add(m);
                bd.SaveChanges();
                return "¡Se agregó el grado exitosamente!";
            }
            catch (Exception)
            {                
                return null;
            }
                
          }
        public string m_grado(string viejoCodGru, gradosDTO nuevosDatos)
        {
            try
            {
                nuevosDatos.nom_grado =nuevosDatos.nom_grado.ToUpper();
                grados n = bd.grados.Where(t => t.id_grado == viejoCodGru).FirstOrDefault();           
                n.id_grado = nuevosDatos.id_grado;
                n.nom_grado = nuevosDatos.nom_grado;
                bd.SaveChanges();
                return "¡Se modifico el registro del grado exitosamente!"; 
            }
            catch (Exception)
            {                
                return null;
            }                      
        }
        //-----------------------------------------------------------------------------------
        public string e_grado(string CodGra)
        {
            try
            {
                CodGra = CodGra.ToUpper();

                grados n = bd.grados.Where(t => t.id_grado == CodGra).FirstOrDefault();            

                bd.grados.Remove(n);
                bd.SaveChanges();
                return "¡Eliminación Exitosa.!";    
            }
            catch (Exception e)
            {
                string m = e.Message.ToString();
                if (m.StartsWith("Se produjo un error mientras se actualizaban las entradas."))
                { return "Usted no puede eliminar este grado, ya que se encuentra vinculado a un grupo o logro. Revise."; }
                else
                { return null; }
            }                    
        }
        //-----------------------------------------------------------------------------------
        public gradosDTO c_grado(string codGrado)
        {
            try
            {
                codGrado = codGrado.ToUpper();
                origen = bd.grados.Where(t => t.id_grado == codGrado).FirstOrDefault();
                if (origen != null)
                {
                    Mapper.CreateMap<grados, gradosDTO>();
                    Mapper.Map(origen, destino);
                    return destino;
                }
                return null;
            }
            catch
            {
                return null;
            }
        }
        //-----------------------------------------------------------------------------------
        public List<gradosDTO> c_grado()
        {
            try
            {
                origenl = bd.grados.ToList();
                if (origenl != null)
                {
                Mapper.CreateMap<grados, gradosDTO>();
                Mapper.Map(origenl, destinol);
                destinol=destinol.OrderBy(t => t.id_grado).ToList();
                return destinol;
                }
                else { return null; }               
            }
            catch
            {
                return null;
            }
        }
        //-----------------------------------------------------------------------------------

    }
}
