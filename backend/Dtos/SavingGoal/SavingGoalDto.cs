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
    public int TargetAmount { get; set; }
    [Required]
    public int CurrentSaved { get; set; }

    [Required]
    public int Prority { get; set; }

    [Required]
    public DateTime StartDate { get; set; }
    [Required]
    public DateTime EndDate { get; set; }
    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.Now;
  }
}
