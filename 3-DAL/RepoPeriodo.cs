using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
using AutoMapper;

namespace DAL
{
   public class RepoPeriodo
    {
       bdsigameEntities bd = new bdsigameEntities();
       periodos origen = new periodos();
       periodosDTO destino = new periodosDTO();
       List<periodos> origenl = new List<periodos>();
       List<periodosDTO> destinol = new List<periodosDTO>();
       //--------------------------------------------------------------
       public periodosDTO c_periodo(string idPeriodo)
       {
           try
           {
               idPeriodo = idPeriodo.ToUpper();
           origen =bd.periodos.Where(t=>t.id==idPeriodo).FirstOrDefault();
           if(origen!=null){
               AutoMapper.Mapper.CreateMap<periodos, periodosDTO>();
               AutoMapper.Mapper.Map(origen, destino);
               return destino;
           }else{return null;}
           }
           catch (Exception)
           {               
               return null;
           }              
              
        }
       //--------------------------------------------------------------
       public List<periodosDTO> c_periodo()
       {
           try
           {
               origenl = bd.periodos.ToList();
               int a=0;
               if (origenl != null)
               {
                   AutoMapper.Mapper.CreateMap<periodos, periodosDTO>();
                   AutoMapper.Mapper.Map(origenl, destinol);

                   destinol = destinol.OrderBy(t => t.id).ToList();
                   
                   return destinol;
               }
               else { return null; }
           }
           catch (Exception)
           {
               return null;
           }

       }
       //--------------------------------------------------------------
       public string r_periodo(periodosDTO cod)
       {
           try
           {
               cod.id = cod.id.ToUpper();
               cod.rangoF = cod.rangoF.ToUpper();
               cod.rangoI = cod.rangoI.ToUpper();

               periodos m = new periodos();
               AutoMapper.Mapper.CreateMap<periodosDTO, periodos>();
               AutoMapper.Mapper.Map(cod, m);
               bd.periodos.Add(m);
               bd.SaveChanges();
               return "¡Se agregó el periodo correctamente";          
           }
           catch (Exception) { return null; }
       }
       //--------------------------------------------------------------
       public string m_periodo(periodosDTO cod)
       {
           try
           {
               periodos n = bd.periodos.Where(t => t.id == cod.id).FirstOrDefault();
               n.rangoI = cod.rangoI;
               n.rangoF = cod.rangoF;

               bd.SaveChanges();
               return "¡Modificación exitosa!";
           }
           catch (Exception) { return null; }
       }

       //---------------------------------------------------------------------------
       public string e_periodo(periodosDTO cod)
       {
           try
           {
               cod.id = cod.id.ToUpper();
              
               periodos n = bd.periodos.Where(t => t.id == cod.id).FirstOrDefault();
               bd.periodos.Remove(n);
               bd.SaveChanges();
               return "¡Eliminación exitosa!";
           }
           catch (Exception e)
           {
               string m = e.Message.ToString();
               if (m.StartsWith("Se produjo un error mientras se actualizaban las entradas."))
               { return "Usted no puede eliminar este periodo, ya que se encuentra vinculado con observaciónes o notas. Revise"; }
               else
               { return null; }
           }
       }
       //----------------------------------------------------------------------------
  
    }
}
