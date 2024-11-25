namespace api.Dtos.SavingTransaction
{
  public class UpdateSavingTransactionDto
  {
    public decimal Amount { get; set; }
    public int AccountId { get; set; }
    public String Description { get; set; } = String.Empty;
  }
}
