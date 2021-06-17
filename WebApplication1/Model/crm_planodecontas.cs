using System;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Model
{
    public class crm_planodecontas
    {
        [Key]
        public int id_planodecontas { get; set; }
        public string ds_keymaster { get; set; }
        public string ds_descricao { get; set; }
        public bool do_inactive { get; set; }
        public DateTime dt_create { get; set; }
        public DateTime dt_update { get; set; }
        public string ds_keyfather { get; set; }
    }
}