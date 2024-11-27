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
        Id = savingTransaction.Id,
        SavingGoalId = savingTransaction.SavingGoalId,
        Amount = savingTransaction.Amount,
        AccountId = savingTransaction.AccountId,
        Description = savingTransaction.Description,
        CreatedAt = savingTransaction.CreatedAt,
      };
    }


    public static SavingTransactionWithSavingGoalDto ToSavingTransactionWithSavingGoal(this SavingTransaction savingTransaction)
    {
      return new SavingTransactionWithSavingGoalDto
      {
        Id = savingTransaction.Id,
        Amount = savingTransaction.Amount,
        AccountId = savingTransaction.AccountId,
        SavingGoal = savingTransaction.SavingGoal?.ToSavingGoalDto(),
        Description = savingTransaction.Description,
        CreatedAt = savingTransaction.CreatedAt,
      };
    }
  }
}
