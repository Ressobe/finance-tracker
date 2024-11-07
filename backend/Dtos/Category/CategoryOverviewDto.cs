using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Category
{
  public class CategoryOverviewDto
  {
    [Required]
    public int CategoryId { get; set; }
    [Required]
    public string CategoryName { get; set; } = String.Empty;
    [Required]
    public decimal Amount { get; set; }
    [Required]
    public decimal Percentage { get; set; }
  }
}
