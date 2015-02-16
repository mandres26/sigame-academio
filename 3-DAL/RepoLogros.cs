using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
using AutoMapper;

namespace DAL
{
    public class RepoLogros
    {
        bdsigameEntities bd = new bdsigameEntities();
        logros origen = new logros();
        logrosDTO destino = new logrosDTO();
        List<logros> origenl = new List<logros>();
        List<logrosDTO> destinol = new List<logrosDTO>();

        //--------------------------------------------------------------------
        public string r_logros(logrosDTO ob )
        {
            try
            {
                //........... VALIDACIÓN PARA MAYUSCULAS  ...................
                ob.id_asignatura = ob.id_asignatura.ToUpper();
                ob.id_grado = ob.id_grado.ToUpper();
                ob.id_logro = ob.id_logro.ToUpper();
                //................ FIN DE VALIDADCIÓN  ......................
                logros m = new logros();
                AutoMapper.Mapper.CreateMap<logrosDTO, logros>();
                AutoMapper.Mapper.Map(ob, m);
                bd.logros.Add(m);
                bd.SaveChanges();
                return "¡Se agregó el logro exitosamente!";
            }
            catch (Exception)
            {
                return null;
            }
        }
        //------------------------------------------------------------------------------------
        public string m_logros(string codViejo, logrosDTO ob)
        {
          try 
           {
                ob.id_asignatura = ob.id_asignatura.ToUpper();
                ob.id_grado = ob.id_grado.ToUpper();
                ob.id_logro = ob.id_logro.ToUpper();
                    logros n = bd.logros.Where(t => t.id_logro == codViejo).FirstOrDefault(); 
                    //n.id_logro = ob.id_logro;
                    n.descripcion = ob.descripcion;
                    n.id_grado = ob.id_grado;
                    n.id_asignatura = ob.id_asignatura;
                    bd.SaveChanges(); 
                    return "Logro modificado exitosamente";                              
	
          }
          catch (Exception)
          {
             return null;
	       }
        }
        //------------------------------------------------------------------------------------
        public string e_logros(string cod)
        {
            try

            {
                cod = cod.ToUpper();

                logros n = bd.logros.Where(t => t.id_logro == cod).FirstOrDefault();
                bd.logros.Remove(n);
                bd.SaveChanges();
                return "¡Eliminación Exitosa!";
            }
            catch (Exception e)
            {
                string m = e.Message.ToString();
                if (m.StartsWith("Se produjo un error mientras se actualizaban las entradas."))
                { return "Usted no puede eliminar este logro, ya que se encuentra vinculado con notas académicas. Revise."; }
                else
                { return null; }
            }
        }
        //-----------------------------------------------------------------------------------
        public logrosDTO c_logros(string cod)
        {
            try
            {
                cod = cod.ToUpper();
                origen = bd.logros.Where(t => t.id_logro == cod).FirstOrDefault();
                if (origen != null)
                {
                AutoMapper.Mapper.CreateMap<logros, logrosDTO>();
                AutoMapper.Mapper.Map(origen, destino);
                return destino;
                }
                else
                {
                    return null;
                }             
               
            }
            catch (Exception)
            {
                return null;
            }
           
        }

        //-----------------------------------------------------------------------------------
        public List<logrosDTO> c_logros()
        {
            try
            {
                origenl = bd.logros.ToList();
                if (origenl != null)
                {
                    List<logrosDTO> Lista = new List<logrosDTO>();
                 
                    foreach (logros item in origenl)
                    {
                        logrosDTO obj = new logrosDTO();
                       
                        obj.id_logro = item.id_logro.ToString();
                        obj.id_grado = item.id_grado.ToString();
                        obj.id_asignatura = item.id_asignatura.ToString();
                        obj.descripcion = item.descripcion.ToString();
                        Lista.Add(obj);
                    }
                    Lista = Lista.OrderBy(t => t.id_asignatura).ToList();
                    return Lista;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                
                return null;
            }
           
        }
        //-----------------------------------------------------------------------------------
        public List<logrosDTO> c_logrosXgradoXasig(string codGrado, string codAsig)
        {
            origenl =  bd.logros.Where(t => t.id_asignatura == codAsig && t.id_grado == codGrado).ToList();
            if (origenl.Count != 0)
                {
                    List<logrosDTO> Lista = new List<logrosDTO>();
                    
                    foreach (logros item in origenl)
                    {
                        logrosDTO obj = new logrosDTO();
                       
                        obj.id_logro = item.id_logro.ToString();
                        obj.id_grado = item.id_grado.ToString();
                        obj.id_asignatura = item.id_asignatura.ToString();
                        obj.descripcion = item.descripcion.ToString();
                        Lista.Add(obj);
                    }
                    Lista = Lista.OrderBy(t => t.id_asignatura).ToList();
                    return Lista;
               }
               else { return null; }
        }
         //-----------------------------------------------------------------------------------
        public List<logrosDTO> c_logrosXgradoXasigNota(string codGrado, string codAsig)
        {
            origenl =  bd.logros.Where(t => t.id_asignatura == codAsig && t.id_grado == codGrado).ToList();
            origenl= origenl.OrderBy(t => t.id_logro).ToList();
            if (origenl.Count != 0)
                {
                    List<logrosDTO> l = new List<logrosDTO>();
                    foreach (logros item in origenl)
                    {
                        logrosDTO j = new logrosDTO();
                        j.id_logro = item.id_logro.ToString() + "/ " + item.descripcion.ToString();
                        l.Add(j);
                    }
                    return l;
               }
               else { return null; }
        }
        

        //-----------------------------------------------------------------------------------
        public List<logrosDTO> c_logrosXgrado(string codGrado) 
        {
            origenl = bd.logros.Where(t => t.id_grado == codGrado).ToList();
            origenl = origenl.OrderBy(t => t.id_grado).ToList();
            if (origenl != null)
            {
                AutoMapper.Mapper.CreateMap<logros, logrosDTO>();
                AutoMapper.Mapper.Map(origenl, destinol);
                destinol = destinol.OrderBy(t => t.id_grado).ToList();
                return destinol;
            }
            else
            {
                return null;
            }
        }
        //-----------------------------------------------------------------------------------
        public List<logrosDTO> c_logrosXasig(string codAsig)
        {
            origenl = bd.logros.Where(t => t.id_asignatura == codAsig).ToList();
            origenl = origenl.OrderBy(t => t.id_asignatura).ToList();
            if (origenl != null)
            {
                AutoMapper.Mapper.CreateMap<logros, logrosDTO>();
                AutoMapper.Mapper.Map(origenl, destinol);
                destinol = destinol.OrderBy(t => t.id_asignatura).ToList();
                return destinol;
            }
            else
            {
                return null;
            }
        }
        //-----------------------------------------------------------------------------------
        //public int verificaLogros(string cod)
        //   {
        //       logros  n = bd.logros.Where(t => t.id_logro == cod).FirstOrDefault();
        //       if (n!= null)
        //       {
        //           return 1; //  existe
        //       }
        //       else
        //       {
        //           return 0; // no existe
        //       }
        //   }
    }
}
