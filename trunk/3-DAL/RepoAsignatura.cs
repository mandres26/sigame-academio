using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ENTIDADES;

namespace DAL
{   public class RepoAsignatura
    {
        bdsigameEntities bd = new bdsigameEntities();
        asignatura origen = new asignatura();
        asignaturasDTO destino = new asignaturasDTO();
        List<asignatura> origenl = new List<asignatura>();
        List<asignaturasDTO> destinol = new List<asignaturasDTO>();
        //-----------------------------------------------------------------------------------
        public string r_asignatura(asignaturasDTO ob)
        {
            try
            {
               ob.id = ob.id.ToUpper();
               ob.nombre=  ob.nombre.ToUpper();
               ob.area= ob.area.ToUpper();
                asignatura m = new asignatura();
                AutoMapper.Mapper.CreateMap<asignaturasDTO, asignatura>();
                AutoMapper.Mapper.Map(ob, m);
                bd.asignatura.Add(m);
                bd.SaveChanges();
                return "¡Se agregó la asignatura exitosamente!";  
            }
            catch (Exception)
            {
     
                return null;
            }
                        
          }
         //-----------------------------------------------------------------------------------
        public string m_asignatura(string viejoCodAsi, asignaturasDTO nuevosDatos)
        {
            try
            {
                nuevosDatos.id = nuevosDatos.id.ToUpper();
                nuevosDatos.nombre = nuevosDatos.nombre.ToUpper();
                nuevosDatos.area = nuevosDatos.area.ToUpper();

                asignatura n = bd.asignatura.Where(t => t.id == viejoCodAsi).FirstOrDefault();
                //id = "ING";
                //Se va as modificar por "IN";
                n.nombre = nuevosDatos.nombre;
                n.horas = nuevosDatos.horas;
                n.area = nuevosDatos.area;
                bd.SaveChanges();
                return "¡Se modifico el registro de la asignatura exitosamente!";
            }
            catch (Exception)
            {                
                return null;
            }                
         }
        //-----------------------------------------------------------------------------------
        public string e_asignatura(string CodAsig)
        {
            try
            {
                CodAsig = CodAsig.ToUpper();
                asignatura n = bd.asignatura.Where(t => t.id == CodAsig).FirstOrDefault();
                bd.asignatura.Remove(n);
                bd.SaveChanges();
                return "¡Eliminación Exitosa.!";
            }
            catch (Exception e)
            {
                string m = e.Message.ToString();
                if (m.StartsWith("Se produjo un error mientras se actualizaban las entradas."))
                { return "Usted no puede eliminar esta asignatura, ya que se encuentra vinculada con una observación, nota, logro, horario o matriculas de profesores. Revise"; }
                else
                { return null;}
            }
         }
        //-----------------------------------------------------------------------------------
        public asignaturasDTO c_asignatura(string codAsig)
        {
            try
            {
                codAsig = codAsig.ToUpper();
                origen = bd.asignatura.Where(t => t.id.Equals(codAsig)).FirstOrDefault();
                if (origen != null)
                {
                Mapper.CreateMap<asignatura, asignaturasDTO>();
                Mapper.Map(origen, destino);
                return destino;
                }
                else { return null; }                
            }
            catch 
            {
                return null;
            }
        }
        //-----------------------------------------------------------------------------------
        public List<asignaturasDTO> c_asignaturas()
        {
            try
            {               
                origenl = bd.asignatura.ToList();
                if (origen != null)
                {
                Mapper.CreateMap<asignatura, asignaturasDTO>();
                Mapper.Map(origenl, destinol);
                destinol = destinol.OrderBy(t => t.nombre).ToList();
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
