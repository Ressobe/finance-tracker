namespace api.Dtos.SavingGoal
{
  public class CreateSavingGoalDto
  {
    public String Name { get; set; } = String.Empty;
    public string UserId { get; set; } = String.Empty;

    public int TargetAmount { get; set; }
    public int CurrentSaved { get; set; }

    public int Prority { get; set; }

    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
  }
}
