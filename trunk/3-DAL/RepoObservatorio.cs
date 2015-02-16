using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
using AutoMapper;

namespace DAL
{
    public  class RepoObservatorio
    {
        bdsigameEntities bd = new bdsigameEntities();
        List<observatorio> origenl = new List<observatorio>();
        List<observacionesDTO.observatorioss> destinol = new List<observacionesDTO.observatorioss>();
        public string r_observacion(observacionesDTO.observatorioss n)
        {
            try
            {
                DateTime dptBitacora;
                dptBitacora = DateTime.Now;

                observatorio ma = new observatorio();
                ma.id_estudiante = n.id_estudiante;
                ma.id_asignatura = n.id_asignatura;
                ma.id_grupo = n.id_grupo;
                ma.id_periodo = n.id_periodo;
                ma.id_profesor = n.id_profesor;

                ma.observacion = n.observacion;
                ma.fecha = dptBitacora;
                ma.tipo = n.tipo;
                ma.notificacion = n.notificacion;
                ma.acceso = n.acceso;

                bd.observatorio.Add(ma);
                bd.SaveChanges();
                return "¡Se agrego la observación exitosamente!";
            }
            catch { return null; }
        }



        public string m_observacion(observacionesDTO.observatorioss n)
        {
            try
            {
                int a = Convert.ToInt16(n.referencia);
                observatorio ma = bd.observatorio.Where(
                          t =>
                          t.referencia == a
                          ).FirstOrDefault();

                ma.observacion = n.observacion;
                ma.tipo = n.tipo;
                ma.notificacion = n.notificacion;
                bd.SaveChanges();
                return "¡Se modificó la observación exitosamente!";
            }
            catch { return null; }

        }
        public string m_observacionNoti(observacionesDTO.observatorioss n)
        {
            try
            {
                int a = Convert.ToInt16(n.referencia);
                observatorio ma = bd.observatorio.Where(
                          t =>
                          t.referencia == a
                          ).FirstOrDefault();

                //ma.observacion = n.observacion;
                //ma.tipo = n.tipo;
                ma.notificacion = n.notificacion;
                bd.SaveChanges();
                return "¡Se modificó la observación exitosamente!";
            }
            catch { return null; }

        }
        public string a_observacion(observacionesDTO.observatorioss n)
        {
            try
            {
                int a = Convert.ToInt16(n.referencia);
                observatorio ma = bd.observatorio.Where(
                t =>
                t.referencia == a
                ).FirstOrDefault();
                ma.acceso = n.acceso;
                bd.SaveChanges();
                return "¡Se archivó la observación exitosamente!";
            }
            catch { return null; }

        }
        public observacionesDTO.observatorioss c_observacion(observacionesDTO.observatorioss n)
        {
            try
            {
                try
                {
                    int a = Convert.ToInt16(n.referencia);
                    observatorio origen = bd.observatorio.Where(t => t.referencia == a).FirstOrDefault();
                    if (origen != null)
                    {
                        observacionesDTO.observatorioss destino = new observacionesDTO.observatorioss();
                        Mapper.CreateMap<observatorio, observacionesDTO.observatorioss>();
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
            catch { return null; }
        }

        public string e_observacion(observacionesDTO.observatorioss n)
        {
            try
            {
                int a = Convert.ToInt16(n.referencia);
                observatorio ma = bd.observatorio.Where(
                          t =>
                          t.referencia == a
                          ).FirstOrDefault();
                if (ma != null )
                {
                    bd.observatorio.Remove(ma);
                    bd.SaveChanges();
                    return "¡Eliminación exitosa!";
                }else{return null;}
            }catch { return null; }
        }
        //-----------------------------------------------------------
        public List<dtoGObservaciones> c_observaciones(observacionesDTO.observatorioss n)
        {
            try
            {
                List<dtoGObservaciones> d = new List<dtoGObservaciones>();
                List<observatorio> ma = bd.observatorio.Where(
                          t =>
                          t.id_estudiante == n.id_estudiante &&
                          t.id_asignatura == n.id_asignatura &&
                          t.id_grupo == n.id_grupo &&
                          t.id_periodo == n.id_periodo &&
                          t.id_profesor == n.id_profesor
                          ).ToList();
                foreach (observatorio item in ma)
                {
                    dtoGObservaciones ds = new dtoGObservaciones();
                    ds.nom_asignatura = item.asignatura.nombre.ToString();
                    ds.id_periodo = item.id_periodo.ToString();
                    ds.tipo = item.tipo.ToString();
                    ds.observacion = item.observacion.ToString();
                    if (item.notificacion.ToString() != null)
                    {
                        ds.notificacion = item.notificacion.ToString(); 
                    }
                    else
                    {
                         ds.notificacion= "PENDIENTE...";
                    }
                    ds.fecha = item.fecha.ToString();
                    ds.referencia = item.referencia.ToString();
                    if (item.acceso.ToString() == "ARCHIVADO")  // i,e si lla esta archivado no deben de mostrarlo
                    {
                        d.Remove(ds);
                    }
                    else
                    {
                        d.Add(ds);
                    }
                }
                if (d.Count != 0)
                {
                    d = d.OrderBy(t => t.nom_asignatura).ToList();
                    return d;
                }
                else { return null; }
            }
            catch { return null; }
        }
        //---------------------------------EXTRAS -----------------------------------
        public List<observacionesDTO.observatorioss> c_observacionXgrupoXperidoXprofe(string idGrupo, string idPeriodo, string idProfesor)
        {
            try
            {
                    origenl = bd.observatorio.Where(t =>
                    t.id_periodo == idPeriodo &&
                    t.id_profesor == idProfesor && 
                    t.id_grupo == idGrupo).ToList();
                if (origenl.Count != 0)
                {
                    AutoMapper.Mapper.CreateMap<observatorio, observacionesDTO.observatorioss>();
                    AutoMapper.Mapper.Map(origenl, destinol);
                
                    destinol = destinol.OrderBy(t => t.fecha).ToList();
                    return destinol;
                }
                else { return null; }
            }
            catch (Exception)
            {
                
                return null;
            }
        }
        //--------------------------------------------------------------------------------------
        public List<observacionesDTO.observatorioss> c_listaObservaciones()
        {
            origenl = bd.observatorio.OrderBy(t => t.fecha).ToList();
            if (origenl.Count != 0)
            {
                AutoMapper.Mapper.CreateMap<observatorio, observacionesDTO.observatorioss>();
                AutoMapper.Mapper.Map(origenl, destinol);
                destinol = destinol.OrderBy(t => t.id_periodo).ToList();
                return destinol;
            }
            else
            {
                return null;
            }
        }
        //--------------------------------------------------------------------------------------
        public List<observacionesDTO.observatorioss>c_porAsigatura(string cod)
        {
            
                origenl = bd.observatorio.Where(t => t.id_asignatura == cod).OrderBy(t => t.fecha).ToList();
                if (origenl.Count != 0)
                {
                    AutoMapper.Mapper.CreateMap<observatorio, observacionesDTO.observatorioss>();
                    AutoMapper.Mapper.Map(origenl, destinol);

                    destinol = destinol.OrderBy(t => t.fecha).ToList();
                    return destinol;
                }
                else
                {
                    return null;
                }
        }
        //--------------------------------------------------------------------------------------
        public List<observacionesDTO.observatorioss> c_porEstudiante(string cod)
        {
            origenl = bd.observatorio.Where(t => t.id_estudiante == cod).OrderBy(t=>t.fecha).ToList();
            if (origenl.Count !=0)
                {
                    AutoMapper.Mapper.CreateMap<observatorio, observacionesDTO.observatorioss>();
                    AutoMapper.Mapper.Map(origenl, destinol);
                    destinol = destinol.OrderBy(t => t.fecha).ToList();
                    return destinol;
                }
            else
            {
                return null;
            }
        }  
        //-------------------------------------------------------------------------------------
        public List<observacionesDTO.observatorioss> c_porGrupo(string cod)
        {
            origenl = bd.observatorio.Where(t => t.id_grupo == cod).OrderBy(t=>t.fecha).ToList();
            if (origenl.Count != 0)
            {
                AutoMapper.Mapper.CreateMap<observatorio, observacionesDTO.observatorioss>();
                AutoMapper.Mapper.Map(origenl, destinol);
                destinol = destinol.OrderBy(t => t.fecha).ToList();
                return destinol;
            }
            else
            {
                return null;
            }
        }

        //-----------------------------------------------------------------------------------
        public List<observacionesDTO.observatorioss> c_obserXIdEstXGrupo(observacionesDTO.observatorioss cod)
        {
            origenl = bd.observatorio.Where(t => t.id_grupo == cod.id_grupo && t.id_estudiante== cod.id_estudiante).OrderBy(t => t.fecha).ToList();
            if (origenl.Count != 0)
            {
                AutoMapper.Mapper.CreateMap<observatorio, observacionesDTO.observatorioss>();
                AutoMapper.Mapper.Map(origenl, destinol);
                destinol = destinol.OrderBy(t => t.fecha).ToList();
                return destinol;
            }
            else
            {
                return null;
            }
        }

        //--------------------------------------------------------------------------------------
        public List<observacionesDTO.observatorioss> c_porPeriodo(string cod)
        {
            origenl = bd.observatorio.Where(t => t.id_periodo == cod).OrderBy(t=>t.fecha).ToList();
            if (origenl.Count != 0)
            {
                AutoMapper.Mapper.CreateMap<observatorio, observacionesDTO.observatorioss>();
                AutoMapper.Mapper.Map(origenl, destinol);
                destinol = destinol.OrderBy(t => t.fecha).ToList();
                return destinol;
            }
            else
            {
                return null;
            }
        }
        //--------------------------------------------------------------------------------------
        public List<observacionesDTO.observatorioss> c_porProfesor(string cod)
        {
            origenl = bd.observatorio.Where(t => t.id_profesor == cod).OrderBy(t=>t.fecha).ToList();
            if (origenl.Count != 0)
            {
                AutoMapper.Mapper.CreateMap<observatorio, observacionesDTO.observatorioss>();
                AutoMapper.Mapper.Map(origenl, destinol);
                destinol = destinol.OrderBy(t => t.id_periodo).ToList();
                return destinol;

            }
            else
            {
                return null;
            }
        }
        //--------------------------------------------------------------------------------------
        public List<observacionesDTO.observatorioss> c_porFecha(string fechaIni, string fechaFin)
        {

            string[] f_I = fechaIni.Split('/');
            string[] f_F = fechaFin.Split('/');
            string f_Ini = f_I[2] + "-" + f_I[1] + "-"+ f_I[0] +" 00:00:00 a.m.";
            string f_Fin = f_F[2] + "-" + f_F[1] + "-"+ f_F[0] +" 11:59:59 p.m.";
            
            using (var ctx = new bdsigameEntities())
            {
                string sql = "SELECT `referencia` FROM `bdcompriletsoft`.`observatorio`  WHERE `fecha` BETWEEN '" + f_Ini + "' AND '" + f_Fin + "'";
                var m = ctx.Database.SqlQuery<string>(sql).ToList();
                 List<observacionesDTO.observatorioss> destino = new List<observacionesDTO.observatorioss>();
                 if (m.Count != 0)
                 {
                     for (int i = 0; i < m.Count; i++)
                     {
                         observacionesDTO.observatorioss ll = new observacionesDTO.observatorioss();
                         int Refe = Convert.ToInt16(m[i]);
                         observatorio u = bd.observatorio.Where(t => t.referencia == Refe).FirstOrDefault();
                         AutoMapper.Mapper.CreateMap<observatorio, observacionesDTO.observatorioss>();
                         AutoMapper.Mapper.Map(u, ll);
                         destino.Add(ll);
                     }
                     destino = destino.OrderBy(t => t.fecha).ToList();
                     return destino;
                 }
                 else
                 {
                     return null;
                 }
            }
        } 
        //-----------------------------------------------------------------------------------
        //-----------------------------------------------------------------------------------
     public List<observacionesDTO.observatorioss> c_obserXNotificacion(string notificacion)
        {
            origenl = bd.observatorio.Where(t => t.notificacion == notificacion).OrderBy(t => t.fecha).ToList();
            if (origenl.Count != 0)
            {
                AutoMapper.Mapper.CreateMap<observatorio, observacionesDTO.observatorioss>();
                AutoMapper.Mapper.Map(origenl, destinol);
                destinol = destinol.OrderBy(t => t.notificacion).ToList();
                return destinol;
            }
            else
            {
                return null;
            }
        }
        //-----------------------------------------------------------------------------------
        public List<observacionesDTO.observatorioss> c_obserXArchivo(string estado)
        {
            origenl = bd.observatorio.Where(t => t.acceso == estado).OrderBy(t => t.fecha).ToList();
            if (origenl.Count != 0)
            {
                AutoMapper.Mapper.CreateMap<observatorio, observacionesDTO.observatorioss>();
                AutoMapper.Mapper.Map(origenl, destinol);
                destinol = destinol.OrderBy(t => t.acceso).ToList();
                return destinol;
            }
            else
            {
                return null;
            }
        }
        //-----------------------------------------------------------------------------------
    }
}
