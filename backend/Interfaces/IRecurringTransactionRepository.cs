using api.Dtos.RecurringTransaction;
using api.Models;

namespace api.Interfaces
{
  public interface IRecurringTransactionRepository
  {
    Task<RecurringTransaction?> GetAsync(int recurringTransactionId);
    Task<RecurringTransaction?> CreateAsync(RecurringTransaction recurringTransaction);
    Task<RecurringTransaction?> DeleteAsync(int recurringTransactionId);
    Task<bool> IsRecurringTransactionExist(int recurringTransactionId);
    Task<RecurringTransaction?> UpdateAsync(int recurringTransactionId, UpdateRecurringTransactionDto recurringTransactionDto);
  }
}
