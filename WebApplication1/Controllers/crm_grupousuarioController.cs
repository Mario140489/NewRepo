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
    public class crm_grupousuarioController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public crm_grupousuarioController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/crm_grupousuario
        [HttpGet]
        public async Task<ActionResult<IEnumerable<crm_grupousuario>>> Getcrm_grupousuario()
        {
            return await _context.crm_grupousuario.ToListAsync();
        }
        
        [HttpGet("ativo")]
        public async Task<ActionResult<IEnumerable<crm_grupousuario>>> getgrupousuario()
        {
            return await _context.crm_grupousuario.Where(b => b.do_inactive.Equals(false)).ToListAsync();
        }

        // GET: api/crm_grupousuario/5
        [HttpGet("{name}")]
        public async Task<ActionResult> Getcrm_grupousuario(string name)
        {   
            if(name == ""){
            return  Ok(_context.crm_grupousuario.ToListAsync());
            }

            var crm_grupousuario = await _context.crm_grupousuario.Where(b =>
             b.ds_grupousuario.IndexOf(name, StringComparison.OrdinalIgnoreCase) != -1).ToListAsync();

            if (crm_grupousuario == null)
            {
                return NotFound();
            }

            return Ok(crm_grupousuario);
        }

        // PUT: api/crm_grupousuario/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putcrm_grupousuario(int id, crm_grupousuario crm_grupousuario)
        {
            if (id != crm_grupousuario.id_grupousuario)
            {
                return BadRequest();
            }

            _context.Entry(crm_grupousuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!crm_grupousuarioExists(id))
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

        // POST: api/crm_grupousuario
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<crm_grupousuario>> Postcrm_grupousuario(crm_grupousuario crm_grupousuario)
        {
            _context.crm_grupousuario.Add(crm_grupousuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getcrm_grupousuario", new { id = crm_grupousuario.id_grupousuario }, crm_grupousuario);
        }

        // DELETE: api/crm_grupousuario/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<crm_grupousuario>> Deletecrm_grupousuario(int id)
        {
            var crm_grupousuario = await _context.crm_grupousuario.FindAsync(id);
            if (crm_grupousuario == null)
            {
                return NotFound();
            }

            _context.crm_grupousuario.Remove(crm_grupousuario);
            await _context.SaveChangesAsync();

            return crm_grupousuario;
        }

        private bool crm_grupousuarioExists(int id)
        {
            return _context.crm_grupousuario.Any(e => e.id_grupousuario == id);
        }
    }
}
