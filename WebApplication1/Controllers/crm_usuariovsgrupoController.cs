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
    public class crm_usuariovsgrupoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public crm_usuariovsgrupoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/crm_usuariovsgrupo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<crm_usuariovsgrupo>>> Getcrm_usuariovsgrupo()
        {
            return await _context.crm_usuariovsgrupo.ToListAsync();
        }

        // GET: api/crm_usuariovsgrupo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<crm_usuariovsgrupo>> Getcrm_usuariovsgrupo(int id)
        {
            var crm_usuariovsgrupo = await _context.crm_usuariovsgrupo.FindAsync(id);

            if (crm_usuariovsgrupo == null)
            {
                return NotFound();
            }

            return crm_usuariovsgrupo;
        }

        // PUT: api/crm_usuariovsgrupo/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putcrm_usuariovsgrupo(int id, crm_usuariovsgrupo crm_usuariovsgrupo)
        {
            if (id != crm_usuariovsgrupo.id_usuariovsgrupo)
            {
                return BadRequest();
            }

            _context.Entry(crm_usuariovsgrupo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!crm_usuariovsgrupoExists(id))
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

        // POST: api/crm_usuariovsgrupo
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<crm_usuariovsgrupo>> Postcrm_usuariovsgrupo(crm_usuariovsgrupo crm_usuariovsgrupo)
        {
            _context.crm_usuariovsgrupo.Add(crm_usuariovsgrupo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getcrm_usuariovsgrupo", new { id = crm_usuariovsgrupo.id_usuariovsgrupo }, crm_usuariovsgrupo);
        }

        // DELETE: api/crm_usuariovsgrupo/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<crm_usuariovsgrupo>> Deletecrm_usuariovsgrupo(int id)
        {
            var crm_usuariovsgrupo = await _context.crm_usuariovsgrupo.FindAsync(id);
            if (crm_usuariovsgrupo == null)
            {
                return NotFound();
            }

            _context.crm_usuariovsgrupo.Remove(crm_usuariovsgrupo);
            await _context.SaveChangesAsync();

            return crm_usuariovsgrupo;
        }

        private bool crm_usuariovsgrupoExists(int id)
        {
            return _context.crm_usuariovsgrupo.Any(e => e.id_usuariovsgrupo == id);
        }
    }
}
