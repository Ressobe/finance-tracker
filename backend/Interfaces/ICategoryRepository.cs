using api.Models;
using api.Dtos.Category;

namespace api.Interfaces
{
  public interface ICategoryRepository : IOwnableResourceRepository
  {
    Task<Category?> GetAsync(int categoryId);
    Task<Category?> CreateAsync(Category categoryModel);
    Task<Category?> DeleteAsync(int categoryId);
    Task<bool> IsCategoryExist(int categoryId);
    Task<List<Category>> GetAllByUserId(string userId);
    Task<Category?> UpdateAsync(int categoryId, UpdateCategoryDto updateCategoryDto);
    Task<bool> IsOwnerAsync(int resourceId, string userId);
  }
}
