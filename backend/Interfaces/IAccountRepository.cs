using api.Models;
using api.Dtos.Account;

namespace api.Interfaces
{
  public interface IAccountRepository
  {
    Task<Account?> GetAsync(int accountId);
    Task<Account?> CreateAsync(Account accountModel);
    Task<Account?> DeleteAsync(int accountId);
    Task<bool> IsAccountExist(int accountId);
    Task<List<Account>> GetAllByUserId(string userId);
    Task<Account?> UpdateAsync(int accountId, UpdateAccountDto updateAccountDto);
  }
}
