using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
using AutoMapper;
namespace DAL
{
    public class RepoMatricula2
    {
        bdsigameEntities bd = new bdsigameEntities();
        List<matricula2> origen = new List<matricula2>();
         matricula2 origenO = new matricula2();
        List<matriculas2DTO.matricula2s> destino = new List<matriculas2DTO.matricula2s>();
      
        //-----------------------------------------------------------------------------------
        public string validarMatricula2(string idGrupo, string idEstudiante)
        {
            try
            {
                matricula2 ma = bd.matricula2.Where(t => 
                    t.id_grupo == idGrupo && 
                    t.id_estudiante == idEstudiante).FirstOrDefault();
                if (ma != null)
                {
                return "S";
                }
                else { return "N"; }
                
            }
            catch (Exception)
            {
                
                return null;
            }

        }
        //-----------------------------------------------------------------------------------
        public string r_matricula(matriculas2DTO.matricula2s m)
        {
            try
            {
                matricula2 ma = new matricula2();
                string M = validarMatricula2(m.id_grupo, m.id_estudiante);
                if (M == "N")
                {
                    //ma.referencia = m.referencia;
                    ma.id_estudiante = m.id_estudiante;
                    ma.id_grupo = m.id_grupo;
                    ma.id_acudiente = m.id_acudiente;
                    bd.matricula2.Add(ma);
                    bd.SaveChanges();
                    return "¡Se agrego el registro de matricula exitosamente!";
                }
                else if (M == "S")
                {
                    return "¡Esta matricula ya se encuentra asignada. Recuerde que usted no puede matricular el estudiante en el mismo grupo dos veces!";
                }
                return "Se produjo un error en el servidor al intentar validar que no sea una matricula duplicada";
            }
            catch { return null; }
        }
        //-----------------------------------------------------------------------------------
        public string e_matriculaEstudiante(matriculas2DTO.matriculaDTO identificador)
        {
            try
            {
                matricula2 u = bd.matricula2.Where(
                 t =>
                 t.id_acudiente == identificador.id_acudiente &&
                 t.id_grupo == identificador.id_grupo &&
                 t.id_estudiante == identificador.id_estudiante
                     ).FirstOrDefault();

                bd.matricula2.Remove(u);

                bd.SaveChanges();
                return "Matricula eliminada de forma exitosa.";

            }
            catch { return null; }
        }
        //-----------------------------------------------------------------------------------
        public List<personasDTO.personass> c_estudiantesXGrupo(string codGrupo)
        {
            try
            {
                List<matricula2> n = null;
                personasDTO.personass no = new personasDTO.personass();
                n = bd.matricula2.Where(t => t.id_grupo == codGrupo).ToList();

                List<personasDTO.personass> d = new List<personasDTO.personass>();
                foreach (matricula2 item in n)  
                {
                      personasDTO.personass ds = new personasDTO.personass();
                      ds.nombres = item.personas.nombres.ToString();
                      ds.apellidos = item.personas.apellidos.ToString();
                      ds.jornada = item.personas.jornada.ToString();
                      ds.rol = item.personas.rol.ToString();
                      ds.sexo = item.personas.sexo.ToString();
                      ds.telefono = item.personas.telefono.ToString();
                      ds.id_tipo = item.personas.id_tipo.ToString();
                      ds.id = item.personas.id.ToString();
                      ds.edad = item.personas.edad.ToString();
                      ds.email = item.personas.email.ToString();
                      ds.direccion = item.personas.direccion.ToString();
                      ds.cel = item.personas.cel.ToString();
                      ds.f_naci = Convert.ToString(item.personas.f_naci).Substring(0, 10);
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
        //-----------------------------------------------------------------------------------
        public matriculas2DTO.matricula2s c_matriculaXidEstudianteXidGrupo(string idEstudiante, string idGrupo)
        {
            try
            {
                matricula2 u = bd.matricula2.Where(t => t.id_estudiante == idEstudiante && t.id_grupo == idGrupo).FirstOrDefault();
                if (u != null)
                {
                    matriculas2DTO.matricula2s destino = new matriculas2DTO.matricula2s();
                    AutoMapper.Mapper.CreateMap<matricula2, matriculas2DTO.matricula2s>();
                    AutoMapper.Mapper.Map(origen, destino);
                    return destino;
                }
                else { return null; }              
            }
            catch (Exception)
            {                
                return null;
            } 
        }
        //-----------------------------------------------------------------------------------
        public List<personasDTO.personasDTOLogros> verificarNotas(notasDTO.notasXCursoDTO m)
        {
            try
            {
                List<notas> n = null;
                n = bd.notas.Where(t => t.id_grupo == m.codgrupo && 
                                        t.id_periodo == m.periodo &&
                                        t.id_asignatura == m.codasig &&
                                        t.id_profesor == m.codprofe 
                                        ).ToList();
                List<personasDTO.personasDTOLogros> d = new List<personasDTO.personasDTOLogros>();
                logros nl = null;

                foreach (notas item in n)
                {
                    personasDTO.personasDTOLogros ds = new personasDTO.personasDTOLogros();
                    //ojo verifacer que no este devolviendo la persona de PROFESOR. sino de estudiante.
                    ds.nombres = item.personas .nombres.ToString();
                    ds.apellidos = item.personas.apellidos.ToString();
                    ds.jornada = item.personas.jornada.ToString();
                    ds.rol = item.personas.rol.ToString();
                    ds.sexo = item.personas.sexo.ToString();
                    ds.telefono = item.personas.telefono.ToString();
                    ds.id_tipo = item.personas.id_tipo.ToString();
                    ds.id = item.personas.id.ToString();
                    ds.edad = item.personas.edad.ToString();
                    ds.email = item.personas.email.ToString();
                    ds.direccion = item.personas.direccion.ToString();
                    ds.cel = item.personas.cel.ToString();
                    string logro = item.id_logro.ToString();
                    // arreglamos el logro
                    nl = bd.logros.Where(t => t.id_logro == logro).FirstOrDefault();
                    ds.logro = logro +"/ "+ nl.descripcion.ToString();
                    ds.nota = item.nota.ToString();
                    ds.equivalencia = "";
                    //Ajusatdo para la superacion de notas
                    ds.nota_s = item.nota_s.ToString();
                    ds.equivalencia_s = "";
                    d.Add(ds);
                }

                if (d.Count != 0)
                {
                    d=d.OrderBy(t => t.apellidos).ToList(); 
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
        public float AjustarN(string nota)
        {
            if (nota == "10")
            {
                string a = ".0";
                nota = nota + a;
            }

            nota = nota.Replace(".", ",");
            float p = float.Parse(nota);
            if (p == 10.0)
            {
                return p;
            }
            else
            {
                decimal pp = Math.Round((decimal)p, 1);
                return p;
            }
        }

        //-----------------------------------------------------------------------------------
        public List<personasDTO.personasDTOLogros> c_notasFinalXGrupoXAsig(notasDTO.notasXCursoDTO m)
        {
            try
            {
                List<personasDTO.personasDTOLogros> v = new List<personasDTO.personasDTOLogros>();
                v = verificarNotas(m);
                if (v != null)
                {
                    return v;// si retorna quiere decir que ya hay notas asignadas.
                }
                else // si no retorna quiere decir que no hay para este grupo y periodo Por tanto devolvemos uno listo para registrar.
                {
                    List<matricula2> n = null;
                    n = bd.matricula2.Where(t => t.id_grupo == m.codgrupo).ToList();
                    List<personasDTO.personasDTOLogros> d = new List<personasDTO.personasDTOLogros>();
                    foreach (matricula2 item in n)
                    {
                        if (item.personas1.estado.ToString() != "RETIRADO")
                        {
                            float I = 0;float II = 0; float III = 0;float IV = 0;
                            personasDTO.personasDTOLogros ds = new personasDTO.personasDTOLogros();
                            ds.nombres = item.personas1.nombres.ToString();
                            ds.apellidos = item.personas1.apellidos.ToString();
                            ds.jornada = item.personas1.jornada.ToString();
                            ds.rol = item.personas1.rol.ToString();
                            ds.sexo = item.personas1.sexo.ToString();
                            ds.telefono = item.personas1.telefono.ToString();
                            ds.id_tipo = item.personas1.id_tipo.ToString();
                            ds.id = item.personas1.id.ToString();
                            ds.edad = item.personas1.edad.ToString();
                            ds.email = item.personas1.email.ToString();
                            ds.direccion = item.personas1.direccion.ToString();
                            ds.cel = item.personas1.cel.ToString();
                           
                            //Nota:
                            //Al pricesar las notas del period V, estas se deben computar con los periodos anteriores.
                            //En caso de que el niño haya superado algunos periodos,
                            //la nota computada para el V de ese periodo sera en base la superada
                            notas NI = bd.notas.Where(t => t.id_grupo == m.codgrupo &&
                                                       t.id_periodo == "I" && t.id_asignatura == m.codasig
                                                       && t.id_estudiante == item.id_estudiante).FirstOrDefault();
                            notas NII = bd.notas.Where(t => t.id_grupo == m.codgrupo &&
                                                     t.id_periodo == "II" && t.id_asignatura == m.codasig
                                                     && t.id_estudiante == item.id_estudiante).FirstOrDefault();
                            notas NIII = bd.notas.Where(t => t.id_grupo == m.codgrupo &&
                                                     t.id_periodo == "III" && t.id_asignatura == m.codasig
                                                     && t.id_estudiante == item.id_estudiante).FirstOrDefault();
                            notas NIV = bd.notas.Where(t => t.id_grupo == m.codgrupo &&
                                                     t.id_periodo == "IV" && t.id_asignatura == m.codasig
                                                     && t.id_estudiante == item.id_estudiante).FirstOrDefault();
                            if (NI == null) // registramos como 0  si no hay nada
                            { I = 0; }
                            else
                            {

                                I = AjustarN(NI.nota_s.ToString());
                                if (I == 0.0)//Quiere decir que NO hay superacion y configuramos con la nota principal
                                {
                                    I = AjustarN(NI.nota.ToString());
                                }
                                else //Quiere decir que SI hay superacion y configuramos con la nota superada
                                {
                                    I = AjustarN(NI.nota_s.ToString());
                                }
                            
                            }
                            if (NII == null) // registramos como 0  si no hay nada
                            { II = 0; }
                            else
                            { 
                                II = AjustarN(NII.nota_s.ToString());
                                if (II == 0.0)//Quiere decir que NO hay superacion y configuramos con la nota principal
                                {
                                    II = AjustarN(NII.nota.ToString());
                                }
                                else //Quiere decir que SI hay superacion y configuramos con la nota superada
                                {
                                    II = AjustarN(NII.nota_s.ToString());
                                }
                            }
                            if (NIII == null) // registramos como 0  si no hay nada
                            { III = 0; }
                            else
                            { 
                                III = AjustarN(NIII.nota_s.ToString());
                                if (III == 0.0)//Quiere decir que NO hay superacion y configuramos con la nota principal
                                {
                                    III = AjustarN(NIII.nota.ToString());
                                }
                                else //Quiere decir que SI hay superacion y configuramos con la nota superada
                                {
                                    III = AjustarN(NIII.nota_s.ToString());
                                }
                            }
                            if (NIV == null) // registramos como 0  si no hay nada
                            { IV = 0; }
                            else
                            { 
                                IV = AjustarN(NIV.nota_s.ToString());
                                if (IV == 0.0)//Quiere decir que NO hay superacion y configuramos con la nota principal
                                {
                                    IV = AjustarN(NIV.nota.ToString());
                                }
                                else //Quiere decir que SI hay superacion y configuramos con la nota superada
                                {
                                    IV = AjustarN(NIV.nota_s.ToString());
                                }
                            }
                            ds.logro = "Seleccione...";
                            ds.equivalencia = "";

                            ds.equivalencia_s = "";
                            float vp = (I + II + III + IV) / 4; // Esta seria la nota promedio de CADA asignatura en el periodo V
                            decimal vv = Math.Round((decimal)vp, 1);
                            string nota = vv.ToString();
                            nota = nota.Replace(",", ".");
                            ds.nota = nota;
                            ds.nota_s = "0";
                            d.Add(ds);
                        }
                    }
                    if (d.Count != 0)
                    {
                        d = d.OrderBy(p => p.apellidos).ToList();
                        return d;
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
        //-----------------------------------------------------------------------------------
        public List<personasDTO.personasDTOLogros> c_estudiantesXgrupoXlogro(notasDTO.notasXCursoDTO m)
        {
            try
            {
                if (m.periodo == "V") // ENTONCES PROCEDEMOS A CALCULAR EL FINAL
                {
                    List<personasDTO.personasDTOLogros> M = c_notasFinalXGrupoXAsig(m);
                    return M;
                }
                else
                {
                    List<personasDTO.personasDTOLogros> v = new List<personasDTO.personasDTOLogros>();
                    v = verificarNotas(m);
                    if (v != null)
                    {
                        return v;// si retorna quiere decir que ya hay notas asignadas.
                    }
                    else // si no retorna quiere decir que no hay para este grupo y periodo Por tanto devolvemos uno listo para registrar.
                    {
                        List<matricula2> n = null;
                        n = bd.matricula2.Where(t => t.id_grupo == m.codgrupo).ToList();
                        List<personasDTO.personasDTOLogros> d = new List<personasDTO.personasDTOLogros>();
                        foreach (matricula2 item in n)
                        {
                            if (item.personas1.estado.ToString() != "RETIRADO")
                            {
                                personasDTO.personasDTOLogros ds = new personasDTO.personasDTOLogros();
                                ds.nombres = item.personas1.nombres.ToString();
                                ds.apellidos = item.personas1.apellidos.ToString();
                                ds.jornada = item.personas1.jornada.ToString();
                                ds.rol = item.personas1.rol.ToString();
                                ds.sexo = item.personas1.sexo.ToString();
                                ds.telefono = item.personas1.telefono.ToString();
                                ds.id_tipo = item.personas1.id_tipo.ToString();
                                ds.id = item.personas1.id.ToString();
                                ds.edad = item.personas1.edad.ToString();
                                ds.email = item.personas1.email.ToString();
                                ds.direccion = item.personas1.direccion.ToString();
                                ds.cel = item.personas1.cel.ToString();

                                ds.logro = "Seleccione...";
                                ds.nota = "0";

                                ds.equivalencia = "";
                                //Ajustado para la superacion de notas
                                ds.nota_s = "0";
                                ds.equivalencia_s = "";
                                d.Add(ds);
                            }
                        }
                        if (d.Count != 0)
                        {
                            d = d.OrderBy(p => p.apellidos).ToList();
                            return d;
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
            catch
            {
                return null;
            }
        }   
        //-----------------------------------------------------------------------------------
           //=================================== metodos para filtrar las matriculas de estudiantes ================
        public List<dtoGMatricula2> c_matriculaXIdGrupoXSexo(string grupo, string sexo)
        {
            try
            {
                List<matricula2> n = null;
                n = bd.matricula2.Where(t => t.id_grupo == grupo && t.personas.sexo ==sexo).ToList();
                List<dtoGMatricula2> d = new List<dtoGMatricula2>();
                foreach (matricula2 item in n)
                {
                    dtoGMatricula2 ds = new dtoGMatricula2();
                    ds.nombres = item.personas1.nombres.ToString();
                    ds.apellidos = item.personas1.apellidos.ToString();
                    ds.grado = item.grupos.grados.nom_grado.ToString();
                    ds.edad = item.personas1.edad.ToString();
                    string f = item.personas1.f_naci.ToString();
                    ds.f_naci = f.Substring(0, 10);
                    ds.año = item.grupos.año.ToString();
                    ds.id_estudiante = item.id_estudiante.ToString();
                    ds.id_grupo = item.id_grupo.ToString();
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
        //--------------------------------------------------------------------------------------------------
        public List<dtoGMatricula2> c_matriculaXIdGrupo(string grupo)
        {
            try
            {
                List<matricula2> n = null;
                n = bd.matricula2.Where(t => t.id_grupo == grupo).ToList();
                List<dtoGMatricula2> d = new List<dtoGMatricula2>();
                foreach (matricula2 item in n)
                {
                    dtoGMatricula2 ds = new dtoGMatricula2();
                    ds.nombres = item.personas1.nombres.ToString();
                    ds.apellidos = item.personas1.apellidos.ToString();
                    ds.grado = item.grupos.grados.nom_grado.ToString();
                    ds.edad = item.personas1.edad.ToString();
                    string f = item.personas1.f_naci.ToString();
                    ds.f_naci = f.Substring(0, 10);
                    ds.año = item.grupos.año.ToString();
                    ds.id_estudiante = item.id_estudiante.ToString();
                    ds.id_grupo = item.id_grupo.ToString();
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

        //--------------------------------------------------------------------------------------------------
        public List<dtoGMatricula2> c_matriculaXIdAcu(string id)
        {
            try
            {
                List<matricula2> n = null;
                n = bd.matricula2.Where(t => t.id_acudiente == id).ToList();
                List<dtoGMatricula2> d = new List<dtoGMatricula2>();
                foreach (matricula2 item in n)
                {
                    dtoGMatricula2 ds = new dtoGMatricula2();
                    ds.nombres = item.personas1.nombres.ToString();
                    ds.apellidos = item.personas1.apellidos.ToString();
                    ds.grado = item.grupos.grados.nom_grado.ToString();
                    ds.edad = item.personas1.edad.ToString();
                    string f = item.personas1.f_naci.ToString();
                    ds.f_naci = f.Substring(0, 10);
                    ds.año = item.grupos.año.ToString();
                    ds.id_estudiante = item.id_estudiante.ToString();
                    ds.id_grupo = item.id_grupo.ToString();
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

        //--------------------------------------------------------------------------------------------------
        public List<dtoGMatricula2>c_matriculaXIdEst(string id)
        {
            try
            {
                List<matricula2> n = new List<matricula2>();
                n = bd.matricula2.Where(t => t.id_estudiante == id).ToList();
                List<dtoGMatricula2> d = new List<dtoGMatricula2>();
                foreach (matricula2 item in n)
                {
                    dtoGMatricula2 ds = new dtoGMatricula2();
                    ds.nombres = item.personas1.nombres.ToString();
                    ds.apellidos = item.personas1.apellidos.ToString();
                    ds.grado = item.grupos.grados.nom_grado.ToString();
                    ds.edad = item.personas1.edad.ToString();
                    string f = item.personas1.f_naci.ToString();
                    ds.f_naci = f.Substring(0, 10);
                    ds.año = item.grupos.año.ToString();
                    ds.id_estudiante = item.id_estudiante.ToString();
                    ds.id_grupo = item.id_grupo.ToString();
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
                //--------------------------------------------------------------------------------------------------
        public List<dtoGMatricula2> c_matriculasEst()
        {
            try
            {
                List<matricula2> n = new List<matricula2>();
                n = bd.matricula2.ToList();
                List<dtoGMatricula2> d = new List<dtoGMatricula2>();
                foreach (matricula2 item in n)
                {
                    dtoGMatricula2 ds = new dtoGMatricula2();
                    ds.nombres = item.personas1.nombres.ToString();
                    ds.apellidos = item.personas1.apellidos.ToString();
                    ds.grado = item.grupos.grados.nom_grado.ToString();
                    ds.edad = item.personas1.edad.ToString();
                    string f = item.personas1.f_naci.ToString();
                    ds.f_naci = f.Substring(0, 10);
                    ds.año = item.grupos.año.ToString();
                    ds.id_estudiante = item.id_estudiante.ToString();
                    ds.id_grupo = item.id_grupo.ToString();
                    d.Add(ds);
                }
                if (d.Count != 0)
                {
                    d = d.OrderBy(t => t.id_grupo).ToList();
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
        //=================================== Fin de metodos para filtrar las matriculas de estudiantes ================
        public List<asignaturasDTO> c_asignaturasDeEstudianteXgrupo(string codEst)
        {
            try
            {
            matricula2 es = bd.matricula2.Where(t => t.id_estudiante == codEst).FirstOrDefault();
            List<matricula1> LstMatricula = bd.matricula1.Where(t => t.id_grupo == es.id_grupo).ToList();

            List<asignaturasDTO> alst = new List<asignaturasDTO>();
            foreach (matricula1 item in LstMatricula)
            {
                asignaturasDTO a = new asignaturasDTO();
                a.id = item.asignatura.id.ToString();
                a.nombre = item.asignatura.nombre.ToString();
                alst.Add(a);
            }
            if (alst.Count != 0)
            {
                alst = alst.OrderBy(t => t.nombre).ToList();
                return alst;
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
        //-------------------------- ASIGNACIONES DE GRUPOS A DIRECTOR------------------------
        public string validarDirectorG(string idGrupo, string idProfesor)
        {
            try
            {
                directores_g ma = bd.directores_g.Where(t =>
                    t.id_grupo == idGrupo &&
                    t.id_profesor == idProfesor).FirstOrDefault();
                if (ma != null)
                {
                    return "S";
                }
                else { return "N"; }
            }
            catch (Exception)
            {
                return null;
            }
        }
        //-----------------------------------------------------------------------------------
        public string r_matriculaDirector(matriculas1DTO.directorG_DTO dto)
        {
            try
            {
                directores_g ma = new directores_g();
                string M = validarDirectorG(dto.id_grupo, dto.id_profesor);
                if (M == "N")
                {
                    ma.id_grupo = dto.id_grupo;
                    ma.id_profesor = dto.id_profesor;
                    bd.directores_g.Add(ma);
                    bd.SaveChanges();
                    return "¡Se agrego el registro de asignación exitosamente!";
                }
                else if (M == "S")
                {
                    return "¡Esta asignación ya se encuentra registrada. Recuerde que usted no puede asignar el mismo grupo y profesor dos veces!";
                }
                return "Se produjo un error en el servidor al intentar validar que no sea una matricula duplicada";
            }
            catch { return null; }
        }
        //-----------------------------------------------------------------------------------
        public string e_matriculaDirector(matriculas1DTO.directorG_DTO dto)
        {
            try
            {
                directores_g u = bd.directores_g.Where(
                 t =>
                 t.id_profesor == dto.id_profesor &&
                 t.id_grupo == dto.id_grupo 
                     ).FirstOrDefault();
                bd.directores_g.Remove(u);
                bd.SaveChanges();

                return "Asignación eliminada de forma exitosa.";
            }
            catch { return null; }
        }
        public List<dtoG> c_matriculaDirector(matriculas1DTO.directorG_DTO dto)  //OK)
        {
            try
            {
                List<directores_g> u = bd.directores_g.Where(
                 t =>
                 t.id_profesor == dto.id_profesor 
                     ).ToList();
                List<dtoG> l = new List<dtoG>();

                if (u.Count != 0)
                {
                    foreach (directores_g item in u)
                    {
                        dtoG obj = new dtoG();
                        obj.id = item.id_grupo.ToString();
                        l.Add(obj);
                    }
                    return l;
                }
                else
                {
                     return null; 
                }
            }
            catch { return null; }
        }

        //-----------------------------------------------------------------------------------
        public List<dtoDirectoresG> c_directoresG()
        {
            try
            {
                List<directores_g> u = bd.directores_g.ToList();
                List<dtoDirectoresG> p = new List<dtoDirectoresG>();
                if (u.Count!=0)
                {
                    foreach (directores_g item in u)
                    {
                        dtoDirectoresG pp = new dtoDirectoresG();
                        pp.apellidos = item.personas.apellidos.ToString();
                        pp.nombres = item.personas.nombres.ToString();
                        pp.id_grupo = item.id_grupo.ToString();
                        pp.id_profesor = item.id_profesor.ToString();
                        p.Add(pp);
                    }
                    p = p.OrderBy(t => t.apellidos).ToList();
                    return p;
                }
                else
                {
                     return null; 
                }
                
            }
            catch { return null; }
        }
    }
}

