//------------------------------------------------------------------------------
// <auto-generated>
//    Este código se generó a partir de una plantilla.
//
//    Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//    Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PPL_APP
{
    using System;
    using System.Collections.Generic;
    
    public partial class reportes
    {
        public int referencia { get; set; }
        public string id_estudiante { get; set; }
        public string id_grupo { get; set; }
        public string id_periodo { get; set; }
        public string observacion { get; set; }
        public Nullable<System.DateTime> fecha { get; set; }
        public string acceso { get; set; }
        public string notificacion { get; set; }
    
        public virtual grupos grupos { get; set; }
        public virtual periodos periodos { get; set; }
        public virtual personas personas { get; set; }
    }
}
