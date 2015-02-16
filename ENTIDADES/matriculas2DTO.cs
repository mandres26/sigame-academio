using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDADES
{
    public class matriculas2DTO
    {
        public class matricula2s
        {
            //public string referencia { get; set; }
            public string id_estudiante { get; set; }
            public string id_grupo { get; set; }
            public string id_acudiente { get; set; }

        }
        public class matriculaDTO
        {
            public string id_estudiante { get; set; }
            public string id_grupo { get; set; }
            public string id_acudiente { get; set; }
        }
       
    }
}
