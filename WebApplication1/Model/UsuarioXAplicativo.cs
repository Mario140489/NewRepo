using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Model
{
    public class UsuarioXAplicativo
    {   
        [Key]
        public int id_usuarioxaplicativo { get; set; }
        public int id_usuario { get; set; }
        public virtual Usuario Usuario { get; set; }
        public int id_aplicativo { get; set; }
        public virtual Aplicativos Aplicativos { get; set; }
    }
}
