using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDADES
{
    public class dtoG
    {
        public string id { get; set; }
    }
    public class dtoGApp
    {
        public string id { get; set; }
    }
    public class dtoPer
    {
        public string fhoyy { get; set; }
        public string finicia { get; set; }
        public string ffin { get; set; }
    }
    public class dtoCambiar
    {
        public string id { get; set; }
        public string pass { get; set; }
    }
    public class dtoGEst
    {
        public string id { get; set; }
        public string id_grupo { get; set; }
    }

    public class dtoListado
    {
        public string id_grupo { get; set; }
        public string id_periodo { get; set; }
    }

    public class dtoHvidas
    {
        public string rol { get; set; }
        public string id { get; set; }
    }

    public class dtoGLogros // Recibe
    {
        public string id_grado { get; set; }
        public string id_asignatura { get; set; }
    }
    public class dtoGPersonas //Recibe
    {
        public string rol { get; set; }
        public string sexo { get; set; }
        public string jornada { get; set; }
    }
    public class dtoGReport //Recibe
    {
        public string id_periodo { get; set; }
        public string id_grupo { get; set; }
    }
     
    public class dtoGMatricula1 //filtros  devuleve para matricula 1
    {
        public string id_grupo { get; set; }
        public string id_profesor { get; set; }
        public string nombres { get; set; }
        public string apellidos { get; set; }
        public string id_asignatura { get; set; }
        public string n_asignatura { get; set; }
        public string horas { get; set; }
    }
    public class dtoGMatricula2 //filtros devuelve para  matricula 2
    {
        public string id_grupo { get; set; }
        public string año { get; set; }
        public string grado { get; set; }
        public string id_estudiante { get; set; }
        public string nombres { get; set; }
        public string apellidos { get; set; }
        public string edad { get; set; }
        public string f_naci { get; set; }
    }
        public class dtoDirectoresG //filtros devuelve para  todos los directores de grupo 2
    {
        public string id_grupo { get; set; }
        public string id_profesor { get; set; }
        public string nombres { get; set; }
        public string apellidos { get; set; }
    }
    public class dtoGMatriculaProfe //filtros devuelve para  lsitados de horarios de un profesor
    {
        public string id_grupo { get; set; }
        public string año { get; set; }
        public string grado { get; set; }
        public string id_profesor { get; set; }
        public string nombres { get; set; }
        public string apellidos { get; set; }
        public string edad { get; set; }
        public string f_naci { get; set; }
    }
    public class dtoGM2  // Recibe: Dto para Gestionar  matricula 2
    {
        public string id_grupo { get; set; }
        public string sexo { get; set; }
    }
    public class dtoGM1  // Recibe: Dto para Gestionar filtros matricula 1
    {
        public string id_profe { get; set; }
        public string id_profeG { get; set; }
        public string id_asig { get; set; }
        public string id_asigG { get; set; }
        public string id_grupo { get; set; }
        public string sexo { get; set; }
    }
    public class dtoGNotaG  // Recibe: Dto para Gestionar filtros de notas grupal
    {
        public string id_grupo { get; set; }
        public string id_periodo { get; set; }
        public string id_asignatura { get; set; }
        public string equivalencia { get; set; }
    }
    public class dtoGNotaI  // Recibe: Dto para Gestionar filtros de notas individual
    {
        public string id_grupo { get; set; }
        public string id_periodo { get; set; }
        public string id_estudiante { get; set; }
        public string id_asignatura { get; set; }
    }

    public class dtoGNotaGD  // Devuelve: Dto para Gestionar filtros de notas grupal
    {
        public string id_periodo { get; set; }
        public string id_estudiante { get; set; }
        public string apellidos { get; set; }
        public string nombres { get; set; }
        public string id_logro { get; set; }
        public string nom_asig { get; set; }
        public string nota { get; set; }
        public string equivalencia { get; set; }
        public string nota_s { get; set; }
        public string equivalencia_s { get; set; }
    }
    public class dtoGNotaGDALL  // Devuelve: Dto para Gestionar filtros de todas las notas
    {
        public string id_grupo { get; set; }
        public string id_periodo { get; set; }
        public string id_estudiante { get; set; }
        public string apellidos { get; set; }
        public string nombres { get; set; }
        public string id_logro { get; set; }
        public string nom_asig { get; set; }
        public string nota { get; set; }
        public string equivalencia { get; set; }
        public string nota_s { get; set; }
        public string equivalencia_s { get; set; }
    }
    public class dtoGNotaID  // Devuelve: Dto para Gestionar filtros de notas individual
    {
        public string id_periodo { get; set; }
        public string horas { get; set; }
        public string id_logro { get; set; }
        public string nom_asig { get; set; }
        public string nota { get; set; }
        public string equivalencia { get; set; }
    }
    public class dtoGObservaciones  // Devuelve: Dto para Gestionar de las observaciones del estudiante
    {
        public string referencia { get; set; }
        public string nom_asignatura { get; set; }
        public string id_periodo { get; set; }
        public string tipo { get; set; }
        public string observacion { get; set; }
        public string fecha { get; set; }
        public string notificacion { get; set; }
    }
    public class dtoGObservacionesF  // Recibe: Dto para fitrar las observaciones
    {
        public string id_grupo { get; set; }
        public string id_periodo1 { get; set; }
        public string id_periodo2 { get; set; }
        public string id_profe1 { get; set; }
        public string id_profe2 { get; set; }
        public string id_asignatura { get; set; }
        public string id_estudiante { get; set; }
        public string id_archivo { get; set; }
        public string fecha_ini { get; set; }
        public string fecha_fin { get; set; }
        public string id_notificacion { get; set; }

    }

        public class dtoGBitacora  // Recibe: Dto para fitrar la bitacora
    {
        public string seccion { get; set; }
        public string accion { get; set; }
        public string id_usuario { get; set; }
        public string fecha_ini { get; set; }
        public string fecha_fin { get; set; }
    }
}

