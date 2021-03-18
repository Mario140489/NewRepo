using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Model;
using WebApplication1.ModelRetorno;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Crm_appvsmoduloController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public Crm_appvsmoduloController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/crm_appvsmodulo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<crm_modulo>>> Getcrm_appvsmodulo()
        {
            return await _context.crm_modulo.ToListAsync().ConfigureAwait(false);
        }

        // GET: api/crm_appvsmodulo/5
        [HttpGet("{id}")]
        public ActionResult<IEnumerable<crm_modulo>> Getcrm_appvsmodulo(int id)
        {
            //var crm_appvsmodulo = await _context.crm_appvsmodulo.FindAsync(id);
            var crm_modulo = (from appvcmodulo in _context.crm_appvsmodulo
                              join modulo in _context.crm_modulo on appvcmodulo.id_modulo equals modulo.id_modulo
                              where appvcmodulo.id_app == id
                              select new { modulo }).ToList();
            var modulos = new List<RetornoModulo>();
            foreach (var sspmod in crm_modulo)
            {
                //crm_modulo[i].modulo.crm_submodulos = _context.crm_submodulos.Where(b => b.id_modulo == sspmod.modulo.id_modulo).ToList();
                modulos.Add(new RetornoModulo()
                {
                    id_modulo = sspmod.modulo.id_modulo,
                    ds_modulo = sspmod.modulo.ds_modulo,
                    submodulos = _context.crm_submodulos.Where(b => b.id_modulo == sspmod.modulo.id_modulo).ToList()
                });
            }

            if (modulos == null)
            {
                return NotFound();
            }

            return Ok(modulos);
        }

        // PUT: api/crm_appvsmodulo/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putcrm_appvsmodulo(int id, crm_appvsmodulo crm_appvsmodulo)
        {
            if (crm_appvsmodulo != null && id != crm_appvsmodulo.id_appvsmodulo)
            {
                return BadRequest();
            }

            _context.Entry(crm_appvsmodulo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync().ConfigureAwait(false);
            }
            catch (DbUpdateConcurrencyException) when (!Crm_appvsmoduloExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/crm_appvsmodulo
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<crm_appvsmodulo>> Postcrm_appvsmodulo(crm_appvsmodulo crm_appvsmodulo)
        {
            _context.crm_appvsmodulo.Add(crm_appvsmodulo);
            await _context.SaveChangesAsync().ConfigureAwait(false);

            return CreatedAtAction("Getcrm_appvsmodulo", new { id = crm_appvsmodulo.id_appvsmodulo }, crm_appvsmodulo);
        }

        // DELETE: api/crm_appvsmodulo/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<crm_appvsmodulo>> Deletecrm_appvsmodulo(int id)
        {
            var crm_appvsmodulo = await _context.crm_appvsmodulo.FindAsync(id).ConfigureAwait(false);
            if (crm_appvsmodulo == null)
            {
                return NotFound();
            }

            _context.crm_appvsmodulo.Remove(crm_appvsmodulo);
            await _context.SaveChangesAsync().ConfigureAwait(false);

            return crm_appvsmodulo;
        }

        private bool Crm_appvsmoduloExists(int id)
        {
            return _context.crm_appvsmodulo.Any(e => e.id_appvsmodulo == id);
        }
    }
}
