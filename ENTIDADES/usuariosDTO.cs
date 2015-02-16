using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDADES
{
    public class usuariosDTO
    {
        public string id { get; set; }
        public string password { get; set; }
        public string acceso { get; set; }
        public string niu_mobil { get; set; }
    }
    public class usuariosDTOExport
    {
        public string username { get; set; }
        public string password { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string email { get; set; }
        public string institution { get; set; }
        public string id { get; set; }

    }
}
