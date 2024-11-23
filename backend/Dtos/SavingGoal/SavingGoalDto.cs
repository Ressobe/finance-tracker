using System.ComponentModel.DataAnnotations;

namespace api.Dtos.SavingGoal
{
  public class SavingGoalDto
  {
    [Required]
    public int Id { get; set; }
    [Required]
    public String Name { get; set; } = String.Empty;

    [Required]
    public string UserId { get; set; } = String.Empty;


    [Required]
    public decimal TargetAmount { get; set; }
    [Required]
    public decimal CurrentSaved { get; set; }

    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.Now;
  }
}
