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
      public bool do_inactive { get; set; }
    }

    public class Postcrm_grupousuario{
      public crm_grupousuario crm_grupousuario { get; set; }
      public List<crm_grupovspermisao> crm_grupovspermisaos {get;set;}
    }
}