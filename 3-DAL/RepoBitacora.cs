using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
using AutoMapper;
namespace DAL
{
    public class RepoBitacora
    {
        bdsigameEntities bd = new bdsigameEntities();
        bitacora origen = new bitacora();
        bitacorasDTO destino = new bitacorasDTO();
        List<bitacora> origenl = new List<bitacora>();
        List<bitacorasDTO> destinol = new List<bitacorasDTO>();
        //-----------------------------------------------------------------------------------
        public string r_bitacora(bitacorasDTO ob)
        {
            try
            {
                DateTime dptBitacora;
                dptBitacora = DateTime.Now;
                bitacora m = new bitacora();
                m.accion = ob.accion;
                m.id_bitacora = Convert.ToInt16(null);
                m.id_usuario = ob.id_usuario;
                m.observacion = ob.observacion;
                m.seccion = ob.seccion;
                m.usuario = ob.usuario;
                m.fecha = dptBitacora;
                m.fecha = m.fecha;
                bd.bitacora.Add(m);
                bd.SaveChanges();
                return "S";
            }
            catch (Exception)
            {
                return null;
            }
                

        }
        // -----------------------------------------------------------------------------------
        public string vaciarBitacora()
        {
            try
            {

                using (var ctx = new bdsigameEntities())
                {
                    string sql = "TRUNCATE TABLE `bitacora`";
                    var m = ctx.Database.ExecuteSqlCommand(sql);
                    return "¡Bitacora vaciada de forma exitosa! ";
                }
            }
            catch
            {
                return null;
            }
        }
        //-----------------------------------------------------------------------------------
        public List<bitacorasDTO> c_bitacora()
        {
            try
            {
                origenl = bd.bitacora.ToList();
                if (origenl != null)
                {
                    Mapper.CreateMap<bitacora, bitacorasDTO>();
                    Mapper.Map(origenl, destinol);
                    return destinol;
                }
                else
                {
                    return null;
                }

            }
            catch
            {
                return null;
            }
        }
        //-----------------------------------------------------------------------------------
        public List<bitacorasDTO> c_bitacoraSeccion(string seccion)
        {
            try
            {
                origenl = bd.bitacora.Where(t => t.seccion == seccion).ToList();
                if (origenl != null)
                {
                    if (origenl.Count !=0)
                    {
                        Mapper.CreateMap<bitacora, bitacorasDTO>();
                        Mapper.Map(origenl, destinol);
                        return destinol;
                    }
                    else
                    {
                        return null;
                    }
                }
                else
                {
                    return null;
                }

            }
            catch
            {
                return null;
            }
        }
        //-----------------------------------------------------------------------------------
        public List<bitacorasDTO> c_bitacoraAccion(string accion)
        {
            try
            {
                origenl = bd.bitacora.Where(t => t.accion == accion).ToList();
                if (origenl != null)
                {
                    if (origenl.Count != 0)
                    {
                        Mapper.CreateMap<bitacora, bitacorasDTO>();
                        Mapper.Map(origenl, destinol);
                        return destinol;
                    }
                    else { return null; }
                }
                else { return null; }
            }
            catch
            {
                return null;
            }
        }
        //-----------------------------------------------------------------------------------
        public List<bitacorasDTO> c_bitacoraCodUsuario(string cod)
        {
            try
            {
                origenl = bd.bitacora.Where(t => t.id_usuario == cod).ToList();
                if (origenl != null)
                {
                    if (origenl.Count != 0)
                    {
                        Mapper.CreateMap<bitacora, bitacorasDTO>();
                        Mapper.Map(origenl, destinol);
                        return destinol;
                    }
                    else { return null; }
                }
                else { return null; }

            }
            catch
            {
                return null;
            }
        }
        //-----------------------------------------------------------------------------------
        public List<bitacorasDTO> c_bitacoraUsuario(string usuario)
        {
            try
            {
                origenl = bd.bitacora.Where(t => t.usuario == usuario).ToList();
                 if (origenl != null)
                {
                    if (origenl.Count != 0)
                    {
                    Mapper.CreateMap<bitacora, bitacorasDTO>();
                    Mapper.Map(origenl, destinol);
                    return destinol;
                }
                else { return null; }
                }
                 else { return null; }
            }
            catch
            {
                return null;
            }
        }
        //-----------------------------------------------------------------------------------
        public List<bitacorasDTO> c_bitacoraFecha(string fechaIni, string fechaFin)
        {
            try
            {

                string[] f_I = fechaIni.Split('/');
                string[] f_F = fechaFin.Split('/');
                string f_Ini = f_I[2] + "-" + f_I[1] + "-" + f_I[0] + " 00:00:00 a.m.";
                string f_Fin = f_F[2] + "-" + f_F[1] + "-" + f_F[0] + " 11:59:59 p.m.";

                using (var ctx = new bdsigameEntities())
                {
                    string sql = "SELECT `id-bitacora` FROM `bdcompriletsoft`.`bitacora`  WHERE `fecha` BETWEEN '" + f_Ini + "' AND '" + f_Fin + "'";
                    var m = ctx.Database.SqlQuery<string>(sql).ToList();
                    List<bitacorasDTO> destino = new List<bitacorasDTO>();

                    if (m != null)
                    {
                        if (m.Count != 0)
                        {
                            for (int i = 0; i < m.Count; i++)
                            {
                                bitacorasDTO ll = new bitacorasDTO();
                                int Refe = Convert.ToInt16(m[i]);
                                bitacora u = bd.bitacora.Where(t => t.id_bitacora == Refe).FirstOrDefault();
                                AutoMapper.Mapper.CreateMap<bitacora, bitacorasDTO>();
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
                    else
                    {
                        return null;
                    }
                }
            }
            catch
            {
                return null;
            }

        }
    }
}
