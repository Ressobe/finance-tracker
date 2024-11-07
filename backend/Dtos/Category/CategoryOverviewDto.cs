namespace api.Dtos.Category
{
  public class CategoryOverviewDto
  {
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = String.Empty;
    public decimal Amount { get; set; }
    public decimal Percentage { get; set; }
  }
}
