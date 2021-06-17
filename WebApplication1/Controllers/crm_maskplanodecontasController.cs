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
    public class crm_maskplanodecontasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public crm_maskplanodecontasController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/crm_maskplanodecontas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<crm_maskplanodecontas>>> Getcrm_maskplanodecontas()
        {
            return await _context.crm_maskplanodecontas.ToListAsync();
        }

        // GET: api/crm_maskplanodecontas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<crm_maskplanodecontas>> Getcrm_maskplanodecontas(int id)
        {
            var crm_maskplanodecontas = await _context.crm_maskplanodecontas.FindAsync(id);

            if (crm_maskplanodecontas == null)
            {
                return NotFound();
            }

            return crm_maskplanodecontas;
        }

        // PUT: api/crm_maskplanodecontas/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putcrm_maskplanodecontas(int id, crm_maskplanodecontas crm_maskplanodecontas)
        {
            if (id != crm_maskplanodecontas.id_mask)
            {
                return BadRequest();
            }

            _context.Entry(crm_maskplanodecontas).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!crm_maskplanodecontasExists(id))
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

        // POST: api/crm_maskplanodecontas
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<crm_maskplanodecontas>> Postcrm_maskplanodecontas(crm_maskplanodecontas crm_maskplanodecontas)
        {
            _context.crm_maskplanodecontas.Add(crm_maskplanodecontas);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getcrm_maskplanodecontas", new { id = crm_maskplanodecontas.id_mask }, crm_maskplanodecontas);
        }

        // DELETE: api/crm_maskplanodecontas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<crm_maskplanodecontas>> Deletecrm_maskplanodecontas(int id)
        {
            var crm_maskplanodecontas = await _context.crm_maskplanodecontas.FindAsync(id);
            if (crm_maskplanodecontas == null)
            {
                return NotFound();
            }

            _context.crm_maskplanodecontas.Remove(crm_maskplanodecontas);
            await _context.SaveChangesAsync();

            return crm_maskplanodecontas;
        }

        private bool crm_maskplanodecontasExists(int id)
        {
            return _context.crm_maskplanodecontas.Any(e => e.id_mask == id);
        }
    }
}
