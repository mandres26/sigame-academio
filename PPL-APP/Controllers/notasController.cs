using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ENTIDADES;
namespace PPL_APP.Controllers
{
    public class notasController : ApiController
    {
        GestionNotass BLL = new GestionNotass();
        RepoBitacora BLLB = new RepoBitacora();
        public string Post([FromBody]notasDTO.notasXCursoDTOAppBr dtoR)  //REGISTRAR GRUPO
        {
            bitacorasDTO dtob = new bitacorasDTO();
            dtob.fecha = dtoR.fecha;
            dtob.id_bitacora = dtoR.id_bitacora;
            dtob.id_usuario = dtoR.id_usuario;
            dtob.observacion = dtoR.observacion;
            dtob.seccion = dtoR.seccion;
            dtob.usuario = dtoR.usuario;
            dtob.accion = dtoR.accion;

            notasDTO.notasXCursoDTO dto = new notasDTO.notasXCursoDTO();
            dto.rows = dtoR.rows;
            dto.periodo = dtoR.periodo;
            dto.codprofe = dtoR.codprofe;
            dto.codgrupo = dtoR.codgrupo;
            dto.codasig = dtoR.codasig;

            string m = BLL.r_notasGrupo(dto);
            if (m != null)
            {
                if (m != "Lo sentimos. Tuvimos procesar este grupo. Al parecer no envió los datos correctos. Tenga en cuenta que debe enviar la nota de cada estudiante con su respectiva nota, logro alcanzado y periodo academico. Revise y reintente. ")
                {
                    if (m != "Problemas al registar este grupo en el Servidor: Contactese con el Administrador")
                    {
                        BLLB.r_bitacora(dtob);
                    }
                }
            }
            return m;
        }

        // POST api/notas  
        public string Put(int id, [FromBody]notasDTO.notasXCursoDTOAppBm dtoM)  //MODIFICAR GRUPO
        {
            bitacorasDTO dtob = new bitacorasDTO();
            dtob.fecha = dtoM.fecha;
            dtob.id_bitacora = dtoM.id_bitacora;
            dtob.id_usuario = dtoM.id_usuario;
            dtob.observacion = dtoM.observacion;
            dtob.seccion = dtoM.seccion;
            dtob.usuario = dtoM.usuario;
            dtob.accion = dtoM.accion;

            notasDTO.notasXCursoDTO dto = new notasDTO.notasXCursoDTO();
            dto.rows = dtoM.rows;
            dto.periodo = dtoM.periodo;
            dto.codprofe = dtoM.codprofe;
            dto.codgrupo = dtoM.codgrupo;
            dto.codasig = dtoM.codasig;

            string m = BLL.m_notasGrupo(dto);
            if (m != null)
            {
                if (m != "Lo sentimos. Tuvimos procesar este grupo. Al parecer no envió los datos correctos. Tenga en cuenta que debe enviar la nota de cada estudiante con su respectiva nota, logro alcanzado y periodo academico. Revise y reintente. ")
                {
                    if (m != "Problemas al registar este grupo en el Servidor: Contactese con el Administrador")
                    {
                        BLLB.r_bitacora(dtob);
                    }
                }
            }
            return m;
        }

        public string Delete(int id, [FromBody]notasDTO.notasXCursoDTOAppBe dtoE)  //ELIMINAR GRUPO
        {
            bitacorasDTO dtob = new bitacorasDTO();
            dtob.fecha = dtoE.fecha;
            dtob.id_bitacora = dtoE.id_bitacora;
            dtob.id_usuario = dtoE.id_usuario;
            dtob.observacion = dtoE.observacion;
            dtob.seccion = dtoE.seccion;
            dtob.usuario = dtoE.usuario;
            dtob.accion = dtoE.accion;

            notasDTO.notasXCursoDTO dto = new notasDTO.notasXCursoDTO();
            dto.rows = dtoE.rows;
            dto.periodo = dtoE.periodo;
            dto.codprofe = dtoE.codprofe;
            dto.codgrupo = dtoE.codgrupo;
            dto.codasig = dtoE.codasig;

            string m = BLL.e_notasGrupo(dto);
            if (m != null)
            {
                if (m != "Lo sentimos. Tuvimos procesar este grupo. Al parecer no envió los datos correctos. Tenga en cuenta que debe enviar la nota de cada estudiante con su respectiva nota, logro alcanzado y periodo academico. Revise y reintente. ")
                {
                    if (m != "Problemas al registar este grupo en el Servidor: Contactese con el Administrador")
                    {
                        BLLB.r_bitacora(dtob);
                    }
                }
            }
            return m;
        }

        //ok
    }
}
