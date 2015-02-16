using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ENTIDADES;
namespace PPL_APP.Controllers
{
    public class matriculasController : ApiController
    {
        public List<matriculas1DTO.materiasProfesorDTO> Get(int id)   // c_asignaturasProfe
        {
            try
            {
                dtoG dto = new dtoG();
                dto.id = id.ToString(); 
                bdsigameEntities bd = new bdsigameEntities();
                List<matricula1> n = bd.matricula1.Where(t => t.id_profesor == dto.id).OrderBy(t => t.id_asignatura).ToList();
                List<matriculas1DTO.materiasProfesorDTO> Lista = new List<matriculas1DTO.materiasProfesorDTO>();
                foreach (matricula1 item in n)
                {
                    matriculas1DTO.materiasProfesorDTO ds = new matriculas1DTO.materiasProfesorDTO();
                    ds.nombreAsig = item.asignatura.nombre.ToString();
                    ds.codAsig = item.id_asignatura.ToString();
                    ds.grupo = item.id_grupo.ToString();
                    ds.grado = item.grupos.id_grado.ToString();
                    Lista.Add(ds);
                }
                if (Lista.Count != 0)
                {
                    Lista = Lista.OrderBy(t => t.nombreAsig).ToList();
                    return Lista;
                }
                else { return null; }
            }
            catch
            {
                return null;
            }
        }

        public List<personasDTO.personasDTOLogros> Get([FromBody] notasDTO.notasXCursoDTO dtoEST)//  c_estudiantesXGrupoXLogro
        {
            try
            {
                RepoMatricula2 BLL = new RepoMatricula2();
                return BLL.c_estudiantesXgrupoXlogro(dtoEST);
            }
            catch (Exception)
            {
                return null;
            }
          
        }
        // OJO


        //(OK
    }
}
