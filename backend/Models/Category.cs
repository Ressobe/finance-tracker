using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
  [Table("Categories")]
  public class Category
  {
    public int Id { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public string Name { get; set; } = String.Empty;
  }
}

