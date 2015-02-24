using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;
using System.Data;
using System.Diagnostics;
using DAL;
using ENTIDADES;


namespace BLL
{
    public class GestionPersonas
    {
        public RepoPersonas rp = new RepoPersonas();
        //-----------------------------------------------------------------------------------
        public personasDTO.personass c_persona(string idPersona)
        {
            return rp.c_persona(idPersona);
        }
        //-----------------------------------------------------------------------------------
        public personasDTO.personaImgDTO c_imgpersona(string idPersona) // para consultar la imagen de una persona en especifica
        {
            return rp.c_imgpersona(idPersona);
        }
        //-----------------------------------------------------------------------------------
        public string m_imgpersona(string idPersona, byte[] img) // para modificar y registrar la imagen de una persona en especifica
        {
           return rp.m_imgpersona(idPersona,img);
        }

        //------------------------------------------------------------------------------------
        public List<personasDTO.personass> c_personasXRol(string Rol)
        {
            return rp.c_personasXidRol(Rol);
        }
         //------------------------------------------------------------------------------------
        public List<personasDTO.personass> c_personasXRolXSexo(string Rol, string Sexo)
        {
            return rp.c_personasXRolXSexo(Rol,Sexo);
        }
        
        //------------------------------------------------------------------------------------
        public List<personasDTO.personass> c_personasXRolXJornada(string Rol, string jornada)
        {
            return rp.c_personasXRolXJornada(Rol, jornada);
        }

        //------------------------------------------------------------------------------------
        public string r_persona(personasDTO.personass p)
        {
            return rp.r_persona(p);
        }
        //------------------------------------------------------------------------------------
        public string e_persona(personasDTO.personass p)
        {
            return rp.e_persona(p);
        }
        //------------------------------------------------------------------------------------
        public string m_persona(string cod, personasDTO.personass p)
        {
            return rp.m_persona(cod, p);
           
        }

        public List<personasDTO.personass> c_personasXApellidos(dtoG dto)
        {

            List<personasDTO.personass> m = rp.c_personasXApellidos(dto);
            return m;
        }
        public List<personasDTO.personass> c_personasXNombres(dtoG dto)
        {

            List<personasDTO.personass> m = rp.c_personasXNombres(dto);
            return m;
        }

        public personasDTO.personass c_personaXNombre(dtoG dto)  // OK
        {
            personasDTO.personass m = rp.c_personaXNombre(dto);
            return m;
        }

        public personasDTO.personass c_personaAndGrupo(dtoGEst dto)
        {
            return rp.c_personaAndGrupo(dto);
        }
        public personasDTO.personass c_personaXNombreAndGrupo(dtoGEst dto)  
        {
            dto.id = dto.id.ToUpper();
            personasDTO.personass m = rp.c_personaXNombreAndGrupo(dto);
            return m;
        }


        public List<personasDTO.personasBusquedaDTO> c_profesoresXBusque()
        {
            List<personasDTO.personasBusquedaDTO> m = rp.c_profesoresXBusque();
            return m;
        }
        public List<personasDTO.personasBusquedaDTO> c_estudiantesXBusque()
        {
            List<personasDTO.personasBusquedaDTO> m = rp.c_estudiantesXBusque();
            return m;
        }
        public List<personasDTO.personasBusquedaDTO> c_acudientesXBusque()
        {
            List<personasDTO.personasBusquedaDTO> m = rp.c_acudientesXBusque();
            return m;
        }
        public List<personasDTO.personasBusquedaDTO> c_estXGrupoXBusque(dtoG dto)
        {
            List<personasDTO.personasBusquedaDTO> m = rp.c_estXGrupoXBusque(dto);
            return m;
        }
        public List<personasDTO.personasBusquedaDTO> c_personasXBusque()
        {
            List<personasDTO.personasBusquedaDTO> m = rp.c_personasXBusque();
            return m;
        }
    }
}

