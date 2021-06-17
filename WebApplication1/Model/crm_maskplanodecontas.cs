using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Model
{
    public class crm_maskplanodecontas
    {
        [Key]
        public int id_mask { get; set; }
        public string ds_jsonmask { get; set; }
        public int id_planodecontas { get; set; }

    }
}