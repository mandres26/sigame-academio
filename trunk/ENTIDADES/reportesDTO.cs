using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDADES
{
    public class reportesDTO
    {
              //-----------------ESTA ES PARA SOLTAR LOS DATOS AL SERVCIO - ESTA NO TOCAR.---
        public class reportesDTOG
        {
            public List<reportesG> rows { get; set; }
            public string id_periodo { get; set; }
            public string id_grupo { get; set; }
        }
        public class reportesGrupal
        {
            public string id_periodo { get; set; }
            public string id_grupo { get; set; }
        }
        public class reportesG // Recibe: datos expecificos de forma gruparl para habilidar o denegar el acceso popr parte de acudientes
        {
            public string id_estudiante { get; set; }
            public string apellidos { get; set; }
            public string nombres { get; set; }
            public bool acceso { get; set; }
            public string notificacion { get; set; }
            public string uid { get; set; } // para el dato estra de la jqxgrilla
        }

        public class reportess // Recibe: datos expecificos
        {
            public string id_estudiante { get; set; }
            public string id_grupo { get; set; }
            public string id_periodo { get; set; }
            public string observacion { get; set; }
            public string fecha { get; set; }
            public bool acceso { get; set; }
            public string notificacion { get; set; }
         
        }
        public class reporteConstaFamily // Recibe: datos expecificos
        {
            public string id_estudiante { get; set; }
            public string id_grupo { get; set; }
            public string mes1 { get; set; }
            public string mes2 { get; set; }

        }
        public class reporteDTOPeriodo // Devuelve: regresa los datos expecificos para el boletin x periodo que se genera en pdf
        {
            /// ---------------- PARA EL CASO DEL HEAD
            public string id { get; set; }
            public string estudiante { get; set; }
            public string ano { get; set; }
            public string grado { get; set; }
            public string periodo { get; set; }
            public string rango { get; set; }
            public string grupo { get; set; }

            public string equi_prom { get; set; }
            public string nota_prom { get; set; }
            public int puesto { get; set; }
            /// ---------------- PARA EL CASO DEL BODY
            public string area { get; set; }
            public string asig { get; set; }
            public string ih { get; set; }
            public int nota { get; set; }
            public string equival { get; set; }
            public string logro { get; set; }
            /// ---------------- PARA EL CASO DEL RESULTADO
            public string resultado { get; set; }
        }
        public class reporteDTOFin // Devuelve: regresa los datos expecificos pAra el boletin final que se genera en pdf
        {
            //public b_headFin b_head { get; set; }
            public string id { get; set; }
            public string estudiante { get; set; }
            public string ano { get; set; }
            public string grado { get; set; }
            public string periodo { get; set; }
            public string rango { get; set; }
            public string grupo { get; set; }

            public string notaPromV { get; set; }
            public string equiPromV { get; set; }
            public int puesto { get; set; }
            
            //public List<b_BodyFin> b_body { get; set; }
            public string area { get; set; }
            public string asig { get; set; }
            public string ih { get; set; }
            public string logro { get; set; }
            public string equiv { get; set; }

            public int I { get; set; }
            public int II { get; set; }
            public int III { get; set; }
            public int IV { get; set; }
            public decimal notaV { get; set; }

            public string resultado { get; set; }
        }
        public class reporteDTOConsolidado // Devuelve: regresa los datos expecificos pAra el boletin final que se genera en pdf CONSOLIDADDO
        {
            public string ano { get; set; }
            public string idGrupo { get; set; }
            public string idGrado { get; set; }
            // Datos del director de grupo
            public string idProfe { get; set; }
            public string apellidosProfe { get; set; }
            public string nombresProfe { get; set; }
            public string idEst { get; set; }
            public string nombresEst { get; set; }
            public string apellidosEst { get; set; }
            public string asignatura { get; set; }
            public string periodo { get; set; }
            public string nota { get; set; }
        }

        public class reporteDTOListado// Devuelve: regresa los datos expecificos pAra el listado del grupo que se genera en pdf
        {
            //public b_HeadLista b_head { get; set; }
            public string ano { get; set; }
            public string grupo { get; set; }
            public string periodo { get; set; }

            //public List<b_BodyLista> b_body { get; set; }
            public int refe { get; set; }
            public string id { get; set; }
            public string apellidos { get; set; }
            public string nombres { get; set; }

            public string resultado { get; set; }
        }
        public class reporteDTOConstaF 
            // Devuelve: regresa los datos expecificos para la constancia de 
            // estudio que se genera en pdf (constancia de estudio para familias en accion)
        {
            public string id { get; set; }
            public string estudiante { get; set; }
            public string ano { get; set; }
            public string grado { get; set; }
            public string tipo { get; set; }
            public string grupo { get; set; }
            public string mes1 { get; set; }
            public string mes2 { get; set; }
            public string resultado { get; set; }
        }
        public class reporteDTOConsta
        // Devuelve: regresa los datos expecificos para la constancia de 
        // estudio que se genera en pdf (constancia de estudio de matruculacion en el sistema)
        {
            public string id { get; set; }
            public string estudiante { get; set; }
            public string ano { get; set; }
            public string grado { get; set; }
            public string tipo { get; set; }
            public string grupo { get; set; }
            public string resultado { get; set; }
        }

        public class b_Body
        {
            public string area { get; set; }
            public string asig { get; set; }
            public string ih { get; set; }
            public int nota { get; set; }
            public string equival { get; set; }
            public string logro { get; set; }
        }
       

        public class b_headFin
        {
            public string id { get; set; }
            public string estudiante { get; set; }
            public string ano { get; set; }
            public string grado { get; set; }
            public string periodo { get; set; }
            public string rango { get; set; }
            public string grupo { get; set; }

            public string notaPromV { get; set; }
            public string equiPromV { get; set; }
            public int puesto { get; set; }
        }
        public class b_BodyFin
        {
            public string area { get; set; }
            public string asig { get; set; }
            public string ih { get; set; }
            public string logro { get; set; }
            public string equiv { get; set; }

            public int I { get; set; }
            public int II { get; set; }
            public int III { get; set; }
            public int IV { get; set; }
            public decimal notaV { get; set; }
        }

        public class b_Head
        {
            public string id { get; set; }
            public string estudiante { get; set; }
            public string ano { get; set; }
            public string grado { get; set; }
            public string periodo { get; set; }
            public string rango { get; set; }
            public string grupo { get; set; }

            public string equi_prom { get; set; }
            public string nota_prom { get; set; }
            public int puesto { get; set; }
        }
        public class b_HeadConsta
        {
            public string id { get; set; }
            public string estudiante { get; set; }
            public string ano { get; set; }
            public string grado { get; set; }
            public string tipo { get; set; }
            public string grupo { get; set; }
        }
         
    }
    public class puestos
    {
        public string id_estudiante { get; set; }
        public Single nota_prom { get; set; }
    }
    public class puestosDef
    {
        public int No { get; set; }
        public string id_estudiante { get; set; }
        public Single nota_prom { get; set; }
    }
    public class puestosFin
    {
        public string id_estudiante { get; set; }
        public string id_asignatura { get; set; }
        public Single nota_Vprom { get; set; }
    }
   
}
public class hvidaprofe
{
    public string tipo { get; set; }
    public string id { get; set; }
    public string apellidos { get; set; }
    public string nombres { get; set; }
    public string email { get; set; }
    public string dir1 { get; set; }
    public string dirAux { get; set; }
    public string genero { get; set; }
    public string estadoS { get; set; }
    public string f_naci { get; set; }
    public string celular { get; set; }
    public string telefono { get; set; }
    public string telefono2 { get; set; }
    public string jornadal { get; set; }
    public string foto { get; set; }
    public string observaciones { get; set; }
    public string dirG { get; set; }
    public string dirGrupo{ get; set; }
}


public class hmatricula
{
    public string nAsig { get; set; }
    public string idAsig { get; set; }
    public string grupo { get; set; }
    public string grado { get; set; }
    public string año { get; set; }
    public string horas { get; set; }
}
public class hacudido
{
    public string bandera { get; set; }
    public string id { get; set; }
    public string apellidos { get; set; }
    public string nombres { get; set; }
    public string grupo { get; set; }
}

public class hvidaest
{
    public string tipo { get; set; }
    public string id { get; set; }
    public string apellidos { get; set; }
    public string nombres { get; set; }
    public string dir1 { get; set; }
    public string dirAux { get; set; }
    public string genero { get; set; }
    public string estadoS { get; set; }
    public string f_naci { get; set; }
    public string celular { get; set; }
    public string telefono { get; set; }
    public string telefono2 { get; set; }
    public string foto { get; set; }
    public string observaciones { get; set; }
}
public class hacudidoest
{
    public string id { get; set; }
    public string apellidos { get; set; }
    public string nombres { get; set; }
    public string grupo { get; set; }
}
public class hmatriculaest
{
    public string grado { get; set; }
    public string grupo { get; set; }
    public string año { get; set; }
}