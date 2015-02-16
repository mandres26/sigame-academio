using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
using AutoMapper;

namespace DAL
{
    public class RepoGrupos
    {
        bdsigameEntities bd = new bdsigameEntities();
        grupos origen = new grupos();
        gruposDTO destino = new gruposDTO();
        List<grupos> origenl = new List<grupos>();
        List<gruposDTO> destinol = new List<gruposDTO>();
        //-----------------------------------------------------------------------------------
        public string r_grupo(gruposDTO ob)
        {
            try
            {
                ob.id_grupo = ob.id_grupo.ToUpper();
                ob.id_aula = ob.id_aula.ToUpper();
                grupos m = new grupos();
                AutoMapper.Mapper.CreateMap<gruposDTO, grupos>();
                AutoMapper.Mapper.Map(ob, m);
                bd.grupos.Add(m);
                bd.SaveChanges();
                return "¡Se agregó el grupo exitosamente!";   
            }
            catch (Exception)
            {                
                return null;
            }                

        }
        //-----------------------------------------------------------------------------------
        public string m_grupo(string viejoCodGru, gruposDTO nuevosDatos)
        {
            try
            {
                nuevosDatos.id_grupo = nuevosDatos.id_grupo.ToUpper();
                nuevosDatos.id_aula = nuevosDatos.id_aula.ToUpper();
                grupos n = bd.grupos.Where(t => t.id_grupo == viejoCodGru).FirstOrDefault();            
                //n.id_grupo = nuevosDatos.id_grupo;
                n.id_aula = nuevosDatos.id_aula;
                n.id_grado = nuevosDatos.id_grado;
                n.año = nuevosDatos.año;
             
                bd.SaveChanges();
                return "¡Se modificó el registro del grupo exitosamente!";
            }
            catch (Exception)
            {                
                return null;
            }                        
        }
        //-----------------------------------------------------------------------------------
        public string e_grupo(string CodGru)
        {
            try
            {
                CodGru = CodGru.ToUpper();
                grupos n = bd.grupos.Where(t => t.id_grupo == CodGru).FirstOrDefault();            
                bd.grupos.Remove(n);
                bd.SaveChanges();
                return "¡Eliminación Exitosa.!";
            }
            catch (Exception e)
            {
                string m = e.Message.ToString();
                if (m.StartsWith("Se produjo un error mientras se actualizaban las entradas."))
                { return "Usted no puede eliminar este grupo, ya que se encuentra vinculado con una observación, nota, horario o matriculas de profesores y estudiantes. Revise"; }
                else
                { return null;}
            }            
        }
        //-----------------------------------------------------------------------------------
        public gruposDTO c_grupo(string codGrupo)
        {
            try
            {
                codGrupo = codGrupo.ToUpper();
                origen = bd.grupos.Where(t => t.id_grupo == codGrupo).FirstOrDefault();
                if (origen != null)
                {
                Mapper.CreateMap<grupos, gruposDTO>();
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
        public List<gruposDTO> c_grupos()
        {
            try
            {
                origenl = bd.grupos.ToList();
                if (origenl != null)
                {
                Mapper.CreateMap<grupos, gruposDTO>();
                Mapper.Map(origenl, destinol);
                    destinol= destinol.ToList();
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
