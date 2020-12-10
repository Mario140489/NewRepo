using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Model
{
    public class crm_appvsusuario
    {   
        [Key]
        public int id_appvsusu { get; set; }
        public int id_usuario { get; set; }
        public int id_aplicativo { get; set; }
    }
}
