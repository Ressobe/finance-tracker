using api.Data;
using api.Models;
using api.Interfaces;
using api.Dtos.SavingTransaction;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
  public class SavingTransactionRepository : ISavingTransactionRepository
  {
    private readonly ApplicationDBContext _context;

    public SavingTransactionRepository(ApplicationDBContext context)
    {
      _context = context;
    }

    public async Task<SavingTransaction?> GetAsync(int savingTransactionId)
    {
      return await _context.SavingTransactions.FindAsync(savingTransactionId);
    }

    public async Task<SavingTransaction?> CreateAsync(SavingTransaction savingTransactionModel)
    {
      await _context.SavingTransactions.AddAsync(savingTransactionModel);
      await _context.SaveChangesAsync();
      return savingTransactionModel;
    }

    public async Task<SavingTransaction?> DeleteAsync(int savingTransactionId)
    {
      var savingTransactionModel = await _context.SavingTransactions.FirstOrDefaultAsync(item => item.Id == savingTransactionId);
      if (savingTransactionModel == null)
      {
        return null;
      }
      _context.SavingTransactions.Remove(savingTransactionModel);
      await _context.SaveChangesAsync();

      return savingTransactionModel;
    }

    public async Task<bool> IsSavingTransactionExist(int savingTransactionId)
    {
      return await _context.SavingTransactions.AnyAsync(item => item.Id == savingTransactionId);
    }

    public async Task<SavingTransaction?> UpdateAsync(int savingTransactionId, UpdateSavingTransactionDto updateSavingTransactionDto)
    {
      var existingSavingTransaction = await this.GetAsync(savingTransactionId);
      if (existingSavingTransaction == null)
      {
        return null;
      }

      existingSavingTransaction.Amount = updateSavingTransactionDto.Amount;
      existingSavingTransaction.SavingGoalId = updateSavingTransactionDto.SavingGoalId;

      await _context.SaveChangesAsync();
      return existingSavingTransaction;
    }

    public async Task<List<SavingTransaction>> GetAllByAccountId(int accountId)
    {
      var savingTransactions = await _context.SavingTransactions
        .Where(item => item.AccountId == accountId)
        .Include(t => t.SavingGoal)
        .ToListAsync();
      return savingTransactions;
    }

  }
}
