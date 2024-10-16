using api.Interfaces;
using api.Data;
using api.Models;
using api.Dtos.Budget;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
  public class BudgetRepository : IBudgetRepository
  {
    private readonly ApplicationDBContext _context;

    public BudgetRepository(ApplicationDBContext applicationDBContext)
    {
      _context = applicationDBContext;
    }

    public async Task<Budget?> GetAsync(int budgetId)
    {
      return await _context.Budgets.FindAsync(budgetId);
    }

    public async Task<Budget?> CreateAsync(Budget budgetModel)
    {
      await _context.Budgets.AddAsync(budgetModel);
      await _context.SaveChangesAsync();
      return budgetModel;
    }

    public async Task<Budget?> DeleteAsync(int budgetId)
    {
      var budgetModel = await _context.Budgets.FirstOrDefaultAsync(item => item.Id == budgetId);
      if (budgetModel == null)
      {
        return null;
      }
      _context.Budgets.Remove(budgetModel);
      await _context.SaveChangesAsync();

      return budgetModel;
    }

    public async Task<bool> IsBudgetExist(int budgetId)
    {
      return await _context.Budgets.AnyAsync(item => item.Id == budgetId);
    }

    public async Task<Budget?> GetByCategoryId(int categoryId)
    {
      return await _context.Budgets.Where(item => item.CategoryId == categoryId).FirstAsync();
    }

    public async Task<Budget?> UpdateAsync(int budgetId, UpdateBudgetDto updateBudgetDto)
    {
      var existingBudget = await this.GetAsync(budgetId);
      if (existingBudget == null)
      {
        return null;
      }

      existingBudget.CategoryId = updateBudgetDto.CategoryId;
      existingBudget.Frequency = updateBudgetDto.Frequency;
      existingBudget.LimitAmount = updateBudgetDto.LimitAmount;
      existingBudget.StartDate = updateBudgetDto.StartDate;
      existingBudget.EndDate = updateBudgetDto.EndDate;

      await _context.SaveChangesAsync();
      return existingBudget;
    }
  }
}
