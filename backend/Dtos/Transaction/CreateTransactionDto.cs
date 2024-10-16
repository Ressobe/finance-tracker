using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Transaction
{
  public class CreateTransactionDto
  {

    [Required]
    public int AccountId { get; set; }
    [Required]
    public int Amount { get; set; }
    [Required]
    public TransactionType TransactionType { get; set; }
    [Required]
    public int CategoryId { get; set; }
    public String Description { get; set; } = String.Empty;
  }
}
