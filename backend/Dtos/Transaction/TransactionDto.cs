using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Transaction
{
  public class TransactionDto
  {
    [Required]
    public int Id { get; set; }

    [Required]
    public int AccountId { get; set; }

    [Required]
    public int Amount { get; set; }
    [Required]
    public TransactionType TransactionType { get; set; }

    [Required]
    public int CategoryId { get; set; }

    [Required]
    public String Description { get; set; } = String.Empty;
    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.Now;
  }
}
