using api.Interfaces;
using api.Models;
using api.Data;
using api.Dtos.SavingGoal;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
  public class SavingGoalRepository : ISavingGoalRepository
  {
    private readonly ApplicationDBContext _context;

    public SavingGoalRepository(ApplicationDBContext context)
    {
      _context = context;
    }

    public async Task<bool> IsOwnerAsync(int savingGoalId, string userId)
    {
      var savingGoal = await _context.SavingGoals.FirstOrDefaultAsync(c => c.Id == savingGoalId);
      return savingGoal != null && savingGoal.UserId == userId;
    }

    public async Task<List<SavingGoal>> GetAllByUserId(string userId)
    {
      return await _context.SavingGoals.Where(item => item.UserId == userId).ToListAsync();
    }

    public async Task<SavingGoal?> GetAsync(int savingGoalId)
    {

      return await _context.SavingGoals.FindAsync(savingGoalId);
    }

    public async Task<SavingGoal?> CreateAsync(SavingGoal savingGoal)
    {
      await _context.SavingGoals.AddAsync(savingGoal);
      await _context.SaveChangesAsync();
      return savingGoal;
    }

    public async Task<SavingGoal?> DeleteAsync(int savingGoalId)
    {
      var savingGoalModel = await _context.SavingGoals.FirstOrDefaultAsync(item => item.Id == savingGoalId);
      if (savingGoalModel == null)
      {
        return null;
      }

      _context.SavingGoals.Remove(savingGoalModel);
      await _context.SaveChangesAsync();

      return savingGoalModel;
    }

    public async Task<bool> IsSavingGoalExist(int savingGoalId)
    {
      return await _context.SavingGoals.AnyAsync(item => item.Id == savingGoalId);
    }

    public async Task<SavingGoal?> UpdateAsync(int savingGoalId, UpdateSavingGoalDto updateSavingGoalDto)
    {
      var existingSavingGoal = await this.GetAsync(savingGoalId);
      if (existingSavingGoal == null)
      {
        return null;
      }

      existingSavingGoal.Name = updateSavingGoalDto.Name;
      existingSavingGoal.TargetAmount = updateSavingGoalDto.TargetAmount;
      existingSavingGoal.CurrentSaved = updateSavingGoalDto.CurrentSaved;
      existingSavingGoal.Prority = updateSavingGoalDto.Prority;
      existingSavingGoal.StartDate = updateSavingGoalDto.StartDate;

      await _context.SaveChangesAsync();
      return existingSavingGoal;
    }
  }
}
