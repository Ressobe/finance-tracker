using api.Dtos.SavingTransaction;
using api.Models;

namespace api.Mappers
{
  public static class SavingTransactionMapper
  {

    public static SavingTransaction CreateSavingTransactionDtoToSavingTransactionModel(this CreateSavingTransactionDto savingTransactionDto, int savingGoalId)
    {
      return new SavingTransaction
      {
        SavingGoalId = savingGoalId,
        AccountId = savingTransactionDto.AccountId,
        Amount = savingTransactionDto.Amount,
        CreatedAt = DateTime.UtcNow,
      };
    }

    public static SavingTransaction ToSavingTransactionModel(this SavingTransaction savingTransaction)
    {
      return new SavingTransaction
      {
        SavingGoalId = savingTransaction.Id,
        Amount = savingTransaction.Amount,
        CreatedAt = DateTime.UtcNow,
      };
    }
  }
}
