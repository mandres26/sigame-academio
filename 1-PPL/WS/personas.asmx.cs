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
      
    public class personas : System.Web.Services.WebService
    {
            GestionPersonas BLL = new GestionPersonas();
            GestionBitacoras BLLB = new GestionBitacoras();

         //--------------------------------------------------------------------------------------------------
            [WebMethod]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public string r_persona(personasDTO.personass dto, bitacorasDTO dtob)  // OK
            {
                
                string m=  BLL.r_persona(dto);
                if (m != null)
                {
                    BLLB.r_bitacora(dtob);
                }
                return m;
            }

            //--------------------------------------------------------------------------------------------------
            [WebMethod]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public string m_persona(personasDTO.personass dtonew, dtoG dto, bitacorasDTO dtob)
            {
                string m=  BLL.m_persona(dto.id, dtonew);
                if (m != null)
                {
                    BLLB.r_bitacora(dtob);
                }
                return m;
            }
            //--------------------------------------------------------------------------------------------------
            [WebMethod]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public string e_persona(dtoG dto, bitacorasDTO dtob)
            {
                personasDTO.personass p = new personasDTO.personass();            
                p.id = dto.id ;
                string m = BLL.e_persona(p);
                 if (m != null)
                {
                    if (m != "Usted no puede eliminar esta persona, ya que se encuentra vinculada con observaciónes, notas o matriculas academicas. Revise")
                {
                    BLLB.r_bitacora(dtob);
                }
                }
                return m;
                
            }
            //--------------------------------------------------------------------------------------------------
            [WebMethod]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public personasDTO.personass c_persona(dtoG dto)
            {
               return BLL.c_persona(dto.id);
            }
   
            //--------------------------------------------------------------------------------------------------
            [WebMethod]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public List<personasDTO.personass> c_personass(bitacorasDTO dtob, dtoG dto)
            {
                List<personasDTO.personass> m=  BLL.c_personasXRol(dto.id);
                if (m != null)
                {
                    BLLB.r_bitacora(dtob);
                }
                return m;
            }
            [WebMethod]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public List<personasDTO.personass> c_personasXRol(dtoGPersonas dto, bitacorasDTO dtob)
            {
                List<personasDTO.personass> m = BLL.c_personasXRol(dto.rol);
                if (m != null)
                {
                    BLLB.r_bitacora(dtob);
                }
                return m;
            }

            [WebMethod]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public List<personasDTO.personass> c_personasXRolXSexo(dtoGPersonas dto, bitacorasDTO dtob)
            {
                List<personasDTO.personass> m = BLL.c_personasXRolXSexo(dto.rol,dto.sexo);
                if (m != null)
                {
                    BLLB.r_bitacora(dtob);
                }
                return m;
            }
                 [WebMethod]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public List<personasDTO.personass> c_personasXRolXJornada(dtoGPersonas dto, bitacorasDTO dtob)
            {

                List<personasDTO.personass> m = BLL.c_personasXRolXJornada(dto.rol, dto.jornada);
                if (m != null)
                {
                    BLLB.r_bitacora(dtob);
                }
                return m;
            }
          
            [WebMethod]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
             public List<personasDTO.personass> c_personasXApellidos(dtoG dto, bitacorasDTO dtob)  // OK
            {
                dto.id = dto.id.ToUpper();
                List<personasDTO.personass> m = BLL.c_personasXApellidos(dto);
                if (m != null)
                {
                    BLLB.r_bitacora(dtob);
                }
                return m;
            }
            [WebMethod]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public List<personasDTO.personass> c_personasXNombres(dtoG dto, bitacorasDTO dtob)  // OK
            {
                dto.id = dto.id.ToUpper();
                List<personasDTO.personass> m = BLL.c_personasXNombres(dto);
                if (m != null)
                {
                    BLLB.r_bitacora(dtob);
                }
                return m;
            }

            [WebMethod]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public personasDTO.personass c_personaXNombre(dtoG dto)  // OK
            {
                dto.id = dto.id.ToUpper();
                personasDTO.personass m = BLL.c_personaXNombre(dto);
                return m;
            }

            //--------------------------------------------------------------------------------------------------
            [WebMethod]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public personasDTO.personass c_personaAndGrupo(dtoGEst dto)
            {
                return BLL.c_personaAndGrupo(dto);
            }
            [WebMethod]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public personasDTO.personass c_personaXNombreAndGrupo(dtoGEst dto)  // OK
            {
                dto.id = dto.id.ToUpper();
                personasDTO.personass m = BLL.c_personaXNombreAndGrupo(dto);
                return m;
            }
        
            [WebMethod]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public List<personasDTO.personasBusquedaDTO> c_profesoresXBusque() 
            {
                List<personasDTO.personasBusquedaDTO> m = BLL.c_profesoresXBusque();
                return m;
            }
             [WebMethod]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public List<personasDTO.personasBusquedaDTO> c_estudiantesXBusque()
            {
                List<personasDTO.personasBusquedaDTO> m = BLL.c_estudiantesXBusque();
                return m;
            }
            [WebMethod]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public List<personasDTO.personasBusquedaDTO> c_acudientesXBusque()
            {
                List<personasDTO.personasBusquedaDTO> m = BLL.c_acudientesXBusque();
                return m;
            }
          [WebMethod]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public List<personasDTO.personasBusquedaDTO> c_estXGrupoXBusque(dtoG dto)
            {
                List<personasDTO.personasBusquedaDTO> m = BLL.c_estXGrupoXBusque(dto);
                return m;
            }
         [WebMethod]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
          public List<personasDTO.personasBusquedaDTO> c_personasXBusque()
            {
                List<personasDTO.personasBusquedaDTO> m = BLL.c_personasXBusque();
                return m;
            }
        
        }
    }
