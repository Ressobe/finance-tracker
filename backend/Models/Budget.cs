using System.ComponentModel.DataAnnotations.Schema;

public enum Frequency
{
  Monthly,
  Quarterly,
  Yearly
}

namespace api.Models
{
  [Table("Budgets")]
  public class Budget
  {
    public int Id;
    public int CategoryId;
    public Category? Category;
    public int LimitAmount;
    public Frequency Frequency;

    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
  }
}
