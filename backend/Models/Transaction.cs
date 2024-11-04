
namespace api.Models
{
  public enum TransactionType
  {
    Earning,
    Expense
  }

  public class Transaction
  {
    public int Id { get; set; }

    public int AccountId { get; set; }
    public Account? Account { get; set; }

    public decimal Amount { get; set; }
    public TransactionType TransactionType { get; set; }

    public int CategoryId { get; set; }
    public Category? Category { get; set; }

    public String Description { get; set; } = String.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
  }
}
