using api.Interfaces;
using api.Data;
using api.Models;
using api.Dtos.Account;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
  public class AccountRepository : IAccountRepository
  {
    private readonly ApplicationDBContext _context;

    public AccountRepository(ApplicationDBContext context)
    {
      _context = context;
    }

    public async Task<bool> IsOwnerAsync(int accountId, string userId)
    {
      var account = await _context.Accounts.FirstOrDefaultAsync(c => c.Id == accountId);
      return account != null && account.UserId == userId;
    }

    public async Task<Account?> GetAsync(int accountId)
    {
      return await _context.Accounts.FindAsync(accountId);
    }

    public async Task<Account?> CreateAsync(Account accountModel)
    {
      await _context.Accounts.AddAsync(accountModel);
      await _context.SaveChangesAsync();
      return accountModel;
    }

    public async Task<Account?> DeleteAsync(int accountId)
    {
      var accountModel = await _context.Accounts.FirstOrDefaultAsync(item => item.Id == accountId);
      if (accountModel == null)
      {
        return null;
      }
      _context.Accounts.Remove(accountModel);
      await _context.SaveChangesAsync();

      return accountModel;
    }

    public async Task<List<Account>> GetAllByUserId(string userId)
    {
      var accounts = await _context.Accounts.Where(item => item.UserId == userId).ToListAsync();
      return accounts;
    }

    public async Task<bool> IsAccountExist(int accountId)
    {
      return await _context.Accounts.AnyAsync(item => item.Id == accountId);
    }

    public async Task<Account?> UpdateAsync(int accountId, UpdateAccountDto updateAccountDto)
    {
      var existingAccount = await this.GetAsync(accountId);
      if (existingAccount == null)
      {
        return null;
      }

      existingAccount.Name = updateAccountDto.Name;
      existingAccount.CurrentBalance = updateAccountDto.CurrentBalance;

      await _context.SaveChangesAsync();
      return existingAccount;
    }

    public async Task<Account?> AddIncomeAsync(int accountId, decimal income)
    {
      var existingAccount = await this.GetAsync(accountId);
      if (existingAccount == null)
      {
        return null;
      }


      existingAccount.CurrentBalance = existingAccount.CurrentBalance + income;
      await _context.SaveChangesAsync();
      return existingAccount;
    }

    public async Task<Account?> AddExpenseAsync(int accountId, decimal expense)
    {
      var existingAccount = await this.GetAsync(accountId);
      if (existingAccount == null)
      {
        return null;
      }

      existingAccount.CurrentBalance = existingAccount.CurrentBalance - expense;
      await _context.SaveChangesAsync();
      return existingAccount;
    }
  }
}
