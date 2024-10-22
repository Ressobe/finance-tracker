using api.Models;
using api.Dtos.Transaction;

namespace api.Mappers
{
  public static class TransactionMapper
  {
    public static Transaction CreateTransactionDtoToTransactionModel(this CreateTransactionDto createTransactionDto, int accountId)
    {
      return new Transaction
      {
        AccountId = accountId,
        Amount = createTransactionDto.Amount,
        CategoryId = createTransactionDto.CategoryId,
        Description = createTransactionDto.Description,
        TransactionType = createTransactionDto.TransactionType,
        CreatedAt = DateTime.UtcNow,
      };
    }

    public static Transaction ToTransactionModel(this Transaction transactionDto)
    {
      return new Transaction
      {
        Id = transactionDto.Id,
        Amount = transactionDto.Amount,
        TransactionType = transactionDto.TransactionType,
        AccountId = transactionDto.AccountId,
        CategoryId = transactionDto.CategoryId,
        Description = transactionDto.Description,
        CreatedAt = transactionDto.CreatedAt,
      };
    }
  }
}
