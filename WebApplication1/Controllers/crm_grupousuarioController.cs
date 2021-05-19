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
using WebApplication1.Services;

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
            var permission =  _context.crm_submodulos.Join(_context.crm_grupovspermisao,
            t1 => t1.id_submodulos, t2 => t2.id_submodulos, (t1,t2) => new {t1,t2}).Where(b => b.t2.id_grupousuario == crm_grupousuario.id_grupousuario).Select( x => new {
                x.t1.id_modulo,
                x.t1.id_submodulos,
                x.t1.ds_nome,
                x.t2.do_permission,
            }).ToList();
            var teste = permission.GroupBy(p => p.id_modulo).Select(b => b.First());
            var listmodulos = new List<crm_modulo>();
            foreach(var item in teste){
             var _modulos = _context.crm_modulo.Find(item.id_modulo);
             listmodulos.Add(_modulos);
            }

            foreach(var sspmod in listmodulos){
                modulos.Add(new RetornoModulo()
                {
                    id_modulo = sspmod.id_modulo,
                    ds_modulo = sspmod.ds_modulo,
                    submodulos =permission.Where(b => b.id_modulo.Equals(sspmod.id_modulo)).ToList()
                });
            }

            var GetCrm_Grupousuario = new GetCrm_Grupousuario();

            GetCrm_Grupousuario.crm_grupousuario = crm_grupousuario;
            GetCrm_Grupousuario.modulos = modulos;

            return Ok(GetCrm_Grupousuario);
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
            var VinculoPerson = await _context.crm_usuariovsgrupo.Where(b => b.id_grupousuario == id).ToListAsync();
            if(VinculoPerson.Count > 0)
            {
                var erro = new RetornoError();
                erro.status="error";
                erro.message="Grupo não pode ser Excluido pois está vinculado ao algum usuario.";
                return Ok(erro);
                ;
            }
            var permission = await _context.crm_grupovspermisao.Where(b => b.id_grupousuario == id).ToListAsync();
            if(permission.Count > 0)
            {
                foreach(var i in permission){
                    _context.crm_grupovspermisao.Remove(i);
                    await _context.SaveChangesAsync();
                }
            }
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
