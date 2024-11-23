namespace api.Dtos.SavingTransaction
{
  public class UpdateSavingTransactionDto
  {
    public decimal Amount { get; set; }
    public int SavingGoalId { get; set; }
    public DateTime Date { get; set; }
  }
}
