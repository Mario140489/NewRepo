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
    public class AplicativosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AplicativosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Aplicativos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Aplicativos>>> GetAplicativos()
        {
            return await _context.Aplicativos.ToListAsync();
        }

        // GET: api/Aplicativos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Aplicativos>> GetAplicativos(int id)
        {
            var aplicativos = await _context.Aplicativos.FindAsync(id);

            if (aplicativos == null)
            {
                return NotFound();
            }

            return aplicativos;
        }

        // PUT: api/Aplicativos/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAplicativos(int id, Aplicativos aplicativos)
        {
            if (id != aplicativos.id_aplicativo)
            {
                return BadRequest();
            }

            _context.Entry(aplicativos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AplicativosExists(id))
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

        // POST: api/Aplicativos
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Aplicativos>> PostAplicativos(Aplicativos aplicativos)
        {
            _context.Aplicativos.Add(aplicativos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAplicativos", new { id = aplicativos.id_aplicativo }, aplicativos);
        }

        // DELETE: api/Aplicativos/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Aplicativos>> DeleteAplicativos(int id)
        {
            var aplicativos = await _context.Aplicativos.FindAsync(id);
            if (aplicativos == null)
            {
                return NotFound();
            }

            _context.Aplicativos.Remove(aplicativos);
            await _context.SaveChangesAsync();

            return aplicativos;
        }

        private bool AplicativosExists(int id)
        {
            return _context.Aplicativos.Any(e => e.id_aplicativo == id);
        }
    }
}
