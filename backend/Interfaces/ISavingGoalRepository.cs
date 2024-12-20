using api.Models;
using api.Dtos.SavingGoal;

namespace api.Interfaces
{
  public interface ISavingGoalRepository : IOwnableResourceRepository
  {
    Task<SavingGoal?> GetAsync(int savingGoalId);
    Task<SavingGoal?> CreateAsync(SavingGoal savingGoal);
    Task<List<SavingGoal>> GetAllByUserId(string userId);
    Task<SavingGoal?> DeleteAsync(int savingGoalId);
    Task<bool> IsSavingGoalExist(int savingGoalId);
    Task<SavingGoal?> UpdateAsync(int savingGoalId, UpdateSavingGoalDto updateSavingGoalDto);
    Task<SavingGoal?> PutAsync(int savingGoalId, decimal Amount);
    Task<SavingGoal?> TakeAsync(int savingGoalId, decimal Amount);
  }
}
