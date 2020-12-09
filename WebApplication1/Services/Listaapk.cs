using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Data;

namespace WebApplication1.Services
{
    public class Listaapk
    {
        private readonly ApplicationDbContext _context;


        public Listaapk(ApplicationDbContext context)
        {
            _context = context;
        }
        public  object  App(int parans)
        {
            var  list_id_app = _context.crm_appvsusuario.Find(parans).tolist();

            if (list_id_app == null)
            {
                return null;
            }

            list_id_app.ForEach

            return 

        }

    }
}
