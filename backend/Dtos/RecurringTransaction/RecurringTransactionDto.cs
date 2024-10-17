using System.ComponentModel.DataAnnotations;

namespace api.Dtos.RecurringTransaction
{
  public class RecurringTransactionDto
  {
    [Required]
    public int Id { get; set; }
    [Required]
    public int AccountId { get; set; }
    [Required]
    public int CategoryId { get; set; }
    [Required]
    public int Amount { get; set; }
    [Required]
    public DateTime StartDate { get; set; }
    [Required]
    public DateTime EndDate { get; set; }
    [Required]
    public string Description { get; set; } = String.Empty;
    [Required]
    public DateTime LastOccurrence { get; set; }
    [Required]
    public DateTime NextOccurrence { get; set; }
    [Required]
    public Boolean IsActive { get; set; }
  }
}
