using api.Models;
using api.Dtos.Budget;

namespace api.Interfaces
{
  public interface IBudgetRepository
  {
    Task<Budget?> GetAsync(int budgetId);
    Task<Budget?> CreateAsync(Budget budgetId);
    Task<Budget?> DeleteAsync(int budgetId);
    Task<bool> IsBudgetExist(int budgetId);
    Task<Budget?> GetByCategoryId(int categoryId);
    Task<Budget?> UpdateAsync(int budgetId, UpdateBudgetDto updateBudgetDto);
  }
}
