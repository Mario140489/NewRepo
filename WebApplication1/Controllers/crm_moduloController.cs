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
    public class crm_moduloController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public crm_moduloController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/crm_modulo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<crm_modulo>>> Getcrm_modulo()
        {
            var list = await _context.crm_modulo.Include("crm_usuario").ToListAsync().ConfigureAwait(false);

            return list;
        }

        // GET: api/crm_modulo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<crm_modulo>> Getcrm_modulo(int id)
        {
            var crm_modulo = await _context.crm_modulo.FindAsync(id);

            if (crm_modulo == null)
            {
                return NotFound();
            }

            return crm_modulo;
        }

        // PUT: api/crm_modulo/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putcrm_modulo(int id, crm_modulo crm_modulo)
        {
            if (id != crm_modulo.id_modulo)
            {
                return BadRequest();
            }

            _context.Entry(crm_modulo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!crm_moduloExists(id))
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

        // POST: api/crm_modulo
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<crm_modulo>> Postcrm_modulo(crm_modulo crm_modulo)
        {
            _context.crm_modulo.Add(crm_modulo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getcrm_modulo", new { id = crm_modulo.id_modulo }, crm_modulo);
        }

        // DELETE: api/crm_modulo/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<crm_modulo>> Deletecrm_modulo(int id)
        {
            var crm_modulo = await _context.crm_modulo.FindAsync(id);
            if (crm_modulo == null)
            {
                return NotFound();
            }

            _context.crm_modulo.Remove(crm_modulo);
            await _context.SaveChangesAsync();

            return crm_modulo;
        }

        private bool crm_moduloExists(int id)
        {
            return _context.crm_modulo.Any(e => e.id_modulo == id);
        }
    }
}
