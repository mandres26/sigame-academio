using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
using DAL;

namespace BLL
{
    public class GestionReportes
    {
        private RepoReport r = new RepoReport();
        //----------------------------------------------------------------------
        public List<reportesDTO.reporteDTOPeriodo> cg_boletinXestudiante(string idEstudiante, string idPeriodo, string idGrupo, string observacion)
        {
            return r.c_reporteI(idEstudiante, idPeriodo, idGrupo, observacion);
        }
        //----------------------------------------------------------------------
        public List<reportesDTO.reporteDTOFin> cg_boletinXestudianteFinal(string idEstudiante, string idPeriodo, string idGrupo, string observacion)
        {
            return r.c_reporteFinal(idEstudiante, idGrupo, observacion);
        }
        public List<observacionesDTO.observatoriosDTOReport> c_observacionesEst(dtoGEst dto)
        {
            return r.c_observacionesEst(dto.id , dto.id_grupo);
        }

        ////----------------------------------------------------------------------
        //public List<reportesDTO.reporteDTOFin> c_reporteFinalGrupo(string idGrupo)
        //{
        //    return r.c_reporteFinalGrupo(idGrupo);
        //}

        ////----------------------------------------------------------------------
        //public List<reportesDTO.reporteDTOFin> c_reporteConsolidado(string idGrupo)
        //{
        //    return r.c_reporteConsolidado(idGrupo);
        //}


        


        //----------------------------------------------------------------------
        //public List<reportesDTO.reporteDTOPeriodo> cg_boletinXestudianteAcu(string idEstudiante, string idPeriodo, string idGrupo)
        //{
        //    return r.cg_boletinXestudianteAcu(idEstudiante, idPeriodo, idGrupo);
        //}
        //----------------------------------------------------------------------
        public reportesDTO.reporteDTOConsta cg_constanciaXestud(string idEstudiante, string idGrupo)
        {
            return r.cg_constanciaXestud(idEstudiante, idGrupo);
        }
        //----------------------------------------------------------------------
        public reportesDTO.reporteDTOConstaF cg_constanciaXfamily(string idEstudiante, string idGrupo, string mes1, string mes2)
        {
            return r.cg_constanciaXfamily(idEstudiante, idGrupo, mes1, mes2);
        }
        //----------------------------------------------------------------------
        public List<reportesDTO.reporteDTOListado> cg_listadoXGrupo(string idGrupo, string periodo)
        {
            return r.cg_listadoXGrupo(idGrupo, periodo);
        }
        //----------------------------------------------------------------------
      
        public string rg_reporteGrupo(reportesDTO.reportesDTOG dto)
        {
            string var = null;
            List<reportesDTO.reportesG>  NRows = dto.rows;
            List<reportesDTO.reportess> lst = new List<reportesDTO.reportess>();
           
            foreach (reportesDTO.reportesG item in dto.rows)
            {
                    reportesDTO.reportess ds = new reportesDTO.reportess();
                    ds.id_estudiante = item.id_estudiante.ToString();
                    ds.id_grupo = dto.id_grupo.ToString();
                    ds.id_periodo = dto.id_periodo.ToString();
                    ds.observacion = "";
                    ds.fecha = "";
                    ds.acceso = item.acceso;
                    ds.notificacion = "";
                    lst.Add(ds);
            }
            var = r.rg_reporteGrupo(lst);
            if (var != null)
            {
                return var;
            }
            else { return "Problemas al registar este grupo en el Servidor: Contactese con el Administrador"; }
        }
        //----------------------------------------------------------------------
        public string mg_reporteGrupo(reportesDTO.reportesDTOG dto)
        {
            string var = null;
            List<reportesDTO.reportesG> NRows = dto.rows;
            List<reportesDTO.reportess> lst = new List<reportesDTO.reportess>();
            foreach (reportesDTO.reportesG item in dto.rows)
            {
                      reportesDTO.reportess ds = new reportesDTO.reportess();
                    ds.id_estudiante = item.id_estudiante.ToString();
                    ds.id_grupo = dto.id_grupo.ToString();
                    ds.id_periodo = dto.id_periodo.ToString();
                    ds.observacion = "";
                    ds.fecha = "";
                    ds.acceso = item.acceso;
                    ds.notificacion = item.notificacion;
                    lst.Add(ds);
              
            }
            var = r.mg_reporteGrupo(lst);
            if (var != null)
            {
                return var;
            }
            else { return "Problemas al registar este grupo en el Servidor: Contactese con el Administrador"; }

        }
        //----------------------------------------------------------------------
        public string eg_reporteGrupo(reportesDTO.reportesDTOG dto)
        {
            string var = null;
            List<reportesDTO.reportesG> NRows = dto.rows;
            List<reportesDTO.reportess> lst = new List<reportesDTO.reportess>();
            foreach (reportesDTO.reportesG item in dto.rows)
            {
                reportesDTO.reportess ds = new reportesDTO.reportess();
                ds.id_estudiante = item.id_estudiante.ToString();
                ds.id_grupo = dto.id_grupo.ToString();
                ds.id_periodo = dto.id_periodo.ToString();
                ds.observacion = "";
                ds.fecha = "";
                ds.acceso = item.acceso;
                ds.notificacion = item.notificacion;
                lst.Add(ds);
            }
            var = r.eg_reporteGrupo(lst);
            if (var != null)
            {
                return var;
            }
            else { return "Problemas al registar este grupo en el Servidor: Contactese con el Administrador"; }
        }
        //----------------------------------------------------------------------
        public List<reportesDTO.reportesG> cg_reporteGrupo(reportesDTO.reportesDTOG dto)
        {
               reportesDTO.reportess ds = new reportesDTO.reportess();
                ds.id_grupo = dto.id_grupo.ToString();
                ds.id_periodo = dto.id_periodo.ToString();
                List<reportesDTO.reportesG>  var = r.cg_reporteGrupo(ds);
            if (var != null)
            {
                return var;
            }
            else { return null; }
        }
            public string v_reporteGrados()
        {
            string m = r.v_reporteGrados();
            return m;
        }
    }
}
