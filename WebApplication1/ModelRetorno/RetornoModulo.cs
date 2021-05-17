using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.ModelRetorno
{
    public class RetornoModulo
    {
        public int id_modulo { get; set; }
        public string ds_modulo { get; set; }
        public object submodulos { get; set; }

        public static implicit operator List<object>(RetornoModulo v)
        {
            throw new NotImplementedException();
        }
    }
}
