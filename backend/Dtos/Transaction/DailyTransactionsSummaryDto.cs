namespace api.Dtos.Transaction
{
  public class DailyTransactionsSummaryDto
  {
    public DateTime Date { get; set; }
    public decimal Income { get; set; }
    public decimal Expense { get; set; }
  }
}
