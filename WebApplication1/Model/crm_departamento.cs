using System;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Model
{
    public class crm_departamento
    {
        [Key]
        public int id_departamento { get; set; }
        public string  ds_departamento { get; set; }
        public bool do_inactive { get; set; }
    }
}