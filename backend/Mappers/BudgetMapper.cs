using api.Models;
using api.Dtos.Budget;

namespace api.Mappers
{
  public static class BudgetMapper
  {
    public static Budget CreateBudgetDtoToBudgetModel(this CreateBudgetDto budgetDto, int categoryId)
    {
      return new Budget
      {
        CategoryId = categoryId,
        LimitAmount = budgetDto.LimitAmount,
        Frequency = budgetDto.Frequency,
        StartDate = budgetDto.StartDate,
        EndDate = budgetDto.EndDate,
      };
    }

    public static Budget ToBudgetModel(this Budget budgetDto)
    {
      return new Budget
      {
        Id = budgetDto.Id,
        CategoryId = budgetDto.CategoryId,
        LimitAmount = budgetDto.LimitAmount,
        Frequency = budgetDto.Frequency,
        StartDate = budgetDto.StartDate,
        EndDate = budgetDto.EndDate,
        CreatedAt = budgetDto.CreatedAt
      };
    }
  }
}
