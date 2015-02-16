using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENTIDADES
{
    public class notasDTO
    {
        public class notaDTO
        {
            public string id { get; set; }
            public string apellidos { get; set; }
            public string nombres { get; set; }
            public string nota { get; set; }
            public string equivalencia { get; set; }
            public string nota_s { get; set; }
            public string equivalencia_s { get; set; }
            public string logro { get; set; }
            public string uid { get; set; }
        }
        public class notasXCursoDTO
        {
            public List<notaDTO> rows { get; set; }
            public string codasig { get; set; }
            public string codprofe { get; set; }
            public string codgrupo { get; set; }
            public string periodo { get; set; }
        }

        public class notasXCursoDTOAppBm // MODIFIACAR
        {
           // para las notas del grupo
            public List<notaDTO> rows { get; set; }
            public string codasig { get; set; }
            public string codprofe { get; set; }
            public string codgrupo { get; set; }
            public string periodo { get; set; }
            // para la bitacora
            public string id_bitacora { get; set; }
            public string seccion { get; set; }
            public string accion { get; set; }
            public string usuario { get; set; }
            public string id_usuario { get; set; }
            public string fecha { get; set; }
            public string observacion { get; set; }
        }

        public class notasXCursoDTOAppBr // REGISTRAR
        {
            // para las notas del grupo
            public List<notaDTO> rows { get; set; }
            public string codasig { get; set; }
            public string codprofe { get; set; }
            public string codgrupo { get; set; }
            public string periodo { get; set; }
            // para la bitacora
            public string id_bitacora { get; set; }
            public string seccion { get; set; }
            public string accion { get; set; }
            public string usuario { get; set; }
            public string id_usuario { get; set; }
            public string fecha { get; set; }
            public string observacion { get; set; }
        }
        public class notasXCursoDTOAppBe // REGISTRAR
        {
            // para las notas del grupo
            public List<notaDTO> rows { get; set; }
            public string codasig { get; set; }
            public string codprofe { get; set; }
            public string codgrupo { get; set; }
            public string periodo { get; set; }
            // para la bitacora
            public string id_bitacora { get; set; }
            public string seccion { get; set; }
            public string accion { get; set; }
            public string usuario { get; set; }
            public string id_usuario { get; set; }
            public string fecha { get; set; }
            public string observacion { get; set; }
        }


        public class notass
        {
            public string id_estudiante { get; set; }
            public string id_asignatura { get; set; }
            public string id_grupo { get; set; }
            public string id_periodo { get; set; }
            public string id_profesor { get; set; }
            public string id_logro { get; set; }
            public string nota { get; set; }
            public string equivalencia { get; set; }
            public string nota_s { get; set; }
            public string equivalencia_s { get; set; }
        }

        public class c_notaDTO
        {
            public string id_estudiante { get; set; }
            public string id_asignatura { get; set; }
            public string id_grupo { get; set; }
            public string id_periodo { get; set; }
        }
        public class m_notaDTO
        {
            public c_notaDTO p { get; set; }
            public string id_profesor { get; set; }
            public string nota { get; set; }
            public string equivalencia { get; set; }
        }
    }
}
