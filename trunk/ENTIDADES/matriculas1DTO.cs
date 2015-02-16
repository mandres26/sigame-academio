using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDADES
{
    public class matriculas1DTO
    {
        public class materiasProfesorDTO
        {
            public string codAsig { get; set; }
            public string nombreAsig { get; set; }
            public string grupo { get; set; }
            public string grado { get; set; }
        }
        public class gradosProfesorDTO
        {
            public string id_grupo { get; set; }
            public string id_asignatura { get; set; }
            public string nom_asignatura { get; set; }
            public string nom_grado { get; set; }
        } 
        //public class matricula1s
        //{
        //    public string  referencia { get; set; }
        //    public string id_asignatura { get; set; }
        //    public string id_grupo { get; set; }
        //    public string id_profesor { get; set; }
        //}
        public class matriculaDTO
        {
            public string id_asignatura { get; set; }
            public string id_grupo { get; set; }
            public string id_profesor { get; set; }
        }
        public class directorG_DTO
        {
            public string id_grupo { get; set; }
            public string id_profesor { get; set; }
        }

      
    }
}
