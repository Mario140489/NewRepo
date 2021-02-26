using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Model
{
    public class crm_modulo

    {
        [Key]
        public int id_modulo { get; set; }
        public string ds_modulo { get; set; }
        
        public virtual ICollection<>
    }

}
