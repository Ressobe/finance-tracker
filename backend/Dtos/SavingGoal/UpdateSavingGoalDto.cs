namespace api.Dtos.SavingGoal
{
  public class UpdateSavingGoalDto
  {
    public String Name { get; set; } = String.Empty;
    public decimal TargetAmount { get; set; }
  }
}
