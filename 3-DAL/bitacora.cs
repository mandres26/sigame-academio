//------------------------------------------------------------------------------
// <auto-generated>
//    Este código se generó a partir de una plantilla.
//
//    Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//    Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class bitacora
    {
        public int id_bitacora { get; set; }
        public string seccion { get; set; }
        public string accion { get; set; }
        public string usuario { get; set; }
        public string id_usuario { get; set; }
        public Nullable<System.DateTime> fecha { get; set; }
        public string observacion { get; set; }
    }
}
