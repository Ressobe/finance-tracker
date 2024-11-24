using System.ComponentModel.DataAnnotations;

namespace api.Dtos.SavingTransaction
{
  public class SavingTransactionWithSavingGoalDto
  {
    [Required]
    public int Id { get; set; }

    [Required]
    public int SavingGoalId { get; set; }


    [Required]
    public String SavingGoalName { get; set; } = String.Empty;

    [Required]
    public int AccountId { get; set; }

    [Required]
    public decimal Amount { get; set; }

    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.Now;
  }
}