using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
  [Table("SavingGoals")]
  public class SavingGoal
  {
    public int Id { get; set; }
    public String Name { get; set; } = String.Empty;

    public int UserId { get; set; }
    public User? User { get; set; }


    public int TargetAmount { get; set; }
    public int CurrentSaved { get; set; }

    public int Prority { get; set; }

    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;

  }
}
