using api.Models;
using api.Dtos.Transaction;

namespace api.Interfaces
{
  public interface ITransactionRepository
  {
    Task<Transaction?> GetAsync(int transactionId);
    Task<Transaction?> CreateAsync(Transaction transactionModel);
    Task<Transaction?> DeleteAsync(int transactionId);
    Task<bool> IsTransactionExist(int transactionId);
    Task<List<Transaction>> GetAllByAccountId(int accountId);
    Task<List<Transaction>> GetAllByCategoryId(int categoryId);
    Task<Transaction?> UpdateAsync(int transactionId, UpdateTransactionDto updateTransactionDto);
  }
}
