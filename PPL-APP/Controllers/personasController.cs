using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ENTIDADES;
namespace PPL_APP.Controllers
{
    public class personasController : ApiController
    {
        RepoPersonas BLL = new RepoPersonas();
        public personasDTO.personass Post(dtoG dto) // c_persona
        {
            return BLL.c_persona(dto.id);
        }  
    }
}
