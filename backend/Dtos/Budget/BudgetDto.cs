using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Budget
{
  public class BudgetDto
  {
    [Required]
    public int Id { get; set; }
    [Required]
    public int CategoryId { get; set; }

    [Required]
    public int LimitAmount { get; set; }
    [Required]
    public Frequency Frequency { get; set; }

    [Required]
    public DateTime StartDate { get; set; }
    [Required]
    public DateTime EndDate { get; set; }

    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.Now;

  }
}
