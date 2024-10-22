using System.ComponentModel.DataAnnotations;

namespace api.Dtos.User
{
  public class OverviewDto
  {
    [Required]
    public int TotalBalance { get; set; }
    [Required]
    public int TotalIncome { get; set; }
    [Required]
    public int TotalExpense { get; set; }
  }
}
