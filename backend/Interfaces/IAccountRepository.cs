using api.Models;

namespace api.Interfaces
{
  public interface IAccountRepository
  {
    Task<Account?> GetAsync(int accountId);
    Task<Account?> CreateAsync(Account accountModel);
    Task<Account?> DeleteAsync(int accountId);
    Task<bool> IsAccountExist(int accountId);
  }
}
