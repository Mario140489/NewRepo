using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Model;

namespace WebApplication1.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
           : base(options)
        {
        }
        //public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Aplicativos> Aplicativos { get; set; }
        //public DbSet<crm_appvsusuario> crm_appvsusuario { get; set; }
        public DbSet<Servicos> Servicos { get; set; }
        //public DbSet<crm_appvsusuario> crm_appvsusuario { get; set; }
        public DbSet<crm_appvsusuario> crm_appvsusuario { get; set; }
        public DbSet<crm_appvsmodulo> crm_appvsmodulo { get; set; }
        public DbSet<crm_modulo> crm_modulo { get; set; }
        public DbSet<crm_usuario> crm_usuario { get; set; }
        public DbSet<crm_submodulos> crm_submodulos { get; set; }
        public DbSet<crm_grupousuario> crm_grupousuario { get; set; }
        public DbSet<WebApplication1.Model.crm_departamento> crm_departamento { get; set; }
        public DbSet<WebApplication1.Model.crm_usuariovsgrupo> crm_usuariovsgrupo { get; set; }
        public DbSet<WebApplication1.Model.crm_grupovsapp> crm_grupovsapp { get; set; }
        public DbSet<WebApplication1.Model.crm_grupovspermisao> crm_grupovspermisao {get;set;}
        public DbSet<WebApplication1.Model.crm_planodecontas> crm_planodecontas { get; set; }
        public DbSet<WebApplication1.Model.crm_maskplanodecontas> crm_maskplanodecontas { get; set; }
    }
}
