using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
using AutoMapper;


namespace DAL
{
   public class RepoHorarios
    {
        bdsigameEntities bd = new bdsigameEntities();
        List<horarios> origenl = new List<horarios>();
        List<horariosDTO> destinol = new List<horariosDTO>();
        public string r_horario(horariosDTO n)
        {
            try
            {
                List<horarios> ma = new List<horarios>();
                ma = bd.horarios.Where(t => t.id_grupo == n.id_grupo && t.jornada == n.jornada && t.dia == n.dia).OrderBy(t => t.horaI).ToList();
                if (ma.Count != 0)
                {
                    string Duplicado=null ;
                    int i = 0;
                    foreach (horarios item in ma)
                    {  // NOTA: ESTAS VALIDADCIONES ESTAN A MEDIA. FUNCIONA PERO A VECES DE TOEA. DEBES DE AJUSTARLO LUEGO.
                        string[] HI = item.horaI.ToString().Split(':');// HI es la hora que ya esta en la bd 
                        string[] HF = item.horaF.ToString().Split(':');
                        int HORA_HI = Convert.ToInt16(HI[1]) + (Convert.ToInt16(HI[0]) * 60);
                        int HORA_HF = Convert.ToInt16(HF[1]) + (Convert.ToInt16(HF[0]) * 60);

                        string[] HIn = n.horaI.ToString().Split(':');// HIn es la hora que se pretende agregar
                        string[] HFn = n.horaF.ToString().Split(':');
                        int HORA_HIn = Convert.ToInt16(HIn[1]) + (Convert.ToInt16(HIn[0]) * 60);
                        int HORA_HFn = Convert.ToInt16(HFn[1]) + (Convert.ToInt16(HFn[0]) * 60);

                        if (HORA_HIn >= HORA_HI && HORA_HIn <= HORA_HF)
                        {
                            Duplicado += "/1"; // true
                        }
                        else if (HORA_HFn >= HORA_HI && HORA_HFn <= HORA_HF)
                        {
                            Duplicado += "/1" ; // true
                        }
                        else
                        {
                            Duplicado += "/0";// false
                        }
                       
                    }
                    // AL FINAL PREGUNTO COMO ESTA LA BANDERA, SI ESTA DISPOBIBLE O NO. De esto no estoy seguro, pero es que no se me ocurre nada mas
                    Boolean Dup = true;
                    int b = 0;
                    string[] duplicado = Duplicado.Split('/');
                    for (int ii = 1; ii < duplicado.Length; ii++)
                    {
                        if (duplicado[ii] == "1")
                        {
                            b=b+1;
                        }
                    }

                    if (b == 1)
                    {
                        // no agrega por que hierra al menos con uno
                        Dup = true;
                    }
                    if (b == Duplicado.Length || b > 1)
                    {
                        // no agrega por que erra con todos
                        Dup = true;
                    }

                    if (b == 0)
                    {
                        // lo agregamos porque no se duplico
                        Dup = false; 
                    }

                    if (Dup == false)
                    {
                        // registramos 
                        horarios hh = new horarios();
                        hh.dia = n.dia;
                        hh.id_grupo = n.id_grupo;
                        hh.id_asignatura = n.id_asignatura;
                        hh.horaI = n.horaI;
                        hh.horaF = n.horaF;
                        hh.jornada = n.jornada;
                        bd.horarios.Add(hh);
                        bd.SaveChanges();
                        return "¡Registro de horarios de forma éxitosa!";
                    }
                    else
                    {
                        return "¡Las horas que intenta ingresar presentan un cruce de horarios. Ya hay registros en este intervalo.!";
                    }
                }
                else
                {
                    // SI NO HAY NADA ENTONCES REGISTRAMOS COMO NUEVO
                    horarios hh = new horarios();
                    hh.dia = n.dia;
                    hh.id_grupo = n.id_grupo;
                    hh.id_asignatura = n.id_asignatura;
                    hh.horaI = n.horaI;
                    hh.horaF = n.horaF;
                    hh.jornada = n.jornada;
                    bd.horarios.Add(hh);
                    bd.SaveChanges();
                    return "¡Registro de horarios de forma éxitosa!";
                }
            }
        catch { return null; }
        }

