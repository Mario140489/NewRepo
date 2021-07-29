using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Model
{
    [Table("crm_aplicativo")]
    public class Aplicativos
    {
        [Key]
        public int id_aplicativo { get; set; }
        public string ds_app { get; set; }
        public string ds_icone { get; set; }
    }
}
