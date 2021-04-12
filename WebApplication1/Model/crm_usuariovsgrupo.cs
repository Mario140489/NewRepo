using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Model
{
    public class crm_usuariovsgrupo
    {
        [Key]
        public int id_usuariovsgrupo { get; set; }
        public int id_usuario { get; set; }
        public int id_grupousuario { get; set; }
    }
}