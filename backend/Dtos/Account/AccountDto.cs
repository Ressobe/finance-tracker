using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Account
{
  public class AccountDto
  {
    [Required]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; } = String.Empty;
    [Required]
    public long CurrentBalance { get; set; }
    [Required]
    public string UserId { get; set; } = String.Empty;
    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.Now;
  }
}
