using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Model
{
    public class Modulos
    {
        [Key]
        public int Id_Modulos { get; set; }
        public string Nome { get; set; }
        public string icon { get; set; }
        [ForeignKey("GrupoUsuario")]
        public int Id_GrupoUsuario { get; set; }
        public virtual GrupoUsuario GrupoUsuario { get; set; }
    }
}
