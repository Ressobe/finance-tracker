using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
  [Table("RecurringTransactions")]
  public class RecurringTransaction
  {
    public int Id;

    public int AccountId { get; set; }
    public Account? Account { get; set; }

    public int CategoryId { get; set; }
    public Category? Category { get; set; }

    public int Amount { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Description { get; set; } = String.Empty;
    public DateTime LastOccurrence { get; set; }
    public DateTime NextOccurrence { get; set; }
    public Boolean IsActive { get; set; }
  }
}
