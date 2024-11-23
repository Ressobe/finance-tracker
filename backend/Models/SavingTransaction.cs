using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
  [Table("SavingTransactions")]
  public class SavingTransaction
  {
    public int Id { get; set; }

    public int SavingGoalId { get; set; }
    public SavingGoal? SavingGoal { get; set; }

    public Account? Account { get; set; }
    public int AccountId { get; set; }

    public String Description { get; set; } = String.Empty;

    public decimal Amount { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
  }
}
