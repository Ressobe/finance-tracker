using api.Interfaces;
using api.Models;
using api.Dtos.Category;
using api.Mappers;
namespace api.Services;


public class CategoryService
{
  private readonly ICategoryRepository _categoryRepository;
  public CategoryService(ICategoryRepository categoryRepository)
  {
    _categoryRepository = categoryRepository;
  }

  public async Task<Category?> Get(int id)
  {
    return await _categoryRepository.GetAsync(id);
  }


  public async Task<Category?> Create(String userId, CreateCategoryDto createCategoryDto)
  {
    var categoryModel = createCategoryDto.CreateCategorDtoToCategoryModel(userId);
    var category = await _categoryRepository.CreateAsync(categoryModel);
    if (category is null) return null;

    return category;
  }

  public async Task<bool> Delete(int id)
  {
    var deletedCategory = await _categoryRepository.DeleteAsync(id);
    if (deletedCategory is null)
    {
      return false;
    }
    return true;
  }

  public async Task<UpdateCategoryDto?> Update(int id, UpdateCategoryDto updateCategoryDto)
  {
    var updatedCategory = await _categoryRepository.UpdateAsync(id, updateCategoryDto);
    if (updatedCategory is null)
    {
      return null;
    }
    return updateCategoryDto;
  }
}
