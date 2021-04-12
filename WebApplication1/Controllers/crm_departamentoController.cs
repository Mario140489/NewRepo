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
    public class crm_departamentoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public crm_departamentoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/crm_departamento
        [HttpGet]
        public async Task<ActionResult<IEnumerable<crm_departamento>>> Getcrm_departamento()
        {
            return await _context.crm_departamento.ToListAsync();
        }
        
        [HttpGet("combo")]
        public async Task<ActionResult<IEnumerable<crm_departamento>>> Getcrm_departamentoAcitve()
        {
            return await _context.crm_departamento.Where(b=> b.do_inactive == false).ToListAsync();
        }

        // GET: api/crm_departamento/5
        [HttpGet("{id}")]
        public async Task<ActionResult<crm_departamento>> Getcrm_departamento(int id)
        {
            var crm_departamento = await _context.crm_departamento.FindAsync(id);

            if (crm_departamento == null)
            {
                return NotFound();
            }

            return crm_departamento;
        }

        // PUT: api/crm_departamento/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putcrm_departamento(int id, crm_departamento crm_departamento)
        {
            if (id != crm_departamento.id_departamento)
            {
                return BadRequest();
            }

            _context.Entry(crm_departamento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!crm_departamentoExists(id))
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

        // POST: api/crm_departamento
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<crm_departamento>> Postcrm_departamento(crm_departamento crm_departamento)
        {
            _context.crm_departamento.Add(crm_departamento);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getcrm_departamento", new { id = crm_departamento.id_departamento }, crm_departamento);
        }

        // DELETE: api/crm_departamento/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<crm_departamento>> Deletecrm_departamento(int id)
        {
            var crm_departamento = await _context.crm_departamento.FindAsync(id);
            if (crm_departamento == null)
            {
                return NotFound();
            }

            _context.crm_departamento.Remove(crm_departamento);
            await _context.SaveChangesAsync();

            return crm_departamento;
        }

        private bool crm_departamentoExists(int id)
        {
            return _context.crm_departamento.Any(e => e.id_departamento == id);
        }
    }
}
