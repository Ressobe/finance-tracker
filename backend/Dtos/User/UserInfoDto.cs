using System.ComponentModel.DataAnnotations;

namespace api.Dtos.User
{
  public class UserInfoDto
  {
    [Required]
    public string Id { get; set; } = String.Empty;

    [Required]
    public string Username { get; set; } = String.Empty;

    [Required]
    public string Email { get; set; } = String.Empty;
  }
}
