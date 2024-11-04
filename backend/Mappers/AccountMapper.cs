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

    public static Account ToAccountModel(this Account accountDto)
    {
      return new Account
      {
        Id = accountDto.Id,
        Name = accountDto.Name,
        CurrentBalance = accountDto.CurrentBalance,
        CreatedAt = accountDto.CreatedAt,
        UserId = accountDto.UserId
      };
    }

    public static AccountOverviewDto ToAccountOverview(this Account accountDto, long income, long expense)
    {
      return new AccountOverviewDto
      {
        Id = accountDto.Id,
        Name = accountDto.Name,
        CurrentBalance = accountDto.CurrentBalance,
        Income = income,
        Expense = expense,
        CreatedAt = accountDto.CreatedAt,
      };
    }
  }
}
