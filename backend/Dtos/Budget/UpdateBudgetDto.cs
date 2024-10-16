namespace api.Dtos.Budget
{
  public class UpdateBudgetDto
  {
    public int CategoryId { get; set; }
    public int LimitAmount { get; set; }
    public Frequency Frequency { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
  }
}
