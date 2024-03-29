﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Model
{
  
     [Table("usuario")]
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
        // [Required(ErrorMessage = "Login do Usuario é Obrigatorio")]
        public int id_departamento { get; set; }
        //public DateTime dt_create { get; set; }
        //public DateTime dt_update { get; set; }
        //public string ds_imagem { get; set; }
        public bool do_inactive { get; set; }
        
        public bool do_firstacess { get; set; }
        //public int id_usercreate {get;set;} 
        //public int id_userupdate {get;set;}


    }
    public class PostUsuario{
      public Usuario Usuario { get; set; }
      public List<crm_grupousuario> crm_grupousuario {get;set;}
      public List<crm_grupousuario>  crm_grupousuariodelete { get; set; }
    }
    public class ListUsuario{
      [Key]
       public int id_usuario { get; set; }
       public string ds_nome { get; set; }
       public int id_departamento { get; set; }
       public string ds_login {get;set;}
       public object Departamentos {get;set;}
       public bool do_inactive { get; set; }
    }

    public class TrocarSenha{
      public string newsenha {get;set;}
      public string data {get;set;}
    }
}
