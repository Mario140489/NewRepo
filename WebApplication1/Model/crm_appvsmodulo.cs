using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Model
{
    public class crm_appvsmodulo
    {
        [Key]
        public int id_appvsmodulo { get; set; }
        public int id_modulo { get; set; }
        public int id_app { get; set; }
        public crm_modulo crm_modulo { get; set; }
    }
}
