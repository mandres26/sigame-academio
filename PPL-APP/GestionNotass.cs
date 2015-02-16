using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ENTIDADES;

namespace PPL_APP
{   public  class GestionNotass
    {
        private RepoNotas r = new RepoNotas();
        private RepoLogros rl = new RepoLogros();
        private RepoPeriodo rp = new RepoPeriodo();
        //-----------------------------------------------------------------------------------
        public string r_nota(notasDTO.notass n)
        {
            return r.r_nota(n);
        }
        public string m_nota(notasDTO.notass n)
        {
            return r.m_nota(n);
        }
        public string e_nota(notasDTO.notass ob)
        {
            return r.e_nota(ob);
        }
        public notasDTO.notass c_nota(notasDTO.notass ob)
        {
            return r.c_nota(ob);
        }
        //-----------------------------------------------------------------------------------
        //public List<notasDTO.notass> c_notasXgrupoXperiodo(notasDTO.notass m)
        //{
        //    return r.c_notasXgrupoXperiodo(m);
        //}
        //-----------------------------------------------------------------------------------
        string validarEquivalenciaEnDecimales(string nota)
        {
            if (nota.Length == 1)
            {
                string a = ".0";
                nota = nota + a;
            }

            float n = Convert.ToSingle(nota);
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
        string validarEquivalenciaEnEnteros(string nota)
        {
            int n = Convert.ToInt16(nota);
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
        public string r_notasGrupo(notasDTO.notasXCursoDTO c)
        {
            string var = null;
            List<notasDTO.notaDTO> NRows = c.rows;
            List<notasDTO.notass> lst = new List<notasDTO.notass>();
            foreach (notasDTO.notaDTO item in NRows)
            {
                notasDTO.notass ds = new notasDTO.notass();
                //ds.referencia = item.referencia.
                string[] logro = item.logro.ToString().Split('/');
                ds.id_estudiante = item.id.ToString();
                ds.id_logro = logro[0];
                ds.nota = item.nota.ToString();
                ds.equivalencia = validarEquivalenciaEnEnteros(item.nota.ToString());  // Validadmos la nomenclatura de la nota

                ds.nota_s = item.nota_s.ToString();
                ds.equivalencia_s = validarEquivalenciaEnEnteros(item.nota_s.ToString());  // Validadmos la nomenclatura de la nota_s

                ds.id_periodo = c.periodo;
                ds.id_profesor = c.codprofe;
                ds.id_asignatura = c.codasig;
                ds.id_grupo = c.codgrupo;
                lst.Add(ds);
            }
            var = r.r_notasGrupo(lst);
            if (var != null)
            {
                return var;
            }
            else { return "Problemas al registar este grupo en el Servidor: Contactese con el Administrador"; }
        }
        public string m_notasGrupo(notasDTO.notasXCursoDTO c)
        {
            string var = null;
            List<notasDTO.notaDTO> NRows = c.rows;
            List<notasDTO.notass> lst = new List<notasDTO.notass>();
            foreach (notasDTO.notaDTO item in NRows)
            {
                notasDTO.notass ds = new notasDTO.notass();
                //ds.referencia = item.referencia.
                string[] logro = item.logro.ToString().Split('/');
                ds.id_estudiante = item.id.ToString();
                ds.id_logro = logro[0];
                ds.nota = item.nota.ToString();
                ds.equivalencia = validarEquivalenciaEnEnteros(item.nota.ToString());  // Validadmos la nomenclatura de la nota

                ds.nota_s = item.nota_s.ToString();
                ds.equivalencia_s = validarEquivalenciaEnEnteros(item.nota_s.ToString());  // Validadmos la nomenclatura de la nota_s

                ds.id_periodo = c.periodo;
                ds.id_profesor = c.codprofe;
                ds.id_asignatura = c.codasig;
                ds.id_grupo = c.codgrupo;
                lst.Add(ds);
            }
            var = r.m_notasGrupo(lst);
            if (var != null)
            {
                return var;
            }
            else { return "Problemas al registar este grupo en el Servidor: Contactese con el Administrador"; }
        }
        public string e_notasGrupo(notasDTO.notasXCursoDTO c)
        {
            string var = null;
            List<notasDTO.notaDTO> NRows = c.rows;
            List<notasDTO.notass> lst = new List<notasDTO.notass>();
            foreach (notasDTO.notaDTO item in NRows)
            {
                notasDTO.notass ds = new notasDTO.notass();
                //ds.referencia = item.referencia.
                string[] logro = item.logro.ToString().Split('/');
                ds.id_estudiante = item.id.ToString();
                ds.id_logro = logro[0];
                ds.nota = item.nota.ToString();
                ds.equivalencia = validarEquivalenciaEnEnteros(item.nota.ToString());  // Validadmos la nomenclatura de la nota

                ds.nota_s = item.nota_s.ToString();
                ds.equivalencia_s = validarEquivalenciaEnEnteros(item.nota_s.ToString());  // Validadmos la nomenclatura de la nota_s

                ds.id_periodo = c.periodo;
                ds.id_profesor = c.codprofe;
                ds.id_asignatura = c.codasig;
                ds.id_grupo = c.codgrupo;
                lst.Add(ds);
            }
            var = r.e_notasGrupo(lst);
            if (var != null)
            {
                return var;
            }
            else { return "Problemas al registar este grupo en el Servidor: Contactese con el Administrador"; }
        }
       //-----------------------------------------------------------------------------------
        public List<dtoGNotaGD> c_notasXGrupoXIdPXAsigXEqui(string IdGrupo, string IdPeriodo, string IdAsig, string Equi)
        {
            return r.c_notasXGrupoXIdPXAsigXEqui(IdGrupo, IdPeriodo, IdAsig, Equi); 
        }
        public List<dtoGNotaGD> c_notasXGrupoXIdPXAsig(string IdGrupo, string IdPeriodo, string IdAsig)
        {
            return r.c_notasXGrupoXIdPXAsig(IdGrupo,IdPeriodo,IdAsig); 
        }
        public List<dtoGNotaGD> c_notasXGrupoXIdP(string IdGrupo, string IdPeriodo)
        {
            return r.c_notasXGrupoXIdP(IdGrupo, IdPeriodo);
        }

      
        public List<dtoGNotaGDALL> c_notass()
        {
            return r.c_notass();
        }

        public List<dtoGNotaID> c_notasXGrupoXIdPXIdEst(string IdGrupo, string IdPeriodo, string IdEst)
        {
            return r.c_notasXGrupoXIdPXIdEst(IdGrupo, IdPeriodo, IdEst);
        }
        public List<dtoGNotaID> c_notasXGrupoXIdAsigXIdEst(string IdGrupo, string IdAsig, string IdEst)
        {
            return r.c_notasXGrupoXIdAsigXIdEst(IdGrupo, IdAsig, IdEst);
        }

}

}