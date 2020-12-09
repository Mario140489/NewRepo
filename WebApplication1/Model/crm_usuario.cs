using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Model
{
    public class crm_usuario
    {
        [Key]
        public int id_usuario { get; set; }

        public string ds_nome { get; set; }

        //public  crm_modulo Crm_Modulo { get; set; }
    }
}
