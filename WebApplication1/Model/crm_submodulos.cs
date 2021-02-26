using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Model
{
    public class crm_submodulos
    {
        [Key]
        public int id_submodulos { get; set; }
        public string ds_nome { get; set; }
        public int id_modulo { get; set; }
        public string ds_caminho { get; set; }
    }
}
