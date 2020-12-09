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
    public class crm_appvsusuarioController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public crm_appvsusuarioController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/crm_appvsusuario
        [HttpGet]
        public async Task<ActionResult<IEnumerable<crm_appvsusuario>>> Getcrm_appvsusuario()
        {
            return await _context.crm_appvsusuario.ToListAsync();
        }

        // GET: api/crm_appvsusuario/5
        [HttpGet("{id}")]
        public async Task<ActionResult<crm_appvsusuario>> Getcrm_appvsusuario(int id)
        {
            var crm_appvsusuario = await _context.crm_appvsusuario.FindAsync(id);

            if (crm_appvsusuario == null)
            {
                return NotFound();
            }

            return crm_appvsusuario;
        }

        // PUT: api/crm_appvsusuario/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putcrm_appvsusuario(int id, crm_appvsusuario crm_appvsusuario)
        {
            if (id != crm_appvsusuario.id_appvsusu)
            {
                return BadRequest();
            }

            _context.Entry(crm_appvsusuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!crm_appvsusuarioExists(id))
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

        // POST: api/crm_appvsusuario
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<crm_appvsusuario>> Postcrm_appvsusuario(crm_appvsusuario crm_appvsusuario)
        {
            _context.crm_appvsusuario.Add(crm_appvsusuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getcrm_appvsusuario", new { id = crm_appvsusuario.id_appvsusu }, crm_appvsusuario);
        }

        // DELETE: api/crm_appvsusuario/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<crm_appvsusuario>> Deletecrm_appvsusuario(int id)
        {
            var crm_appvsusuario = await _context.crm_appvsusuario.FindAsync(id);
            if (crm_appvsusuario == null)
            {
                return NotFound();
            }

            _context.crm_appvsusuario.Remove(crm_appvsusuario);
            await _context.SaveChangesAsync();

            return crm_appvsusuario;
        }

        private bool crm_appvsusuarioExists(int id)
        {
            return _context.crm_appvsusuario.Any(e => e.id_appvsusu == id);
        }
    }
}
