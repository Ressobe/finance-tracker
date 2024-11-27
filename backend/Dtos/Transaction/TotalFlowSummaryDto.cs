namespace api.Dtos.Transaction
{
  public class TotalFlowSummaryDto
  {
    public decimal TotalFlow { get; set; }
    public decimal TransactionTotal { get; set; }
    public decimal TransferTotal { get; set; }
    public decimal SavingTotal { get; set; }

    public decimal TransactionPercentage { get; set; }
    public decimal TransferPercentage { get; set; }
    public decimal SavingPercentage { get; set; }
  }
}
