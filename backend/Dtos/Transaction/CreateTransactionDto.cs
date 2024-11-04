using api.Models;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Transaction
{
  public class CreateTransactionDto
  {
    [Required]
    public decimal Amount { get; set; }
    [Required]
    public TransactionType TransactionType { get; set; }
    [Required]
    public int CategoryId { get; set; }
    public String Description { get; set; } = String.Empty;

    [Required]
    public DateTime CreatedAt { get; set; }
  }
}
