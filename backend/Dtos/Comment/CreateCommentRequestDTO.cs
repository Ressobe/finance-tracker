using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Comment
{

  public class CreateCommentRequestDTO
  {
    [Required]
    [MinLength(5, ErrorMessage = "Title must be at least 5 characters")]
    [MaxLength(280, ErrorMessage = "Title can't be more than 280 characters")]
    public string Title { get; set; } = string.Empty;

    [Required]
    [MinLength(5, ErrorMessage = "Content must be at least 5 characters")]
    [MaxLength(280, ErrorMessage = "Content can't be more than 280 characters")]
    public string Content { get; set; } = string.Empty;


    public DateTime CreatedOn { get; set; } = DateTime.Now;
  }
}
