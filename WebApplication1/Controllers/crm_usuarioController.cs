using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Model;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class crm_usuarioController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public crm_usuarioController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/crm_usuario
        [HttpGet]
        public async Task<ActionResult<IEnumerable<crm_usuario>>> Getcrm_usuario()
        {
            return await _context.crm_usuario.ToListAsync();
        }

        // GET: api/crm_usuario/5
        [HttpGet("{id}")]
        public async Task<ActionResult<crm_usuario>> Getcrm_usuario(int id)
        {
            var crm_usuario = await _context.crm_usuario.FindAsync(id);

            if (crm_usuario == null)
            {
                return NotFound();
            }

            return crm_usuario;
        }

        // PUT: api/crm_usuario/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putcrm_usuario(int id, crm_usuario crm_usuario)
        {
            if (id != crm_usuario.id_usuario)
            {
                return BadRequest();
            }

            _context.Entry(crm_usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!crm_usuarioExists(id))
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

        // POST: api/crm_usuario
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<crm_usuario>> Postcrm_usuario(crm_usuario crm_usuario)
        {
            _context.crm_usuario.Add(crm_usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getcrm_usuario", new { id = crm_usuario.id_usuario }, crm_usuario);
        }

        // DELETE: api/crm_usuario/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<crm_usuario>> Deletecrm_usuario(int id)
        {
            var crm_usuario = await _context.crm_usuario.FindAsync(id);
            if (crm_usuario == null)
            {
                return NotFound();
            }

            _context.crm_usuario.Remove(crm_usuario);
            await _context.SaveChangesAsync();

            return crm_usuario;
        }

        private bool crm_usuarioExists(int id)
        {
            return _context.crm_usuario.Any(e => e.id_usuario == id);
        }
    }
}
