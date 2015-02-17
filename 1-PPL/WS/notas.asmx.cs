using ENTIDADES;
using BLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;


namespace PPLWEB.WS
{
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
  
    public class notas : System.Web.Services.WebService
    {

        GestionNotass BLL = new GestionNotass();
        GestionBitacoras BLLB = new GestionBitacoras();
         //---------------------------------- NOTAS POR GRUPO------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string r_notasGrupo(notasDTO.notasXCursoDTO dto, bitacorasDTO dtob)
        {

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
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string e_notasGrupo(notasDTO.notasXCursoDTO dto, bitacorasDTO dtob)
        {
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
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string m_notasGrupo(notasDTO.notasXCursoDTO dto, bitacorasDTO dtob)
        {
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
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoGNotaGD> c_notasXGrupoXIdP(dtoGNotaG dto, bitacorasDTO dtob)
        {
            List<dtoGNotaGD> m = BLL.c_notasXGrupoXIdP(dto.id_grupo, dto.id_periodo);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoGNotaGDALL> c_notass(bitacorasDTO dtob)
        {
            List<dtoGNotaGDALL> m = BLL.c_notass();
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }

        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoGNotaGD> c_notasXGrupoXIdPXAsig(dtoGNotaG dto, bitacorasDTO dtob)
        {
            List<dtoGNotaGD> m = BLL.c_notasXGrupoXIdPXAsig(dto.id_grupo,dto.id_periodo,dto.id_asignatura);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }

        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoGNotaGD> c_notasXGrupoXIdPXAsigXEqui(dtoGNotaG dto, bitacorasDTO dtob)
        {
            List<dtoGNotaGD> m = BLL.c_notasXGrupoXIdPXAsigXEqui(dto.id_grupo, dto.id_periodo, dto.id_asignatura,dto.equivalencia );
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //---------------------------------- FIN DE NOTAS POR GRUPO---------------------------------------------

        //---------------------------------- NOTAS DE FORMA INDIVIDUAL------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string r_nota(notasDTO.notass dto, bitacorasDTO dtob)
        {
            string m = BLL.r_nota(dto);
            if (m != null)
            {
                if (m != "¡Error de congruencia de datos. Recuerde que usted no puede asignar notas al mismo estudiante en el mismo periodo, grupo y asignatura <strong>dos veces</strong>. Revise!")
                {
                  if (m != "Lo sentimos. Reintene nuevamente. Tuvimos  problemas a intentar agregarle un referencia a este registro.")
                    {
                        BLLB.r_bitacora(dtob);
                    }
                }
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string e_nota(notasDTO.notass dto, bitacorasDTO dtob)
        {
            string m = BLL.e_nota(dto);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string m_nota(notasDTO.notass dto, bitacorasDTO dtob)
        {
            string m = BLL.m_nota(dto);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public notasDTO.notass c_nota(notasDTO.notass dto)
        {
            notasDTO.notass m = BLL.c_nota(dto);
            return m;
        }

        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoGNotaID> c_notasXGrupoXIdPXIdEst(dtoGNotaI dto, bitacorasDTO dtob)
        {
            List<dtoGNotaID> m = BLL.c_notasXGrupoXIdPXIdEst(dto.id_grupo, dto.id_periodo, dto.id_estudiante);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<dtoGNotaID> c_notasXGrupoXIdAsigXIdEst(dtoGNotaI dto, bitacorasDTO dtob)
        {
            List<dtoGNotaID> m = BLL.c_notasXGrupoXIdAsigXIdEst(dto.id_grupo, dto.id_asignatura, dto.id_estudiante);
            if (m != null)
            {
                BLLB.r_bitacora(dtob);
            }
            return m;
        }

        //---------------------------------- FIN DE NOTAS DE FORMA INDIVIDUAL------------------------------------------
    }
}
