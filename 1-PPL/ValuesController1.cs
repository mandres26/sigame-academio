using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;
using ENTIDADES;

namespace PPLWEB
{
    public class ValuesController1 : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }
        GestionLogros BLL = new GestionLogros();
        GestionBitacoras BLLB = new GestionBitacoras();

        // POST api/logros    
        public List<logrosDTO> Post(dtoGLogros dto) // c_logrosXgradoXasigNota
        {
            string dtoGrado, dtoAasignatura;
            dtoGrado = dto.id_grado;
            dtoAasignatura = dto.id_asignatura;
            List<logrosDTO> var = BLL.c_logrosXgradoXasigNota(dtoGrado, dtoAasignatura);
            return var;

        }
    }
}