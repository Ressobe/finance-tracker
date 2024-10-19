using api.Models;
using api.Interfaces;
using api.Data;
using api.Dtos.RecurringTransaction;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
  public class RecurringTransactionRepository : IRecurringTransactionRepository
  {
    private readonly ApplicationDBContext _context;

    public RecurringTransactionRepository(ApplicationDBContext context)
    {
      _context = context;
    }

    public async Task<RecurringTransaction?> GetAsync(int recurringTransactionId)
    {
      return await _context.RecurringTransactions.FindAsync(recurringTransactionId);
    }

    public async Task<RecurringTransaction?> CreateAsync(RecurringTransaction recurringTransaction)
    {
      await _context.RecurringTransactions.AddAsync(recurringTransaction);
      await _context.SaveChangesAsync();
      return recurringTransaction;
    }

    public async Task<RecurringTransaction?> DeleteAsync(int recurringTransactionId)
    {
      var recurringTransactionModel = await _context.RecurringTransactions.FirstOrDefaultAsync(item => item.Id == recurringTransactionId);
      if (recurringTransactionModel == null)
      {
        return null;
      }
      _context.RecurringTransactions.Remove(recurringTransactionModel);
      await _context.SaveChangesAsync();

      return recurringTransactionModel;
    }

    public async Task<bool> IsRecurringTransactionExist(int recurringTransactionId)
    {
      return await _context.RecurringTransactions.AnyAsync(item => item.Id == recurringTransactionId);
    }

    public async Task<RecurringTransaction?> UpdateAsync(int recurringTransactionId, UpdateRecurringTransactionDto recurringTransactionDto)
    {
      var existingRecurringTransaction = await this.GetAsync(recurringTransactionId);
      if (existingRecurringTransaction == null)
      {
        return null;
      }

      existingRecurringTransaction.Amount = recurringTransactionDto.Amount;
      existingRecurringTransaction.CategoryId = recurringTransactionDto.CategoryId;
      existingRecurringTransaction.AccountId = recurringTransactionDto.AccountId;
      existingRecurringTransaction.StartDate = recurringTransactionDto.StartDate;
      existingRecurringTransaction.EndDate = recurringTransactionDto.EndDate;
      existingRecurringTransaction.NextOccurrence = recurringTransactionDto.NextOccurrence;
      existingRecurringTransaction.LastOccurrence = recurringTransactionDto.LastOccurrence;
      existingRecurringTransaction.Description = recurringTransactionDto.Description;
      existingRecurringTransaction.IsActive = recurringTransactionDto.IsActive;

      await _context.SaveChangesAsync();
      return existingRecurringTransaction;
    }
  }
}
