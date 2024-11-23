using System.ComponentModel.DataAnnotations;

namespace api.Dtos.SavingTransaction
{
  public class SavingTransactionDto
  {
    [Required]
    public int Id { get; set; }

    [Required]
    public int SavingGoalId { get; set; }

    [Required]
    public decimal Amount { get; set; }
    [Required]
    public DateTime Date { get; set; }
    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.Now;

  }
}
