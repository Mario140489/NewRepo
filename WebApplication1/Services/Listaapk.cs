using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Model;

namespace WebApplication1.Services
{
    public class Listaapk
    {
        private static ApplicationDbContext _context;




        public Listaapk(ApplicationDbContext context)
        {
            _context = context;
        }
        public  object  App(int parans)
        {
            var list_id_app = _context.crm_usuariovsgrupo
            .Where(b => b.id_usuario == parans).Join(
                _context.crm_grupovsapp,
                t1 => t1.id_grupousuario,
                t2 => t2.id_grupousuario,(t1,t2) => new {t1,t2}
            ).Select(
                x => new  {
                  x.t2.id_aplicativo
                }
            ).ToList();

            List<Aplicativos> ListAPP = new List<Aplicativos>();

            for(int i=0; i < list_id_app.Count; i++){
                var app = _context.Aplicativos.Find(list_id_app[i].id_aplicativo);
                ListAPP.Add(app);
            }

            return ListAPP;

        }

    }
}
