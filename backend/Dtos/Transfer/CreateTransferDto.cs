using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Transfer
{
  public class CreateTransferDto
  {
    [Required]
    public decimal Amount { get; set; }

    public String Description { get; set; } = String.Empty;

    [Required]
    public int SourceAccountId { get; set; }

    [Required]
    public int DestinationAccountId { get; set; }

    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.Now;
  }
}
