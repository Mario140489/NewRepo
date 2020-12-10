using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Model
{
    public class Usuario
    {
        [Key]
        public int id_usuario { get; set; }
        public string ds_nome { get; set; }
        public string ds_senha { get; set; }
        public string ds_login { get; set; }
        public string ds_imagem { get; set; }
        
        
    }
}
