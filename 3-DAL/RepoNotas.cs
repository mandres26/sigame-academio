
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
using AutoMapper;

namespace DAL
{
    public class RepoNotas
    {
        bdsigameEntities bd = new bdsigameEntities();
        List<notas> origenl = new List<notas>();
        List<notasDTO.notass> destinol = new List<notasDTO.notass>();
        //-----------------------------------------------------------------------------------
        public string r_nota(notasDTO.notass n)
        {
            try
            {
                string m = verificar_nota(n);
                if (m == "0")
                {
                    notas no = new notas();
                    no.id_estudiante = n.id_estudiante;
                    no.id_asignatura = n.id_asignatura;
                    no.id_grupo = n.id_grupo;
                    no.id_periodo = n.id_periodo;
                    no.id_profesor = n.id_profesor;
                    no.id_logro = n.id_logro;
                    no.nota = n.nota;
                    no.equivalencia = n.equivalencia;
                    //Ajustado para la superación de notas
                    no.nota_s = n.nota_s;
                    no.equivalencia_s = n.equivalencia_s;

                    bd.notas.Add(no);
                    bd.SaveChanges();
                    return "¡Se agregó el registro de la nota exitosamente!";
                }
                else
                {
                    return "¡Error de congruencia de datos. Recuerde que usted no puede asignar notas al mismo estudiante en el mismo periodo, grupo y asignatura <strong>dos veces</strong>. Revise!";
                }
            }
            catch (Exception e)
            {
                string m = e.Message.ToString();
                if (m.StartsWith("Se produjo un error mientras se actualizaban las entradas."))
                { return "Lo sentimos. Reintene nuevamente. Tuvimos  problemas a intentar agregarle un referencia a este registro."; }
                else
                { return null; }
            }
        }
        public string e_nota(notasDTO.notass m)
        {
            try
            {
                notas n = bd.notas.Where(t =>
                t.id_grupo == m.id_grupo &&
                t.id_profesor == m.id_profesor &&
                t.id_periodo == m.id_periodo &&
                t.id_asignatura == m.id_asignatura
                ).FirstOrDefault();
                if (n != null)
                {
                    bd.notas.Remove(n);
                    bd.SaveChanges();
                    return "¡Eliminación exitosa!";
                }
                else { return null; }
            }
            catch (Exception)
            {
                return null; ;
            }

        }
        public string m_nota(notasDTO.notass m)
        {
            try
            {
                notas n = bd.notas.Where(t =>
                t.id_grupo == m.id_grupo &&
                t.id_profesor == m.id_profesor &&
                t.id_periodo == m.id_periodo &&
                t.id_asignatura == m.id_asignatura &&
                 t.id_estudiante == m.id_estudiante
                ).FirstOrDefault();
                if (n != null)
                { 
                    n.id_logro = m.id_logro;
                    n.nota = m.nota;
                    n.equivalencia = m.equivalencia;
                    n.nota_s = m.nota_s;
                    n.equivalencia_s = m.equivalencia_s;
                    bd.SaveChanges();
                    return "¡Se modificó la nota exitosamente!";
                }
                else { return null; }
            }
            catch (Exception)
            {
                return null; ;
            }
        }
        public notasDTO.notass c_nota(notasDTO.notass m)
        {
            try
            {
                notas n = bd.notas.Where(t =>
                t.id_grupo == m.id_grupo &&
                t.id_profesor == m.id_profesor &&
                t.id_periodo == m.id_periodo &&
                t.id_asignatura == m.id_asignatura &&
                 t.id_estudiante == m.id_estudiante
                ).FirstOrDefault();
                if (n != null)
                {
                    m.id_logro = n.id_logro;
                    m.nota = n.nota;
                    m.equivalencia = n.equivalencia;
                    //Ajustado para la superación de notas
                    m.nota_s = n.nota_s;
                    m.equivalencia_s = n.equivalencia_s;
                    return m ;
                }
                else { return null; }
            }
            catch (Exception)
            {
                return null; ;
            }
        }    
        //_--------------------------------------------------------------------
        public string r_notasGrupo(List<notasDTO.notass> n)
        {
            try
            {
                string m =null;
                foreach (notasDTO.notass item in n)
                {
                    m=r_nota(item);
                }
                if (m == "¡Se agregó el registro de la nota exitosamente!")
                {
                    return "¡Se agrego el registro de notas de este grupo exitosamente!";
                }
                else
                {
                    //Eliminamos las que se alcanzaron a enviar para no tener inconsistencias
                    try
                    {
                        // Capturo los datos que necesito para eliminar el intento fallido
                        
                        foreach (notasDTO.notass item in n)
                        {
                            string IDGrupo = item.id_grupo;
                            string IDProfesor = item.id_profesor;
                            string IDPer = item.id_periodo;
                            string IDAsig = item.id_asignatura;
                            string IDEst = item.id_estudiante;

                            bdsigameEntities bd = new bdsigameEntities();
                            notas ne = bd.notas.Where(t =>
                            t.id_grupo == IDGrupo &&
                            t.id_profesor == IDProfesor &&
                            t.id_periodo == IDPer &&
                            t.id_asignatura == IDAsig &&
                            t.id_estudiante == IDEst
                            ).FirstOrDefault();
                            int l = 0;
                            if (ne == null)
                            {
                                l = 0;
                            }
                            else
                            {
                                bd.notas.Remove(ne);
                                bd.SaveChanges();
                            }
                        }
                    }
                    catch (Exception EX)
                    {
                        string s = EX.Message.ToString();
                    }

                    return "Lo sentimos. Tuvimos procesar este grupo. Al parecer no envió los datos correctos. Tenga en cuenta que debe enviar la nota de cada estudiante con su respectiva nota, logro alcanzado y periodo academico. Revise y reintente. "; }
                }
            catch 
            {
                { return null; }
            }
        }
        //_--------------------------------------------------------------------
        public string m_notasGrupo(List<notasDTO.notass> n)
        {
            try
            {
                string m = null;
                foreach (notasDTO.notass item in n)
                {
                    m = m_nota(item);
                }
                if (m == "¡Se modificó la nota exitosamente!")
                {
                    return "¡Se modificaron las notas de este grupo exitosamente!";
                }
                else
                {
                    return "Lo sentimos. Tuvimos procesar este grupo. Al parecer no envió los datos correctos. Tenga en cuenta que debe enviar la nota de cada estudiante con su respectiva nota, logro alcanzado y periodo academico. Revise y reintente. ";
                }
            }
            catch
            {
                { return null; }
            }
        }
        //_--------------------------------------------------------------------
        public string e_notasGrupo(List<notasDTO.notass> n)
        {
            try
            {
                string m = null;
                foreach (notasDTO.notass item in n)
                {
                    m = e_nota(item);
                }
                if (m == "¡Eliminación exitosa!")
                {
                    return "¡Se eliminaron las notas de este grupo exitosamente!";
                }
                else
                {
                    return "Lo sentimos. Tuvimos procesar este grupo. Al parecer no envió los datos correctos. Tenga en cuenta que debe enviar la nota de cada estudiante con su respectiva nota, logro alcanzado y periodo academico. Revise y reintente. ";
                }
            }
            catch
            {
                { return null; }
            }
        }
        //_--------------------------------------------------------------------
        public string verificar_nota(notasDTO.notass Ob)
        {
            try
            {
                notas n = bd.notas.Where(
                 t =>
                 t.id_estudiante == Ob.id_estudiante &&
                 t.id_asignatura == Ob.id_asignatura &&
                 t.id_grupo == Ob.id_grupo &&
                 t.id_periodo == Ob.id_periodo
                    ).FirstOrDefault();
                if ((n != null))
                { return "1"; }  // si existe registro 
                else
                { return "0"; } // no existe registro 
            }
            catch { return null; }
        }
        //-----------------------------------------------------------------------------------        
        //-----------------------------filtros en las notas de forma grupal----------------------------------
        public List<dtoGNotaGD> c_notasXGrupoXIdPXAsig(string IdGrupo, string IdPeriodo, string IdAsig)
        {
            try
            {
                List<notas> n = null;
                n = bd.notas.Where(t => t.id_grupo == IdGrupo &&
                                        t.id_periodo ==IdPeriodo &&
                                        t.id_asignatura == IdAsig 
                                        ).ToList();
                List<dtoGNotaGD> d = new List<dtoGNotaGD>();
                foreach (notas item in n)
                {
                    dtoGNotaGD ds = new dtoGNotaGD();
                    //ojo verifacer que no este devolviendo la persona de PROFESOR. sino de estudiante.
                    ds.nombres = item.personas.nombres.ToString();
                    ds.apellidos = item.personas.apellidos.ToString();
                    ds.equivalencia = item.equivalencia.ToString();
                    
                    ds.nom_asig = item.asignatura.nombre.ToString();
                    ds.id_logro = item.id_logro.ToString();
                    ds.id_estudiante = item.id_estudiante.ToString();
                    ds.id_periodo = item.id_periodo.ToString();
                    ds.nota = item.nota.ToString();
                    //Ajustado para la superación de notas
                    ds.nota_s = item.nota_s.ToString();
                    ds.equivalencia_s = item.equivalencia_s.ToString();
                    d.Add(ds);
                }
                if (d.Count != 0)
                {
                   d=  d.OrderBy(t => t.apellidos).ToList();
                    return d;
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

         //------------------------------------------------
        public List<dtoGNotaGD> c_notasXGrupoXIdPXAsigXEqui(string IdGrupo, string IdPeriodo, string IdAsig, string Equi)
        {
            try
            {
                List<notas> n = null;
                n = bd.notas.Where(t => t.id_grupo == IdGrupo &&
                                        t.id_periodo == IdPeriodo &&
                                        t.id_asignatura == IdAsig &&
                                         t.equivalencia == Equi
                                        ).ToList();
                List<dtoGNotaGD> d = new List<dtoGNotaGD>();
                foreach (notas item in n)
                {
                    dtoGNotaGD ds = new dtoGNotaGD();
                    //ojo verifacer que no este devolviendo la persona de PROFESOR. sino de estudiante.
                    ds.nombres = item.personas.nombres.ToString();
                    ds.apellidos = item.personas.apellidos.ToString();
                    ds.equivalencia = item.equivalencia.ToString();
                    ds.nom_asig = item.asignatura.nombre.ToString();
                    ds.id_logro = item.id_logro.ToString();
                    ds.id_estudiante = item.id_estudiante.ToString();
                    ds.id_periodo = item.id_periodo.ToString();
                    ds.nota = item.nota.ToString();
                    //Ajustado para la superación de notas
                    ds.nota_s = item.nota_s.ToString();
                    ds.equivalencia_s = item.equivalencia_s.ToString();
                    d.Add(ds);
                }
                if (d.Count != 0)
                {
                    d= d.OrderBy(t => t.apellidos).ToList();
                    return d;
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
        public List<dtoGNotaGDALL> c_notass()
        {
            try
            {
                List<notas> n = null;
                n = bd.notas.ToList();
                List<dtoGNotaGDALL> d = new List<dtoGNotaGDALL>();
                foreach (notas item in n)
                {
                    dtoGNotaGDALL ds = new dtoGNotaGDALL();
                    //ojo verifacer que no este devolviendo la persona de PROFESOR. sino de estudiante.
                    ds.nombres = item.personas.nombres.ToString();
                    ds.apellidos = item.personas.apellidos.ToString();
                    ds.equivalencia = item.equivalencia.ToString();
                    ds.nom_asig = item.asignatura.nombre.ToString();
                    ds.id_logro = item.id_logro.ToString();
                    ds.id_estudiante = item.id_estudiante.ToString();
                    ds.id_periodo = item.id_periodo.ToString();
                    ds.nota = item.nota.ToString();
                    ds.id_grupo = item.id_grupo.ToString();

                    //Ajustado para la superación de notas
                    ds.nota_s = item.nota_s.ToString();
                    ds.equivalencia_s = item.equivalencia_s.ToString();
                    d.Add(ds);
                }
                if (d.Count != 0)
                {
                    d = d.OrderBy(t => t.apellidos).ToList();
                    return d;
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

        public List<dtoGNotaGD> c_notasXGrupoXIdP(string IdGrupo, string IdPeriodo)
        {
            try
            {
                List<notas> n = null;
                n = bd.notas.Where(t => t.id_grupo == IdGrupo &&
                                        t.id_periodo == IdPeriodo 
                                        ).ToList();
                List<dtoGNotaGD> d = new List<dtoGNotaGD>();
                foreach (notas item in n)
                {
                    dtoGNotaGD ds = new dtoGNotaGD();
                    //ojo verifacer que no este devolviendo la persona de PROFESOR. sino de estudiante.
                    ds.nombres = item.personas.nombres.ToString();
                    ds.apellidos = item.personas.apellidos.ToString();
                    ds.equivalencia = item.equivalencia.ToString();
                    ds.nom_asig = item.asignatura.nombre.ToString();
                    ds.id_logro = item.id_logro.ToString();
                    ds.id_estudiante = item.id_estudiante.ToString();
                    ds.id_periodo = item.id_periodo.ToString();
                    ds.nota = item.nota.ToString();

                    //Ajustado para la superación de notas
                    ds.nota_s = item.nota_s.ToString();
                    ds.equivalencia_s = item.equivalencia_s.ToString();
                    d.Add(ds);
                }
                if (d.Count != 0)
                {
                    d = d.OrderBy(t => t.apellidos).ToList();
                    return d;
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
        //----------------------------- fin de filtros en las notas de forma grupal----------------------------------
        //-----------------------------filtros en las notas de forma Individual----------------------------------
        public List<dtoGNotaID> c_notasXGrupoXIdPXIdEst(string IdGrupo, string IdPeriodo, string IdEst)
        {
            try
            {
                List<notas> n = null;
                n = bd.notas.Where(t => t.id_grupo == IdGrupo &&
                                        t.id_periodo == IdPeriodo &&
                                        t.id_estudiante == IdEst
                                        ).ToList();
                List<dtoGNotaID> d = new List<dtoGNotaID>();
                foreach (notas item in n)
                {
                    dtoGNotaID ds = new dtoGNotaID();
                    //ojo verifacer que no este devolviendo la persona de PROFESOR. sino de estudiante.
                    ds.horas = item.personas.nombres.ToString();
                    ds.equivalencia = item.equivalencia.ToString();
                    ds.nom_asig = item.asignatura.nombre.ToString();
                    ds.id_logro = item.id_logro.ToString();
                    ds.id_periodo = item.id_periodo.ToString();
                    ds.nota = item.nota.ToString();

                    //Ajustado para la superación de notas
                    //ds.nota_s = item.nota_s.ToString();
                    //ds.equivalencia_s = item.equivalencia_s.ToString();
                    d.Add(ds);
                }
                if (d.Count != 0)
                {
                   d= d.OrderBy(t => t.nom_asig).ToList();
                    return d;
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
        public List<dtoGNotaID> c_notasXGrupoXIdAsigXIdEst(string IdGrupo, string IdAsig, string IdEst)
        {
            try
            {
                List<notas> n = null;
                n = bd.notas.Where(t => t.id_grupo == IdGrupo &&
                                        t.id_asignatura == IdAsig &&
                                        t.id_estudiante == IdEst
                                        ).ToList();
                List<dtoGNotaID> d = new List<dtoGNotaID>();
                foreach (notas item in n)
                {
                    dtoGNotaID ds = new dtoGNotaID();
                    //ojo verifacer que no este devolviendo la persona de PROFESOR. sino de estudiante.
                    ds.horas = item.personas.nombres.ToString();
                    ds.equivalencia = item.equivalencia.ToString();
                    ds.nom_asig = item.asignatura.nombre.ToString();
                    ds.id_logro = item.id_logro.ToString();
                    ds.id_periodo = item.id_periodo.ToString();
                    ds.nota = item.nota.ToString();
                    //Ajustado para la superación de notas
                    //ds.nota_s = item.nota_s.ToString();
                    //ds.equivalencia_s = item.equivalencia_s.ToString();
                    d.Add(ds);
                }
                if (d.Count != 0)
                {
                    d= d.OrderBy(t => t.nom_asig).ToList();
                    return d;
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

    }
}
