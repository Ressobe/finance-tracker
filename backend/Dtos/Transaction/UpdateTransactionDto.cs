using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Transaction
{
  public class UpdateTransactionDto
  {
    [Required]
    public int Amount { get; set; }
    [Required]
    public int AccountId { get; set; }
    [Required]
    public int CategoryId { get; set; }
    [Required]
    public String Description { get; set; } = String.Empty;
    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.Now;
  }
}
