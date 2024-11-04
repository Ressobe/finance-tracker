using api.Data;
using api.Models;
using api.Interfaces;
using api.Dtos.Transaction;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
  public class TransactionRepository : ITransactionRepository
  {
    private readonly ApplicationDBContext _context;

    public TransactionRepository(ApplicationDBContext context)
    {
      _context = context;
    }


    public async Task<Transaction?> GetAsync(int transactionId)
    {
      return await _context.Transactions.FindAsync(transactionId);
    }

    public async Task<Transaction?> CreateAsync(Transaction transactionModel)
    {
      await _context.Transactions.AddAsync(transactionModel);
      await _context.SaveChangesAsync();
      return transactionModel;
    }

    public async Task<Transaction?> DeleteAsync(int transactionId)
    {
      var transactionModel = await _context.Transactions.FirstOrDefaultAsync(item => item.Id == transactionId);
      if (transactionModel == null)
      {
        return null;
      }

      _context.Transactions.Remove(transactionModel);
      await _context.SaveChangesAsync();

      return transactionModel;
    }

    public async Task<bool> IsTransactionExist(int transactionId)
    {
      return await _context.Transactions.AnyAsync(item => item.Id == transactionId);
    }

    public async Task<List<Transaction>> GetAllByAccountId(int accountId)
    {
      var transactions = await _context.Transactions
        .Where(item => item.AccountId == accountId)
        .Include(t => t.Category)
        .ToListAsync();

      return transactions;
    }

    public async Task<Transaction?> UpdateAsync(int transactionId, UpdateTransactionDto updateTransactionDto)
    {
      var existingTransaction = await this.GetAsync(transactionId);
      if (existingTransaction == null)
      {
        return null;
      }

      existingTransaction.AccountId = updateTransactionDto.AccountId;
      existingTransaction.Amount = updateTransactionDto.Amount;
      existingTransaction.CategoryId = updateTransactionDto.CategoryId;
      existingTransaction.Description = updateTransactionDto.Description;
      existingTransaction.TransactionType = updateTransactionDto.TransactionType;

      await _context.SaveChangesAsync();
      return existingTransaction;
    }
  }
}
