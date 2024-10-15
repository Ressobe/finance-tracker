using api.Interfaces;
using api.Data;
using api.Models;
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

    public async Task<bool> IsAccountExist(int accountId)
    {
      return await _context.Accounts.AnyAsync(item => item.Id == accountId);
    }
  }
}
