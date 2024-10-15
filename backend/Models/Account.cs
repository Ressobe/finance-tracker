using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
  [Table("Accounts")]
  public class Account
  {
    public int Id { get; set; }
    public string Name { get; set; } = String.Empty;
    public long CurrentBalance { get; set; }
    public string UserId { get; set; } = String.Empty;
    public User? User { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
  }
}
