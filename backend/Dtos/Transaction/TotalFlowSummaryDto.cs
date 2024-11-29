using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Transaction
{
  public class TotalFlowSummaryDto
  {
    [Required]
    public decimal TotalFlow { get; set; }
    [Required]
    public decimal TransactionTotal { get; set; }
    [Required]
    public decimal TransferTotal { get; set; }
    [Required]
    public decimal SavingTotal { get; set; }

    [Required]
    public decimal TransactionPercentage { get; set; }
    [Required]
    public decimal TransferPercentage { get; set; }
    [Required]
    public decimal SavingPercentage { get; set; }
  }
}
