using api.Models;
using api.Dtos.Category;

namespace api.Mappers
{
  public static class CategoryMapper
  {
    public static Category CreateCategorDtoToCategoryModel(this CreateCategoryDto categoryDto, string userId)
    {
      return new Category
      {
        Name = categoryDto.Name,
        UserId = userId
      };
    }

    public static Category ToCategoryModel(this Category categoryDto)
    {
      return new Category
      {
        Id = categoryDto.Id,
        Name = categoryDto.Name,
        UserId = categoryDto.UserId
      };

    }
  }
}
