using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using ENTIDADES;
namespace BLL
{
    public class GestionUsuarios
    {
        private RepoUsuarios re = new RepoUsuarios();
        RepoUsuarios u = new RepoUsuarios();

        //-----------------------------------------------------------------------------------
        public string m_usuario(usuariosDTO UserActualizado)
        {
            return re.m_usuario(UserActualizado);
        }
        //-----------------------------------------------------------------------------------

        //--------------------------------------------------------------------------------------------------
        public string c_cambiar(dtoCambiar dto)
        {
            string m = re.c_cambiar(dto);
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        public string c_verificar(dtoCambiar dto)
        {
            string m = re.c_verificar(dto);
            return m;
        }

        ////-----------------------------------------------------------------------------------
        public personasDTO.UsuariosDTOs c_usuario(string id, string pass)
        {
            personasDTO.UsuariosDTOs pe = default(personasDTO.UsuariosDTOs);
            pe = u.c_usuario(id, pass);
            if ((pe != null))
            {
                return pe;
            }
            return null;
        }
        ////-----------------------------------------------------------------------------------
        public string c_usuarioPrueba(string id, string pass)
        {
            return u.c_usuarioPrueba(id, pass);
        }
        ////-----------------------------------------------------------------------------------
        public usuariosDTO c_usuario(usuariosDTO uu)
        {
            return u.c_usuario(uu);
        }
        //-----------------------------------------------------------------------------------
        public List<personasDTO.UsuariosDTOs> c_datosUsuariosSistema()
        {
            return u.c_datosUsuariosSistema();
        }
        //-----------------------------------------------------------------------------------
        public List<usuariosDTOExport> c_usuariosProfes()
        {
            List<usuariosDTOExport> m = u.c_usuariosProfes();
            return m;
        }
        //--------------------------------------------------------------------------------------------------
        public List<usuariosDTOExport> c_usuariosGrupo(dtoG dto)
        {
            List<usuariosDTOExport> m = u.c_usuariosGrupo(dto);
            return m;
        }
        public string c_dirTel(personasDTO.personass dto)
        {
            string m = u.c_dirTel(dto);
            return m;
        }
    }

}