        public string m_horario(horariosDTO n)
        {
            try
            {

                List<horarios> ma = new List<horarios>();
                ma = bd.horarios.Where(t => t.id_grupo == n.id_grupo && t.jornada == n.jornada && t.dia == n.dia).OrderBy(t => t.horaI).ToList();
                if (ma.Count != 0)
                {
                    string Duplicado = null;
                    int i = 0;
                    foreach (horarios item in ma)
                    {  // NOTA: ESTAS VALIDADCIONES ESTAN A MEDIA. FUNCIONA PERO A VECES DE TOEA. DEBES DE AJUSTARLO LUEGO.
                        string[] HI = item.horaI.ToString().Split(':');// HI es la hora que ya esta en la bd 
                        string[] HF = item.horaF.ToString().Split(':');
                        int HORA_HI = Convert.ToInt16(HI[1]) + (Convert.ToInt16(HI[0]) * 60);
                        int HORA_HF = Convert.ToInt16(HF[1]) + (Convert.ToInt16(HF[0]) * 60);

                        string[] HIn = n.horaI.ToString().Split(':');// HIn es la hora que se pretende agregar
                        string[] HFn = n.horaF.ToString().Split(':');
                        int HORA_HIn = Convert.ToInt16(HIn[1]) + (Convert.ToInt16(HIn[0]) * 60);
                        int HORA_HFn = Convert.ToInt16(HFn[1]) + (Convert.ToInt16(HFn[0]) * 60);

                        if (HORA_HIn >= HORA_HI && HORA_HIn <= HORA_HF)
                        {
                            Duplicado += "/1"; // true
                        }
                        else if (HORA_HFn >= HORA_HI && HORA_HFn <= HORA_HF)
                        {
                            Duplicado += "/1"; // true
                        }
                        else
                        {
                            Duplicado += "/0";// false
                        }

                    }
                    // AL FINAL PREGUNTO COMO ESTA LA BANDERA, SI ESTA DISPOBIBLE O NO. De esto no estoy seguro, pero es que no se me ocurre nada mas
                    Boolean Dup = true;
                    int b = 0;
                    string[] duplicado = Duplicado.Split('/');
                    for (int ii = 1; ii < duplicado.Length; ii++)
                    {
                        if (duplicado[ii] == "1")
                        {
                            b = b + 1;
                        }
                    }

                    if (b == 1)
                    {
                        // no agrega por que hierra al menos con uno
                        Dup = true;
                    }
                    if (b == Duplicado.Length || b > 1)
                    {
                        // no agrega por que erra con todos
                        Dup = true;
                    }

                    if (b == 0)
                    {
                        // lo agregamos porque no se duplico
                        Dup = false;
                    }

                    if (Dup == false)
                    {
                        // modifiacmos 
                        int a = Convert.ToInt16(n.referencia);
                        horarios mA = bd.horarios.Where(
                                  t =>
                                  t.referencia == a
                                  ).FirstOrDefault();

                        mA.dia = n.dia;
                        mA.horaI = n.horaI;
                        mA.horaF = n.horaF;
                        mA.jornada = n.jornada;
                        bd.SaveChanges();
                        return "¡Se modificó el horario exitosamente!";

                    }
                    else
                    {
                        return "¡Las horas que intenta ingresar presentan un cruce de horarios. Ya hay registros en este intervalo.!";
                    }
                }
                else
                {
                    // modifiacmos 
                    int a = Convert.ToInt16(n.referencia);
                    horarios mA = bd.horarios.Where(
                              t =>
                              t.referencia == a
                              ).FirstOrDefault();

                    mA.dia = n.dia;
                    mA.horaI = n.horaI;
                    mA.horaF = n.horaF;
                    mA.jornada = n.jornada;
                    bd.SaveChanges();
                    return "¡Se modificó el horario exitosamente!";
                }
            }
            catch { return null; }


        }
        public horariosDTO c_horario(horariosDTO n)
        {
            try
            {
                try
                {
                    int a = Convert.ToInt16(n.referencia);
                    horarios origen = bd.horarios.Where(t => t.referencia == a).FirstOrDefault();
                    if (origen != null)
                    {
                        horariosDTO destino = new horariosDTO();
                        Mapper.CreateMap<horarios, horariosDTO>();
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
        public string e_horario(horariosDTO n)
        {
            try
            {
                int a = Convert.ToInt16(n.referencia);
                horarios ma = bd.horarios.Where(
                          t =>
                          t.referencia == a
                          ).FirstOrDefault();
                if (ma != null)
                {
                    bd.horarios.Remove(ma);
                    bd.SaveChanges();
                    return "¡Eliminación exitosa!";
                }
                else { return null; }
            }
            catch { return null; }
        }
        //-----------------------------------------------------------
        public List<horariosDTO> c_XGrupoXAsigXJornada(horariosDTO n)
        {
            try
            {
                List<horariosDTO> d = new List<horariosDTO>();
                List<horarios> ma = bd.horarios.Where(
                          t =>
                          t.id_asignatura == n.id_asignatura &&
                          t.id_grupo == n.id_grupo &&
                            t.jornada == n.jornada
                          ).ToList();
                foreach (horarios item in ma)
                {
                    horariosDTO ds = new horariosDTO();
                    ds.dia = item.dia.ToString();
                    ds.horaF = item.horaF.ToString();
                    ds.id_asignatura = item.id_asignatura.ToString();
                    ds.horaF = item.horaF.ToString();
                    ds.id_grupo = item.id_grupo.ToString();
                    ds.horaI = item.horaI.ToString();
                    ds.referencia = item.referencia.ToString();
                    ds.jornada = item.jornada.ToString();
                    d.Add(ds);
                }
                if (d.Count != 0)
                {
                    d = d.OrderBy(t => t.dia).ToList();
                    return d;
                }
                else { return null; }
            }
            catch { return null; }
        }
        //----------- ACA ESTA EL DISEÑO PARA EL HORARIO DE CLASES ----------------------
        public List<horariosClasesDTO> c_Allhorarios() // listo. solo falta probar. lo utilizará el admin
        {
            try
            {
                List<horariosClasesDTO> d = new List<horariosClasesDTO>();
                List<horarios> ma = bd.horarios.OrderBy(t => t.id_asignatura).ToList();
                if (ma.Count != 0)
                {
                    foreach (horarios item in ma)
                    {
                        horariosClasesDTO ds = new horariosClasesDTO();
                        ds.id_asignatura = item.id_asignatura.ToString() + " / " + item.asignatura.nombre.ToString();
                        string g = item.id_grupo.ToString();
                        if (item.dia.ToString() == "LUNES")
                        {
                            ds.lunes = item.horaI.ToString() + "-" + item.horaF.ToString() + " / Grupo:" + g; ds.martes = ""; ds.miercoles = ""; ds.jueves = ""; ds.viernes = ""; ds.sabado = "";
                            ds.domingo = "";
                        }
                        if (item.dia.ToString() == "MARTES")
                        {
                            ds.lunes = ""; ds.martes = item.horaI.ToString() + "-" + item.horaF.ToString() + " / Grupo:" + g; ds.miercoles = ""; ds.jueves = ""; ds.viernes = ""; ds.sabado = "";
                            ds.domingo = "";
                        }
                        if (item.dia.ToString() == "MIERCOLES")
                        {
                            ds.lunes = ""; ds.martes = ""; ds.miercoles = item.horaI.ToString() + "-" + item.horaF.ToString() + " / Grupo:" + g;
                            ds.jueves = ""; ds.viernes = ""; ds.sabado = ""; ds.domingo = "";
                        }
                        if (item.dia.ToString() == "JUEVES")
                        {
                            ds.lunes = ""; ds.martes = ""; ds.miercoles = ""; ds.jueves = item.horaI.ToString() + "-" + item.horaF.ToString() + " / Grupo:" + g;
                            ds.viernes = ""; ds.sabado = ""; ds.domingo = "";
                        }
                        if (item.dia.ToString() == "VIERNES")
                        {
                            ds.lunes = ""; ds.martes = ""; ds.miercoles = ""; ds.jueves = ""; ds.viernes = item.horaI.ToString() + "-" + item.horaF.ToString() + " / Grupo:" + g; ds.sabado = "";
                            ds.domingo = "";
                        }
                        if (item.dia.ToString() == "SABADO")
                        {
                            ds.lunes = ""; ds.martes = ""; ds.miercoles = ""; ds.jueves = ""; ds.viernes = "";
                            ds.sabado = item.horaI.ToString() + "-" + item.horaF.ToString() + " / Grupo:" + g; ds.domingo = "";
                        }
                        if (item.dia.ToString() == "DOMINGO")
                        {
                            ds.lunes = ""; ds.martes = ""; ds.miercoles = ""; ds.jueves = ""; ds.viernes = ""; ds.sabado = "";
                            ds.domingo = item.horaI.ToString() + "-" + item.horaF.ToString() + " / Grupo:" + g;
                        }
                        d.Add(ds);
                    }
                }
                if (d.Count != 0)
                {
                    d = d.OrderBy(t => t.id_asignatura).ToList();
                    return d;
                }
                else { return null; }
            }
            catch { return null; }
        }
        public List<horariosClasesDTO> c_XIdGrupo(horariosDTOFiltro h)  // Esta listo. lo utilizara con los acudientes para sus hijos
        {
            try
            {
                List<horariosClasesDTO> d = new List<horariosClasesDTO>();
                List<horarios> ma = bd.horarios.Where(
                        t =>t.id_grupo == h.id_grupo
                ).OrderBy(t=>t.id_asignatura).ToList();
                if (ma.Count != 0)
                {
                    foreach (horarios item in ma)
                    {
                        horariosClasesDTO ds = new horariosClasesDTO();
                        ds.id_asignatura = item.asignatura.nombre.ToString();
                        string g = item.id_grupo.ToString();

                        if (item.dia.ToString() == "LUNES")
                        {
                            ds.lunes = item.horaI.ToString() + "-" + item.horaF.ToString() +" / Grupo: "+ g; ds.martes = ""; ds.miercoles = ""; ds.jueves = ""; ds.viernes = ""; ds.sabado = "";
                            ds.domingo = "";
                        }
                        if (item.dia.ToString() == "MARTES")
                        {
                            ds.lunes = ""; ds.martes = item.horaI.ToString() + "-" + item.horaF.ToString() + " / Grupo:" + g; ds.miercoles = ""; ds.jueves = ""; ds.viernes = ""; ds.sabado = "";
                            ds.domingo = "";
                        }
                        if (item.dia.ToString() == "MIERCOLES")
                        {
                            ds.lunes = ""; ds.martes = ""; ds.miercoles = item.horaI.ToString() + "-" + item.horaF.ToString() + " / Grupo:" + g;
                            ds.jueves = ""; ds.viernes = ""; ds.sabado = ""; ds.domingo = "";
                        }
                        if (item.dia.ToString() == "JUEVES")
                        {
                            ds.lunes = ""; ds.martes = ""; ds.miercoles = ""; ds.jueves = item.horaI.ToString() + "-" + item.horaF.ToString() + " / Grupo:" + g;
                            ds.viernes = ""; ds.sabado = ""; ds.domingo = "";
                        }
                        if (item.dia.ToString() == "VIERNES")
                        {
                            ds.lunes = ""; ds.martes = ""; ds.miercoles = ""; ds.jueves = ""; ds.viernes = item.horaI.ToString() + "-" + item.horaF.ToString() + " / Grupo:" + g; ds.sabado = "";
                            ds.domingo = "";
                        }
                        if (item.dia.ToString() == "SABADO")
                        {
                            ds.lunes = ""; ds.martes = ""; ds.miercoles = ""; ds.jueves = ""; ds.viernes = "";
                            ds.sabado = item.horaI.ToString() + "-" + item.horaF.ToString() + " / Grupo:" + g; ds.domingo = "";
                        }
                        if (item.dia.ToString() == "DOMINGO")
                        {
                            ds.lunes = ""; ds.martes = ""; ds.miercoles = ""; ds.jueves = ""; ds.viernes = ""; ds.sabado = "";
                            ds.domingo = item.horaI.ToString() + "-" + item.horaF.ToString() + " / Grupo:" + g;
                        }
                        d.Add(ds);
                    }
                }
                if (d.Count != 0)
                {
                    d = d.OrderBy(t => t.id_asignatura).ToList();
                    return d;
                }
                else
                {
                    List<horariosClasesDTO> fd = new List<horariosClasesDTO>();
                    horariosClasesDTO fds = new horariosClasesDTO();
                    fds.id_asignatura = "";
                    fds.lunes = "Sin asignar";
                    fds.martes = "Sin asignar";
                    fds.miercoles = "Sin asignar";
                    fds.jueves = "Sin asignar";
                    fds.viernes = "Sin asignar";
                    fds.sabado = "";
                    fds.domingo = "";
                    fd.Add(fds);
                    return fd;
                }
            }
            catch { return null; }
        }
        public List<horariosClasesDTO> c_XIdProfe(horariosDTOFiltro h) 
        {
            try
            {
                // primero consultamos las asignatuas y grupos que le han asignado
                List<matricula1> n = bd.matricula1.Where(t => t.id_profesor == h.id_profe).OrderBy(t => t.id_asignatura).ToList();
                // luego consultamos los horarios por asignaturas y grupos que le han asignado
                if (n.Count != 0)
                {
                    List<horariosClasesDTO> hh = new List<horariosClasesDTO>();
                    foreach (matricula1 item in n)
                    {  // fianlmente lo agregamos uno por uno
                        horariosClasesDTO l = new horariosClasesDTO();
                        l = c_horariosXIdGrupoXIdAsig(item.id_grupo.ToString(),item.id_asignatura.ToString());
                        hh.Add(l);
                    }
                    if (hh.Count !=0)
                    {
                        return hh;
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
        public List<horariosClasesDTO> c_mProfeXGrupo(horariosDTOFiltro h)
        {
            try
            {
                // primero consultamos las asignatuas y grupos que le han asignado
                List<matricula1> n = bd.matricula1.Where(t => t.id_profesor == h.id_profe && t.id_grupo == h.id_grupo).OrderBy(t => t.id_asignatura).ToList();
                // luego consultamos los horarios por asignaturas y grupos que le han asignado
                if (n.Count != 0)
                {
                    List<horariosClasesDTO> hh = new List<horariosClasesDTO>();
                    foreach (matricula1 item in n)
                    {  // fianlmente lo agregamos uno por uno
                        horariosClasesDTO l = new horariosClasesDTO();
                        l = c_horariosXIdGrupoXIdAsig(item.id_grupo.ToString(), item.id_asignatura.ToString());
                        hh.Add(l);
                    }
                    if (hh.Count != 0)
                    {
                        return hh;
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
        public List<horariosClasesDTO> c_XIdEstudianteINGrupo(horariosDTOFiltro h)
        {
            try
            {
                List<horariosClasesDTO> l = new List<horariosClasesDTO>();
                l = c_XIdGrupo(h);
                return l;
            }
            catch
            {
                return null;
            }
        }
        public List<horariosClasesDTO> c_XIdProfeXINGrupo(horariosDTOFiltro h)
        {
            try
            {
                List<horariosClasesDTO> l = new List<horariosClasesDTO>();
                    l = c_mProfeXGrupo(h);
                    return l;    
            }
            catch
            {
                return null;
            }
        }
         //-----------------------------------------------------------------------------------
   
        public horariosClasesDTO c_horariosXIdGrupoXIdAsig(string grupo, string asig)  // Esta listo. lo utilizara con los profesores
        {
            try
            {
                List<horarios> ma = bd.horarios.Where(
                        t => t.id_grupo == grupo && t.id_asignatura == asig
                ).OrderBy(t => t.id_asignatura).ToList();
                if (ma.Count != 0)
                {
                    horariosClasesDTO ds = new horariosClasesDTO();
                    foreach (horarios item in ma)
                    {
                        ds.id_asignatura = item.asignatura.nombre.ToString();
                        string g = item.id_grupo.ToString();
                        if (item.dia.ToString() == "LUNES")
                        {
                            ds.lunes = item.horaI.ToString() + "-" + item.horaF.ToString() + " / Grupo: " + g + ";"; ds.martes = ""; ds.miercoles = ""; ds.jueves = ""; ds.viernes = ""; ds.sabado = "";
                            ds.domingo = "";
                        }
                        if (item.dia.ToString() == "MARTES")
                        {
                            ds.lunes = ""; ds.martes += item.horaI.ToString() + "-" + item.horaF.ToString() + " / Grupo: " + g + ";"; ds.miercoles = ""; ds.jueves = ""; ds.viernes = ""; ds.sabado = "";
                            ds.domingo = "";
                        }
                        if (item.dia.ToString() == "MIERCOLES")
                        {
                            ds.lunes = ""; ds.martes = ""; ds.miercoles += item.horaI.ToString() + "-" + item.horaF.ToString() + " / Grupo: " + g + ";";
                            ds.jueves = ""; ds.viernes = ""; ds.sabado = ""; ds.domingo = "";
                        }
                        if (item.dia.ToString() == "JUEVES")
                        {
                            ds.lunes = ""; ds.martes = ""; ds.miercoles = ""; ds.jueves += item.horaI.ToString() + "-" + item.horaF.ToString() + " / Grupo: " + g + ";";
                            ds.viernes = ""; ds.sabado = ""; ds.domingo = "";
                        }
                        if (item.dia.ToString() == "VIERNES")
                        {
                            ds.lunes = ""; ds.martes = ""; ds.miercoles = ""; ds.jueves = ""; ds.viernes += item.horaI.ToString() + "-" + item.horaF.ToString() + " / Grupo: " + g + ";"; ds.sabado = "";
                            ds.domingo = "";
                        }
                        if (item.dia.ToString() == "SABADO")
                        {
                            ds.lunes = ""; ds.martes = ""; ds.miercoles = ""; ds.jueves = ""; ds.viernes = "";
                            ds.sabado += item.horaI.ToString() + "-" + item.horaF.ToString() + " / Grupo: " + g + ";"; ds.domingo = "";
                        }
                        if (item.dia.ToString() == "DOMINGO")
                        {
                            ds.lunes = ""; ds.martes = ""; ds.miercoles = ""; ds.jueves = ""; ds.viernes = ""; ds.sabado = "";
                            ds.domingo += item.horaI.ToString() + "-" + item.horaF.ToString() + " / Grupo: " + g + ";";
                        }
                    }
                    return ds;
                }
                else { horariosClasesDTO ds = new horariosClasesDTO();
                ds.id_asignatura = asig;
                    ds.lunes = "Sin asignar";
                    ds.martes = "Sin asignar";
                    ds.miercoles = "Sin asignar";
                    ds.jueves = "Sin asignar";
                    ds.viernes = "Sin asignar";
                    ds.sabado = "";
                    ds.domingo = "";
                    return ds;
                }
            }
            catch { return null; }
        }
  

   }
}
