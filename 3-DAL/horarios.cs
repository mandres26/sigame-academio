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
    
    public partial class horarios
    {
        public int referencia { get; set; }
        public string id_grupo { get; set; }
        public string id_asignatura { get; set; }
        public string jornada { get; set; }
        public string dia { get; set; }
        public string horaI { get; set; }
        public string horaF { get; set; }
    
        public virtual asignatura asignatura { get; set; }
        public virtual grupos grupos { get; set; }
        public virtual jornadas jornadas { get; set; }
    }
}
