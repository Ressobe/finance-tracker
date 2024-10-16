public enum TransactionType
{
  Earning,
  Expense
}

namespace api.Models
{
  public class Transaction
  {
    public int Id { get; set; }

    public int AccountId { get; set; }
    public Account? Account { get; set; }

    public int Amount { get; set; }
    public TransactionType TransactionType { get; set; }

    public int CategoryId { get; set; }
    public Category? Category { get; set; }

    public String Description { get; set; } = String.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
  }
}
