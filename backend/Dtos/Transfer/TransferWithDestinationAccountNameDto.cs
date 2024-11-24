using System.ComponentModel.DataAnnotations;

namespace api.Dtos.TransferDto
{
  public class TransferWithDestinationAccountNameDto
  {
    [Required]
    public int Id { get; set; }

    [Required]
    public decimal Amount { get; set; }

    [Required]
    public String Description { get; set; } = String.Empty;

    [Required]
    public int SourceAccountId { get; set; }

    [Required]
    public int DestinationAccountId { get; set; }

    [Required]
    public String DestinationAccountName { get; set; } = String.Empty;

    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.Now;
  }
}
