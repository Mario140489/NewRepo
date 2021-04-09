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
        //[Required(ErrorMessage ="Nome do Usuario é Obrigatorio")]
        public string ds_nome { get; set; }
       // [Required(ErrorMessage = "Nome do Usuario é Obrigatorio")]
        public string ds_senha { get; set; }
      //  [Required(ErrorMessage = "Senha do Usuario é Obrigatorio")]
        public string ds_login { get; set; }
      //  [Required(ErrorMessage = "Login do Usuario é Obrigatorio")]
        public string ds_imagem { get; set; }
        public char do_inactive { get; set; }
        public int id_departamento {get;set;}
        
    }

    public class ListUsuario{
       public int id_usuario { get; set; }
       public string ds_nome { get; set; }
       public char do_inactive { get; set; }
    }
}
