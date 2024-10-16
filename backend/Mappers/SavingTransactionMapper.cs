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
        Amount = savingTransactionDto.Amount,
        Date = savingTransactionDto.Date,
      };
    }

    public static SavingTransaction ToSavingTransactionModel(this SavingTransaction savingTransaction)
    {
      return new SavingTransaction
      {
        SavingGoalId = savingTransaction.Id,
        Amount = savingTransaction.Amount,
        Date = savingTransaction.Date,
      };
    }
  }
}
