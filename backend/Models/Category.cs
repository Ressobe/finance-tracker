using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
  [Table("Categories")]
  public class Category
  {
    public int Id { get; set; }
    public string UserId { get; set; } = String.Empty;
    public User? User { get; set; }
    public string Name { get; set; } = String.Empty;
  }
}

