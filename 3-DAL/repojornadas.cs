using ENTIDADES;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
   public  class RepoJornadas
    {
        bdsigameEntities bd = new bdsigameEntities();
        jornadas origen= new jornadas();
        jornadasDTO destino=new jornadasDTO();
        List<jornadas> origenl = new List<jornadas>();
        List<jornadasDTO> destinol=new List<jornadasDTO>() ;
        //-------------------------------------------------------------------------------------
        public jornadasDTO  c_jornada(string idJornada)
        {
           try 
	        {
             idJornada = idJornada.ToUpper();
		    origen = bd.jornadas.Where(t=>t.id==idJornada).FirstOrDefault();
            if (origen!=null){
                AutoMapper.Mapper.CreateMap<jornadas, jornadasDTO>();
                AutoMapper.Mapper.Map(origen, destino);
                destino.horaI = destino.horaI.Substring(0, 5);
                destino.horaF = destino.horaF.Substring(0, 5);
                return destino;
            } else {return null;}
	        }
	        catch (Exception)
	        {
		
		        return null;
	        }            
        }
        //----------------------------------------------------------------------------
        public List<jornadasDTO> c_jornada()
        {
            try
            {
            origenl = bd.jornadas.ToList();
            if (origenl != null)
            {
                AutoMapper.Mapper.CreateMap<jornadas, jornadasDTO>();
                AutoMapper.Mapper.Map(origenl, destinol).ToString();
                foreach (jornadasDTO item in destinol)
                {
                    item.horaI = item.horaI.Substring(0, 5);
                    item.horaF = item.horaF.Substring(0, 5);
                }
                return destinol;
            }
            else { return null; }
            }
            catch (Exception)
            {                
                return null;
            }
           
        }
        //----------------------------------------------------------------------------
        public string r_jornada(jornadasDTO ob)
        {
            try
            {
                jornadas R = new jornadas();
                R.id =ob.id.ToUpper();
                R.horaI =TimeSpan.Parse(ob.horaI);
                R.horaF =TimeSpan.Parse(ob.horaF);
               
                bd.jornadas.Add(R);
                bd.SaveChanges();
                return "¡Se agregó la jornada correctamente!";
            }
            catch (Exception)
            {
                
                return null;
            }
        }

        //----------------------------------------------------------------------------
        public string e_jornadas(string idJornada)
        {
            try
            {
                idJornada = idJornada.ToUpper();
                jornadas n = bd.jornadas.Where(t => t.id == idJornada).FirstOrDefault();
                bd.jornadas.Remove(n);
                bd.SaveChanges();
                return "¡Eliminación exitosa!";
            }
            catch (Exception e)
            {
                string m = e.Message.ToString();
                if (m.StartsWith("Se produjo un error mientras se actualizaban las entradas."))
                { return "Usted no puede eliminar esta jornada, ya que se encuentra vinculada con el personal, horarios o grupos del sistema. Revise"; }
                else
                { return null; }
            }            
        }
        //----------------------------------------------------------------------------
         public string m_jornadas(jornadasDTO idJornada)
        {
            try
            {

                TimeSpan HI =  TimeSpan.Parse(idJornada.horaI);
                TimeSpan HF = TimeSpan.Parse(idJornada.horaF);
                jornadas n = bd.jornadas.Where(t => t.id == idJornada.id).FirstOrDefault();
                n.horaI = HI;
                n.horaF = HF;
                bd.jornadas.Remove(n);
                bd.SaveChanges();
                return "¡Modificación exitosa!";
            }
            catch (Exception e)
            {
                return null;
            }
        }
       //-----------------------------------------------------------------------------
    }
}
