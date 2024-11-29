using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Transaction
{
  public class DailyTransactionsSummaryDto
  {
    [Required]
    public DateTime Date { get; set; }
    [Required]
    public decimal Income { get; set; }
    [Required]
    public decimal Expense { get; set; }
  }
}
