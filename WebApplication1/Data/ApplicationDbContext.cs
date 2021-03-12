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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("Server=remotemysql.com;DataBase=mBwbnaL7OD;Uid=mBwbnaL7OD;Pwd=vNRB2tfEcz");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        { }

    }
}
