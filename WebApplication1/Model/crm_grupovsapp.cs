using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Model
{
    public class crm_grupovsapp
    {
        [Key]
        public int id_grupovsapp { get; set; }
        public int id_aplicativo { get; set; }
        public int id_grupousuario { get; set; }
    }
}