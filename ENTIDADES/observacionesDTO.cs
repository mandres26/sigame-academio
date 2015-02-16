using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDADES
{
    public class observacionesDTO
    {
        public class observatorioss
        {
            public string referencia { get; set; }
            public string id_estudiante { get; set; }
            public string id_asignatura { get; set; }
            public string id_grupo { get; set; }
            public string id_periodo { get; set; }
            public string id_profesor { get; set; }
            public string observacion { get; set; }
            public string fecha { get; set; }
            public string tipo { get; set; }
            public string notificacion { get; set; }
            public string acceso { get; set; }

        }
          public class observatoriosDTOReport
        {
            public string estudiante { get; set; }
            public string ano { get; set; }
            public string grado { get; set; }
            public string grupo { get; set; }
            public string id { get; set; }
            public string periodo { get; set; }
            public string descripcion { get; set; }
            public string asignatura { get; set; }
            public string fecha { get; set; }
            public string tipo { get; set; }
            public string notificacion { get; set; }
            public string resultado { get; set; }
        }
        public class c_observacionDTO
        {
            public string id_estudiante { get; set; }
            public string id_asignatura { get; set; }
            public string id_grupo { get; set; }
            public string id_periodo { get; set; }
        }
        public class m_observacionDTO
        {
            public c_observacionDTO p { get; set; }
            public string id_profesor { get; set; }
            public string observacion { get; set; }
            public string fecha { get; set; }
        }
    }
}
