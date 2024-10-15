using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
  [Table("SavingTransactions")]
  public class SavingTransaction
  {
    public int Id { get; set; }

    public int SavingGoalId { get; set; }
    public SavingGoal? SavingGoal { get; set; }

    public int Amount { get; set; }
    public DateTime Date { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
  }
}
