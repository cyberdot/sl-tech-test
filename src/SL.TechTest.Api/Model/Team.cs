using System.ComponentModel.DataAnnotations.Schema;

namespace SL.TechTest.Api.Model
{
    public class Team
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public bool Eliminated { get; set; }
    }
}