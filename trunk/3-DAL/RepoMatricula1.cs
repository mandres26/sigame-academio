using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
using AutoMapper;

namespace DAL
{
    public class RepoMatricula1
    {
        bdsigameEntities bd = new bdsigameEntities();
        List<matricula1> origen = new List<matricula1>();
        matricula1 origenO = new matricula1();
     //----------------------------------------------------------------------------------
        public List<dtoG> c_gruposDelProfesor(dtoG dto)
        {
            try
            {
                using (var ctx = new bdsigameEntities())
                {
                    string sql = "SELECT DISTINCT `id-grupo` FROM `matricula1` WHERE `id-profesor`= '" + dto.id + "'";
                    var m = ctx.Database.SqlQuery<string>(sql).ToList();
                    List<dtoG> mm = new List<dtoG>();
                    if (m.Count != 0)
                    {
                        for (int i = 0; i < m.Count; i++)
                        {
                            dtoG ll = new dtoG();
                            ll.id = m[i];
                            mm.Add(ll);
                        }
                        return mm;
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
          //--------------------------------------------------------------------------------------------------
          public List<dtoG> c_asignaturasDelProfe(dtoG dto)
          {
              try
              {
                  using (var ctx = new bdsigameEntities())
                  {
                      string sql = "SELECT DISTINCT `id-asignatura` FROM `matricula1` WHERE `id-profesor`= '" + dto.id + "'";
                      var m = ctx.Database.SqlQuery<string>(sql).ToList();
                      List<dtoG> mm = new List<dtoG>();
                      if (m.Count != 0)
                      {
                          for (int i = 0; i < m.Count; i++)
                          {
                              dtoG ll = new dtoG();
                              ll.id = m[i];
                              mm.Add(ll);
                          }
                          return mm;
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
          //--------------------------------------------------------------------------------------------------
          public List<dtoG> c_gradosDelProfe(dtoG dto)
          {
              try
              {
                  using (var ctx = new bdsigameEntities())
                  {
                      string sql = "SELECT DISTINCT `grados`.`id-grado` FROM `matricula1`,`grados`,`grupos` WHERE `id-profesor`= '" + dto.id + "' and `grupos`.`id-grupo`=`matricula1`.`id-grupo` and `grados`.`id-grado`=`grupos`.`id-grado`";
                      var m = ctx.Database.SqlQuery<string>(sql).ToList();
                      List<dtoG> mm = new List<dtoG>();
                      if (m.Count != 0)
                      {
                          for (int i = 0; i < m.Count; i++)
                          {
                              dtoG ll = new dtoG();
                              ll.id = m[i];
                              mm.Add(ll);
                          }
                          return mm;
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

        
      public List<matriculas1DTO.materiasProfesorDTO> c_asignaturasProfe(string codProfe)
        {
            try
            {
                List<matricula1> n = bd.matricula1.Where(t => t.id_profesor == codProfe).OrderBy(t => t.id_asignatura).ToList();
                List<matriculas1DTO.materiasProfesorDTO> Lista = new List<matriculas1DTO.materiasProfesorDTO>();
                
                foreach (matricula1 item in n)
                {
                    matriculas1DTO.materiasProfesorDTO ds = new matriculas1DTO.materiasProfesorDTO();
                    ds.nombreAsig = item.asignatura.nombre.ToString();
                    ds.codAsig = item.id_asignatura.ToString();
                    ds.grupo = item.id_grupo.ToString();
                    ds.grado = item.grupos.id_grado.ToString();
                    Lista.Add(ds);
                }
                if (Lista.Count != 0)
                {
                   Lista=Lista.OrderBy(t => t.nombreAsig).ToList();
                    return Lista;
                }
                else {return null; }                
            }catch
            {
                return null;
            }
        }
      //-----------------------------------------------------------------------------------
      public List<matriculas1DTO.gradosProfesorDTO> c_gradosProfesor(string codProfe)
      {
          try
          {
              List<matricula1> n = null;
              n=bd.matricula1.Where(t=>t.id_profesor==codProfe).OrderBy(t => t.id_asignatura).ToList();
              List<matriculas1DTO.gradosProfesorDTO> d = new List<matriculas1DTO.gradosProfesorDTO>();
              foreach (matricula1 item in n)
              {
                  matriculas1DTO.gradosProfesorDTO ds = new matriculas1DTO.gradosProfesorDTO();
                  ds.id_grupo = item.id_grupo.ToString();
                  ds.id_asignatura = item.id_asignatura.ToString();
                  ds.nom_asignatura = item.asignatura.nombre.ToString();
                  ds.nom_grado = item.grupos.grados.nom_grado.ToString();
                  d.Add(ds);                  
              }
              if (d.Count != 0)
              {
                  d = d.OrderBy(t => t.nom_asignatura).ToList();
                  return d;
              }
              else { return null; }
          }
          catch (Exception)
          {
              
              return null;
          }
      }
      //-----------------------------------------------------------------------------------
      public string validarMatricula1(string idGrupo, string idProfe, string idAsig)
      {
          try
          {
              matricula1 ma = bd.matricula1.Where(t =>
                  t.id_grupo == idGrupo &&
                  t.id_asignatura == idAsig &&
                  t.id_profesor == idProfe).FirstOrDefault();
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
      public string r_matriculaProfe(matriculas1DTO.matriculaDTO m)
      {
          try
          {
              matricula1 ma = new matricula1();
              string M = validarMatricula1(m.id_grupo, m.id_profesor, m.id_asignatura);
              if (M == "N")
              {
                  //ma.referencia = m.referencia;
                  ma.id_asignatura = m.id_asignatura;
                  ma.id_grupo = m.id_grupo;
                  ma.id_profesor = m.id_profesor;
                  bd.matricula1.Add(ma);
                  bd.SaveChanges();
                  return "¡Se agrego el registro de matricula exitosamente!";
              }
              else if (M == "S")
              {
                  return "¡Esta matricula ya se encuentra asignada. Recuerde que usted no puede matricular el profesor en el mismo grupo con la misma asignatura dos veces!";
              }
              return "Se produjo un error en el servidor al intentar validar que no sea una matricula duplicada";
          }
          catch { return null; }
      }


     //----------------------------------------------------------------------
      public string e_matriculaProfe(matriculas1DTO.matriculaDTO identificador)
      {
          try
          {
              matricula1 u = bd.matricula1.Where(
               t =>
               t.id_asignatura == identificador.id_asignatura &&
               t.id_grupo == identificador.id_grupo &&
               t.id_profesor == identificador.id_profesor
                   ).FirstOrDefault();

              bd.matricula1.Remove(u);
              bd.SaveChanges();
              return "Matricula eliminada de forma exitosa.";
          }
          catch { return null; }
      }
      //=================================== metodos para filtrar las matriculas de profesores ================
      public List<dtoGMatricula1> c_mProfesXIdGrupoXSexo(string grupo, string sexo)
      {
          try
          {
              List<matricula1> n = null;
              n = bd.matricula1.Where(t => t.id_grupo == grupo && t.personas.sexo == sexo).ToList();
              List<dtoGMatricula1> d = new List<dtoGMatricula1>();
              foreach (matricula1 item in n)
              {
                  dtoGMatricula1 ds = new dtoGMatricula1();
                  ds.nombres = item.personas.nombres.ToString();
                  ds.apellidos = item.personas.apellidos.ToString();
                  ds.horas = item.asignatura.horas.ToString();
                  ds.id_asignatura = item.id_asignatura.ToString();
                  ds.id_grupo = item.id_grupo.ToString();
                  ds.id_profesor = item.personas.id.ToString();
                  ds.n_asignatura = item.asignatura.nombre.ToString();
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

    

      //--------------------------------------------------------------------------------------------------
      public List<dtoGMatricula1> c_mProfesXIdGrupo(string grupo)
      {
          try
          {
              List<matricula1> n = null;
              n = bd.matricula1.Where(t => t.id_grupo == grupo).ToList();
              List<dtoGMatricula1> d = new List<dtoGMatricula1>();
              foreach (matricula1 item in n)
              {
                  dtoGMatricula1 ds = new dtoGMatricula1();
                  ds.nombres = item.personas.nombres.ToString();
                  ds.apellidos = item.personas.apellidos.ToString();
                  ds.horas = item.asignatura.horas.ToString();
                  ds.id_asignatura = item.id_asignatura.ToString();
                  ds.id_grupo = item.id_grupo.ToString();
                  ds.id_profesor = item.personas.id.ToString();
                  ds.n_asignatura = item.asignatura.nombre.ToString();
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
      public List<dtoGMatricula1> c_mProfesXIdAsig(string idAsig)
      {
          try
          {
              List<matricula1> n = null;
              n = bd.matricula1.Where(t => t.id_asignatura == idAsig).ToList();
              List<dtoGMatricula1> d = new List<dtoGMatricula1>();
              foreach (matricula1 item in n)
              {
                  dtoGMatricula1 ds = new dtoGMatricula1();
                  ds.nombres = item.personas.nombres.ToString();
                  ds.apellidos = item.personas.apellidos.ToString();
                  ds.horas = item.asignatura.horas.ToString();
                  ds.id_asignatura = item.id_asignatura.ToString();
                  ds.id_grupo = item.id_grupo.ToString();
                  ds.id_profesor = item.personas.id.ToString();
                  ds.n_asignatura = item.asignatura.nombre.ToString();
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
      public List<dtoGMatricula1> c_mProfesXIdXGrupoXAsig(string idProfe, string idGrupo, string IdAsig)
      {
          try
          {
              List<matricula1> n = null;
              n = bd.matricula1.Where(t => t.id_profesor == idProfe && t.id_grupo == idGrupo && t.id_asignatura == IdAsig).ToList();
              List<dtoGMatricula1> d = new List<dtoGMatricula1>();
              foreach (matricula1 item in n)
              {
                  dtoGMatricula1 ds = new dtoGMatricula1();
                  ds.nombres = item.personas.nombres.ToString();
                  ds.apellidos = item.personas.apellidos.ToString();
                  ds.horas = item.asignatura.horas.ToString();
                  ds.id_asignatura = item.id_asignatura.ToString();
                  ds.id_grupo = item.id_grupo.ToString();
                  ds.id_profesor = item.personas.id.ToString();
                  ds.n_asignatura = item.asignatura.nombre.ToString();
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
      public List<dtoGMatricula1> c_mProfesXGrupoXAsig(string idGrupo, string IdAsig)
      {
          try
          {
              List<matricula1> n = null;
              n = bd.matricula1.Where(t => t.id_grupo == idGrupo && t.id_asignatura== IdAsig).ToList();
              List<dtoGMatricula1> d = new List<dtoGMatricula1>();
              foreach (matricula1 item in n)
              {
                  dtoGMatricula1 ds = new dtoGMatricula1();
                  ds.nombres = item.personas.nombres.ToString();
                  ds.apellidos = item.personas.apellidos.ToString();
                  ds.horas = item.asignatura.horas.ToString();
                  ds.id_asignatura = item.id_asignatura.ToString();
                  ds.id_grupo = item.id_grupo.ToString();
                  ds.id_profesor = item.personas.id.ToString();
                  ds.n_asignatura = item.asignatura.nombre.ToString();
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
      public List<dtoGMatricula1> c_matriculasProfes()
      {
          try
          {
              List<matricula1> n = null;
              n = bd.matricula1.ToList();
              List<dtoGMatricula1> d = new List<dtoGMatricula1>();
              foreach (matricula1 item in n)
              {
                  dtoGMatricula1 ds = new dtoGMatricula1();
                  ds.nombres = item.personas.nombres.ToString();
                  ds.apellidos = item.personas.apellidos.ToString();
                  ds.horas = item.asignatura.horas.ToString();
                  ds.id_asignatura = item.id_asignatura.ToString();
                  ds.id_grupo = item.id_grupo.ToString();
                  ds.id_profesor = item.personas.id.ToString();
                  ds.n_asignatura = item.asignatura.nombre.ToString();
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
      public List<dtoGMatricula1> c_mProfesXId(string idprofe)
      {
          try
          {
              List<matricula1> n = null;
              n = bd.matricula1.Where(t => t.id_profesor == idprofe).ToList();
              List<dtoGMatricula1> d = new List<dtoGMatricula1>();
              foreach (matricula1 item in n)
              {
                  dtoGMatricula1 ds = new dtoGMatricula1();
                  ds.nombres = item.personas.nombres.ToString();
                  ds.apellidos = item.personas.apellidos.ToString();
                  ds.horas = item.asignatura.horas.ToString();
                  ds.id_asignatura = item.id_asignatura.ToString();
                  ds.id_grupo = item.id_grupo.ToString();
                  ds.id_profesor = item.personas.id.ToString();
                  ds.n_asignatura = item.asignatura.nombre.ToString();
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
      public List<dtoGMatriculaProfe> c_mProfesXIdForHorario(string idprofe)
      {
          try
          {
              // primero consultamos los grupos que tine

              using (var ctx = new bdsigameEntities())
              {
                  string sql = "SELECT DISTINCT `id-grupo` FROM `matricula1` WHERE `id-profesor`= '" + idprofe + "'";
                  var m = ctx.Database.SqlQuery<string>(sql).ToList();

                  if (m.Count != 0)
                  {
                      personas per = bd.personas.Where(t => t.id == idprofe).FirstOrDefault();
                      List<dtoGMatriculaProfe> dss = new List<dtoGMatriculaProfe>();
                      for (int i = 0; i < m.Count; i++)
                      {
                          dtoG ll = new dtoG();
                          string g = Convert.ToString(m[i]);
                          grupos n = bd.grupos.Where(t => t.id_grupo == g).FirstOrDefault();
                          dtoGMatriculaProfe ds = new dtoGMatriculaProfe();

                          ds.nombres = per.nombres.ToString();
                          ds.apellidos = per.apellidos.ToString();
                          ds.año = n.año.ToString();
                          ds.grado = n.grados.nom_grado.ToString();
                          ds.id_grupo = n.id_grupo.ToString();
                          ds.id_profesor = idprofe;
                          ds.f_naci = per.f_naci.ToString();
                          ds.edad = per.edad.ToString();
                          dss.Add(ds);
                      }
                      return dss;
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


          //    List<matricula1> n = null;
          //    n = bd.matricula1.Where(t => t.id_profesor == idprofe).OrderBy(t => t.grupos.año).ToList();
          //    List<dtoGMatriculaProfe> d = new List<dtoGMatriculaProfe>();
          //    if (n.Count != 0)
          //    {
          //        int b = 0;
          //        string codGrupo = null;
          //        string codGrado = null;
          //        foreach (matricula1 item in n)
          //        {
          //            dtoGMatriculaProfe ds = new dtoGMatriculaProfe();
          //            if (b==0)
          //            {
          //                //Capturo el primer registro para ver que no este repetidos
          //                codGrupo= item.id_grupo.ToString();
          //                codGrado = item.grupos.grados.nom_grado.ToString();

          //                ds.nombres = item.personas.nombres.ToString();
          //                ds.apellidos = item.personas.apellidos.ToString();
          //                ds.año = item.grupos.año.ToString();
          //                ds.grado = item.grupos.grados.nom_grado.ToString();
          //                ds.id_grupo = item.id_grupo.ToString();
          //                ds.id_profesor = item.personas.id.ToString();
          //                ds.f_naci = item.personas.f_naci.ToString();
          //                ds.edad = item.personas.edad.ToString();
          //                d.Add(ds);
          //                b = 1;
          //            }
          //            else if (b==1) // ya cuando vienes despues verifico a ver si son iguales al primer, si lo son entonces no lo agrego, de lo contrario lo agrego
          //            {
          //                if (codGrupo ==  item.id_grupo.ToString() && codGrado == item.grupos.grados.nom_grado.ToString())
          //                {
          //                    b = b + 1;
          //                }
          //                else
          //                {
          //                    ds.nombres = item.personas.nombres.ToString();
          //                    ds.apellidos = item.personas.apellidos.ToString();
          //                    ds.año = item.grupos.año.ToString();
          //                    ds.grado = item.grupos.grados.nom_grado.ToString();
          //                    ds.id_grupo = item.id_grupo.ToString();
          //                    ds.id_profesor = item.personas.id.ToString();
          //                    ds.f_naci = item.personas.f_naci.ToString();
          //                    ds.edad = item.personas.edad.ToString();
          //                    d.Add(ds);
          //                    b = 1;
          //                }
          //            }
          //        }
          //        if (d.Count != 0)
          //        {
          //            return d;
          //        }
          //        else
          //        {
          //            return null;
          //        }
          //    }
          //    else
          //    {
          //        return null;
          //    }
          //}
          //catch
          //{
          //    return null;
          //}

          //=================================== Fin de metodos para filtrar las matriculas de profesores ================

      }
    }
}
