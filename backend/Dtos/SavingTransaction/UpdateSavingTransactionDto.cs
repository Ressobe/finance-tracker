namespace api.Dtos.SavingTransaction
{
  public class UpdateSavingTransactionDto
  {
    public int Amount { get; set; }
    public int SavingGoalId { get; set; }
    public DateTime Date { get; set; }
  }
}
