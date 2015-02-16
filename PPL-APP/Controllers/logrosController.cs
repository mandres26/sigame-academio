using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ENTIDADES;
namespace PPL_APP.Controllers
{
    public class logrosController : ApiController
    {
        // POST api/logros    
        public List<logrosDTO> Post([FromBody]  dtoGLogros dtoL) // c_logrosXgradoXasigNota
        {
            string dtoGrado, dtoAasignatura;
            dtoGrado = dtoL.id_grado;
            dtoAasignatura = dtoL.id_asignatura;


            bdsigameEntities bd = new bdsigameEntities();
            logros origen = new logros();
            logrosDTO destino = new logrosDTO();
            List<logros> origenl = new List<logros>();
            List<logrosDTO> destinol = new List<logrosDTO>();


            origenl = bd.logros.Where(t => t.id_asignatura == dtoL.id_asignatura && t.id_grado == dtoL.id_grado).ToList();
            origenl = origenl.OrderBy(t => t.id_logro).ToList();
            if (origenl.Count != 0)
            {
                List<logrosDTO> l = new List<logrosDTO>();
                foreach (logros item in origenl)
                {
                    logrosDTO j = new logrosDTO();
                    j.id_logro = item.id_logro.ToString() + "/ " + item.descripcion.ToString();
                    l.Add(j);
                }
                return l;
            }
            else { return null; }

        } //ok
    }
}
