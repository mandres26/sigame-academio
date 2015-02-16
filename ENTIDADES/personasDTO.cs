using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDADES
{
    public class personasDTO
    {
        public class personasDTOLogros
        {
            public string id { get; set; }
            public string id_tipo { get; set; }
            public string nombres { get; set; }
            public string apellidos { get; set; }
            public string telefono { get; set; }
            public string cel { get; set; }
            public string email { get; set; }
            public string direccion { get; set; }
            public string sexo { get; set; }
            public string rol { get; set; }
            public string edad { get; set; }
            public string jornada { get; set; }

            public string logro { get; set; }
            public string nota { get; set; }
            public string equivalencia { get; set; }
            public string nota_s { get; set; }
            public string equivalencia_s { get; set; }
        }
        public class personass
        {
            public string id { get; set; }
            public string id_tipo { get; set; }
            public string nombres { get; set; }
            public string apellidos { get; set; }
            public string telefono { get; set; }
            public string telefono2 { get; set; }
            public string cel { get; set; }
            public string email { get; set; }
            public string direccion { get; set; }
            public string direccion2 { get; set; }
            public string sexo { get; set; }
            public string rol { get; set; }
            public string rol_secundario { get; set; }
            public string rol_terciario { get; set; }
            public string edad { get; set; }
            public string jornada { get; set; }
            public string f_naci { get; set; }
            public string estado { get; set; }
            public string observacion { get; set; }
        }
        public class EstudiantesDTO
        {
            //    public personass person = new personass();
            //    public List<periodoss> lst { get; set; }
        }
        public class personasBusquedaDTO
        {
            public string persona { get; set; }
            public string uid { get; set; }
        }
        public class UsuariosDTOs
        {
            public string id { get; set; }
            public string id_tipo { get; set; }
            public string nombres { get; set; }
            public string apellidos { get; set; }
            public string telefono { get; set; }
            public string cel { get; set; }
            public string email { get; set; }
            public string direccion { get; set; }
            public string sexo { get; set; }
            public string rol { get; set; }
            public string rol_secundario { get; set; }
            public string rol_terciario { get; set; }
            public string edad { get; set; }
            public string jornada { get; set; }

            public string password { get; set; }
            public string acceso { get; set; }
            public string ano { get; set; }

        }
    }

}

