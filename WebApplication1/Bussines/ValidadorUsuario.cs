using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Model;

namespace WebApplication1.Bussines
{
    public class ValidadorUsuario
    {
        public  object ValidaUsuario(Usuario usuario)
        {
            
            if (usuario.ds_nome != null && usuario.ds_login != null && usuario.ds_senha != null)
            {
                if (usuario.do_inactive == 0) { usuario.do_inactive = 'N'; }
                return usuario;
            }
            else
            {
                return null;
            }
        }
    }
}
