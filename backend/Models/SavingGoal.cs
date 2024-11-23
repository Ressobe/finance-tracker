using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
  [Table("SavingGoals")]
  public class SavingGoal
  {
    public int Id { get; set; }
    public String Name { get; set; } = String.Empty;

    public string UserId { get; set; } = String.Empty;
    public User? User { get; set; }


    public decimal TargetAmount { get; set; }
    public decimal CurrentSaved { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
  }
}
