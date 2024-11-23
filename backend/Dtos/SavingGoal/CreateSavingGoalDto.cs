using System.ComponentModel.DataAnnotations;

namespace api.Dtos.SavingGoal
{
  public class CreateSavingGoalDto
  {
    [Required]
    public String Name { get; set; } = String.Empty;

    [Required]
    public decimal TargetAmount { get; set; }
  }
}
