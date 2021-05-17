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

        [HttpGet("getid/{id}")]
        public async Task<ActionResult> Getcrm_grupousuario(int id)
        {
            var crm_grupousuario = await _context.crm_grupousuario.FindAsync(id);

            if (crm_grupousuario == null)
            {
                return NotFound();
            }
            var modulos = new List<RetornoModulo>();
            var permission =  (from perm in _context.crm_grupovspermisao
             join sub in _context.crm_submodulos on
             perm.id_submodulos equals sub.id_submodulos
             where perm.id_grupousuario == crm_grupousuario.id_grupousuario
             select new {
                 perm.id_submodulos,
                 perm.do_permission,
                 sub.id_modulo,
                 sub.ds_nome
             }
            ).ToList();
            var listmodulos = new List<crm_modulo>();
            foreach(var item in permission){
             var _modulos = _context.crm_modulo.Find(item.id_modulo);
             listmodulos.Add(_modulos);
            }

            foreach(var sspmod in listmodulos){
                modulos.Add(new RetornoModulo()
                {
                    id_modulo = sspmod.id_modulo,
                    ds_modulo = sspmod.ds_modulo,
                    submodulos = (from submodulo in _context.crm_submodulos
                    where submodulo.id_modulo == sspmod.modulo.id_modulo
                              select new {
                        submodulo.id_submodulos,
                        submodulo.ds_nome
                    }).ToList()
                });
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
        public async Task<ActionResult<crm_grupousuario>> Postcrm_grupousuario(Postcrm_grupousuario Postcrm_grupousuario)
        {
            _context.crm_grupousuario.Add(Postcrm_grupousuario.crm_grupousuario);
            await _context.SaveChangesAsync();
            if(Postcrm_grupousuario.crm_grupousuario.id_grupousuario > 0){
                if(Postcrm_grupousuario.crm_grupovspermisaos.Count > 0){
                    for(int i =0 ; i < Postcrm_grupousuario.crm_grupovspermisaos.Count;i++){
                        Postcrm_grupousuario.crm_grupovspermisaos[i].id_grupousuario = Postcrm_grupousuario.crm_grupousuario.id_grupousuario;
                        ValueTask<Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry<crm_grupovspermisao>>
                        valueTask = _context.crm_grupovspermisao.AddAsync(Postcrm_grupousuario.crm_grupovspermisaos[i]);
                        await _context.SaveChangesAsync();
                    }
                }
            }

            return CreatedAtAction("Getcrm_grupousuario", new { id = Postcrm_grupousuario.crm_grupousuario.id_grupousuario }, Postcrm_grupousuario.crm_grupousuario);
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
