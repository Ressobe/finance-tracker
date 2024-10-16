using api.Dtos.RecurringTransaction;
using api.Models;

namespace api.Mappers
{
  public static class RecurringTransactionMapper
  {

    public static RecurringTransaction CreateReccuringTransactionDtoToReccuringTransactionModel(this CreateRecurringTransactionDto recurringTransactionDto, int accountId)
    {
      return new RecurringTransaction
      {
        AccountId = accountId,
        CategoryId = recurringTransactionDto.CategoryId,
        Amount = recurringTransactionDto.Amount,
        StartDate = recurringTransactionDto.StartDate,
        EndDate = recurringTransactionDto.EndDate,
        Description = recurringTransactionDto.Description,
        LastOccurrence = recurringTransactionDto.LastOccurrence,
        NextOccurrence = recurringTransactionDto.NextOccurrence,
        IsActive = recurringTransactionDto.IsActive
      };
    }

    public static RecurringTransaction ToRecurringTransactionModel(this RecurringTransaction recurringTransactionDto)
    {
      return new RecurringTransaction
      {
        Id = recurringTransactionDto.Id,
        AccountId = recurringTransactionDto.AccountId,
        CategoryId = recurringTransactionDto.CategoryId,
        Amount = recurringTransactionDto.Amount,
        StartDate = recurringTransactionDto.StartDate,
        EndDate = recurringTransactionDto.EndDate,
        Description = recurringTransactionDto.Description,
        LastOccurrence = recurringTransactionDto.LastOccurrence,
        NextOccurrence = recurringTransactionDto.NextOccurrence,
        IsActive = recurringTransactionDto.IsActive
      };
    }
  }
}
