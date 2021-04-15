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
using WebApplication1.Bussines;

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
            var user = new ListUsuario();
            user.id_usuario = usuario.id_usuario;
            user.ds_nome = usuario.ds_nome;
            user.ds_login = usuario.ds_login;
            user.do_inactive = usuario.do_inactive;
            user.id_departamento = usuario.id_departamento;
            user.Departamentos = await _context.crm_usuariovsgrupo.Where(b => b.id_usuario == usuario.id_usuario)
            .Join(_context.crm_grupousuario,
                  t1 => t1.id_grupousuario,
                  t2 => t2.id_grupousuario,(t1,t2) => new {t1,t2}).
                  Select(x => new {
                      x.t2.id_grupousuario,
                      x.t2.ds_grupousuario
                  }).ToListAsync().ConfigureAwait(false);
           // usuario = user;
            return Ok(user);
        }

        [HttpGet("nome/{nome}")]
        public async Task<ActionResult> GetUsuario(string nome)
        {
            Object usuario;
            if (nome == "*")
            {
                var list = await _context.Usuario.Select(i => new
                {
                    id_usuario = i.id_usuario,
                    ds_nome = i.ds_nome,
                    do_inactive = i.do_inactive
                }).ToListAsync().ConfigureAwait(true);
                usuario = list;
            }
            else
            {
                 usuario = await _context.Usuario.Where(b => b.ds_nome.IndexOf(nome, StringComparison.OrdinalIgnoreCase) != -1).
                 Select(i => new                 {
                    id_usuario = i.id_usuario,
                    ds_nome = i.ds_nome,
                    do_inactive = i.do_inactive
                })
                 .ToListAsync().ConfigureAwait(false);
            }

            if (usuario == null)
            {
                return NotFound();
            }

            return Ok(usuario);
        }

        [HttpPost("Login")]
        public async Task<ActionResult> LoginAsync(Usuario usuario)
        {
            var user = await  _context.Usuario
                .Where(b => b.ds_login == usuario.ds_login && b.ds_senha == usuario.ds_senha)
                .ToListAsync()
                .ConfigureAwait(false);

            if (user.Count == 0)
            {
                return null;
            }
            string key = Services.Criptografia.Cripitografar(user[0].ToString());
            Listaapk listapp = new Listaapk(_context);

            Login UsuairioLogado = new Login
            {
                ds_nome = user[0].ds_nome,
                key = key,
                apps = listapp.App(user[0].id_usuario)
            };

            return Ok(UsuairioLogado);
        }

        // PUT: api/Usuarios/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id, PostUsuario postUsuario)
        {
            Usuario usuario = postUsuario.Usuario;

            if (usuario != null && id != usuario.id_usuario)
            {
                return BadRequest();
            }

            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync().ConfigureAwait(true);
                postUsuario.crm_grupousuario.ForEach(delegate (crm_grupousuario value){
                crm_usuariovsgrupo crm_Usuariovsgrupo = new crm_usuariovsgrupo();
                crm_Usuariovsgrupo.id_usuario = usuario.id_usuario;
                crm_Usuariovsgrupo.id_grupousuario = value.id_grupousuario;
                _context.crm_usuariovsgrupo.Add(crm_Usuariovsgrupo);
                _context.SaveChanges();
            });
            }
            catch (DbUpdateConcurrencyException) when (!UsuarioExists(id))
            {
                return NotFound();
            }

            return Ok(usuario);
        }

        // POST: api/Usuarios
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("PostUsuario")]
        public async Task<ActionResult> PostUsuario(PostUsuario postUsuario)
        {

            Usuario usuario = postUsuario.Usuario;

            var result = ValidadorUsuario.ValidaUsuario(usuario);
            if(result == null)
            {
                return Ok( "Voçê deve preencher todos os dados Obrigarios.");
            }
            usuario = (Usuario)result;
            _context.Usuario.Add(usuario);
            await _context.SaveChangesAsync().ConfigureAwait(false);

            postUsuario.crm_grupousuario.ForEach(delegate (crm_grupousuario value){
            crm_usuariovsgrupo crm_Usuariovsgrupo = new crm_usuariovsgrupo();
            crm_Usuariovsgrupo.id_usuario = usuario.id_usuario;
            crm_Usuariovsgrupo.id_grupousuario = value.id_grupousuario;
            _context.crm_usuariovsgrupo.Add(crm_Usuariovsgrupo);
            _context.SaveChanges();
            });
            return CreatedAtAction("GetUsuario", new { id = usuario.id_usuario }, usuario);
        }

        // DELETE: api/Usuarios/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Usuario>> DeleteUsuario(int id)
        {
            var usuario = await _context.Usuario.FindAsync(id).ConfigureAwait(false);
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
