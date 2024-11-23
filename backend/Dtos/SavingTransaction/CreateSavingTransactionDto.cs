using System.ComponentModel.DataAnnotations;

namespace api.Dtos.SavingTransaction
{
  public class CreateSavingTransactionDto
  {
    [Required]
    public decimal Amount { get; set; }
    [Required]
    public int AccountId { get; set; }

    public String Description { get; set; } = String.Empty;
  }
}
