using System.ComponentModel.DataAnnotations;

namespace api.Dtos.User
{
  public class RegisterDto
  {
    [Required]
    public string Username { get; set; } = String.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = String.Empty;


    [Required]
    public string Password { get; set; } = String.Empty;
  }
}
