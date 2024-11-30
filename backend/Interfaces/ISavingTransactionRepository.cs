using api.Models;
using api.Dtos.SavingTransaction;

namespace api.Interfaces
{
  public interface ISavingTransactionRepository
  {
    Task<SavingTransaction?> GetAsync(int savingTransactionId);
    Task<SavingTransaction?> CreateAsync(SavingTransaction savingTransactionModel);
    Task<SavingTransaction?> DeleteAsync(int savingTransactionId);
    Task<bool> IsSavingTransactionExist(int savingTransactionId);
    Task<SavingTransaction?> UpdateAsync(int savingTransactionId, UpdateSavingTransactionDto updateSavingTransactionDto);
    Task<List<SavingTransaction>> GetAllByAccountId(int accountId);
    Task<List<SavingTransaction>> GetAllBySavigGoalId(int savingGoalId);
  }
}
