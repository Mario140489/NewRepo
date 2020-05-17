using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Model
{
    public class Servicos
    {
        [Key]
        public int id_servico { get; set; }
        public string ds_descricao { get; set; }
        public decimal ds_valor { get; set; } 
        public string bl_ativo { get; set; }
    }
}
