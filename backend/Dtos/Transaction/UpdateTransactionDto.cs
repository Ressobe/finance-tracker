using api.Models;
namespace api.Dtos.Transaction
{
  public class UpdateTransactionDto
  {
    public int Amount { get; set; }
    public TransactionType TransactionType { get; set; }
    public int AccountId { get; set; }
    public int CategoryId { get; set; }
    public String Description { get; set; } = String.Empty;
  }
}
