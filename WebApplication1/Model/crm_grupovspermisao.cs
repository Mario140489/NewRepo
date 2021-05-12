using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Model
{
    public class crm_grupovspermisao
    {
        [Key]
        public int id_grupovspermisao { get; set; }
        public int id_grupousuario { get; set; }
        public bool do_permission { get; set; }
        public int id_submodulos { get; set; }

    }

    public class moduloperm{
        public int id_submodulos { get; set; }
        public string ds_nome { get; set; }
        public bool do_permission { get; set; }
    }
}