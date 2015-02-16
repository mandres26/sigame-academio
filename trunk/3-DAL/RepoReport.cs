using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
using AutoMapper;
namespace DAL
{
    public class RepoReport
    {
        bdsigameEntities bd = new bdsigameEntities();
        List<notas> origenN = new List<notas>();
        List<reportes> origenR = new List<reportes>();
        List<notasDTO.notass> destinoR = new List<notasDTO.notass>();

        //-----------------------------------------------------------------------------------
        public string r_report(reportesDTO.reportess n)
        {
            try
            {
                string m = verificar_registro(n.id_estudiante, n.id_grupo, n.id_periodo);
                if (m == "0")
                {
                    DateTime dptBitacora;
                    dptBitacora = DateTime.Now;
                    reportes no = new reportes();
                    no.id_estudiante = n.id_estudiante.ToString();
                    no.id_grupo = n.id_grupo;
                    no.id_periodo = n.id_periodo;
                    no.observacion = n.observacion;
                    no.fecha = dptBitacora;
                    if (n.acceso == true)
                    {
                        no.acceso = "TRUE";
                    }
                    else
                    {
                        no.acceso = "FALSE";
                    }
                    no.notificacion = "PENDIENTE";
                    bd.reportes.Add(no);
                    bd.SaveChanges();
                    return "¡Se agregó el reporte exitosamente!";
                }
                else
                {
                    return "¡Error de congruencia de datos. Recuerde que usted no puede generar el boletin al mismo estudiante en el mismo periodo y grupo <strong>dos veces</strong>. Revise!";
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
        public string e_report(reportesDTO.reportess m)
        {
            try
            {
                reportes n = bd.reportes.Where(t =>
                t.id_grupo == m.id_grupo &&
                t.id_estudiante == m.id_estudiante &&
                t.id_periodo == m.id_periodo
                ).FirstOrDefault();
                if (n != null)
                {
                    bd.reportes.Remove(n);
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
        public string m_report(reportesDTO.reportess m)
        {
            try
            {
                reportes n = bd.reportes.Where(t =>
                t.id_grupo == m.id_grupo &&
                t.id_estudiante == m.id_estudiante &&
                t.id_periodo == m.id_periodo
                ).FirstOrDefault();
                if (n != null)
                {
                    DateTime dptBitacora;
                    dptBitacora = DateTime.Now;
                    n.observacion = m.observacion;
                    n.fecha = dptBitacora;
                    if (m.acceso == true)
                    {
                        n.acceso = "TRUE";
                    }
                    else
                    {
                        n.acceso = "FALSE";
                    }
                    n.notificacion = m.notificacion;
                    n.observacion = m.observacion;

                    bd.SaveChanges();
                    return "¡Se modificó el reporte exitosamente!";
                }
                else { return null; }
            }
            catch (Exception)
            {
                return null; ;
            }
        }
        //========================================================================================================
        //===============================  ACA COMIENZAN LOS REPORTES DEL SISTEMA ===========================================
        //========================================================================================================
        // lo que devuelve esta funcion es lo se manda a llamar  en el dsConsta
        public reportesDTO.reporteDTOConsta cg_constanciaXestud(string idEstudiante, string idGrupo)
        {
            try
            {
                matricula2 R = bd.matricula2.Where(t =>
                       t.id_grupo == idGrupo &&
                       t.id_estudiante == idEstudiante
                       ).FirstOrDefault();
                reportesDTO.reporteDTOConsta n = new reportesDTO.reporteDTOConsta();
                if (R != null)
                {
                    n.estudiante = R.personas1.nombres.ToString() + " " + R.personas1.apellidos.ToString();
                    n.tipo = R.personas1.id_tipo.ToString();
                    n.grado = R.grupos.grados.nom_grado.ToString();
                    n.id = R.id_estudiante.ToString();
                    n.ano = R.grupos.año.ToString();
                    n.grupo = R.id_grupo.ToString();
                    n.resultado = "c_yes";
                    return n;
                }
                else
                {
                    n.resultado = "c_no";
                    return n;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
        // lo que devuelve esta funcion es lo se manda a llamar  en el dsConstaf
        public reportesDTO.reporteDTOConstaF cg_constanciaXfamily(string idEstudiante, string idGrupo, string mes1, string mes2)
        {
            try
            {
                matricula2 R = bd.matricula2.Where(t =>
                       t.id_grupo == idGrupo &&
                       t.id_estudiante == idEstudiante
                       ).FirstOrDefault();
                reportesDTO.reporteDTOConstaF n = new reportesDTO.reporteDTOConstaF();
                if (R != null)
                {
                    n.estudiante = R.personas1.nombres.ToString() + " " + R.personas1.apellidos.ToString();
                    n.tipo = R.personas1.id_tipo.ToString();
                    n.grado = R.grupos.grados.nom_grado.ToString();
                    n.id = R.id_estudiante.ToString();
                    n.ano = R.grupos.año.ToString();
                    n.grupo = R.id_grupo.ToString();
                    n.mes1 = mes1;
                    n.mes2 = mes2;
                    n.resultado = "c_yes";
                    return n;
                }
                else
                {
                    n.resultado = "c_no";
                    return n;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
        // lo que devuelve esta funcion es lo se manda a llamar  en el dsListado =  listadoGrupo
        public List<reportesDTO.reporteDTOListado> cg_listadoXGrupo(string idGrupo, string periodo)
        {
            try
            {
                List<matricula2> n = null;
                List<reportesDTO.reporteDTOListado> Listado = new List<reportesDTO.reporteDTOListado>();

                n = bd.matricula2.Where(t => t.id_grupo == idGrupo).OrderBy(t => t.personas1.apellidos).ToList();
                if (n.Count != 0)
                {
                    int conta = 1;
                    foreach (matricula2 item in n)
                    {
                        reportesDTO.reporteDTOListado ob = new reportesDTO.reporteDTOListado();
                        if (item.personas1.estado.ToString() != "RETIRADO")
                        {
                            ob.ano = item.grupos.año.ToString();
                            ob.grupo = item.id_grupo.ToString();
                            ob.periodo = periodo;

                            ob.refe = conta;
                            ob.id = item.id_estudiante.ToString();
                            ob.apellidos = item.personas1.apellidos.ToString();
                            ob.nombres = item.personas1.nombres.ToString();
                            ob.resultado = "c_yes";
                            conta = conta + 1;

                            Listado.Add(ob);
                        }
                    }
                    return Listado;
                }
                else
                {
                    reportesDTO.reporteDTOListado ob = new reportesDTO.reporteDTOListado();
                    ob.resultado = "c_no";
                    Listado.Add(ob);
                    return Listado;
                }
            }
            catch (Exception)
            {
                return null;

            }
        }
        // lo que devuelve esta funcion es lo se manda a llamar  en el dsBoletinF
        public List<reportesDTO.reporteDTOFin> c_reporteFinal(string idEstudiante, string idGrupo, string observacion)
        {
            try
            {
                List<reportesDTO.reporteDTOFin> Boletin = new List<reportesDTO.reporteDTOFin>();
                reportesDTO.reporteDTOFin Bmm = new reportesDTO.reporteDTOFin();
                string[] Ano = idGrupo.Split('-');
                string ano = Ano[0];

                //=========================================================================================
                reportes R = bd.reportes.Where(t =>
                        t.id_grupo == idGrupo &&
                        t.id_estudiante == idEstudiante &&
                        t.id_periodo == (ano +"-"+"V")).FirstOrDefault();

                if (R == null)
                {
                    Bmm.resultado = "Este reporte que solicita no ha sido generado por la administración.";
                    Boletin.Add(Bmm);
                    return Boletin;
                }
                else if (R.acceso.ToString() == "TRUE")
                {
                    List<matricula2> k = bd.matricula2.Where(t =>
                    t.id_grupo == idGrupo && t.id_estudiante == idEstudiante).OrderBy(t => t.id_estudiante).ToList();
                    // OBTENEMOS LAS ASIGNATURAS QUE TIENE ESE GRUPO
                    List<matricula1> kk = bd.matricula1.Where(t => t.id_grupo == idGrupo).ToList();
                    
                    if (k.Count != 0)
                    {
                        foreach (matricula2 item in k) //  CHEQUEO EL ESTUDIANTE PARA ARMAR SU BOLETIN....
                        {
                            int conta = 0;
                            float nota_prom = 0;
                            List<reportesDTO.b_BodyFin> Body = new List<reportesDTO.b_BodyFin>();
                            reportesDTO.b_headFin Head = new reportesDTO.b_headFin();
                            int b = 0;
                            // CONSULTO LAS NOTAS PARA EL PERIOD V , ES DECIR SOLO LOS LOGROS.
                            foreach (matricula1 item2 in kk) // CHEQUEO LAS ASIGNATURAS QUE CONTIENE EL GRUPO
                            {
                                reportesDTO.b_BodyFin BodyObj = new reportesDTO.b_BodyFin();
                                // AHOR PROCESAMOS LOS ACOMULADOS DE ACURDO A LAS NOTAS ANTERIORES
                                //Y EL CUERPO DEL BOLETIN DE ACUERDO A LAS MATERIAS QUE HAY EN EL GRUPO
                                string eitem = item.id_estudiante.ToString();
                                string aitem2 = item2.id_asignatura.ToString();
                                notas N = bd.notas.Where(t => t.id_grupo == idGrupo && t.id_estudiante == eitem &&
                                                  t.id_periodo == (ano +"-"+"V") && t.id_asignatura == aitem2).FirstOrDefault();
                                if (b == 0)
                                {
                                    Head.estudiante = item.personas1.apellidos.ToString() + " " + item.personas1.nombres.ToString();
                                    Head.ano = item2.grupos.año.ToString();
                                    Head.grado = item2.grupos.grados.nom_grado.ToString();
                                    Head.grupo = item2.id_grupo.ToString();
                                    Head.id = item.id_estudiante.ToString();
                                    Head.periodo = "FINAL";
                                    Head.rango = "RESUMEN FINAL";
                                    b = 1;
                                }

                                if (N != null) // registramos como 0  si no hay nada
                                {
                                    BodyObj.area = item2.asignatura.area.ToString();
                                    BodyObj.asig = item2.asignatura.nombre.ToString();
                                    BodyObj.ih = item2.asignatura.horas.ToString();
                                    BodyObj.logro = N.logros.descripcion.ToString();
                                }
                                else
                                {
                                    BodyObj.area = item2.asignatura.area.ToString();
                                    BodyObj.asig = item2.asignatura.nombre.ToString();
                                    BodyObj.ih = item2.asignatura.horas.ToString();
                                    BodyObj.logro = "Sin asignar.";
                                }

                                notas NI = bd.notas.Where(t => t.id_grupo == idGrupo && t.id_estudiante == eitem &&
                                                          t.id_periodo == (ano +"-"+"I") && t.id_asignatura == aitem2).FirstOrDefault();
                                notas NII = bd.notas.Where(t => t.id_grupo == idGrupo && t.id_estudiante == eitem &&
                                                         t.id_periodo ==  (ano +"-"+"II") && t.id_asignatura == aitem2).FirstOrDefault();
                                notas NIII = bd.notas.Where(t => t.id_grupo == idGrupo && t.id_estudiante == eitem &&
                                                         t.id_periodo ==  (ano +"-"+"III") && t.id_asignatura == aitem2).FirstOrDefault();
                                notas NIV = bd.notas.Where(t => t.id_grupo == idGrupo && t.id_estudiante == eitem &&
                                                         t.id_periodo ==  (ano +"-"+"IV") && t.id_asignatura == aitem2).FirstOrDefault();

                                if (NI == null) // registramos como 0  si no hay nada
                                { BodyObj.I = 0; }
                                else
                                {
                                    BodyObj.I = AjustarNenEnEnteros(NI.nota_s.ToString());
                                    if (BodyObj.I == 0)//Quiere decir que NO hay superacion y configuramos con la nota principal
                                    {
                                        BodyObj.I = AjustarNenEnEnteros(NI.nota.ToString());
                                    }
                                    else //Quiere decir que SI hay superacion y configuramos con la nota superada
                                    {
                                        BodyObj.I = AjustarNenEnEnteros(NI.nota_s.ToString());
                                    }
                                }

                                if (NII == null) // registramos como 0  si no hay nada
                                { BodyObj.II = 0; }
                                else
                                {
                                    BodyObj.II = AjustarNenEnEnteros(NII.nota_s.ToString());
                                    if (BodyObj.II == 0)//Quiere decir que NO hay superacion y configuramos con la nota principal
                                    {
                                        BodyObj.II = AjustarNenEnEnteros(NII.nota.ToString());
                                    }
                                    else //Quiere decir que SI hay superacion y configuramos con la nota superada
                                    {
                                        BodyObj.II = AjustarNenEnEnteros(NII.nota_s.ToString());
                                    }
                                }
                                if (NIII == null) // registramos como 0  si no hay nada
                                { BodyObj.III = 0; }
                                else
                                {
                                    BodyObj.III = AjustarNenEnEnteros(NIII.nota_s.ToString());
                                    if (BodyObj.III == 0)//Quiere decir que NO hay superacion y configuramos con la nota principal
                                    {
                                        BodyObj.III = AjustarNenEnEnteros(NIII.nota.ToString());
                                    }
                                    else //Quiere decir que SI hay superacion y configuramos con la nota superada
                                    {
                                        BodyObj.III = AjustarNenEnEnteros(NIII.nota_s.ToString());
                                    }
                                }

                                if (NIV == null) // registramos como 0  si no hay nada
                                { BodyObj.IV = 0; }
                                else
                                {
                                    BodyObj.IV = AjustarNenEnEnteros(NIV.nota_s.ToString());
                                    if (BodyObj.IV == 0)//Quiere decir que NO hay superacion y configuramos con la nota principal
                                    {
                                        BodyObj.IV = AjustarNenEnEnteros(NIV.nota.ToString());
                                    }
                                    else //Quiere decir que SI hay superacion y configuramos con la nota superada
                                    {
                                        BodyObj.IV = AjustarNenEnEnteros(NIV.nota_s.ToString());
                                    }
                                }

                                int i = BodyObj.I;
                                int ii = BodyObj.II;
                                int iii = BodyObj.III;
                                int iv = BodyObj.IV;

                                float v = (i + ii + iii + iv) / 4; // Esta seria la nota promedio de CADA asignatura en el periodo V
                                decimal vv = Math.Round((decimal)v, 1);
                                BodyObj.notaV = vv;
                                //string i = Convert.();

                                nota_prom = v + nota_prom; // Esta seria la nota final del estudiante para sus asignaturas en todo el periodp V
                                BodyObj.equiv = validarEquivalenciaSimpleEnEnt(Convert.ToString(BodyObj.notaV)); // esta seria la equivalencia para el promedio del V general
                                Body.Add(BodyObj);
                                conta++;
                            }
                            // LUEGO DE CONSULTAR EL CUERPO DEL BOLETIN FINAL, PROCEDEMOS A DEVOLVERLO
                            //-----------Version Para notas en eenteros si deseas estas lineas comentarias las siguientes
                            string h = Convert.ToString(nota_prom / conta);
                            if (h.Length == 2||  h == "100" || h == "0")
                            {
                                Head.notaPromV = Convert.ToString(nota_prom / conta);
                                Head.equiPromV = validarEquivalenciaEnEnt(Convert.ToString(Head.notaPromV));
                            }
                            else
                            {
                                Head.notaPromV = Convert.ToString(nota_prom / conta).Substring(0, 4);
                                Head.equiPromV = validarEquivalenciaEnEnt(Convert.ToString(Head.notaPromV.Substring(0, 2)));
                            }

                            List<puestosDef> O = OrganizarPuestosBoletinFinal(idGrupo);
                            puestosDef P = O.Where(t => t.id_estudiante == idEstudiante).FirstOrDefault();
                            if (P != null)
                            {
                                Head.puesto = P.No;
                            }
                            else
                            {
                                Head.puesto = 0;
                            }
                            //----------------- AHORA SI LLENO EL OBJETO QUE VOY A DEVOLVER --------------
                            foreach (reportesDTO.b_BodyFin item2 in Body)
                            {
                                reportesDTO.reporteDTOFin Bmmk = new reportesDTO.reporteDTOFin();
                                Bmmk.id = Head.id;
                                Bmmk.estudiante = Head.estudiante;
                                Bmmk.ano = Head.ano;
                                Bmmk.grado = Head.grado;
                                Bmmk.periodo = Head.periodo;
                                Bmmk.rango = Head.rango;
                                Bmmk.grupo = Head.grupo;
                                Bmmk.notaPromV = Head.notaPromV;
                                Bmmk.equiPromV = Head.equiPromV;
                                Bmmk.puesto = Head.puesto;
                                //b_head
                                Bmmk.area = item2.area;
                                Bmmk.asig = item2.asig;
                                Bmmk.ih = item2.ih;
                                Bmmk.logro = item2.logro;
                                Bmmk.equiv = item2.equiv;
                                Bmmk.I = item2.I;
                                Bmmk.II = item2.II;
                                Bmmk.III = item2.III;
                                Bmmk.IV = item2.IV;
                                Bmmk.notaV = item2.notaV;
                                Bmmk.resultado = "c_yes";
                                Boletin.Add(Bmmk);
                            }
                        }
                        if (observacion == "SOLICITADO POR ACUDIENTE")
                        {
                            R.notificacion = "VISTA";
                            bd.SaveChanges();
                        }
                        return Boletin;
                    }
                    else
                    {
                        Bmm.resultado = "c_no";
                        Boletin.Add(Bmm);
                        return Boletin;
                    }
                }
                else
                {
                    Bmm.resultado = "El reporte que esta solicitando no esta habilitado por el colegio. Contactese con la administración de la institución.";
                    Boletin.Add(Bmm);
                    return Boletin;
                }

            }
            catch
            { return null; }
        }
        // lo que devuelve esta funcion es lo se manda a llamar  en el dsBoletin
        public List<reportesDTO.reporteDTOPeriodo> c_reporteI(string idEstudiante, string idPeriodo, string idGrupo, string observacion)
        {
            try
            {
                reportesDTO.reporteDTOPeriodo Bmm = new reportesDTO.reporteDTOPeriodo();
                List<reportesDTO.reporteDTOPeriodo> Boletin = new List<reportesDTO.reporteDTOPeriodo>();
                // primero verifacmos que este habilitado el reporte para el estudiante,
                reportes R = bd.reportes.Where(t =>
                t.id_grupo == idGrupo &&
                t.id_estudiante == idEstudiante &&
                t.id_periodo == idPeriodo
                ).FirstOrDefault();
                if (R == null)
                {
                    Bmm.resultado = "Este reporte que solicita no ha sido generado por la administración.";
                    Boletin.Add(Bmm);
                    return Boletin;
                }
                else if (R.acceso.ToString() == "TRUE")
                {
                    List<matricula2> k = bd.matricula2.Where(t =>
                    t.id_grupo == idGrupo && t.id_estudiante == idEstudiante).OrderBy(t => t.id_estudiante).ToList();
                    // OBTENEMOS LAS ASIGNATURAS QUE TIENE ESE GRUPO
                    List<matricula1> kk = bd.matricula1.Where(t => t.id_grupo == idGrupo).ToList();
                    if (k.Count != 0)
                    {
                        foreach (matricula2 item in k) //  CHEQUEO EL ESTUDIANTE PARA ARMAR SU BOLETIN....
                        {
                            List<reportesDTO.b_Body> Body = new List<reportesDTO.b_Body>();
                            reportesDTO.b_Head Head = new reportesDTO.b_Head();
                            int b = 0;
                            float nota_prom = 0;
                            int conta = 1;
                            foreach (matricula1 item2 in kk) // CHEQUEO LAS ASIGNATURAS QUE CONTIENE EL GRUPO
                            {
                                string eitem = item.id_estudiante.ToString();
                                string aitem2 = item2.id_asignatura.ToString();
                                reportesDTO.b_Body BodyObj = new reportesDTO.b_Body();
                                notas N = bd.notas.Where(t => t.id_grupo == idGrupo && t.id_estudiante == eitem &&
                                                        t.id_periodo == idPeriodo && t.id_asignatura == aitem2).FirstOrDefault();
                                if (b == 0)
                                {
                                    Head.estudiante = item.personas1.apellidos.ToString() + " " + item.personas1.nombres.ToString();
                                    Head.ano = item2.grupos.año.ToString();
                                    Head.grado = item2.grupos.grados.nom_grado.ToString();
                                    Head.grupo = item2.id_grupo.ToString();
                                    Head.id = item.id_estudiante.ToString();
                                    Head.periodo = idPeriodo;
                                    Head.rango = N.periodos.rangoI + "-" + N.periodos.rangoF;
                                    b = 1;
                                }
                                if (N != null) // registramos como 0  si no hay nada
                                {
                                    BodyObj.area = item2.asignatura.area.ToString();
                                    BodyObj.asig = item2.asignatura.nombre.ToString();
                                    BodyObj.ih = item2.asignatura.horas.ToString();
                                    BodyObj.logro = N.logros.descripcion.ToString();
                                }
                                else
                                {
                                    BodyObj.area = item2.asignatura.area.ToString();
                                    BodyObj.asig = item2.asignatura.nombre.ToString();
                                    BodyObj.ih = item2.asignatura.horas.ToString();
                                    BodyObj.logro = "Sin asignar.";
                                }
                                if (N == null) // registramos como 0  si no hay nada
                                { BodyObj.nota = 0; }
                                else
                                {
                                  
                                        BodyObj.nota = AjustarNenEnEnteros(N.nota_s.ToString());
                                        if (BodyObj.nota == 0)//Quiere decir que NO hay superacion y configuramos con la nota principal
                                        {
                                            BodyObj.nota = AjustarNenEnEnteros(N.nota.ToString());
                                        }
                                        else //Quiere decir que SI hay superacion y configuramos con la nota superada
                                        {
                                            BodyObj.nota = AjustarNenEnEnteros(N.nota_s.ToString());
                                        }
                                }
                                BodyObj.equival = validarEquivalenciaSimpleEnEnt(Convert.ToString(BodyObj.nota));
                                Body.Add(BodyObj);
                                // PREGUNTO SI YA LLEGO AL LIMETE DE LA CANTIDAD DE ASIGNATURAS EN EL GRUPO
                                if (conta == kk.Count)
                                {
                                    List<puestosDef> O = OrganizarPuestos(idPeriodo, idGrupo);
                                    puestosDef P = O.Where(t => t.id_estudiante == idEstudiante).FirstOrDefault();
                                    if (P != null)
                                    {
                                        nota_prom = P.nota_prom;
                                        Head.puesto = P.No;
                                        if (nota_prom==0 || nota_prom==100 || nota_prom.ToString().Length ==2)
                                        {
                                            Head.nota_prom = Convert.ToString(nota_prom);
                                        }
                                        else
                                        {
                                            Head.nota_prom = Convert.ToString(nota_prom).Substring(0, 4);
                                        }
                                    }
                                    else
                                    {
                                        nota_prom = 0;
                                        Head.nota_prom = Convert.ToString(nota_prom);
                                        Head.puesto = 0;
                                    }



                                    if (nota_prom == 0 || nota_prom == 100 || nota_prom.ToString().Length == 2)
                                    {
                                        Head.equi_prom = validarEquivalenciaSimpleEnEnt(Convert.ToString(nota_prom));
                                    }
                                    else
                                    {
                                        Head.equi_prom = validarEquivalenciaSimpleEnEnt(Convert.ToString(nota_prom).Substring(0, 2));
                                    }
                                    // AHORA COMENZAMOS A LLENAR LA LISTA QUE NECESITAMOS DEVOLVER

                                    foreach (reportesDTO.b_Body item3 in Body)
                                    {
                                        reportesDTO.reporteDTOPeriodo Bmmk = new reportesDTO.reporteDTOPeriodo();
                                        Bmmk.id = Head.id;
                                        Bmmk.estudiante = Head.estudiante;
                                        Bmmk.ano = Head.ano;
                                        Bmmk.grado = Head.grado;
                                        Bmmk.periodo = Head.periodo;
                                        Bmmk.rango = Head.rango;
                                        Bmmk.grupo = Head.grupo;

                                        Bmmk.equi_prom = Head.equi_prom;
                                        Bmmk.nota_prom = Head.nota_prom;
                                        Bmmk.puesto = Head.puesto;

                                        Bmmk.area = item3.area;
                                        Bmmk.asig = item3.asig;

                                        Bmmk.ih = item3.ih;
                                        Bmmk.nota = item3.nota;
                                        Bmmk.equival = item3.equival;
                                        Bmmk.logro = item3.logro;
                                        Bmmk.resultado = "c_yes";
                                        Boletin.Add(Bmmk);
                                    }
                                }
                                conta = conta + 1;
                            }
                        }
                        if (observacion == "SOLICITADO POR ACUDIENTE")
                        {
                            R.notificacion = "VISTA";
                            bd.SaveChanges();
                        }
                        return Boletin;
                    }
                    else
                    {
                        Bmm.resultado = "c_no";
                        Boletin.Add(Bmm);
                        return Boletin;
                    }
                }
                else
                {
                    Bmm.resultado = "El reporte que esta solicitando no esta habilitado por el colegio. Contactese con la administración de la institución.";
                    Boletin.Add(Bmm);
                    return Boletin;
                }
            }
            catch
            {
                return null;
            }
        }

        // lo que devuelve esta funcion es lo se manda a llamar  en el dsObserEst
        public List<observacionesDTO.observatoriosDTOReport> c_observacionesEst(string id, string id_grupo)
        {
            try
            {
                List<observacionesDTO.observatoriosDTOReport> Obser = new List<observacionesDTO.observatoriosDTOReport>();
                List<observatorio> RR = bd.observatorio.Where(t => t.id_estudiante == id && t.id_grupo == id_grupo).OrderBy(t => t.fecha).ToList();
                if (RR.Count != 0)
                {
                    //COMO VA A GENERAR UN PDF, ENTONCES SE ENTIENDE QUE LO HA VISTO TODAS LAS DE ESTE ESTUDIANTE EN ESTE GRUPO, POR TANTO CAMBIO LA NOTIFICACION
                    using (var ctx = new bdsigameEntities())
                    {
                        string sql;
                        sql = "UPDATE `observatorio` SET `notificacion` = 'VISTA' WHERE `observatorio`.`notificacion` = 'PENDIENTE' AND `observatorio`.`id-grupo` = '" + id_grupo + "' AND `observatorio`.`id-estudiante` = '" + id + "'";
                        var m = ctx.Database.ExecuteSqlCommand(sql);
                    }
                    List<observatorio> R = bd.observatorio.Where(t => t.id_estudiante == id && t.id_grupo == id_grupo).OrderBy(t => t.fecha).ToList();
                    foreach (observatorio item in R)
                    {
                        observacionesDTO.observatoriosDTOReport O = new observacionesDTO.observatoriosDTOReport();
                        O.estudiante = item.personas.apellidos.ToString() + " " + item.personas.nombres.ToString();
                        O.ano = item.grupos.año.ToString();
                        O.grado = item.grupos.grados.nom_grado.ToString();
                        O.grupo = item.id_grupo.ToString();
                        O.id = item.id_estudiante.ToString();
                        O.periodo = item.id_periodo.ToString();
                        O.asignatura = item.asignatura.nombre.ToString();
                        O.descripcion = item.observacion.ToString();
                        O.fecha = item.fecha.ToString();
                        O.tipo = item.tipo.ToString();
                        O.notificacion = item.notificacion.ToString();

                        O.resultado = "c_yes";
                        Obser.Add(O);
                    }
                    return Obser;
                }
                else
                {
                    observacionesDTO.observatoriosDTOReport O = new observacionesDTO.observatoriosDTOReport();
                    O.resultado = "c_no";
                    Obser.Add(O);
                    return Obser;
                }
            }
            catch
            {
                return null;
            }
        }
        //========================================================================================================
        //===============================  FIN LOS REPORTES DEL SISTEMA ===========================================
        //========================================================================================================

        string validarEquivalenciaEnDec(string nota)
        {
            nota = nota.Replace(".", ",");
            float n = float.Parse(nota);
            if ((n >= 0) && (n < 6.0))
            {
                return "DESEMPEÑO BAJO";
            }
            if ((n >= 6.0) && (n < 8.0))
            {
                return "DESEMPEÑO BASICO";
            }
            if ((n >= 8.0) && (n < 9.0))
            {
                return "DESEMPEÑO ALTO";
            }
            if ((n >= 9.0) && (n <= 10.0))
            {
                return "DESEMPEÑO SUPERIOR";
            }
            return " ";
        }
        string validarEquivalenciaEnEnt(string nota)
        {
            int n = int.Parse(nota);
            if ((n >= 0) && (n < 60))
            {
                return "DESEMPEÑO BAJO";
            }
            if ((n >= 60) && (n < 80))
            {
                return "DESEMPEÑO BASICO";
            }
            if ((n >= 80) && (n < 90))
            {
                return "DESEMPEÑO ALTO";
            }
            if ((n >= 90) && (n <= 100))
            {
                return "DESEMPEÑO SUPERIOR";
            }
            return " ";
        }
        string validarEquivalenciaSimpleEnDec(string nota)
        {
            nota = nota.Replace(".", ",");
            float n = float.Parse(nota);
            if ((n >= 0) && (n < 6.0))
            {
                return "B";
            }
            if ((n >= 6.0) && (n < 8.0))
            {
                return "DB";
            }
            if ((n >= 8.0) && (n < 9.0))
            {
                return "DA";
            }
            if ((n >= 9.0) && (n <= 10.0))
            {
                return "DS";
            }
            return " ";
        }
        string validarEquivalenciaSimpleEnEnt(string nota)
        {

            //nota = nota.Replace(".", ",");
            int n = int.Parse(nota);
            if ((n >= 0) && (n < 60))
            {
                return "B";
            }
            if ((n >= 60) && (n < 80))
            {
                return "DB";
            }
            if ((n >= 80) && (n < 90))
            {
                return "DA";
            }
            if ((n >= 90) && (n <= 100))
            {
                return "DS";
            }
            return " ";
        }
        public List<puestosDef> OrganizarPuestos(string idPeriodo, string idGrupo)
        {
            bdsigameEntities bd = new bdsigameEntities();
            List<matricula2> k = bd.matricula2.Where(t =>
             t.id_grupo == idGrupo).ToList();

            List<notas> n = bd.notas.Where(t =>
               t.id_grupo == idGrupo &&
               t.id_periodo == idPeriodo
               ).OrderBy(t => t.id_estudiante).ToList();
            if (k.Count != 0)
            {
                List<puestos> PuestoL = new List<puestos>();
                foreach (matricula2 item in k)
                {
                    float nota_prom = 0;
                    int conta = 0;
                    puestos Puesto = new puestos();
                    foreach (notas item2 in n)
                    {

                        if (item.id_estudiante.ToString() == item2.id_estudiante.ToString())
                        {
                            // aca ajustamos la nota al formato de c#, ya que  para manejarlas necesitamo que los valores tengan , y no .
                            
                            string cn = item2.nota_s.ToString();
                            if (cn != "0") //Hubu superacion
                            {
                                item2.nota = item2.nota_s.ToString();
                            }
                            else { item2.nota = item2.nota.ToString(); }
                            
                            Puesto.nota_prom = (Convert.ToSingle(item2.nota.ToString())) + nota_prom;
                            nota_prom = Puesto.nota_prom;
                            Puesto.id_estudiante = item2.id_estudiante.ToString();
                            conta = conta + 1;
                        }
                    }
                    Puesto.nota_prom = Puesto.nota_prom / conta;

                    PuestoL.Add(Puesto);
                }
                PuestoL = PuestoL.OrderByDescending(t => t.nota_prom).ToList();
                int No = 1;
                List<puestosDef> PuestoDef = new List<puestosDef>();
                foreach (puestos item in PuestoL)
                {
                    puestosDef PuestoD = new puestosDef();
                    PuestoD.No = No;
                    PuestoD.nota_prom = item.nota_prom;
                    PuestoD.id_estudiante = item.id_estudiante;
                    PuestoDef.Add(PuestoD);
                    No = No + 1;
                }
                return PuestoDef;

            }
            return null;
        }
        public float AjustarNenEnDecimal(string nota) // Funcion utilizada en la version de 1-10 y aceptando decimales
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
        public int AjustarNenEnEnteros(string nota)
        {
            int p = int.Parse(nota);
            return p;
        }
        public List<puestosDef> OrganizarPuestosBoletinFinal(string idGrupo)
        {
            string[] Ano = idGrupo.Split('-');
            string ano = Ano[0];

            bdsigameEntities bd = new bdsigameEntities();
            List<matricula2> k = bd.matricula2.Where(t =>
            t.id_grupo == idGrupo).OrderBy(t => t.id_estudiante).ToList();

            // OBTENEMOS LAS ASIGNATURAS QUE TIENE ESE GRUPO
            List<matricula1> kk = bd.matricula1.Where(t =>
           t.id_grupo == idGrupo).ToList();

            List<notas> n = bd.notas.Where(t => t.id_grupo == idGrupo
               ).OrderBy(t => t.id_estudiante).ToList();

            if (k.Count != 0)
            {
                List<puestosFin> pl = new List<puestosFin>();
                List<puestos> PuestoL = new List<puestos>();
                int c = 0;
                foreach (matricula2 item in k) // CHEQUEO LOS ESTUDIANTES QUE CONTIENE EL GRUPO
                {
                    int conta = 0;
                    float nota_prom = 0;
                    float nota_promV = 0;

                    foreach (matricula1 item2 in kk) // CHEQUEO LAS ASIGNATURAS QUE CONTIENE EL GRUPO
                    {
                        int I = 0;
                        int II = 0;
                        int III = 0;
                        int IV = 0;
                        string eitem = item.id_estudiante.ToString();
                        string aitem2 = item2.id_asignatura.ToString();
                        notas NI = bd.notas.Where(t => t.id_grupo == idGrupo && t.id_estudiante == eitem &&
                                                  t.id_periodo == (ano+"-"+"I") && t.id_asignatura == aitem2).FirstOrDefault();
                        notas NII = bd.notas.Where(t => t.id_grupo == idGrupo && t.id_estudiante == eitem &&
                                                 t.id_periodo == (ano+"-"+"II") && t.id_asignatura == aitem2).FirstOrDefault();
                        notas NIII = bd.notas.Where(t => t.id_grupo == idGrupo && t.id_estudiante == eitem &&
                                                 t.id_periodo == (ano+"-"+"III") && t.id_asignatura == aitem2).FirstOrDefault();
                        notas NIV = bd.notas.Where(t => t.id_grupo == idGrupo && t.id_estudiante == eitem &&
                                                 t.id_periodo == (ano+"-"+"IV") && t.id_asignatura == aitem2).FirstOrDefault();

                        if (NI == null) // registramos como 0  si no hay nada
                        { I = 0; }
                        else
                        {
                            I = AjustarNenEnEnteros(NI.nota_s.ToString());
                            if (I == 0)//Quiere decir que NO hay superacion y configuramos con la nota principal
                            { I = AjustarNenEnEnteros(NI.nota.ToString()); }
                            else //Quiere decir que SI hay superacion y configuramos con la nota superada
                            { I = AjustarNenEnEnteros(NI.nota_s.ToString()); }
                        }
                        if (NII == null) // registramos como 0  si no hay nada
                        { II = 0; }
                        else
                        {
                            II = AjustarNenEnEnteros(NII.nota_s.ToString());
                            if (II == 0)//Quiere decir que NO hay superacion y configuramos con la nota principal
                            { II = AjustarNenEnEnteros(NII.nota.ToString()); }
                            else //Quiere decir que SI hay superacion y configuramos con la nota superada
                            { II = AjustarNenEnEnteros(NII.nota_s.ToString()); }
                        }

                        if (NIII == null) // registramos como 0  si no hay nada
                        { III = 0; }
                        else
                        {
                            III = AjustarNenEnEnteros(NIII.nota_s.ToString());
                            if (III == 0)//Quiere decir que NO hay superacion y configuramos con la nota principal
                            { III = AjustarNenEnEnteros(NIII.nota.ToString()); }
                            else //Quiere decir que SI hay superacion y configuramos con la nota superada
                            { III = AjustarNenEnEnteros(NIII.nota_s.ToString()); }
                        }

                        if (NIV == null) // registramos como 0  si no hay nada
                        { IV = 0; }
                        else
                        {
                            IV = AjustarNenEnEnteros(NIV.nota_s.ToString());
                            if (IV == 0)//Quiere decir que NO hay superacion y configuramos con la nota principal
                            { IV = AjustarNenEnEnteros(NIV.nota.ToString()); }
                            else //Quiere decir que SI hay superacion y configuramos con la nota superada
                            { IV = AjustarNenEnEnteros(NIV.nota_s.ToString()); }
                        }
                        nota_promV = (I + II + III + IV) / 4; // Esta seria la nota promedio de la asignatura en el periodo V
                        nota_prom = nota_promV + nota_prom; // Esta seria la nota final del estudiante para sus asignaturas
                        conta++;
                    }


                    nota_prom = nota_prom / conta; // Este seria el promedio del estudiante general en el V
                    puestos u = new puestos();
                    u.id_estudiante = item.id_estudiante.ToString();
                    u.nota_prom = nota_prom;
                    PuestoL.Add(u);
                    c = c + 1;
                }

                // AHORA ORGANIZAMOS
                PuestoL = PuestoL.OrderByDescending(t => t.nota_prom).ToList();
                int No = 1;
                List<puestosDef> PuestoDef = new List<puestosDef>();
                foreach (puestos item5 in PuestoL)
                {

                    puestosDef PuestoD = new puestosDef();
                    PuestoD.No = No;
                    PuestoD.nota_prom = item5.nota_prom;
                    PuestoD.id_estudiante = item5.id_estudiante.ToString();
                    PuestoDef.Add(PuestoD);
                    No = No + 1;
                }
                return PuestoDef;
            }
            else { return null; }
        }

        //_--------------------------------------------------------------------
        public string rg_reporteGrupo(List<reportesDTO.reportess> n)
        {
            try
            {
                string m = null;
                foreach (reportesDTO.reportess item in n)
                {
                    m = r_report(item);
                }
                if (m == "¡Se agregó el reporte exitosamente!")
                {
                    return "¡Se modificaron los estados de los reportes de este grupo exitosamente!";
                }
                else if (m == "¡Error de congruencia de datos. Recuerde que usted no puede generar el boletin al mismo estudiante en el mismo periodo y grupo <strong>dos veces</strong>. Revise!")
                {
                    return "Datos enviados, pero al parecer existe en estudiante en este grupo al cual ya se le ha generado el reporte. Para este grupo y periodo.";
                }
                else
                {
                    return "Lo sentimos. Tuvimos problemas para procesar este grupo. Al parecer no envió los datos correctos. Revise y reintente. ";
                }
            }
            catch
            {
                { return null; }
            }
        }
        //_--------------------------------------------------------------------
        public List<reportesDTO.reportesG> verificarGrupo(reportesDTO.reportess m)
        {
            try
            {
                List<reportes> n = bd.reportes.Where(t =>
                 t.id_grupo == m.id_grupo &&
                 t.id_periodo == m.id_periodo
                 ).ToList();
                if (n.Count != 0)
                {

                    // QUIERE DECIR ENTONCES QUE SI HAY REGISTROS EN REPORTES
                    List<reportesDTO.reportesG> y = new List<reportesDTO.reportesG>();
                    foreach (reportes item in n)
                    {
                        reportesDTO.reportesG no = new reportesDTO.reportesG();
                        no.id_estudiante = item.id_estudiante.ToString(); // OJO QUE NO SEA QUE DEVUELVA ES EL PROGESOR
                        no.apellidos = item.personas.apellidos.ToString();
                        no.nombres = item.personas.nombres.ToString();
                        if (item.acceso.ToString() == "TRUE")
                        {
                            no.acceso = true;
                        }
                        else if (item.acceso.ToString() == "FALSE")
                        {
                            no.acceso = false;
                        }
                        no.notificacion = item.notificacion;
                        no.uid = "LISTO_PARA_MODIFICAR";
                        y.Add(no);
                    }
                    y = y.OrderBy(t => t.apellidos).ToList();
                    return y;
                }
                else
                {
                    // SINO ENTONCES, NO HAY REGISTROS
                    return null;
                }
            }
            catch
            {
                { return null; }
            }
        }
        public List<reportesDTO.reportesG> cg_reporteGrupo(reportesDTO.reportess m)
        {
            try
            {
                List<reportesDTO.reportesG> v = new List<reportesDTO.reportesG>();
                // Si retorna DIFERENTE DE NULL quiere decir que si hay para este grupo y periodo 
                //  Por tanto devolvemos uno listo para MODIFICAR o ELIMINAR.
                v = verificarGrupo(m);
                if (v != null)
                {
                    return v;// si retorna quiere decir que ya hay reportes asignados.
                }
                else // Si retorna NULL  quiere decir que no hay para este grupo y periodo 
                //  Por tanto devolvemos uno listo para REGISTRAR.
                {
                    List<matricula2> n = null;
                    n = bd.matricula2.Where(t => t.id_grupo == m.id_grupo).ToList();
                    List<reportesDTO.reportesG> d = new List<reportesDTO.reportesG>();
                    foreach (matricula2 item in n)
                    {
                        reportesDTO.reportesG no = new reportesDTO.reportesG();
                        no.id_estudiante = item.id_estudiante.ToString(); // OJO QUE NO SEA QUE DEVUELVA ES EL PROGESOR
                        no.apellidos = item.personas1.apellidos.ToString();
                        no.nombres = item.personas1.nombres.ToString();
                        no.acceso = false;
                        no.notificacion = "PENDIENTE";
                        no.uid = "NUEVO_REGISTRO";
                        d.Add(no);
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
        //_--------------------------------------------------------------------
        public string mg_reporteGrupo(List<reportesDTO.reportess> n)
        {
            try
            {
                string m = null;
                foreach (reportesDTO.reportess item in n)
                {
                    m = m_report(item);
                }
                if (m == "¡Se modificó el reporte exitosamente!")
                {
                    return "¡Se modificaron los estados de los reportes de este grupo exitosamente!";
                }
                else
                {
                    return "Lo sentimos. Tuvimos procesar este grupo. Al parecer no envió los datos correctos. Revise y reintente. ";
                }
            }
            catch
            {
                { return null; }
            }
        }
        //_--------------------------------------------------------------------
        public string eg_reporteGrupo(List<reportesDTO.reportess> n)
        {
            try
            {
                string m = null;
                foreach (reportesDTO.reportess item in n)
                {
                    m = e_report(item);
                }
                if (m == "¡Eliminación exitosa!")
                {
                    return "¡Eliminación exitosa!";
                }
                else
                {
                    return "Lo sentimos. Tuvimos procesar este grupo. Al parecer no envió los datos correctos. Revise y reintente. ";
                }
            }
            catch
            {
                { return null; }
            }
        }
        public string verificar_registro(string est, string grup, string per)
        {
            try
            {
                reportes n = bd.reportes.Where(
                 t =>
                 t.id_estudiante == est &&
                 t.id_grupo == grup &&
                 t.id_periodo == per
                    ).FirstOrDefault();
                if ((n != null))
                { return "1"; }  // si existe registro 
                else
                { return "0"; } // no existe registro 
            }
            catch { return null; }
        }
        public string v_reporteGrados()
        {
            {
                try
                {
                    using (var ctx = new bdsigameEntities())
                    {
                        string sql;
                        sql = "CREATE OR REPLACE VIEW `v_gradosAll` (`ID`,`NOMBRE`) ";
                        sql += "AS SELECT * FROM  `grados`";
                        var m = ctx.Database.ExecuteSqlCommand(sql);
                        return "S"; // S indica que si lo hizo


                    }
                }
                catch
                {
                    return null;
                }

            }
        }
        //.========================================
        public List<reportesDTO.reporteDTOConsolidado> c_reporteConsolidado(string idGrupo)
        {
            directores_g direT = bd.directores_g.Where(t => t.id_grupo == idGrupo).FirstOrDefault();
            List<reportesDTO.reporteDTOConsolidado> Lista = new List<reportesDTO.reporteDTOConsolidado>();
            List<notas> Notas = bd.notas.Where(t => t.id_grupo == idGrupo).OrderByDescending(t => t.personas.apellidos).ToList();
            foreach (notas item in Notas) //  CHEQUEO LOS ESTUDIANTE PARA ARMAR SU BOLETIN....
            {
                reportesDTO.reporteDTOConsolidado Obj = new reportesDTO.reporteDTOConsolidado();
                if (direT != null)
                {
                    Obj.idProfe = direT.personas.id.ToString();
                    Obj.apellidosProfe = direT.personas.apellidos.ToString();
                    Obj.nombresProfe = direT.personas.nombres.ToString();
                }
                else
                {
                    Obj.idProfe = "";
                    Obj.apellidosProfe = "NO ASIGNADO";
                    Obj.nombresProfe = "";
                }
                // VALIDAMOS LA NOTA PARA CABIARLA AL FORMATO QUE ACEPTA EL INFORME PARA LOS COLORES
                Obj.nota = item.nota.ToString();
                if (Obj.nota == null)
                {
                    Obj.nota = "0";
                }

                else if (Obj.nota == "100")
                {
                    Obj.nota = "100";
                }

                 string superar = item.nota_s.ToString();
                 if (superar == "0")//Quiere decir que NO hay superacion y configuramos con la nota principal
                 {
                     Obj.nota = Obj.nota;
                 }
                 else //Quiere decir que SI hay superacion y configuramos con la nota superada
                 {
                     Obj.nota = superar;
                 }

                Obj.idEst = item.personas.id.ToString();
                Obj.nombresEst = item.personas.nombres.ToString();
                Obj.apellidosEst = item.personas.apellidos.ToString();
                Obj.asignatura = item.asignatura.nombre.ToString();
                Obj.periodo = item.id_periodo.ToString();

                Obj.ano = item.grupos.año.ToString();
                Obj.idGrupo = item.grupos.id_grupo.ToString();
                Obj.idGrado = item.grupos.grados.nom_grado.ToString();

                Lista.Add(Obj);
            }
            return Lista;
        }

        public List<reportesDTO.reporteDTOFin> c_reporteFinalGrupal(string idPeriodo, string idGrupo, string observacion)
        {
            try
            {
                List<reportesDTO.reporteDTOFin> Boletin = new List<reportesDTO.reporteDTOFin>();
                reportesDTO.reporteDTOFin Bmm = new reportesDTO.reporteDTOFin();
                List<matricula2> k = bd.matricula2.Where(t =>
                t.id_grupo == idGrupo).OrderBy(t => t.id_estudiante).ToList();
                // OBTENEMOS LAS ASIGNATURAS QUE TIENE ESE GRUPO
                List<matricula1> kk = bd.matricula1.Where(t => t.id_grupo == idGrupo).ToList();
                
                if (k.Count != 0)
                {
                    int c = 1;
                    foreach (matricula2 item in k) //  CHEQUEO EL ESTUDIANTE PARA ARMAR SU BOLETIN....
                    {
                        int conta = 0;
                        float nota_prom = 0;
                        List<reportesDTO.b_BodyFin> Body = new List<reportesDTO.b_BodyFin>();
                        reportesDTO.b_headFin Head = new reportesDTO.b_headFin();
                        int b = 0;
                        // CONSULTO LAS NOTAS PARA EL PERIOD V , ES DECIR SOLO LOS LOGROS.

                        ///-------------------------------------------------------------------------
                        estructuraBoletinG(idGrupo, kk, item, ref conta, ref nota_prom, Body, Head, ref b);
                        ///--------------------------------------------------------------------------
                        // LUEGO DE CONSULTAR EL CUERPO DEL BOLETIN FINAL, PROCEDEMOS A DEVOLVERLO
                        //------------------------ version en enteros ------ si no lo deseas comentarialo
                        string nPv = Convert.ToString(nota_prom / conta);
                        if (nPv.Length > 2)
                        {
                            Head.notaPromV = nPv.Substring(0, 4);
                        }
                        else if (nPv =="0") { Head.notaPromV = nPv; }
                        else { Head.notaPromV = nPv.Substring(0, 2); }


                        if (Head.notaPromV == "100" || Head.notaPromV == "0")
                        {
                            Head.equiPromV = validarEquivalenciaSimpleEnEnt(Convert.ToString(Head.notaPromV)); // 
                        }
                        else { Head.equiPromV = validarEquivalenciaSimpleEnEnt(Convert.ToString(Head.notaPromV.Substring(0, 2))); }
                       
                       
                        List<puestosDef> O = OrganizarPuestosBoletinFinal(idGrupo);
                        puestosDef P = O.Where(t => t.id_estudiante == item.id_estudiante.ToString()).FirstOrDefault();
                        if (P != null)
                        {
                            Head.puesto = P.No;
                        }
                        else
                        {
                            Head.puesto = 0;
                        }
                        //----------------- AHORA SI LLENO EL OBJETO QUE VOY A DEVOLVER --------------
                        llenarObjetoG(Boletin, Body, Head);
                        c++;

                    }
                    Boletin = Boletin.OrderBy(t => t.puesto).ToList();
                    return Boletin;
                }
                else
                {
                    Bmm.resultado = "c_no";
                    Boletin.Add(Bmm);
                    return Boletin;
                }
            }
            catch
            { return null; }
        }

        public List<reportesDTO.reporteDTOPeriodo> c_reporteGrupo(string idPeriodo, string idGrupo, string observacion)
        {
            try
            {
                reportesDTO.reporteDTOPeriodo Bmm = new reportesDTO.reporteDTOPeriodo();
                List<reportesDTO.reporteDTOPeriodo> Boletin = new List<reportesDTO.reporteDTOPeriodo>();
                List<matricula2> k = bd.matricula2.Where(t =>
                t.id_grupo == idGrupo).OrderBy(t => t.id_estudiante).ToList();
                List<matricula1> kk = bd.matricula1.Where(t => t.id_grupo == idGrupo).ToList();
                if (k.Count != 0)
                {
                    int j = 1;
                    foreach (matricula2 item in k) //  CHEQUEO EL ESTUDIANTE PARA ARMAR SU BOLETIN....
                    {
                        List<reportesDTO.b_Body> Body = new List<reportesDTO.b_Body>();
                        reportesDTO.b_Head Head = new reportesDTO.b_Head();
                        int b = 0;
                        float nota_prom = 0;
                        int conta = 1;
                        foreach (matricula1 item2 in kk) // CHEQUEO LAS ASIGNATURAS QUE CONTIENE EL GRUPO
                        {
                            string eitem = item.id_estudiante.ToString();
                            string aitem2 = item2.id_asignatura.ToString();
                            b = estruturaBoletinI(idPeriodo, idGrupo, item, Body, Head, b, item2, eitem, aitem2);
                            if (conta == kk.Count)  // PREGUNTO SI YA LLEGO AL LIMETE DE LA CANTIDAD DE ASIGNATURAS EN EL GRUPO
                            {
                                List<puestosDef> O = OrganizarPuestos(idPeriodo, idGrupo);
                                puestosDef P = O.Where(t => t.id_estudiante == eitem).FirstOrDefault();
                                if (P != null)
                                {
                                    nota_prom = P.nota_prom;
                                    Head.puesto = P.No;
                                    string h = Convert.ToString(nota_prom);
                                    if (h=="0" || h=="100" || h.Length==2)
                                    {
                                         Head.nota_prom = h;
                                    }
                                    else
                                    {
                                        Head.nota_prom = h.Substring(0,4);
                                    }
                                }
                                else
                                {
                                    nota_prom = 0;
                                    Head.nota_prom = Convert.ToString(nota_prom);
                                    Head.puesto = 0;
                                }
                                if (nota_prom == 100 || nota_prom == 0) //quiere decir que sacó 100 en todo
                                {
                                    Head.equi_prom = validarEquivalenciaSimpleEnEnt(Convert.ToString(nota_prom));
                                }
                                else { Head.equi_prom = validarEquivalenciaSimpleEnEnt(Convert.ToString(nota_prom).Substring(0, 2)); }
                                // AHORA COMENZAMOS A LLENAR LA LISTA QUE NECESITAMOS DEVOLVER
                                llenarObjetoI(Boletin, Body, Head);
                            }
                            conta = conta + 1;
                        }

                        j++;
                    }
                    // ORGANIZAMOS POR PUESTO.
                    Boletin = Boletin.OrderBy(t => t.puesto).ToList();
                    return Boletin;
                }
                else
                {
                    Bmm.resultado = "c_no";
                    Boletin.Add(Bmm);
                    return Boletin;
                }
            }
            catch (Exception Ex)
            {

                string g = Ex.Message.ToString();
                return null;
            }
        }

        //-----------------------------------------------------------------------------------------------------------------
        private int estruturaBoletinI(string idPeriodo, string idGrupo, matricula2 item, List<reportesDTO.b_Body> Body, reportesDTO.b_Head Head, int b, matricula1 item2, string eitem, string aitem2)
        {
            reportesDTO.b_Body BodyObj = new reportesDTO.b_Body();
            notas N = bd.notas.Where(t => t.id_grupo == idGrupo && t.id_estudiante == eitem &&
                                    t.id_periodo == idPeriodo && t.id_asignatura == aitem2).FirstOrDefault();
            if (b == 0)
            {
                Head.estudiante = item.personas1.apellidos.ToString() + " " + item.personas1.nombres.ToString();
                Head.ano = item2.grupos.año.ToString();
                Head.grado = item2.grupos.grados.nom_grado.ToString();
                Head.grupo = item2.id_grupo.ToString();
                Head.id = item.id_estudiante.ToString();
                Head.periodo = idPeriodo;
                periodos P = bd.periodos.Where(t => t.id == idPeriodo).FirstOrDefault();
                Head.rango = P.rangoI + "-" + P.rangoF;
                b = 1;
            }
            if (N != null) // registramos como 0  si no hay nada
            {
                BodyObj.area = item2.asignatura.area.ToString();
                BodyObj.asig = item2.asignatura.nombre.ToString();
                BodyObj.ih = item2.asignatura.horas.ToString();
                BodyObj.logro = N.logros.descripcion.ToString();
            }
            else
            {
                BodyObj.area = item2.asignatura.area.ToString();
                BodyObj.asig = item2.asignatura.nombre.ToString();
                BodyObj.ih = item2.asignatura.horas.ToString();
                BodyObj.logro = "Sin asignar.";
            }
            if (N == null) // registramos como 0  si no hay nada
            { BodyObj.nota = 0; }
            else
            {
                BodyObj.nota = AjustarNenEnEnteros(N.nota_s.ToString());
                if (BodyObj.nota == 0)//Quiere decir que NO hay superacion y configuramos con la nota principal
                {
                    BodyObj.nota = AjustarNenEnEnteros(N.nota.ToString());
                }
                else //Quiere decir que SI hay superacion y configuramos con la nota superada
                {
                    BodyObj.nota = AjustarNenEnEnteros(N.nota_s.ToString());
                }
            }

            BodyObj.equival = validarEquivalenciaSimpleEnEnt(Convert.ToString(BodyObj.nota));
            Body.Add(BodyObj);
            return b;
        }

        private static void llenarObjetoI(List<reportesDTO.reporteDTOPeriodo> Boletin, List<reportesDTO.b_Body> Body, reportesDTO.b_Head Head)
        {

            foreach (reportesDTO.b_Body item3 in Body)
            {
                reportesDTO.reporteDTOPeriodo Bmmk = new reportesDTO.reporteDTOPeriodo();
                Bmmk.id = Head.id;
                Bmmk.estudiante = Head.estudiante;
                Bmmk.ano = Head.ano;
                Bmmk.grado = Head.grado;
                Bmmk.periodo = Head.periodo;
                Bmmk.rango = Head.rango;
                Bmmk.grupo = Head.grupo;

                Bmmk.equi_prom = Head.equi_prom;
                Bmmk.nota_prom = Head.nota_prom;
                Bmmk.puesto = Head.puesto;

                Bmmk.area = item3.area;
                Bmmk.asig = item3.asig;

                Bmmk.ih = item3.ih;
                Bmmk.nota = item3.nota;
                Bmmk.equival = item3.equival;
                Bmmk.logro = item3.logro;
                Bmmk.resultado = "c_yes";
                Boletin.Add(Bmmk);
            }
        }

        private static void llenarObjetoG(List<reportesDTO.reporteDTOFin> Boletin, List<reportesDTO.b_BodyFin> Body, reportesDTO.b_headFin Head)
        {
            foreach (reportesDTO.b_BodyFin item2 in Body)
            {
                reportesDTO.reporteDTOFin Bmmk = new reportesDTO.reporteDTOFin();
                Bmmk.id = Head.id;
                Bmmk.estudiante = Head.estudiante;
                Bmmk.ano = Head.ano;
                Bmmk.grado = Head.grado;
                Bmmk.periodo = Head.periodo;
                Bmmk.rango = Head.rango;
                Bmmk.grupo = Head.grupo;
                Bmmk.notaPromV = Head.notaPromV;
                Bmmk.equiPromV = Head.equiPromV;
                Bmmk.puesto = Head.puesto;
                //b_head
                Bmmk.area = item2.area;
                Bmmk.asig = item2.asig;
                Bmmk.ih = item2.ih;
                Bmmk.logro = item2.logro;
                Bmmk.equiv = item2.equiv;
                Bmmk.I = item2.I;
                Bmmk.II = item2.II;
                Bmmk.III = item2.III;
                Bmmk.IV = item2.IV;
                Bmmk.notaV = item2.notaV;
                Bmmk.resultado = "c_yes";
                Boletin.Add(Bmmk);
            }
        }

        private void estructuraBoletinG(string idGrupo, List<matricula1> kk, matricula2 item, ref int conta, ref float nota_prom, List<reportesDTO.b_BodyFin> Body, reportesDTO.b_headFin Head, ref int b)
        {
            string[] Ano = idGrupo.Split('-');
            string ano = Ano[0];
            foreach (matricula1 item2 in kk) // CHEQUEO LAS ASIGNATURAS QUE CONTIENE EL GRUPO
            {
                reportesDTO.b_BodyFin BodyObj = new reportesDTO.b_BodyFin();
                // AHOR PROCESAMOS LOS ACOMULADOS DE ACURDO A LAS NOTAS ANTERIORES
                //Y EL CUERPO DEL BOLETIN DE ACUERDO A LAS MATERIAS QUE HAY EN EL GRUPO
                string eitem = item.id_estudiante.ToString();
                string aitem2 = item2.id_asignatura.ToString();
                notas N = bd.notas.Where(t => t.id_grupo == idGrupo && t.id_estudiante == eitem &&
                                  t.id_periodo == (ano +"-"+"V") && t.id_asignatura == aitem2).FirstOrDefault();
                if (b == 0)
                {
                    Head.estudiante = item.personas1.apellidos.ToString() + " " + item.personas1.nombres.ToString();
                    Head.ano = item2.grupos.año.ToString();
                    Head.grado = item2.grupos.grados.nom_grado.ToString();
                    Head.grupo = item2.id_grupo.ToString();
                    Head.id = item.id_estudiante.ToString();
                    Head.periodo = "FINAL";
                    //periodos P = bd.periodos.Where(t => t.id == idPeriodo).FirstOrDefault();
                    //Head.rango = P.rangoI + "-" + P.rangoF;
                    Head.rango = "RESUMEN FINAL";
                    b = 1;
                }

                if (N != null) // registramos como 0  si no hay nada
                {
                    BodyObj.area = item2.asignatura.area.ToString();
                    BodyObj.asig = item2.asignatura.nombre.ToString();
                    BodyObj.ih = item2.asignatura.horas.ToString();
                    BodyObj.logro = N.logros.descripcion.ToString();
                }
                else
                {
                    BodyObj.area = item2.asignatura.area.ToString();
                    BodyObj.asig = item2.asignatura.nombre.ToString();
                    BodyObj.ih = item2.asignatura.horas.ToString();
                    BodyObj.logro = "Sin asignar.";
                }

                notas NI = bd.notas.Where(t => t.id_grupo == idGrupo && t.id_estudiante == eitem &&
                                          t.id_periodo == (ano +"-"+"I") && t.id_asignatura == aitem2).FirstOrDefault();
                notas NII = bd.notas.Where(t => t.id_grupo == idGrupo && t.id_estudiante == eitem &&
                                         t.id_periodo ==  (ano +"-"+"II") && t.id_asignatura == aitem2).FirstOrDefault();
                notas NIII = bd.notas.Where(t => t.id_grupo == idGrupo && t.id_estudiante == eitem &&
                                         t.id_periodo ==  (ano +"-"+"III") && t.id_asignatura == aitem2).FirstOrDefault();
                notas NIV = bd.notas.Where(t => t.id_grupo == idGrupo && t.id_estudiante == eitem &&
                                         t.id_periodo ==  (ano +"-"+"IV") && t.id_asignatura == aitem2).FirstOrDefault();

                if (NI == null) // registramos como 0  si no hay nada
                { BodyObj.I = 0; }
                else
                {
                    BodyObj.I = AjustarNenEnEnteros(NI.nota_s.ToString());
                    if (BodyObj.I == 0)//Quiere decir que NO hay superacion y configuramos con la nota principal
                    {
                        BodyObj.I = AjustarNenEnEnteros(NI.nota.ToString());
                    }
                    else //Quiere decir que SI hay superacion y configuramos con la nota superada
                    {
                        BodyObj.I = AjustarNenEnEnteros(NI.nota_s.ToString());
                    }
                }

                if (NII == null) // registramos como 0  si no hay nada
                { BodyObj.II = 0; }
                else
                {
                    BodyObj.II = AjustarNenEnEnteros(NII.nota_s.ToString());
                    if (BodyObj.II == 0)//Quiere decir que NO hay superacion y configuramos con la nota principal
                    {
                        BodyObj.II = AjustarNenEnEnteros(NII.nota.ToString());
                    }
                    else //Quiere decir que SI hay superacion y configuramos con la nota superada
                    {
                        BodyObj.II = AjustarNenEnEnteros(NII.nota_s.ToString());
                    }
                }


                if (NIII == null) // registramos como 0  si no hay nada
                { BodyObj.III = 0; }
                else
                {
                    BodyObj.III = AjustarNenEnEnteros(NIII.nota_s.ToString());
                    if (BodyObj.III == 0)//Quiere decir que NO hay superacion y configuramos con la nota principal
                    {
                        BodyObj.III = AjustarNenEnEnteros(NIII.nota.ToString());
                    }
                    else //Quiere decir que SI hay superacion y configuramos con la nota superada
                    {
                        BodyObj.III = AjustarNenEnEnteros(NIII.nota_s.ToString());
                    }
                }

                if (NIV == null) // registramos como 0  si no hay nada
                { BodyObj.IV = 0; }
               else
                {
                    BodyObj.IV = AjustarNenEnEnteros(NIV.nota_s.ToString());
                    if (BodyObj.IV == 0)//Quiere decir que NO hay superacion y configuramos con la nota principal
                    {
                        BodyObj.IV = AjustarNenEnEnteros(NIV.nota.ToString());
                    }
                    else //Quiere decir que SI hay superacion y configuramos con la nota superada
                    {
                        BodyObj.IV = AjustarNenEnEnteros(NIV.nota_s.ToString());
                    }
                }

                int i = BodyObj.I;
                int ii = BodyObj.II;
                int iii = BodyObj.III;
                int iv = BodyObj.IV;

                float v = (i + ii + iii + iv) / 4; // Esta seria la nota promedio de CADA asignatura en el periodo V
                decimal vv = Math.Round((decimal)v, 1);
                BodyObj.notaV = vv;
                //string i = Convert.();

                nota_prom = v + nota_prom; // Esta seria la nota final del estudiante para sus asignaturas en todo el periodp V
                BodyObj.equiv = validarEquivalenciaSimpleEnEnt(Convert.ToString(BodyObj.notaV)); // esta seria la equivalencia para el promedio del V general
                Body.Add(BodyObj);
                conta++;
            }
        }
        // lo que devuelve esta funcion es lo se manda a llamar  en el dsBoletin


        //----------------------------------------------------- hojas de vidas ------------------------------------------------
        public hvidaprofe c_hvidaprofe(string id, string rol)
        {
            try
            {
                hvidaprofe hoja = new hvidaprofe();
                personas p = bd.personas.Where(t =>
                t.id == id).FirstOrDefault();
                if (p!= null)
                {
                    hoja.foto = "SIN FOTO";
                    hoja.apellidos = p.apellidos.ToString();
                    hoja.nombres = p.nombres.ToString();
                    hoja.id = p.id.ToString();
                    hoja.tipo = p.id_tipo.ToString();
                    hoja.jornadal = p.jornada.ToString();

                    hoja.dir1 = p.direccion.ToString();
                    hoja.dirAux = p.direccion2.ToString();
                    hoja.genero = p.sexo.ToString();
                    hoja.estadoS = p.estado.ToString();
                    hoja.f_naci = p.f_naci.ToString();
                    hoja.email = p.email.ToString();
                    hoja.celular = p.cel.ToString();
                    hoja.telefono = p.telefono.ToString();
                    hoja.telefono2 = p.telefono2.ToString();
                    hoja.observaciones = p.observacion.ToString();
                    // lo buscamos a ver si esta en d_grupo
                    directores_g d = bd.directores_g.Where(t =>
                    t.id_profesor == id).FirstOrDefault();
                    if (d != null)
                    {
                        hoja.dirG = "SI";
                        hoja.dirGrupo = d.id_grupo.ToString();
                    }
                    else
                    {
                        hoja.dirG = "NO";
                        hoja.dirGrupo = "NINGUNO";
                    }
                    return hoja;
                }
                else
                {
                    return null;
                }
               
            }
            catch (Exception Ex)
            {
                string g = Ex.Message.ToString();
                return null;
            }
        }
        public List<hmatricula> c_hmatriculas(string id, string rol)
        {
            try
            {
                List<hmatricula> lhoja = new List<hmatricula>();
                List<matricula1> p = bd.matricula1.Where(t =>
                t.id_profesor == id).ToList();
                if (p.Count != 0)
                {
                    foreach (matricula1 item in p)
                    {
                        hmatricula hoja = new hmatricula();

                        hoja.idAsig = item.id_asignatura;
                        hoja.nAsig = item.asignatura.nombre;
                        hoja.grupo = item.id_grupo.ToString();
                        hoja.grado = item.grupos.grados.nom_grado.ToString();
                        hoja.horas = item.asignatura.horas.ToString();
                        hoja.año = item.grupos.año.ToString();
                        lhoja.Add(hoja);
                    }

                    return lhoja;
                }
                else
                {
                    hmatricula hoja = new hmatricula();

                    hoja.idAsig = "SIN ASIGNAR";
                    hoja.nAsig = "SIN ASIGNAR";
                    hoja.grupo = "SIN ASIGNAR";
                    hoja.grado = "SIN ASIGNAR";
                    hoja.horas = "SIN ASIGNAR";
                    hoja.año = "";
                    lhoja.Add(hoja);
                    return lhoja;
                }
                
            }
            catch (Exception Ex)
            {
                string g = Ex.Message.ToString();
                return null;
            }
        }
        public List<hacudido> c_hacudidos(string id, string rol){
         try
            {
                List<hacudido> lhoja = new List<hacudido>();
                List<matricula2> p = bd.matricula2.Where(t =>
                t.id_acudiente == id).ToList();
                if (p.Count != 0)
                {
                    foreach (matricula2 item in p)
                    {
                        hacudido hoja = new hacudido();
                        hoja.bandera ="SI";
                        hoja.id = item.id_estudiante;
                        hoja.nombres = item.personas.nombres.ToString(); 
                        hoja.apellidos = item.personas.apellidos.ToString();
                        hoja.grupo = item.id_grupo.ToString();
                        lhoja.Add(hoja);
                    }
                    return lhoja;
                }
                else
                {
                    hacudido hoja = new hacudido();
                    hoja.bandera = "NO";
                    hoja.id = "NA";
                    hoja.nombres ="NA";
                    hoja.apellidos = "NA";
                    hoja.grupo = "NA";
                    lhoja.Add(hoja);
                    return lhoja;
                }
            }
            catch (Exception Ex)
            {
                string g = Ex.Message.ToString();
                return null;
            }
        }

        public hvidaest c_hvidaEst(string id, string rol)
        {
            try
            {
                hvidaest hoja = new hvidaest();
                personas p = bd.personas.Where(t =>
                t.id == id).FirstOrDefault();
                if (p!= null)
                {
                    hoja.foto = "SIN FOTO";
                    hoja.apellidos = p.apellidos.ToString();
                    hoja.nombres = p.nombres.ToString();
                    hoja.id = p.id.ToString();
                    hoja.tipo = p.id_tipo.ToString();
                    hoja.dir1 = p.direccion.ToString();
                    hoja.dirAux = p.direccion2.ToString();
                    hoja.genero = p.sexo.ToString();
                    hoja.estadoS = p.estado.ToString();
                    hoja.f_naci = p.f_naci.ToString();
                    hoja.celular = p.cel.ToString();
                    hoja.telefono = p.telefono.ToString();
                    hoja.telefono2 = p.telefono2.ToString();
                    hoja.observaciones = p.observacion.ToString();
                    return hoja;
                }
                else
                {
                    return null;
                }
               
            }
            catch (Exception Ex)
            {
                string g = Ex.Message.ToString();
                return null;
            }
        }
        public List<hmatriculaest> c_hmatriculasEst(string id, string rol)
        {
            try
            {
                List<hmatriculaest> lhoja = new List<hmatriculaest>();
                List<matricula2> p = bd.matricula2.Where(t =>
                t.id_estudiante == id).ToList();
                if (p.Count != 0)
                {
                    foreach (matricula2 item in p)
                    {
                        hmatriculaest hoja = new hmatriculaest();

                        hoja.grupo = item.id_grupo.ToString();
                        hoja.grado = item.grupos.grados.nom_grado.ToString();
                        hoja.año = item.grupos.año.ToString();
                        lhoja.Add(hoja);
                    }

                    return lhoja;
                }
                else
                {
                    hmatriculaest hoja = new hmatriculaest();

                    hoja.grupo = "SIN ASIGNAR";
                    hoja.grado = "SIN ASIGNAR";
                    hoja.año = "";
                    lhoja.Add(hoja);

                    return lhoja;

                }
                
            }
            catch (Exception Ex)
            {
                string g = Ex.Message.ToString();
                return null;
            }
        }
        public List<hacudidoest> c_hacudidosEst(string id, string rol)
        {
            try
            {
                List<hacudidoest> lhoja = new List<hacudidoest>();
                List<matricula2> p = bd.matricula2.Where(t =>
                t.id_estudiante == id).ToList();
                if (p.Count != 0)
                {
                    foreach (matricula2 item in p)
                    {
                        hacudidoest hoja = new hacudidoest();
                        hoja.id = item.id_acudiente;
                        hoja.nombres = item.personas.nombres.ToString(); 
                        hoja.apellidos = item.personas.apellidos.ToString();
                        hoja.grupo = item.id_grupo.ToString();
                        lhoja.Add(hoja);
                    }
                    return lhoja;
                }


                else
                {
                    hacudidoest hoja = new hacudidoest();
                    hoja.id = "NA";
                    hoja.nombres = "NA";
                    hoja.apellidos = "NA";
                    hoja.grupo = "NA";
                    lhoja.Add(hoja);

                    return lhoja;
                }
            }
            catch (Exception Ex)
            {
                string g = Ex.Message.ToString();
                return null;
            }
        }

    }



}