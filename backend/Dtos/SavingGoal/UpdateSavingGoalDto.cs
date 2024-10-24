namespace api.Dtos.SavingGoal
{
  public class UpdateSavingGoalDto
  {
    public String Name { get; set; } = String.Empty;
    public int TargetAmount { get; set; }
  }
}
