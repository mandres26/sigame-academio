using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ENTIDADES;
using DAL;

namespace BLL
{
    public class GestionObservacioness
    {
        private RepoObservatorio r = new RepoObservatorio();
        //-----------------------------------------------------------------------------------
        public string r_observacion(observacionesDTO.observatorioss ob)
        {
            return r.r_observacion(ob);
        }
        public string a_observacion(observacionesDTO.observatorioss ob)
        {
            return r.a_observacion(ob);
        }
        public string m_observacion(observacionesDTO.observatorioss ob)
        {
            return r.m_observacion(ob);
        }
        public string m_observacionNoti(observacionesDTO.observatorioss ob)
        {
            return r.m_observacionNoti(ob);
        }
        public string e_observacion(observacionesDTO.observatorioss ob)
        {
            return r.e_observacion(ob);
        }
        public List<dtoGObservaciones> c_observaciones(observacionesDTO.observatorioss ob)
        {
            return r.c_observaciones(ob);
        }
        //-------------------------------FILTROS EXTRAS PARA CONSULTAR QUE LOS PUEDES UTILIZAR LUEGO-------------------------------------
         public List<observacionesDTO.observatorioss> c_listaObservaciones()
        {
            return r.c_listaObservaciones();
        }
        //-----------------------------------------------------------------------------------
        public List<observacionesDTO.observatorioss> c_porAsigatura(string cod)
        {
            return r.c_porAsigatura(cod);
        }
        //-----------------------------------------------------------------------------------
        public List<observacionesDTO.observatorioss> c_porEstudiante(string cod)
        {
            return r.c_porEstudiante(cod);
        }
        //-----------------------------------------------------------------------------------
        public List<observacionesDTO.observatorioss> c_obserXIdEstXGrupo(observacionesDTO.observatorioss cod)
        {
            return r.c_obserXIdEstXGrupo(cod);
        }
        //-----------------------------------------------------------------------------------
        public List<observacionesDTO.observatorioss> c_porGrupo(string cod)
        {
            return r.c_porGrupo(cod);
        }
        //-----------------------------------------------------------------------------------
        public List<observacionesDTO.observatorioss> c_porPeriodo(string cod)
        {
            return r.c_porPeriodo(cod);
        }
        //-----------------------------------------------------------------------------------
        public List<observacionesDTO.observatorioss> c_porProfesor(string cod)
        {
            return r.c_porProfesor(cod);
        }
        //-----------------------------------------------------------------------------------
        public List<observacionesDTO.observatorioss> c_porFecha(string fechaIni,string fechaFin)
        {
            return r.c_porFecha(fechaIni, fechaFin);
        }
        //-----------------------------------------------------------------------------------
        public List<observacionesDTO.observatorioss> c_obserXNotificacion(string notificacion)
        {
            return r.c_obserXNotificacion(notificacion);
        }
        //-----------------------------------------------------------------------------------
        public List<observacionesDTO.observatorioss> c_obserXArchivo(string estado)
        {
            return r.c_obserXArchivo(estado);
        }
        //-----------------------------------------------------------------------------------
        public List<observacionesDTO.observatorioss> c_obserxIdGXPerXProfe(string idGrupo, string idPeriodo,string idProfe)
        {
            return r.c_observacionXgrupoXperidoXprofe(idGrupo, idPeriodo, idProfe);
        }
        //-----------------------------------------------------------------------------------
    }
}
