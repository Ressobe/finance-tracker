
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Category
{
  public class CreateCategoryDto
  {
    [MinLength(2, ErrorMessage = "Category name must be at least 5 characters")]
    [MaxLength(280, ErrorMessage = "Category name can't be more than 280 characters")]
    public string Name { get; set; } = String.Empty;
  }
}
