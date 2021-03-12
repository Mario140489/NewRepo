using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using WebApplication1;
using WebApplication1.Data;
using WebApplication1.Model;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        

        public UsuariosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Usuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuario()
        {
            return await _context.Usuario.ToListAsync().ConfigureAwait(true);
        }



        // GET: api/Usuarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(int id)
        {
            var usuario = await _context.Usuario.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        [HttpPost("Login")]
        public async Task<ActionResult> LoginAsync(Usuario usuario)
        {

            // string   user = JsonSerializer.Serialize(_context.Usuario.Where(b => b.ds_login == usuario.ds_login && b.ds_senha == usuario.ds_senha).ToList());
            var user = await _context.Usuario.Where(b => b.ds_login == usuario.ds_login && b.ds_senha == usuario.ds_senha).ToListAsync().ConfigureAwait(true);
            //var list_id_app = _context.crm_appvsusuario.Where(b => b.id_usuario == user[0].id_usuario).ToList();

            //string json = JsonSerializer.Serialize(user[0]);

            //JObject json = JObject.Parse("{nome:" +user[0].ds_nome+", key:"+key+"}");


            if (user.Count  == 0)
            {
                return null;
            }
            string key = Services.Criptografia.Cripitografar(user[0].ToString());
            Listaapk listapp = new Listaapk(_context);
            
            Login UsuairioLogado = new Login();
            UsuairioLogado.ds_nome = user[0].ds_nome;
            UsuairioLogado.key = key;
            UsuairioLogado.apps = listapp.App(user[0].id_usuario);

            return Ok(UsuairioLogado);


        }

        // PUT: api/Usuarios/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id, Usuario usuario)
        {
            if (usuario != null && id != usuario.id_usuario)
            {
                return BadRequest();
            }

            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync().ConfigureAwait(true);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Usuarios
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Usuario>> PostUsuario(Usuario usuario)
        {
            _context.Usuario.Add(usuario);
            await _context.SaveChangesAsync().ConfigureAwait(true);

            return CreatedAtAction("GetUsuario", new { id = usuario.id_usuario }, usuario);
        }

        // DELETE: api/Usuarios/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Usuario>> DeleteUsuario(int id)
        {
            var usuario = await _context.Usuario.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.Usuario.Remove(usuario);
            await _context.SaveChangesAsync().ConfigureAwait(true);

            return usuario;
        }

        private bool UsuarioExists(int id)
        {
            return _context.Usuario.Any(e => e.id_usuario == id);
        }
    }
}
