using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Data;
using WebApplication1.Model;

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
            var  list_id_app = _context.crm_appvsusuario.Where(b=> b.id_usuario == parans).ToList();

            if (list_id_app == null)
            {
                return null;
            }

            List<Aplicativos> ListAPP = new List<Aplicativos>();
            list_id_app.ForEach(delegate (crm_appvsusuario value)
            {
                var app = _context.Aplicativos.Find(value.id_aplicativo);
                ListAPP.Add(app);
            });

            return ListAPP;

        }

    }
}
