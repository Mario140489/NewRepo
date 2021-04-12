using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Model;

namespace WebApplication1.Bussines
{
    public static class ValidadorUsuario
    {
        public static object ValidaUsuario(Usuario usuario)
        {
            if (usuario?.ds_nome != null && usuario.ds_login != null && usuario.ds_senha != null)
            {
                return usuario;
            }
            else
            {
                return null;
            }
        }
    }
}
