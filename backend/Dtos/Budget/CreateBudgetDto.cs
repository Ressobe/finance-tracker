using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Budget
{
  public class CreateBudgetDto
  {
    public int LimitAmount { get; set; }
    public Frequency Frequency { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
  }
}
