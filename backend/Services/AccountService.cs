using api.Models;
using api.Interfaces;

namespace api.Services;

public class AccountService
{
  private readonly IAccountRepository _accountRepository;

  public AccountService(IAccountRepository accountRepository)
  {
    _accountRepository = accountRepository;
  }

  public async Task<Account?> Get(int id)
  {
    return await _accountRepository.GetAsync(id);
  }

  public async Task<IEnumerable<Account>> GetAllByUserId(String userId)
  {
    return await _accountRepository.GetAllByUserId(userId);
  }

  public async Task<Account?> Delete(int id)
  {
    var deletedAccount = await _accountRepository.DeleteAsync(id);
    if (deletedAccount == null)
    {
      return null;
    }
    return deletedAccount;
  }


}
