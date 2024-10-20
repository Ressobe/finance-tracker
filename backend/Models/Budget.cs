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
    public int Id { get; set; }
    public int CategoryId { get; set; }
    public Category? Category { get; set; }
    public int LimitAmount { get; set; }
    public Frequency Frequency { get; set; }

    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
  }
}
