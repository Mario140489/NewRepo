using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Model
{
    public class crm_grupousuario
    {
      [Key]
      public int id_grupousuario { get; set; }
      public string ds_grupousuario { get; set; }
      public char do_inactive { get; set; }
    }
}