using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Account
{
  public class CreateAccountDto
  {
    [Required]
    public string Name { get; set; } = String.Empty;

    [Required]
    public long CurrentBalance { get; set; }
  }
}
