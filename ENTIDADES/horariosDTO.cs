using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDADES
{
   public class horariosDTO // Recibe para gestionar los horarios
    {
        public string referencia { get; set; } 
        public string id_grupo { get; set; }
        public string id_asignatura { get; set; }
        public string dia { get; set; }
        public string horaI { get; set; }
        public string horaF { get; set; }
        public string jornada { get; set; }
    }
     public class horariosDTOFiltro // Recibe para gestionar los los filtros de los horarios
    {
        public string id_grupo { get; set; }
        public string id_profe { get; set; }
        public string id_estudiante { get; set; }
    }
   public class horariosClasesDTO //Devuelve el formato de lo horarios de clases
   {
       public string id_grupo { get; set; }
       public string id_asignatura { get; set; }
       public string lunes { get; set; }
       public string martes { get; set; }
       public string miercoles { get; set; }
       public string jueves { get; set; }
       public string viernes { get; set; }
       public string sabado { get; set; }
       public string domingo { get; set; }
   }
}
