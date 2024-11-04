
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Account
{
  public class AccountOverviewDto
  {
    [Required]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; } = String.Empty;
    [Required]
    public long CurrentBalance { get; set; }
    [Required]
    public long Income { get; set; }
    [Required]
    public long Expense { get; set; }
    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.Now;
  }
}
