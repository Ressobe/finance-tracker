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


    public static SavingTransactionWithSavingGoalDto ToSavingTransactionWithSavingGoalName(this SavingTransaction savingTransaction)
    {
      return new SavingTransactionWithSavingGoalDto
      {
        Id = savingTransaction.Id,
        Amount = savingTransaction.Amount,
        AccountId = savingTransaction.AccountId,
        SavingGoalName = savingTransaction.SavingGoal?.Name ?? "",
        CreatedAt = savingTransaction.CreatedAt,
      };
    }
  }
}
