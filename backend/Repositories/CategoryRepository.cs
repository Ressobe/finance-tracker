using api.Models;
using api.Data;
using api.Dtos.Category;
using api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
  public class CategoryRepository : ICategoryRepository
  {
    private readonly ApplicationDBContext _context;

    public CategoryRepository(ApplicationDBContext context)
    {
      _context = context;
    }


    public async Task<Category?> GetAsync(int categoryId)
    {
      return await _context.Categories.FindAsync(categoryId);

    }

    public async Task<Category?> CreateAsync(Category categoryModel)
    {
      await _context.Categories.AddAsync(categoryModel);
      await _context.SaveChangesAsync();
      return categoryModel;
    }

    public async Task<Category?> DeleteAsync(int categoryId)
    {
      var categoryModel = await _context.Categories.FirstOrDefaultAsync(item => item.Id == categoryId);
      if (categoryModel == null)
      {
        return null;
      }

      _context.Categories.Remove(categoryModel);
      await _context.SaveChangesAsync();

      return categoryModel;
    }

    public async Task<bool> IsCategoryExist(int categoryId)
    {
      return await _context.Categories.AnyAsync(item => item.Id == categoryId);
    }

    public async Task<List<Category>> GetAllByUserId(string userId)
    {
      var categories = await _context.Categories.Where(item => item.UserId == userId).ToListAsync();
      return categories;
    }

    public async Task<Category?> UpdateAsync(int categoryId, UpdateCategoryDto updateCategoryDto)
    {
      var existingCategory = await this.GetAsync(categoryId);
      if (existingCategory == null)
      {
        return null;
      }

      existingCategory.Name = updateCategoryDto.Name;

      await _context.SaveChangesAsync();
      return existingCategory;
    }
  }
}
