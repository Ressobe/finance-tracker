using api.Models;
using api.Dtos.Account;

namespace api.Mappers
{
  public static class AccountMapper
  {
    public static Account CreateAccountDtoToAccountModel(this CreateAccountDto accountDto, string userId)
    {
      return new Account
      {
        Name = accountDto.Name,
        CurrentBalance = accountDto.CurrentBalance,
        CreatedAt = DateTime.UtcNow,
        UserId = userId,
      };
    }
  }
}
