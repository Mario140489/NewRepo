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
    public class crm_planodecontasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public crm_planodecontasController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/crm_planodecontas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<crm_planodecontas>>> Getcrm_planodecontas()
        {
            return await _context.crm_planodecontas.ToListAsync();
        }

        // GET: api/crm_planodecontas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<crm_planodecontas>> Getcrm_planodecontas(int id)
        {
            var crm_planodecontas = await _context.crm_planodecontas.FindAsync(id);

            if (crm_planodecontas == null)
            {
                return NotFound();
            }

            return crm_planodecontas;
        }
        [HttpGet("/plano/{parans}")]
        public async Task<ActionResult<crm_planodecontas>> Getcrm_planodecontas2(string parans)
        {
            
            if(parans==""){
             return Ok(await _context.crm_planodecontas.ToListAsync());
            }
            var  crm_planodecontas = await _context.crm_planodecontas.Where(b => b.ds_descricao.Contains(parans)).ToListAsync();

            if (crm_planodecontas == null)
            {
                return NotFound();
            }

            return Ok(crm_planodecontas);
        }

        // PUT: api/crm_planodecontas/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putcrm_planodecontas(int id, crm_planodecontas crm_planodecontas)
        {
            if (id != crm_planodecontas.id_planodecontas)
            {
                return BadRequest();
            }

            _context.Entry(crm_planodecontas).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!crm_planodecontasExists(id))
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

        // POST: api/crm_planodecontas
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<crm_planodecontas>> Postcrm_planodecontas(crm_planodecontas crm_planodecontas)
        {
            _context.crm_planodecontas.Add(crm_planodecontas);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getcrm_planodecontas", new { id = crm_planodecontas.id_planodecontas }, crm_planodecontas);
        }

        // DELETE: api/crm_planodecontas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<crm_planodecontas>> Deletecrm_planodecontas(int id)
        {
            var crm_planodecontas = await _context.crm_planodecontas.FindAsync(id);
            if (crm_planodecontas == null)
            {
                return NotFound();
            }

            _context.crm_planodecontas.Remove(crm_planodecontas);
            await _context.SaveChangesAsync();

            return crm_planodecontas;
        }

        private bool crm_planodecontasExists(int id)
        {
            return _context.crm_planodecontas.Any(e => e.id_planodecontas == id);
        }
    }
}
